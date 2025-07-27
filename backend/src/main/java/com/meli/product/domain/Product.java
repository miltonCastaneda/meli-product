package com.meli.product.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.Objects;

@Schema(description = "Details about a product")
public class Product {
    @Schema(description = "Unique identifier of the product", example = "ABC123-Samsung-Galaxy-A55")
    private String id;
    private String condition;
    @JsonProperty("sold_quantity")
    private Integer soldQuantity;
    private String title;
    private Price price;
    @JsonProperty("original_price")
    private Double originalPrice;
    @JsonProperty("discount_percentage")
    private Integer discountPercentage;
    private List<String> images;
    private Seller seller;
    private Shipping shipping;
    private Integer stock;
    private Rating rating;
    @JsonProperty("key_features")
    private List<String> keyFeatures;
    private List<Characteristic> characteristics;
    private String description;

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public Integer getSoldQuantity() {
        return soldQuantity;
    }

    public void setSoldQuantity(Integer soldQuantity) {
        this.soldQuantity = soldQuantity;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Price getPrice() {
        return price;
    }

    public void setPrice(Price price) {
        this.price = price;
    }

    public Double getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(Double originalPrice) {
        this.originalPrice = originalPrice;
    }

    public Integer getDiscountPercentage() {
        return discountPercentage;
    }

    public void setDiscountPercentage(Integer discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public Seller getSeller() {
        return seller;
    }

    public void setSeller(Seller seller) {
        this.seller = seller;
    }

    public Shipping getShipping() {
        return shipping;
    }

    public void setShipping(Shipping shipping) {
        this.shipping = shipping;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Rating getRating() {
        return rating;
    }

    public void setRating(Rating rating) {
        this.rating = rating;
    }

    public List<String> getKeyFeatures() {
        return keyFeatures;
    }

    public void setKeyFeatures(List<String> keyFeatures) {
        this.keyFeatures = keyFeatures;
    }

    public List<Characteristic> getCharacteristics() {
        return characteristics;
    }

    public void setCharacteristics(List<Characteristic> characteristics) {
        this.characteristics = characteristics;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Objects.equals(id, product.id) &&
                Objects.equals(condition, product.condition) &&
                Objects.equals(soldQuantity, product.soldQuantity) &&
                Objects.equals(title, product.title) &&
                Objects.equals(price, product.price) &&
                Objects.equals(originalPrice, product.originalPrice) &&
                Objects.equals(discountPercentage, product.discountPercentage) &&
                Objects.equals(images, product.images) &&
                Objects.equals(seller, product.seller) &&
                Objects.equals(shipping, product.shipping) &&
                Objects.equals(stock, product.stock) &&
                Objects.equals(rating, product.rating) &&
                Objects.equals(keyFeatures, product.keyFeatures) &&
                Objects.equals(characteristics, product.characteristics) &&
                Objects.equals(description, product.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, condition, soldQuantity, title, price, originalPrice, discountPercentage, images, seller, shipping, stock, rating, keyFeatures, characteristics, description);
    }
}