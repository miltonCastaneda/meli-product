package com.meli.product.infrastructure.adapters.output.persistence;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.meli.product.domain.Product;
import com.meli.product.domain.ProductRepository;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

import java.io.IOException;

@Repository
public class JsonProductRepository implements ProductRepository {

    private final ObjectMapper objectMapper;

    public JsonProductRepository(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public Mono<Product> findById(String id) {
        return Mono.fromCallable(() -> {
            try {
                ClassPathResource resource = new ClassPathResource("data.json");
                JsonNode rootNode = objectMapper.readTree(resource.getInputStream());
                JsonNode productsNode = rootNode.path("products");

                for (JsonNode productNode : productsNode) {
                    if (productNode.path("id").asText().equals(id)) {
                        // Directly map the JsonNode to the Product class
                        return objectMapper.treeToValue(productNode, Product.class);
                    }
                }
                return null; // Or throw an exception if the product is not found
            } catch (IOException e) {
                throw new RuntimeException("Error reading data.json", e);
            }
        });
    }
}