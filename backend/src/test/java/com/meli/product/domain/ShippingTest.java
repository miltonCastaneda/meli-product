package com.meli.product.domain;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class ShippingTest {

    @Test
    void testGettersAndSetters() {
        Shipping shipping = new Shipping();
        shipping.setFreeShipping(true);

        assertTrue(shipping.getFreeShipping());
    }
}
