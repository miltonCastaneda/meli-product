package com.meli.product.infrastructure.adapters.input.web;

import com.meli.product.domain.exceptions.ApiException;
import com.meli.product.domain.exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;

class GlobalExceptionHandlerTest {

    private GlobalExceptionHandler globalExceptionHandler;

    @BeforeEach
    void setUp() {
        globalExceptionHandler = new GlobalExceptionHandler();
    }

    @Test
    void handleResourceNotFoundException() {
        ResourceNotFoundException ex = new ResourceNotFoundException("Resource not found");
        ResponseEntity<ErrorResponse> responseEntity = globalExceptionHandler.handleResourceNotFoundException(ex);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertEquals("resource_not_found", responseEntity.getBody().getError());
        assertEquals("Resource not found", responseEntity.getBody().getMessage());
    }

    @Test
    void handleApiException() {
        ApiException ex = new ApiException("API error");
        ResponseEntity<ErrorResponse> responseEntity = globalExceptionHandler.handleApiException(ex);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        assertEquals("internal_server_error", responseEntity.getBody().getError());
        assertEquals("API error", responseEntity.getBody().getMessage());
    }
}
