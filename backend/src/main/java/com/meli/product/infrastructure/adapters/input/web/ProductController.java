package com.meli.product.infrastructure.adapters.input.web;

import com.meli.product.application.ProductService;
import com.meli.product.domain.Product;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/items")
@Tag(name = "Product API", description = "API for managing product information")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @Operation(summary = "Get product by ID", description = "Retrieve detailed information about a product by its unique ID.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Product found successfully",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Product.class))),
                    @ApiResponse(responseCode = "404", description = "Product not found")
            })
    @GetMapping("/{id}")
    public Mono<Product> getProductById(
            @Parameter(description = "ID of the product to retrieve", required = true) @PathVariable String id) {
        return productService.getProductById(id);
    }
}
