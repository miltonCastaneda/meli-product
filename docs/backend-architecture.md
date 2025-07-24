# Backend Microservice Architecture

This document describes the architectural design of the backend microservice, which is built using a Hexagonal Architecture (also known as Ports and Adapters). This approach aims to create a highly maintainable, testable, and flexible application by decoupling the core business logic from external concerns.

## 1. Overview of Hexagonal Architecture

The Hexagonal Architecture divides the application into distinct layers, each with a specific responsibility:

*   **Domain Layer (Core):** Contains the core business logic and entities. It is independent of any external technologies or frameworks. This is the "inside" of the hexagon.
*   **Application Layer:** Orchestrates the domain logic to fulfill use cases. It defines the "ports" that external actors (e.g., UI, external systems) use to interact with the application, and the "ports" that the application uses to interact with external systems (e.g., databases, external APIs).
*   **Infrastructure Layer (Adapters):** Contains the "adapters" that connect the application to the outside world. These adapters implement the ports defined in the application layer.

## 2. Project Structure

The backend microservice follows a clear package structure reflecting the hexagonal architecture:

```
src/main/java/com/meli/product/
├── application/              # Application Layer (Use Cases, Services)
│   └── ProductService.java
├── domain/                   # Domain Layer (Entities, Ports/Interfaces)
│   ├── Product.java
│   └── ProductRepository.java (Port)
└── infrastructure/           # Infrastructure Layer (Adapters, Configuration)
    ├── adapters/
    │   ├── input/
    │   │   └── web/          # Inbound Adapter (REST Controller)
    │   │       └── ProductController.java
    │   └── output/
    │       └── persistence/  # Outbound Adapter (JSON Data Source)
    │           └── JsonProductRepository.java (Adapter implementing ProductRepository Port)
    └── config/               # Spring Configuration
        ├── AppConfig.java
        └── OpenApiConfig.java
```

## 3. Layer Breakdown

### 3.1. Domain Layer (`com.meli.product.domain`)

This is the heart of the application, containing the business rules and entities. It has no dependencies on any external frameworks or technologies.

*   **`Product.java`**: Represents the core business entity for a product. It contains attributes like `id`, `title`, `price`, etc.
*   **`ProductRepository.java`**: This is an **outbound port**. It defines an interface for how the application's domain layer interacts with data persistence mechanisms. It declares methods like `findById(String id)` without specifying *how* the data is retrieved.

### 3.2. Application Layer (`com.meli.product.application`)

This layer contains the application's use cases and orchestrates the domain logic. It depends only on the Domain Layer.

*   **`ProductService.java`**: This is the application service that implements the use cases. It depends on the `ProductRepository` *interface* (the port), not its concrete implementation. This ensures that the business logic remains decoupled from the data storage mechanism. For example, `getProductById(String id)` uses the `ProductRepository` to fetch product data.

### 3.3. Infrastructure Layer (`com.meli.product.infrastructure`)

This layer contains all the "adapters" that connect the application to the outside world. These adapters implement the ports defined in the domain and application layers.

#### 3.3.1. Inbound Adapters (`com.meli.product.infrastructure.adapters.input.web`)

These adapters handle incoming requests from external actors and translate them into calls to the application layer.

*   **`ProductController.java`**: This is a Spring `@RestController` that acts as an **inbound adapter**. It exposes REST endpoints (e.g., `/api/items/{id}`) and translates HTTP requests into calls to the `ProductService` (application layer). It uses annotations for Swagger documentation.

#### 3.3.2. Outbound Adapters (`com.meli.product.infrastructure.adapters.output.persistence`)

These adapters implement the outbound ports defined in the domain layer, connecting the application to external systems like databases, file systems, or other services.

*   **`JsonProductRepository.java`**: This class is an **outbound adapter** that implements the `ProductRepository` interface. Its responsibility is to read product data from the `data.json` file and map it to `Product` domain objects. This adapter encapsulates the details of JSON file access, keeping the domain and application layers clean.

#### 3.3.3. Configuration (`com.meli.product.infrastructure.config`)

This package contains Spring configuration classes responsible for wiring up the different components of the application using Dependency Injection.

*   **`AppConfig.java`**: Configures the Spring beans, including the `ProductService`, `ObjectMapper`, and the `JsonProductRepository`. This is where the concrete implementation of `ProductRepository` (i.e., `JsonProductRepository`) is provided to the `ProductService`.
*   **`OpenApiConfig.java`**: Configures the SpringDoc OpenAPI (Swagger) documentation, providing metadata about the API.

## 4. Data Flow Example: Get Product by ID

1.  An HTTP GET request comes in for `/api/items/{id}`.
2.  The **`ProductController`** (inbound adapter) receives the request.
3.  The `ProductController` calls `productService.getProductById(id)` in the **Application Layer**.
4.  The `ProductService` (application layer) calls `productRepository.findById(id)` on its injected `ProductRepository` instance (which is the `JsonProductRepository` implementation).
5.  The **`JsonProductRepository`** (outbound adapter) reads the `data.json` file, finds the product with the given ID, and maps it to a `Product` domain object.
6.  The `Product` object is returned through the `ProductRepository` interface to the `ProductService`.
7.  The `ProductService` returns the `Product` object to the `ProductController`.
8.  The `ProductController` serializes the `Product` object into a JSON response and sends it back to the client.

This architecture ensures that changes to the data source (e.g., switching from JSON file to a database) only require modifying the `JsonProductRepository` adapter and its configuration, without affecting the core business logic in the domain or application layers.
