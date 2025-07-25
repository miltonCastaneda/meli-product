package com.meli.product.infrastructure.filters;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpRequestDecorator;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.http.server.reactive.ServerHttpResponseDecorator;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.ByteArrayOutputStream;
import java.nio.channels.Channels;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.UUID;

@Component
public class RequestLoggingFilter implements WebFilter {

    private static final Logger logger = LoggerFactory.getLogger(RequestLoggingFilter.class);
    private static final String TRACE_ID = "traceId";

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        Instant start = Instant.now();
        String traceId = UUID.randomUUID().toString();
        MDC.put(TRACE_ID, traceId);

        ServerHttpRequest request = exchange.getRequest();
        StringBuilder requestBody = new StringBuilder();

        ServerHttpRequestDecorator decoratedRequest = new ServerHttpRequestDecorator(request) {
            @Override
            public Flux<DataBuffer> getBody() {
                return super.getBody().doOnNext(buffer -> {
                    try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
                        Channels.newChannel(baos).write(buffer.asByteBuffer().asReadOnlyBuffer());
                        requestBody.append(baos.toString(StandardCharsets.UTF_8));
                    } catch (Exception e) {
                        logger.error("Error reading request body", e);
                    }
                });
            }
        };

        ServerHttpResponse response = exchange.getResponse();
        ByteArrayOutputStream responseBody = new ByteArrayOutputStream();

        ServerHttpResponseDecorator decoratedResponse = new ServerHttpResponseDecorator(response) {
            @Override
            public Mono<Void> writeWith(org.reactivestreams.Publisher<? extends DataBuffer> body) {
                return super.writeWith(Flux.from(body).doOnNext(buffer -> {
                    try {
                        Channels.newChannel(responseBody).write(buffer.asByteBuffer().asReadOnlyBuffer());
                    } catch (Exception e) {
                        logger.error("Error reading response body", e);
                    }
                }));
            }
        };

        return chain.filter(exchange.mutate().request(decoratedRequest).response(decoratedResponse).build()).doFinally(signalType -> {
            Instant end = Instant.now();
            Duration duration = Duration.between(start, end);

            logger.info(
                   // "Request: method={}, uri={}, headers={}, body={}, status={}, duration={}ms, responseHeaders={}, responseBody={}",
                    "Request: method={}, uri={},  body={}, status={}, duration={}ms",
                    request.getMethod(),
                    request.getURI(),
                   // request.getHeaders(),
                    requestBody.toString(),
                    response.getStatusCode(),
                    duration.toMillis()
                   // response.getHeaders(),
                    //responseBody.toString(StandardCharsets.UTF_8)
            );
            MDC.remove(TRACE_ID);
        });
    }
}
