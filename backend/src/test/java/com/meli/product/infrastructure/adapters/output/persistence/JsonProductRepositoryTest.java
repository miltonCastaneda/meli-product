package com.meli.product.infrastructure.adapters.output.persistence;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.meli.product.domain.Product;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.doThrow;

@ExtendWith(MockitoExtension.class)
class JsonProductRepositoryTest {

    @Mock
    private ObjectMapper mockedObjectMapper;

    private JsonProductRepository repository;
    private Path tempFilePath;

    @BeforeEach
    void setUp() throws IOException {
        // Create a temporary data.json file for testing
        tempFilePath = Files.createTempFile("test_data", ".json");
        String jsonContent = "{\"products\": [{\"id\": \"ABC123-Samsung-Galaxy-A55\", \"title\": \"Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM\"}]}";
        Files.write(tempFilePath, jsonContent.getBytes());

        // Use a real ObjectMapper for the repository in most tests
        repository = new JsonProductRepository(new ObjectMapper(), tempFilePath.toString());
    }

    @AfterEach
    void tearDown() throws IOException {
        // Clean up the temporary file
        Files.deleteIfExists(tempFilePath);
    }

    @Test
    void findById_whenProductExists_shouldReturnProduct() {
        Mono<Product> productMono = repository.findById("ABC123-Samsung-Galaxy-A55");

        StepVerifier.create(productMono)
                .assertNext(product -> {
                    assertEquals("ABC123-Samsung-Galaxy-A55", product.getId());
                    assertEquals("Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM", product.getTitle());
                })
                .verifyComplete();
    }

    @Test
    void findById_whenProductDoesNotExist_shouldReturnEmpty() {
        Mono<Product> productMono = repository.findById("456");

        StepVerifier.create(productMono)
                .verifyComplete();
    }

    @Test
    void constructor_whenIOExceptionOccurs_shouldThrowRuntimeException() throws IOException {
        // Configure the mocked ObjectMapper to throw an IOException when readTree is called
        doThrow(new IOException("Test IOException")).when(mockedObjectMapper).readTree(any(java.io.InputStream.class));

        // Assert that constructing the repository throws a RuntimeException
        RuntimeException thrown = assertThrows(RuntimeException.class, () -> {
            new JsonProductRepository(mockedObjectMapper, tempFilePath.toString());
        });

        // Verify the exception message
        assertEquals("Error reading data.json from " + tempFilePath.toString(), thrown.getMessage());
    }
}