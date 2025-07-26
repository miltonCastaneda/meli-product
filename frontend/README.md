# Frontend Application

This is a React.js application built with Vite, designed to display detailed product information, simulating a Mercado Libre product page.

## Technologies Used

*   **React.js**: A JavaScript library for building user interfaces.
*   **Vite**: A fast build tool that provides a lightning-fast development experience.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
*   **JavaScript/HTML/CSS**

## Features

*   Displays comprehensive product details (title, price, images, description, seller info, shipping, etc.).
*   Fetches product data dynamically from the backend API.
*   Client-side routing for product detail pages.
*   Responsive UI.

## How to Run

### 1. Local Development

To run the frontend application locally for development:

1.  **Prerequisites**: Ensure you have Node.js (v18 or higher recommended) and npm (or Yarn) installed.

2.  **Navigate to the Frontend Directory**:
    ```bash
    cd frontend
    ```

3.  **Install Dependencies**:
    ```bash
    npm install
    ```

4.  **Configure API Base URL**: Create a `.env` file in the `frontend/` directory with the following content. This tells the frontend where to find the backend API, routing through Traefik.
    ```
    VITE_API_BASE_URL=http://localhost
    ```

5.  **Start the Development Server**:
    ```bash
    npm run dev
    ```
    This will start the application in development mode, typically accessible at `http://localhost:5173` (or another available port). The Vite development server will proxy API requests to `http://localhost/api` which Traefik will then route to your backend.

### 2. Docker Compose Deployment

To deploy the frontend using Docker Compose (recommended for production-like environments):

1.  **Prerequisites**: Ensure you have Docker and Docker Compose installed on your system.

2.  **Configure API Base URL**: Ensure the `.env` file in the `frontend/` directory is configured as described in the local development section (`VITE_API_BASE_URL=http://localhost`). This is crucial for the Dockerized frontend to correctly communicate with the backend via Traefik.

3.  **Navigate to the Project Root Directory** (where `docker-compose.yml` is located):
    ```bash
    cd ..
    ```

4.  **Build the Frontend Docker Image**:
    ```bash
    docker-compose build frontend
    ```
    This command builds the Nginx-based Docker image for the frontend.

5.  **Start the Frontend Service (and its dependencies)**:
    ```bash
    docker-compose up -d frontend
    ```
    This will start the frontend service in detached mode. Traefik (if not already running) will also be started as a dependency. The frontend will be accessible via Traefik at `http://localhost`.

## API Interaction

The frontend application consumes the backend API for product details. It makes `GET` requests to the `/api/items/{id}` endpoint. For example, to fetch details for product ID `MLA123456789`, it will request `http://localhost/api/items/MLA123456789`.

Ensure your backend service is running and properly configured to handle these requests and that Traefik is routing them correctly. The `VITE_API_BASE_URL=http://localhost` setting ensures that API calls are routed through Traefik, which then directs them to the backend service.

## Project Architecture and Professional Considerations

### Frontend Structure

The frontend is structured following a feature-first approach, promoting modularity and maintainability:

*   `src/api/`: Contains service files for interacting with external APIs (e.g., `productService.js`).
*   `src/assets/`: Static assets like images and fonts.
*   `src/components/`: Reusable UI components, categorized by common (`common`), icons (`icons`), and layout (`layout`).
*   `src/features/`: Contains self-contained features, each with its own components and logic (e.g., `product-detail`).
*   `src/hooks/`: Custom React hooks for encapsulating reusable stateful logic (e.g., `useProductData.js`).

### API Consumption

The frontend consumes the following primary API endpoint from the backend microservice:

*   **GET `/api/items/{id}`**: Retrieves detailed information for a specific product by its ID.
    *   **Example Request**: `http://localhost/api/items/MLA123456789`
    *   **Expected Response Structure**: The backend is expected to return a JSON object conforming to the detailed product structure defined in the `Product` domain model (see `backend/src/main/java/com/meli/product/domain/Product.java`). This includes nested objects for `price`, `seller`, `shipping`, `rating`, `key_features`, and `characteristics`.

### Professional Support Considerations

To professionally support and maintain this frontend application in a production environment, consider the following:

*   **Environment Variables Management**: The `VITE_API_BASE_URL` is configured via a `.env` file. For production, ensure a robust system for managing environment variables (e.g., Kubernetes ConfigMaps, Docker Secrets, CI/CD pipeline injection) to avoid hardcoding sensitive information or environment-specific URLs.
*   **Error Handling and Logging**: Implement comprehensive error boundaries in React to gracefully handle UI errors. Integrate with a centralized logging system (e.g., ELK stack, Grafana Loki) to capture frontend errors and user interactions for debugging and monitoring.
*   **Performance Monitoring**: Utilize tools like Google Lighthouse, Web Vitals, or dedicated APM (Application Performance Monitoring) solutions (e.g., New Relic, Datadog) to continuously monitor frontend performance, identify bottlenecks, and ensure a smooth user experience.
*   **Automated Testing**: Expand the existing test suite (currently `tests/example.spec.js`) to include:
    *   **Unit Tests**: For individual components and utility functions (e.g., using Jest, React Testing Library).
    *   **Integration Tests**: To verify the interaction between components and API calls.
    *   **End-to-End (E2E) Tests**: To simulate user flows and ensure critical paths are functional (e.g., using Cypress, Playwright).
*   **CI/CD Pipeline**: Establish a Continuous Integration/Continuous Deployment pipeline to automate:
    *   Code linting and formatting checks.
    *   Automated testing execution.
    *   Docker image building and pushing to a container registry.
    *   Deployment to staging and production environments.
*   **Security Best Practices**: Regularly audit dependencies for vulnerabilities. Implement Content Security Policy (CSP) headers to mitigate XSS attacks. Ensure secure API communication (HTTPS).
*   **Scalability**: While Nginx is efficient for serving static files, consider CDN (Content Delivery Network) integration for global distribution and improved loading times for users geographically distant from the server.
*   **Observability**: Beyond basic logging, ensure metrics (e.g., request rates, error rates, latency) are collected from the Nginx server and the frontend application itself (e.g., using Prometheus exporters or custom metrics) to provide deep insights into its operational health.
*   **Documentation**: Maintain up-to-date documentation for the frontend, including architecture diagrams, deployment procedures, and troubleshooting guides.