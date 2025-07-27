package com.meli.product.domain;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CharacteristicTest {

    @Test
    void testGettersAndSetters() {
        Characteristic characteristic = new Characteristic();
        characteristic.setIcon("icon");
        characteristic.setName("name");
        characteristic.setValue("value");

        assertEquals("icon", characteristic.getIcon());
        assertEquals("name", characteristic.getName());
        assertEquals("value", characteristic.getValue());
    }
}
