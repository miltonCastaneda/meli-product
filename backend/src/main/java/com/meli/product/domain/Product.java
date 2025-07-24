package com.meli.product.domain;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.Arrays;
import java.util.Map;
import java.util.Objects;

@Schema(description = "Details about a product")
public class Product {
    @Schema(description = "Unique identifier of the product", example = "123")
    private String id;
    @Schema(description = "Status of the product (e.g., New, Used)", example = "Nuevo | +1000 vendidos")
    private String status;
    @Schema(description = "Title of the product", example = "Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM")
    private String title;
    @Schema(description = "Price of the product", example = "US$ 439")
    private String price;
    @Schema(description = "Shipping information for the product", example = "Envío gratis a todo el país")
    private String shippingInfo;
    @Schema(description = "Stock availability of the product", example = "Disponible")
    private String stock;
    @Schema(description = "Information about the seller", example = "Tienda Oficial Samsung")
    private String sellerInfo;
    @Schema(description = "Available payment methods", example = "[\"Visa\", \"OCA\"]")
    private String[] paymentMethods;
    @Schema(description = "Key features of the product", example = "{\"Tamaño de la pantalla\": \"6.6 pulgadas\", \"Memoria interna\": \"256 GB\", \"Cámara\": \"50 MP\"}")
    private Map<String, String> features;
    @Schema(description = "Detailed description of the product", example = "El Samsung Galaxy A55 5G es un smartphone de última generación con una pantalla impresionante, gran capacidad de almacenamiento y una cámara de alta resolución para capturar tus mejores momentos.")
    private String description;

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getShippingInfo() {
        return shippingInfo;
    }

    public void setShippingInfo(String shippingInfo) {
        this.shippingInfo = shippingInfo;
    }

    public String getStock() {
        return stock;
    }

    public void setStock(String stock) {
        this.stock = stock;
    }

    public String getSellerInfo() {
        return sellerInfo;
    }

    public void setSellerInfo(String sellerInfo) {
        this.sellerInfo = sellerInfo;
    }

    public String[] getPaymentMethods() {
        return paymentMethods;
    }

    public void setPaymentMethods(String[] paymentMethods) {
        this.paymentMethods = paymentMethods;
    }

    public Map<String, String> getFeatures() {
        return features;
    }

    public void setFeatures(Map<String, String> features) {
        this.features = features;
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
                Objects.equals(status, product.status) &&
                Objects.equals(title, product.title) &&
                Objects.equals(price, product.price) &&
                Objects.equals(shippingInfo, product.shippingInfo) &&
                Objects.equals(stock, product.stock) &&
                Objects.equals(sellerInfo, product.sellerInfo) &&
                Arrays.equals(paymentMethods, product.paymentMethods) &&
                Objects.equals(features, product.features) &&
                Objects.equals(description, product.description);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(id, status, title, price, shippingInfo, stock, sellerInfo, features, description);
        result = 31 * result + Arrays.hashCode(paymentMethods);
        return result;
    }
}
