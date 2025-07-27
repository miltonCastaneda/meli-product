package com.meli.product.domain;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RatingTest {

    @Test
    void testGettersAndSetters() {
        Rating rating = new Rating();
        rating.setAverage(4.5);
        rating.setCount(100);

        assertEquals(4.5, rating.getAverage());
        assertEquals(100, rating.getCount());
    }
}
