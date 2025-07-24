# Backend Microservice Runbook

This runbook provides essential information for maintaining, supporting, and developing the backend microservice. It covers setup, testing, code coverage, API documentation, and common operational procedures.

## 1. Project Overview

*   **Name:** MELI Product Microservice
*   **Description:** A Spring Boot application providing product information via a REST API.
*   **Architecture:** Hexagonal Architecture (Ports and Adapters)
*   **Language:** Java 17
*   **Build Tool:** Gradle
*   **Data Source:** `data.json` file (currently, designed for easy migration to other persistence mechanisms)

## 2. Local Development Setup

To set up the backend microservice for local development, follow these steps:

1.  **Prerequisites:**
    *   Java Development Kit (JDK) 17 or higher
    *   Gradle (usually bundled with the project, so `gradlew` command should work)
    *   Git
    *   Your preferred IDE (IntelliJ IDEA, VS Code, etc.)

2.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd meli-product/backend
    ```

3.  **Build the Project:**
    Navigate to the `backend` directory and build the project using Gradle:
    ```bash
    ./gradlew clean build
    ```
    This command compiles the code, runs tests, and packages the application into a JAR file.

4.  **Run the Application:**
    After a successful build, you can run the application:
    ```bash
    java -jar build/libs/backend-0.0.1-SNAPSHOT.jar
    ```
    (Note: The exact JAR name might vary slightly. Check the `build/libs` directory for the correct name.)

    The application will typically start on `http://localhost:8080`.


## 3. Testing

### 3.1. Running Unit and Integration Tests

All tests are configured to run as part of the standard Gradle build process. To execute all tests:

```bash
./gradlew test
```

### 3.2. Checking Code Coverage (JaCoCo)

Code coverage is measured using JaCoCo. A 100% line coverage is enforced for the core business logic.

To generate the HTML coverage report:

```bash
./gradlew jacocoTestReport
```

The report will be generated at: `backend/build/jacocoHtml/index.html`.
Open this file in your web browser to view a detailed breakdown of code coverage.

To verify that the code meets the 100% coverage threshold (this task is also run during `build`):

```bash
./gradlew jacocoTestCoverageVerification
```

If the coverage falls below 100%, this task will fail, indicating areas that need more testing.

## 4. API Documentation (Swagger/OpenAPI)

The microservice API is documented using SpringDoc OpenAPI, providing an interactive Swagger UI.

1.  **Start the Application:** Ensure the backend microservice is running (see Section 2.4).

2.  **Access Swagger UI:** Open your web browser and navigate to:
    ```
    http://localhost:8080/swagger-ui.html
    ```
    Here you can explore the available endpoints, their parameters, and expected responses. You can also make test requests directly from the UI.

3.  **OpenAPI Specification:** The raw OpenAPI JSON specification can be accessed at:
    ```
    http://localhost:8080/v3/api-docs
    ```

## 5. Maintenance and Support

### 5.1. Common Issues and Troubleshooting

*   **Application Fails to Start:**
    *   Check the console logs for error messages. Common issues include port conflicts (another application is using `8080`), missing dependencies, or configuration errors.
    *   Ensure you have JDK 17 installed and configured correctly.
*   **Tests Failing:**
    *   Review the test reports in `backend/build/reports/tests/test/index.html` for detailed failure messages.
    *   Check recent code changes for regressions.
*   **Coverage Not 100%:**
    *   Run `./gradlew jacocoTestReport` and examine the `jacocoHtml/index.html` report to identify uncovered lines.
    *   Write new tests to cover the missing lines.
    *   If certain lines are intentionally untestable (e.g., generated code, unreachable error handling), consider adding JaCoCo exclusions in `build.gradle` (use with caution).

### 5.2. Logging

Application logs are output to the console by default. For production environments, configure a proper logging solution (e.g., ELK stack, Splunk) to centralize and analyze logs.

### 5.3. Monitoring

The microservice includes Spring Boot Actuator and Micrometer with Prometheus integration for basic monitoring.

*   **Actuator Endpoints:** Access various health and metrics endpoints at `http://localhost:8080/actuator`.
*   **Prometheus Metrics:** Metrics are exposed at `http://localhost:8080/actuator/prometheus`. These can be scraped by a Prometheus server.

### 5.4. Dependency Management

Dependencies are managed via `backend/build.gradle`. Regularly update dependencies to address security vulnerabilities and benefit from new features. Use `gradlew dependencies` to inspect the dependency tree.

### 5.5. Deployment

The application is packaged as a self-contained JAR file (`build/libs/backend-0.0.1-SNAPSHOT.jar`). It can be deployed to any environment with a compatible Java Runtime Environment (JRE 17+). For containerized deployments, refer to the `Dockerfile` in the `backend` directory.

## 6. Contributing

For guidelines on contributing to this project, please refer to the main `README.md` and follow the established code style and architectural principles.
