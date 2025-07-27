package com.meli.product.domain;

import org.junit.jupiter.api.Test;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

class ProductTest {

    @Test
    void testGettersAndSetters() {
        Product product = new Product();
        product.setId("1");
        product.setCondition("new");
        product.setSoldQuantity(10);
        product.setTitle("Test Product");
        Price price = new Price();
        product.setPrice(price);
        product.setOriginalPrice(100.0);
        product.setDiscountPercentage(10);
        product.setImages(Collections.singletonList("image.jpg"));
        Seller seller = new Seller();
        product.setSeller(seller);
        Shipping shipping = new Shipping();
        product.setShipping(shipping);
        product.setStock(100);
        Rating rating = new Rating();
        product.setRating(rating);
        product.setKeyFeatures(Collections.singletonList("feature"));
        Characteristic characteristic = new Characteristic();
        product.setCharacteristics(Collections.singletonList(characteristic));
        product.setDescription("description");

        assertEquals("1", product.getId());
        assertEquals("new", product.getCondition());
        assertEquals(10, product.getSoldQuantity());
        assertEquals("Test Product", product.getTitle());
        assertEquals(price, product.getPrice());
        assertEquals(100.0, product.getOriginalPrice());
        assertEquals(10, product.getDiscountPercentage());
        assertEquals(Collections.singletonList("image.jpg"), product.getImages());
        assertEquals(seller, product.getSeller());
        assertEquals(shipping, product.getShipping());
        assertEquals(100, product.getStock());
        assertEquals(rating, product.getRating());
        assertEquals(Collections.singletonList("feature"), product.getKeyFeatures());
        assertEquals(Collections.singletonList(characteristic), product.getCharacteristics());
        assertEquals("description", product.getDescription());
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

        assertEquals(product1, product2);
        assertNotEquals(product1, product3);

        assertEquals(product1.hashCode(), product2.hashCode());
        assertNotEquals(product1.hashCode(), product3.hashCode());

        assertNotEquals(product1, null);
        assertNotEquals(product1, new Object());
    }
}