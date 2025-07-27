package com.meli.product.domain;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class SellerTest {

    @Test
    void testGettersAndSetters() {
        Seller seller = new Seller();
        seller.setName("Test Seller");
        seller.setOfficial(true);
        seller.setSales("1000");
        seller.setProductsCount(50);

        assertEquals("Test Seller", seller.getName());
        assertTrue(seller.getOfficial());
        assertEquals("1000", seller.getSales());
        assertEquals(50, seller.getProductsCount());
    }
}
