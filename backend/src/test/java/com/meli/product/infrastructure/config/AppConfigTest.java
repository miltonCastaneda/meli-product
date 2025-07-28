package com.meli.product.infrastructure.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.meli.product.application.ProductService;
import com.meli.product.domain.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.web.cors.reactive.CorsWebFilter;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@TestPropertySource(properties = "app.data.json.path=test_data.json")
class AppConfigTest {

    @Autowired
    private AppConfig appConfig;

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CorsWebFilter corsWebFilter;

    @Test
    void testBeanCreation() {
        assertNotNull(productService);
        assertNotNull(productRepository);
        assertNotNull(objectMapper);
        assertNotNull(corsWebFilter);
    }
}
