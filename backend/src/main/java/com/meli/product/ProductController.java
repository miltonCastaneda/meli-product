package com.meli.product;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.io.IOException;

import java.util.Map;


@RestController
@RequestMapping("/api/items")
public class ProductController {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/{id}")
    public Mono<Product> getProductById(@PathVariable String id) {


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
                //TODO: Retirar - para pruebas
                // Si no se encuentra el producto, retorna un producto dummy
                Product dummyProduct = new Product();
                dummyProduct.setId("dummy");
                dummyProduct.setStatus("available");
                dummyProduct.setTitle("Producto Dummy");
                dummyProduct.setPrice("0.00");
                dummyProduct.setShippingInfo("Envío estándar");
                dummyProduct.setStock("100");
                dummyProduct.setSellerInfo("Vendedor Dummy");
                dummyProduct.setPaymentMethods(new String[]{"Efectivo", "Tarjeta"});
                dummyProduct.setFeatures(Map.of("color", "rojo", "tamaño", "mediano"));
                dummyProduct.setDescription("Este es un producto dummy de ejemplo.");
                return dummyProduct;
            } catch (IOException e) {
                throw new RuntimeException("Error reading data.json", e);
            }
        });
    }
}
