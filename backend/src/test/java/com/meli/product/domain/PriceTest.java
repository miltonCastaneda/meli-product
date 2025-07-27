package com.meli.product.domain;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class PriceTest {

    @Test
    void testGettersAndSetters() {
        Price price = new Price();
        price.setAmount(100.0);
        price.setCurrency("USD");
        Installments installments = new Installments();
        price.setInstallments(installments);

        assertEquals(100.0, price.getAmount());
        assertEquals("USD", price.getCurrency());
        assertEquals(installments, price.getInstallments());
    }
}
