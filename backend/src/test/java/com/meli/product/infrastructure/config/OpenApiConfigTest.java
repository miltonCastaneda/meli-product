package com.meli.product.infrastructure.config;

import io.swagger.v3.oas.models.OpenAPI;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class OpenApiConfigTest {

    @Test
    void testCustomOpenAPI() {
        OpenApiConfig openApiConfig = new OpenApiConfig();
        OpenAPI openAPI = openApiConfig.customOpenAPI();

        assertNotNull(openAPI);
        assertEquals("MELI Product Microservice API", openAPI.getInfo().getTitle());
        assertEquals("1.0", openAPI.getInfo().getVersion());
        assertEquals("API documentation for the MELI Product Microservice, providing product information.", openAPI.getInfo().getDescription());
    }
}
