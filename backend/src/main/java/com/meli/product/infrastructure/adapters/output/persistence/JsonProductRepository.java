package com.meli.product.infrastructure.adapters.output.persistence;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.meli.product.domain.Product;
import com.meli.product.domain.ProductRepository;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.Map;

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
                        Product product = new Product();
                        product.setId(productNode.path("id").asText());
                        product.setStatus(productNode.path("status").asText());
                        product.setTitle(productNode.path("title").asText());
                        product.setPrice(productNode.path("price").asText());
                        product.setShippingInfo(productNode.path("shippingInfo").asText());
                        product.setStock(productNode.path("stock").asText());
                        product.setSellerInfo(productNode.path("sellerInfo").asText());

                        // Payment Methods
                        JsonNode paymentMethodsNode = productNode.path("paymentMethods");
                        if (paymentMethodsNode.isArray()) {
                            String[] paymentMethods = new String[paymentMethodsNode.size()];
                            for (int i = 0; i < paymentMethodsNode.size(); i++) {
                                paymentMethods[i] = paymentMethodsNode.get(i).asText();
                            }
                            product.setPaymentMethods(paymentMethods);
                        }

                        // Features
                        JsonNode featuresNode = productNode.path("features");
                        if (featuresNode.isObject()) {
                            Map<String, String> features = objectMapper.convertValue(featuresNode, Map.class);
                            product.setFeatures(features);
                        }

                        product.setDescription(productNode.path("description").asText());
                        return product;
                    }
                }
                return null; // Or throw an exception if the product is not found
            } catch (IOException e) {
                throw new RuntimeException("Error reading data.json", e);
            }
        });
    }
}
