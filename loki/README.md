# Loki Service

This directory contains the configuration for Loki, a horizontally scalable, highly available, multi-tenant log aggregation system inspired by Prometheus.

## Overview

Loki is designed to store and query logs from all services in the application. It's optimized for cost-effectiveness and simplicity, indexing only metadata (labels) rather than the full log content.

## Technologies Used

*   **Loki**: Log aggregation system from Grafana Labs.

## Configuration

*   `local-config.yaml`: The main configuration file for Loki, defining its storage, ingester, and querier settings.

## Integration with Architecture

*   **Dockerized**: Loki runs as a Docker container.
*   **Docker Compose**: Orchestrated by `docker-compose.yml`.
*   **Promtail**: Logs are pushed to Loki by Promtail agents running alongside the application services.
*   **Grafana**: Loki is configured as a data source in Grafana, allowing users to query and visualize logs.
*   **Access Endpoint**: `http://localhost:3100`
    *   **What you'll find**: Loki's HTTP API for log ingestion and querying. Typically accessed by Promtail and Grafana, not directly by users.

## Professional Considerations

*   **Scalability**: Loki is designed for horizontal scalability, making it suitable for large-scale log aggregation.
*   **Cost-Effective**: By indexing only labels, Loki offers a more cost-effective solution for log storage compared to full-text indexing systems.
*   **Persistence**: For production, ensure Loki's data is persisted to a durable storage solution (e.g., S3, GCS) to prevent data loss upon container restarts or failures.
*   **Retention Policies**: Implement appropriate log retention policies to manage storage costs and compliance requirements.