package com.meli.product.infrastructure.adapters.input.web;

import com.meli.product.application.ProductService;
import com.meli.product.domain.Product;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

import static org.mockito.Mockito.when;

@WebFluxTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private WebTestClient webTestClient;

    @MockBean
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
}
