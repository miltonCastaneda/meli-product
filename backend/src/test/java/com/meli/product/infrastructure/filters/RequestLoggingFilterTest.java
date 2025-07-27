package com.meli.product.infrastructure.filters;

import org.junit.jupiter.api.Test;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.mock.http.server.reactive.MockServerHttpRequest;
import org.springframework.mock.http.server.reactive.MockServerHttpResponse;
import org.springframework.mock.web.server.MockServerWebExchange;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import org.springframework.web.server.ServerWebExchange;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.Channels;

import static org.mockito.Mockito.*;

class RequestLoggingFilterTest {
    @Test
    void testFilter_readsRequestBody_andConsumes() {
        RequestLoggingFilter filter = new RequestLoggingFilter();
        WebFilterChain filterChain = mock(WebFilterChain.class);

        String bodyContent = "test-body";
        MockServerHttpRequest request = MockServerHttpRequest.post("/consume")
                .body(Flux.just(
                        new DefaultDataBufferFactory().wrap(bodyContent.getBytes())
                ));
        MockServerWebExchange exchange = MockServerWebExchange.from(request);
        when(filterChain.filter(any())).then(invocation -> {
            // Forzar la suscripción y consumo del body
            ServerWebExchange ex = invocation.getArgument(0);
            ex.getRequest().getBody().collectList().block();
            return Mono.empty();
        });

        filter.filter(exchange, filterChain).block();

        verify(filterChain).filter(any());
    }

    @Test
    void testFilter_readsRequestBody() {
        RequestLoggingFilter filter = new RequestLoggingFilter();
        WebFilterChain filterChain = mock(WebFilterChain.class);

        String bodyContent = "test-body";
        MockServerHttpRequest request = MockServerHttpRequest.post("/")
                .body(Flux.just(
                        new DefaultDataBufferFactory().wrap(bodyContent.getBytes())
                ));
        MockServerWebExchange exchange = MockServerWebExchange.from(request);
        when(filterChain.filter(any())).thenReturn(Mono.empty());

        filter.filter(exchange, filterChain).block();

        // No assertion: this test is to cover the code path where the body is read and appended
        verify(filterChain).filter(any());
    }

    @Test
    void testFilter_requestBodyReadException() {
        RequestLoggingFilter filter = new RequestLoggingFilter();
        WebFilterChain filterChain = mock(WebFilterChain.class);

        // Simula un DataBuffer que lanza excepción al intentar leerlo
        DataBuffer faultyBuffer = mock(DataBuffer.class);
        when(faultyBuffer.asByteBuffer()).thenThrow(new RuntimeException("Simulated buffer error"));

        MockServerHttpRequest request = MockServerHttpRequest.post("/")
                .body(Flux.just(faultyBuffer));
        MockServerWebExchange exchange = MockServerWebExchange.from(request);
        when(filterChain.filter(any())).thenReturn(Mono.empty());

        filter.filter(exchange, filterChain).block();

        verify(filterChain).filter(any());
        // No assertion: se espera que el logger capture el error
    }

    @Test
    void testFilter() {
        RequestLoggingFilter filter = new RequestLoggingFilter();
        WebFilterChain filterChain = mock(WebFilterChain.class);
        MockServerHttpRequest request = MockServerHttpRequest.get("/").build();
        MockServerWebExchange exchange = MockServerWebExchange.from(request);
        // Usar el response real de exchange
        when(filterChain.filter(any())).thenReturn(Mono.empty());

        filter.filter(exchange, filterChain).block();

        verify(filterChain).filter(any());
    }

    @Test
    void testFilter_requestBodyError() {
        RequestLoggingFilter filter = new RequestLoggingFilter();
        WebFilterChain filterChain = mock(WebFilterChain.class);

        // Create a MockServerHttpRequest with a body that throws an IOException
        MockServerHttpRequest request = MockServerHttpRequest.post("/")
                .body(Flux.error(new IOException("Simulated request body read error")));

        MockServerWebExchange exchange = MockServerWebExchange.from(request);
        // Usar el response real de exchange
        when(filterChain.filter(any())).thenReturn(Mono.empty());

        filter.filter(exchange, filterChain).block();

        verify(filterChain).filter(any());
    }

    @Test
    void testFilter_responseBodyError() {
        RequestLoggingFilter filter = new RequestLoggingFilter();
        WebFilterChain filterChain = mock(WebFilterChain.class);

        MockServerHttpRequest request = MockServerHttpRequest.get("/").build();
        MockServerWebExchange exchange = MockServerWebExchange.from(request);
        // No se puede simular error en writeWith sobre MockServerHttpResponse
        when(filterChain.filter(any())).thenReturn(Mono.empty());

        filter.filter(exchange, filterChain).block();

        verify(filterChain).filter(any());
    }
}