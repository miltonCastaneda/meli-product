package com.meli.product.infrastructure.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.meli.product.application.ProductService;
import com.meli.product.domain.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.web.cors.reactive.CorsWebFilter;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;

class AppConfigTest {

    @Test
    void testBeanCreation() {
        AppConfig appConfig = new AppConfig();
        ProductRepository productRepository = mock(ProductRepository.class);
        ObjectMapper objectMapper = appConfig.objectMapper();

        ProductService productService = appConfig.productService(productRepository);
        ProductRepository createdProductRepository = appConfig.productRepository(objectMapper);
        CorsWebFilter corsWebFilter = appConfig.corsWebFilter();

        assertNotNull(productService);
        assertNotNull(createdProductRepository);
        assertNotNull(corsWebFilter);
        assertNotNull(objectMapper);
    }
}
