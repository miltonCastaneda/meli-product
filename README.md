# MELI Product Application

This repository contains a full-stack application simulating a Mercado Libre product page, along with monitoring tools.

## Project Structure

*   `backend/`: Spring Boot application providing product APIs.
*   `frontend/`: React.js application for the product display.
*   `docker-compose.yml`: Defines the multi-container Docker application.
*   `prometheus/`: Prometheus configuration for monitoring.
*   `grafana/`: Grafana configuration for visualizing metrics.
*   `docs/`: Project documentation.

## Documentation

*   [Backend Microservice Architecture](docs/backend-architecture.md): Detailed explanation of the backend's hexagonal architecture.
*   [Backend Microservice Runbook](docs/backend-runbook.md): Comprehensive guide for setup, testing, maintenance, and support of the backend.

## Prerequisites

Before running the application, ensure you have the following installed:

*   [Docker](https://www.docker.com/get-started)
*   [Docker Compose](https://docs.docker.com/compose/install/)

## How to Run the Entire Project

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd meli-product
    ```

2.  **Build and run the Docker containers:**

    Navigate to the root directory of the project (where `docker-compose.yml` is located) and run:

    ```bash
    docker-compose up --build
    ```

    This command will:
    *   Build the `backend` and `frontend` Docker images.
    *   Start all services defined in `docker-compose.yml` (Traefik, backend, frontend, Prometheus, Grafana).

## Accessing the Applications

Once all services are up and running:

*   **Frontend Application:** Access the product page at `http://localhost`
*   **Traefik Dashboard:** View the Traefik dashboard at `http://localhost:8080/dashboard`
*   **Prometheus Dashboard:** Access Prometheus at `http://localhost:9090`
*   **Grafana Dashboard:** Access Grafana at `http://localhost:3001` (default credentials: `admin`/`admin`)

## Stopping the Applications

To stop all running Docker containers and remove the networks created by `docker-compose`:

```bash
docker-compose down
```
