package com.meli.product.domain;

import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class ProductTest {

    @Test
    void testGettersAndSetters() {
        Product product = new Product();
        product.setId("1");
        product.setStatus("available");
        product.setTitle("Test Product");
        product.setPrice("10.00");
        product.setShippingInfo("Free Shipping");
        product.setStock("100");
        product.setSellerInfo("Test Seller");
        String[] paymentMethods = {"Credit Card", "Debit Card"};
        product.setPaymentMethods(paymentMethods);
        Map<String, String> features = new HashMap<>();
        features.put("color", "red");
        product.setFeatures(features);
        product.setDescription("This is a test product.");

        assertEquals("1", product.getId());
        assertEquals("available", product.getStatus());
        assertEquals("Test Product", product.getTitle());
        assertEquals("10.00", product.getPrice());
        assertEquals("Free Shipping", product.getShippingInfo());
        assertEquals("100", product.getStock());
        assertEquals("Test Seller", product.getSellerInfo());
        assertArrayEquals(paymentMethods, product.getPaymentMethods());
        assertEquals(features, product.getFeatures());
        assertEquals("This is a test product.", product.getDescription());
    }

    @Test
    void testEqualsAndHashCode() {
        Product product1 = new Product();
        product1.setId("1");
        product1.setTitle("Test Product");

        Product product2 = new Product();
        product2.setId("1");
        product2.setTitle("Test Product");

        Product product3 = new Product();
        product3.setId("2");
        product3.setTitle("Another Product");

        // Test equality
        assertEquals(product1, product2);
        assertNotEquals(product1, product3);

        // Test hash code
        assertEquals(product1.hashCode(), product2.hashCode());
        assertNotEquals(product1.hashCode(), product3.hashCode());

        // Test with null and different class
        assertNotEquals(product1, null);
        assertNotEquals(product1, new Object());
    }
}
