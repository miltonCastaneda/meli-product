package com.meli.product.infrastructure.adapters.output.persistence;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.meli.product.domain.Product;
import com.meli.product.domain.ProductRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;
import org.springframework.scheduling.annotation.Scheduled;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class JsonProductRepository implements ProductRepository {

    private final ObjectMapper objectMapper;
    private final String dataJsonPath;
    private Map<String, Product> productCache;
    private long lastModified = 0L;

    public JsonProductRepository(ObjectMapper objectMapper, @Value("${app.data.json.path}") String dataJsonPath) {
        this.objectMapper = objectMapper;
        this.dataJsonPath = dataJsonPath;
        this.productCache = new ConcurrentHashMap<>();
        loadData();
    }

    @Override
    public Mono<Product> findById(String id) {
        return Mono.justOrEmpty(productCache.get(id));
    }

    private void loadData() {
        try {
            Path path = Paths.get(dataJsonPath);
            if (!Files.exists(path)) {
                System.err.println("data.json not found at: " + dataJsonPath);
                return;
            }
            this.lastModified = Files.getLastModifiedTime(path).toMillis();
            JsonNode rootNode = objectMapper.readTree(new FileSystemResource(dataJsonPath).getInputStream());
            JsonNode productsNode = rootNode.path("products");

            Map<String, Product> newCache = new ConcurrentHashMap<>();
            for (JsonNode productNode : productsNode) {
                Product product = objectMapper.treeToValue(productNode, Product.class);
                newCache.put(product.getId(), product);
            }
            this.productCache = newCache;
            System.out.println("data.json loaded successfully from: " + dataJsonPath);
        } catch (IOException e) {
            throw new RuntimeException("Error reading data.json from " + dataJsonPath, e);
        }
    }

    @Scheduled(fixedRate = 5000) // Check for updates every 5 seconds
    public void refreshData() {
        try {
            Path path = Paths.get(dataJsonPath);
            if (Files.exists(path)) {
                long currentLastModified = Files.getLastModifiedTime(path).toMillis();
                if (currentLastModified > this.lastModified) {
                    System.out.println("data.json has been modified. Reloading data...");
                    loadData();
                }
            }
        } catch (IOException e) {
            System.err.println("Error checking data.json modification time: " + e.getMessage());
        }
    }
}