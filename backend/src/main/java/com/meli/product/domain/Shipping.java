package com.meli.product.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Shipping {
    @JsonProperty("free_shipping")
    private Boolean freeShipping;

    public Boolean getFreeShipping() {
        return freeShipping;
    }

    public void setFreeShipping(Boolean freeShipping) {
        this.freeShipping = freeShipping;
    }
}
