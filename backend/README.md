# Backend Service

This directory contains the Spring Boot backend application responsible for providing product information via a RESTful API.

## Overview

The backend service is built with Spring Boot and uses a hexagonal architecture, emphasizing separation of concerns and testability. It exposes a single API endpoint to retrieve product details.

## Technologies Used

*   **Spring Boot**: Framework for building stand-alone, production-grade Spring applications.
*   **Spring WebFlux**: Reactive web framework for building non-blocking, asynchronous applications.
*   **Jackson**: High-performance JSON processor for Java.
*   **Project Reactor**: Reactive programming library for building non-blocking applications.
*   **Swagger/OpenAPI**: For API documentation and interactive testing.

## API Endpoints

*   **GET `/api/items/{id}`**: Retrieves detailed information about a product by its unique ID.
    *   **Access Endpoint (via Traefik)**: `http://localhost/api/items/{id}`
        *   **What you'll find**: JSON data representing the product details.
    *   **Direct Access Endpoint (for debugging/testing)**: `http://localhost:8180/api/items/{id}`
        *   **What you'll find**: JSON data representing the product details. This bypasses Traefik.
    *   **Example Response**: Returns a JSON object representing the `Product` domain model, including nested details like price, seller, shipping, rating, key features, and characteristics.

## Data Storage

Product data is currently loaded from a static `data.json` file located in `src/main/resources/data.json`. This simulates a data source for demonstration purposes.

## Integration with Architecture

*   **Dockerized**: The backend is containerized using Docker, as defined in `backend/Dockerfile`.
*   **Docker Compose**: Orchestrated by `docker-compose.yml`, allowing it to run alongside other services like the frontend, Traefik, and monitoring tools.
*   **Traefik**: Exposed via Traefik as an API Gateway. Traefik routes requests from `http://localhost/api` to the backend service.
*   **Monitoring**: Integrated with Prometheus for metrics collection (via Spring Boot Actuator) and Loki for log aggregation.

## Professional Considerations

*   **Scalability**: Designed with a reactive approach (WebFlux) to handle a large number of concurrent requests efficiently.
*   **Observability**: Exposes Actuator endpoints for health checks and metrics, which are consumed by Prometheus.
*   **Maintainability**: Hexagonal architecture promotes clear boundaries and makes it easier to evolve the application.
*   **Data Persistence**: For a production environment, the `JsonProductRepository` would be replaced with an actual database integration (e.g., PostgreSQL, MongoDB) and a robust data access layer.