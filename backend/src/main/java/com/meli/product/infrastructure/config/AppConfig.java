package com.meli.product.infrastructure.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.meli.product.application.ProductService;
import com.meli.product.domain.ProductRepository;
import com.meli.product.infrastructure.adapters.output.persistence.JsonProductRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public ProductService productService(ProductRepository productRepository) {
        return new ProductService(productRepository);
    }

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

    @Bean
    public ProductRepository productRepository(ObjectMapper objectMapper) {
        return new JsonProductRepository(objectMapper);
    }
}
