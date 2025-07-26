# Traefik Service

This directory contains the configuration for Traefik, a modern HTTP reverse proxy and load balancer that makes deploying microservices easy.

## Overview

Traefik acts as the API Gateway for the application, routing incoming requests to the correct backend services (frontend, backend API). It automatically discovers services running in Docker and applies routing rules based on labels defined in `docker-compose.yml`.

## Technologies Used

*   **Traefik**: Edge Router and API Gateway.

## Configuration

Traefik's configuration is primarily defined through command-line arguments and Docker labels in the `docker-compose.yml` file. Key configurations include:

*   **Providers**: Configured to use Docker as a provider, enabling automatic service discovery.
*   **Entrypoints**: Defines the ports Traefik listens on (e.g., `web` on port 80).
*   **Routers**: Rules for routing incoming requests to specific services based on hostnames and path prefixes.
*   **Middlewares**: Applied to requests for features like retries and circuit breakers.
*   **Metrics**: Configured to expose Prometheus metrics for monitoring.

## Integration with Architecture

*   **Dockerized**: Traefik runs as a Docker container.
*   **Docker Compose**: Orchestrated by `docker-compose.yml`.
*   **Frontend & Backend Exposure**: Exposes the frontend application on `http://localhost` and routes API calls to the backend service via `/api` path prefix.
*   **Monitoring**: Exposes metrics that are scraped by Prometheus.
*   **Access Endpoint (Dashboard)**: `http://localhost:8080/dashboard`
    *   **What you'll find**: The Traefik dashboard, providing a visual overview of your configured routers, services, and middlewares, along with real-time traffic metrics.
    *   **Access Endpoint (Web UI)**: `http://localhost`
        *   **What you'll find**: The frontend application, served by Traefik.

## Professional Considerations

*   **Dynamic Configuration**: Traefik's ability to dynamically configure routing based on Docker labels simplifies service deployment and management.
*   **Load Balancing**: Provides built-in load balancing across multiple instances of a service.
*   **Security**: Can be configured for SSL/TLS termination, authentication, and other security features.
*   **Observability**: Rich metrics and a user-friendly dashboard provide excellent visibility into traffic flow and service health.
*   **High Availability**: Can be deployed in a highly available setup for production environments.