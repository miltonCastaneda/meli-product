package com.meli.product.application;

import com.meli.product.domain.Product;
import com.meli.product.domain.ProductRepository;
import com.meli.product.domain.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Mono<Product> getProductById(String id) {
        return productRepository.findById(id)
                .switchIfEmpty(Mono.error(new ResourceNotFoundException("Product with id " + id + " not found")));
    }
}
