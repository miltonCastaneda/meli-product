# Backend Service

This is a Spring Boot application that provides product-related APIs.

## Technologies Used

*   Java 17
*   Spring Boot 3.x
*   Gradle

## How to Run

You can run the application using Gradle:

```bash
./gradlew bootRun
```

Alternatively, you can build a JAR file and run it:

```bash
./gradlew build
java -jar build/libs/meli-product-0.0.1-SNAPSHOT.jar
```

## API Endpoints

The application exposes the following endpoints:


### Get Product by ID

`GET /products/{id}`

Returns a single product by its ID.
