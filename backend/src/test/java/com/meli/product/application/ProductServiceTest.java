package com.meli.product.application;

import com.meli.product.domain.Product;
import com.meli.product.domain.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    void getProductById_shouldReturnProduct() {
        Product product = new Product();
        product.setId("123");
        product.setTitle("Test Product");

        when(productRepository.findById("123")).thenReturn(Mono.just(product));

        Mono<Product> result = productService.getProductById("123");

        StepVerifier.create(result)
                .expectNext(product)
                .verifyComplete();
    }

    @Test
    void getProductById_shouldThrowResourceNotFoundException() {
        when(productRepository.findById("123")).thenReturn(Mono.empty());

        Mono<Product> result = productService.getProductById("123");

        StepVerifier.create(result)
                .expectErrorMessage("Product with id 123 not found")
                .verify();
    }
}
