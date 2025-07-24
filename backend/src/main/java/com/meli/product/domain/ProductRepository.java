package com.meli.product.domain;

import com.meli.product.domain.Product;
import reactor.core.publisher.Mono;

public interface ProductRepository {
    Mono<Product> findById(String id);
}
