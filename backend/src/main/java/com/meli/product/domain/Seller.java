package com.meli.product.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Seller {
    private String name;
    @JsonProperty("is_official")
    private Boolean isOfficial;
    private String sales;
    @JsonProperty("products_count")
    private Integer productsCount;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getOfficial() {
        return isOfficial;
    }

    public void setOfficial(Boolean official) {
        isOfficial = official;
    }

    public String getSales() {
        return sales;
    }

    public void setSales(String sales) {
        this.sales = sales;
    }

    public Integer getProductsCount() {
        return productsCount;
    }

    public void setProductsCount(Integer productsCount) {
        this.productsCount = productsCount;
    }
}
