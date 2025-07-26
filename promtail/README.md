# Promtail Service

This directory contains the configuration for Promtail, an agent that ships the contents of local logs to a Loki instance.

## Overview

Promtail is responsible for discovering log files on the host system, attaching labels to them, and sending them to Loki for aggregation and storage.

## Technologies Used

*   **Promtail**: Log collection agent from Grafana Labs.

## Configuration

*   `promtail-config.yml`: The main configuration file for Promtail, defining where to find log files, how to parse them, and which labels to attach.

## Integration with Architecture

*   **Dockerized**: Promtail runs as a Docker container.
*   **Docker Compose**: Orchestrated by `docker-compose.yml`.
*   **Loki**: Pushes collected logs to the Loki service.
*   **Docker Socket**: Mounts the Docker socket to discover logs from other containers.
*   **Access Endpoint**: Promtail does not expose a direct user-facing endpoint.
    *   **What you'll find**: Promtail operates in the background, collecting and shipping logs to Loki. Its status and logs can be viewed via Docker logs (`docker logs <promtail_container_id>`).

## Professional Considerations

*   **Log Discovery**: Configure Promtail to automatically discover logs from new containers or services.
*   **Labeling**: Use meaningful labels to categorize logs, making them easier to query in Loki and Grafana.
*   **Resource Usage**: Monitor Promtail's resource consumption to ensure it doesn't impact the performance of the applications it's monitoring.
*   **Error Handling**: Implement robust error handling and retry mechanisms for log shipping to prevent data loss.