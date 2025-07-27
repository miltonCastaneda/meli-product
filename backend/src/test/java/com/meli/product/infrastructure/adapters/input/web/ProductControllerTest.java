package com.meli.product.infrastructure.adapters.input.web;

import com.meli.product.application.ProductService;
import com.meli.product.domain.Product;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;
import org.mockito.Mockito;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.test.context.TestConfiguration;
import static org.mockito.Mockito.when;

@WebFluxTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private WebTestClient webTestClient;

    @TestConfiguration
    static class TestConfig {
        @Bean
        public ProductService productService() {
            return Mockito.mock(ProductService.class);
        }
    }

    @Autowired
    private ProductService productService;

    @Test
    void getProductById_shouldReturnProduct() {
        Product product = new Product();
        product.setId("123");
        product.setTitle("Test Product");

        when(productService.getProductById("123")).thenReturn(Mono.just(product));

        webTestClient.get().uri("/api/items/123")
                .exchange()
                .expectStatus().isOk()
                .expectBody(Product.class)
                .isEqualTo(product);
    }

    @Test
    void getProductById_shouldReturnNotFound() {
        when(productService.getProductById("123")).thenReturn(Mono.error(new com.meli.product.domain.exceptions.ResourceNotFoundException("Product not found")));

        webTestClient.get().uri("/api/items/123")
                .exchange()
                .expectStatus().isNotFound();
    }
}
