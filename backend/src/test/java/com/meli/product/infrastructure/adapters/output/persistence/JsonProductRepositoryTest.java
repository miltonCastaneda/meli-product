package com.meli.product.infrastructure.adapters.output.persistence;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.meli.product.domain.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class JsonProductRepositoryTest {

    @Mock
    private ObjectMapper objectMapper;

    private JsonProductRepository repository;

    @BeforeEach
    void setUp() {
        repository = new JsonProductRepository(new ObjectMapper()); // Use a real ObjectMapper for successful tests
    }

    @Test
    void findById_whenProductExists_shouldReturnProduct() {
        Mono<Product> productMono = repository.findById("123");

        StepVerifier.create(productMono)
                .assertNext(product -> {
                    assertEquals("123", product.getId());
                    assertEquals("Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM", product.getTitle());
                })
                .verifyComplete();
    }

    @Test
    void findById_whenProductDoesNotExist_shouldReturnEmpty() {
        Mono<Product> productMono = repository.findById("456");

        StepVerifier.create(productMono)
                .verifyComplete();
    }

    @Test
    void findById_whenIOExceptionOccurs_shouldThrowRuntimeException() throws IOException {
        // Use the mocked ObjectMapper for this specific test case
        repository = new JsonProductRepository(objectMapper);
        when(objectMapper.readTree(any(java.io.InputStream.class))).thenThrow(new IOException("Test IOException"));

        Mono<Product> productMono = repository.findById("123");

        StepVerifier.create(productMono)
                .expectErrorMatches(throwable -> throwable instanceof RuntimeException &&
                        throwable.getMessage().contains("Error reading data.json"))
                .verify();
    }
}
