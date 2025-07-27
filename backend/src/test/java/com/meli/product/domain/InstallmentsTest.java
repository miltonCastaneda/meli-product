package com.meli.product.domain;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class InstallmentsTest {

    @Test
    void testGettersAndSetters() {
        Installments installments = new Installments();
        installments.setQuantity(12);
        installments.setAmount(10.5);

        assertEquals(12, installments.getQuantity());
        assertEquals(10.5, installments.getAmount());
    }
}
