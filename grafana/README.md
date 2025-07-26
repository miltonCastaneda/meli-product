# Grafana Service

This directory contains the configuration for Grafana, an open-source platform for monitoring and observability.

## Overview

Grafana is used to visualize metrics collected by Prometheus and logs collected by Loki, providing dashboards for monitoring the health and performance of the application services.

## Technologies Used

*   **Grafana**: Open-source analytics and monitoring solution.

## Configuration

*   `provisioning/datasources/datasource.yml`: Configures Prometheus and Loki as data sources for Grafana.
*   `provisioning/dashboards/dashboard.yml`: Defines the dashboards to be loaded into Grafana.

## Integration with Architecture

*   **Dockerized**: Grafana runs as a Docker container.
*   **Docker Compose**: Orchestrated by `docker-compose.yml`.
*   **Prometheus**: Connects to Prometheus to pull metrics data.
*   **Loki**: Connects to Loki to pull log data.
*   **Access Endpoint**: `http://localhost:3001`
    *   **What you'll find**: Grafana dashboards for visualizing metrics and logs from your application.
    *   **Credentials**: `admin`/`admin` (default, change in production).

## Professional Considerations

*   **Dashboards as Code**: Configuration is managed as code (`.yml` files) for version control and easier deployment.
*   **Alerting**: Can be configured to send alerts based on predefined thresholds for metrics and logs.
*   **User Management**: In a production environment, integrate with an authentication system (e.g., LDAP, OAuth) for secure user access.
*   **Persistence**: For production, ensure Grafana's data (dashboards, users, etc.) is persisted outside the container volume.