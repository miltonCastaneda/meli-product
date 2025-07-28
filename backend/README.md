[Volver al README Principal](../README.md)

# Servicio Backend

Este directorio contiene la aplicación backend de Spring Boot responsable de proporcionar información de productos a través de una API REST. Este documento sirve como una guía esencial para el mantenimiento, soporte y desarrollo del microservicio backend, cubriendo su configuración, pruebas, cobertura de código, documentación de API y procedimientos operativos comunes.

## 1. Resumen del Proyecto

*   **Nombre:** Microservicio de Producto MELI
*   **Descripción:** Una aplicación Spring Boot que proporciona información de productos a través de una API REST.
*   **Arquitectura:** Arquitectura Hexagonal (Puertos y Adaptadores), enfatizando la separación de responsabilidades y la capacidad de prueba.
*   **Lenguaje:** Java 17
*   **Herramienta de Construcción:** Gradle
*   **Fuente de Datos:** Archivo `data.json` (actualmente, diseñado para una fácil migración a otros mecanismos de persistencia).

## 2. Tecnologías Utilizadas

*   **Spring Boot**: Framework para construir aplicaciones Spring autónomas y de grado de producción.
*   **Spring WebFlux**: Framework web reactivo para construir aplicaciones no bloqueantes y asíncronas.
*   **Jackson**: Procesador JSON de alto rendimiento para Java.
*   **Project Reactor**: Librería de programación reactiva para construir aplicaciones no bloqueantes.
*   **Swagger/OpenAPI**: Para documentación de API y pruebas interactivas.

## 3. Arquitectura Hexagonal (Ports and Adapters)

El microservicio backend está diseñado siguiendo los principios de la Arquitectura Hexagonal, también conocida como Arquitectura de Puertos y Adaptadores. Este enfoque promueve una clara separación de las preocupaciones, haciendo que la lógica de negocio central (el "Core" o "Dominio") sea independiente de las tecnologías externas y los detalles de implementación.

### 3.1. Estructura del Proyecto

La estructura de paquetes del proyecto refleja directamente las capas de la Arquitectura Hexagonal:

```
backend/src/main/java/com/meli/product/
├── application/  # Capa de Aplicación (Servicios de Aplicación)
├── domain/       # Capa de Dominio (Lógica de Negocio, Entidades, Puertos)
└── infrastructure/ # Capa de Infraestructura (Adaptadores, Configuración)
    ├── adapters/
    │   ├── input/  # Adaptadores de Entrada (Web, REST)
    │   └── output/ # Adaptadores de Salida (Persistencia, Repositorios)
    ├── config/     # Configuración de la aplicación
    └── filters/    # Filtros web (si aplica)
```

### 3.2. Desglose de Capas

#### 3.2.1. Capa de Dominio (`com.meli.product.domain`)

Esta es el "Core" de la aplicación, donde reside la lógica de negocio pura y las reglas de la empresa. Es independiente de cualquier tecnología o framework externo.

*   **Entidades de Dominio:** Clases que representan los conceptos clave del negocio (ej., `Product`, `Characteristic`, `Price`, `Rating`, `Installments`).
*   **Puertos (Interfaces):** Define las interfaces que el Dominio necesita para interactuar con el mundo exterior. Estos puertos son implementados por los adaptadores en la capa de infraestructura.
    *   `ProductRepository`: Puerto para la persistencia de productos.

#### 3.2.2. Capa de Aplicación (`com.meli.product.application`)

Contiene los servicios de aplicación que orquestan la lógica de negocio definida en el Dominio. Estos servicios actúan como una interfaz entre los adaptadores de entrada y el Dominio, traduciendo las solicitudes externas a comandos del Dominio y viceversa.

*   `ProductService`: Contiene la lógica para operaciones de alto nivel, como obtener un producto por ID. Utiliza el puerto `ProductRepository` para interactuar con la persistencia.

#### 3.2.3. Capa de Infraestructura (`com.meli.product.infrastructure`)

Esta capa contiene los adaptadores que permiten que el Dominio interactúe con el mundo exterior (bases de datos, APIs externas, frameworks web, etc.).

*   **Adaptadores de Entrada (`com.meli.product.infrastructure.adapters.input.web`)**: Implementan los puertos de entrada del Dominio. Son los puntos de contacto externos que invocan la lógica de la Capa de Aplicación.
    *   Controladores REST (`ProductController`): Reciben las solicitudes HTTP y las traducen a llamadas a los servicios de aplicación.
*   **Adaptadores de Salida (`com.meli.product.infrastructure.adapters.output.persistence`)**: Implementan los puertos de salida del Dominio. Se encargan de la comunicación con sistemas externos, como bases de datos o servicios de terceros.
    *   `JsonProductRepositoryAdapter`: Implementa el puerto `ProductRepository` utilizando el archivo `data.json` como fuente de datos.
*   **Configuración (`com.meli.product.infrastructure.config`)**: Contiene la configuración específica de la infraestructura, como la configuración de Spring, la inyección de dependencias y la configuración de los adaptadores.

### 3.3. Ejemplo de Flujo de Datos: Obtener Producto por ID

Cuando un cliente solicita el detalle de un producto por su ID (`GET /api/items/{id}`), el flujo de datos sigue este camino a través de las capas:

1.  **Solicitud del Cliente:** El cliente envía una solicitud HTTP al endpoint `/api/items/{id}`.
2.  **Adaptador de Entrada (Web):** El `ProductController` (adaptador de entrada) recibe la solicitud. Valida la entrada y llama al `ProductService` en la Capa de Aplicación.
3.  **Capa de Aplicación:** El `ProductService` recibe la solicitud. Utiliza el puerto `ProductRepository` (definido en el Dominio) para solicitar los datos del producto.
4.  **Puerto de Dominio:** El Dominio define la interfaz `ProductRepository`, que es un contrato para obtener productos.
5.  **Adaptador de Salida (Persistencia):** El `JsonProductRepositoryAdapter` (adaptador de salida) implementa el `ProductRepository`. Este adaptador lee el archivo `data.json` para encontrar el producto solicitado.
6.  **Respuesta del Dominio:** El adaptador de salida devuelve el objeto `Product` (entidad de Dominio) al `ProductService`.
7.  **Capa de Aplicación:** El `ProductService` recibe el objeto `Product` y lo devuelve al `ProductController`.
8.  **Adaptador de Entrada (Web):** El `ProductController` recibe el objeto `Product` y lo transforma en un formato adecuado para la respuesta HTTP (ej., JSON), enviándolo de vuelta al cliente.

Este flujo demuestra cómo la lógica de negocio central (Dominio) permanece aislada y no tiene conocimiento de cómo se obtienen o se presentan los datos, lo que facilita la sustitución de adaptadores sin afectar el core de la aplicación.

## 4. Configuración para Desarrollo Local

Para configurar el microservicio backend para desarrollo local, sigue estos pasos:

1.  **Prerrequisitos:**
    *   Java Development Kit (JDK) 17 o superior
    *   Gradle (generalmente incluido con el proyecto, por lo que el comando `gradlew` debería funcionar)
    *   Git
    *   Tu IDE preferido (IntelliJ IDEA, VS Code, etc.)

2.  **Clonar el Repositorio:**
    ```bash
    git clone <url-del-repositorio>
    cd meli-product/backend
    ```

3.  **Construir el Proyecto:**
    Navega al directorio `backend` y construye el proyecto usando Gradle:
    ```bash
    ./gradlew clean build
    ```
    Este comando compila el código, ejecuta las pruebas y empaqueta la aplicación en un archivo JAR.

4.  **Ejecutar la Aplicación:**
    Después de una construcción exitosa, puedes ejecutar la aplicación:
    ```bash
    java -jar build/libs/backend-0.0.1-SNAPSHOT.jar
    ```
    (Nota: El nombre exacto del JAR puede variar ligeramente. Verifica el directorio `build/libs` para el nombre correcto.)

    La aplicación normalmente se iniciará en `http://localhost:8080`.

## 4. Endpoints de la API

*   **GET `/api/items/{id}`**: Recupera información detallada sobre un producto por su ID único.
    *   **Endpoint de Acceso (vía Traefik)**: `http://localhost/api/items/{id}`
        *   **Lo que encontrarás**: Datos JSON que representan los detalles del producto.
    *   **Endpoint de Acceso Directo (para depuración/pruebas)**: `http://localhost:8180/api/items/{id}`
        *   **Lo que encontrarás**: Datos JSON que representan los detalles del producto. Esto omite Traefik.
    *   **Ejemplo de Respuesta**: Devuelve un objeto JSON que representa el modelo de dominio `Product`, incluyendo detalles anidados como precio, vendedor, envío, calificación, características clave y atributos.

## 5. Pruebas

### 5.1. Ejecución de Pruebas Unitarias y de Integración

Todas las pruebas están configuradas para ejecutarse como parte del proceso de construcción estándar de Gradle. Para ejecutar todas las pruebas:

```bash
./gradlew test
```

### 5.2. Verificación de Cobertura de Código (JaCoCo)

La cobertura de código se mide utilizando JaCoCo. Se exige una cobertura del 100% de las líneas para la lógica de negocio principal.

Para generar el informe HTML de cobertura:

```bash
./gradlew jacocoTestReport
```

El informe se generará en: `backend/build/jacocoHtml/index.html`.
Abre este archivo en tu navegador web para ver un desglose detallado de la cobertura de código.

Para verificar que el código cumple con el umbral de cobertura del 100% (esta tarea también se ejecuta durante `build`):

```bash
./gradlew jacocoTestCoverageVerification
```

Si la cobertura cae por debajo del 100%, esta tarea fallará, indicando áreas que necesitan más pruebas.

## 6. Documentación de la API (Swagger/OpenAPI)

La API del microservicio está documentada utilizando SpringDoc OpenAPI, proporcionando una interfaz de usuario interactiva de Swagger.

1.  **Iniciar la Aplicación:** Asegúrate de que el microservicio backend esté en ejecución (ver Sección 3.4).

2.  **Acceder a la UI de Swagger:** Abre tu navegador web y navega a:
    ```
    http://localhost:8080/swagger-ui.html
    ```
    Aquí puedes explorar los endpoints disponibles, sus parámetros y las respuestas esperadas. También puedes realizar solicitudes de prueba directamente desde la UI.

3.  **Especificación OpenAPI:** La especificación OpenAPI JSON en bruto se puede acceder en:
    ```
    http://localhost:8080/v3/api-docs
    ```

## 8. Mantenimiento y Soporte

### 7.1. Problemas Comunes y Solución de Problemas

*   **La Aplicación no se Inicia:**
    *   Verifica los logs de la consola en busca de mensajes de error. Los problemas comunes incluyen conflictos de puertos (otra aplicación está usando `8080`), dependencias faltantes o errores de configuración.
    *   Asegúrate de tener JDK 17 instalado y configurado correctamente.
*   **Fallo en las Pruebas:**
    *   Revisa los informes de prueba en `backend/build/reports/tests/test/index.html` para obtener mensajes de error detallados.
    *   Verifica los cambios de código recientes en busca de regresiones.
*   **Cobertura no es del 100%:**
    *   Ejecuta `./gradlew jacocoTestReport` y examina el informe `backend/build/jacocoHtml/index.html` para identificar las líneas no cubiertas.
    *   Escribe nuevas pruebas para cubrir las líneas faltantes.
    *   Si ciertas líneas son intencionalmente no testeables (por ejemplo, código generado, manejo de errores inalcanzables), considera agregar exclusiones de JaCoCo en `build.gradle` (úsalo con precaución).

### 7.2. Registro (Logging)

Los logs de la aplicación se muestran en la consola por defecto. Para entornos de producción, configura una solución de registro adecuada (por ejemplo, pila ELK, Splunk) para centralizar y analizar los logs.

### 7.3. Monitoreo

El microservicio incluye Spring Boot Actuator y Micrometer con integración de Prometheus para un monitoreo básico.

*   **Endpoints de Actuator:** Accede a varios endpoints de salud y métricas en `http://localhost:8080/actuator`.
*   **Métricas de Prometheus:** Las métricas se exponen en `http://localhost:8080/actuator/prometheus`. Estas pueden ser recolectadas por un servidor Prometheus.

### 7.4. Gestión de Dependencias

Las dependencias se gestionan a través de `backend/build.gradle`. Actualiza regularmente las dependencias para abordar vulnerabilidades de seguridad y beneficiarte de nuevas características. Usa `gradlew dependencies` para inspeccionar el árbol de dependencias.

### 7.5. Despliegue

La aplicación se empaqueta como un archivo JAR autónomo (`build/libs/backend-0.0.1-SNAPSHOT.jar`). Puede ser desplegada en cualquier entorno con un Java Runtime Environment (JRE 17+) compatible. Para despliegues en contenedores, consulta el `Dockerfile` en el directorio `backend`.

## 9. Integración con la Arquitectura General

*   **Contenerizado**: El backend está contenerizado usando Docker, como se define en `backend/Dockerfile`.
*   **Docker Compose**: Orquestado por `docker-compose.yml`, lo que le permite ejecutarse junto con otros servicios como el frontend, Traefik y herramientas de monitoreo.
*   **Traefik**: Expuesto a través de Traefik como un API Gateway. Traefik enruta las solicitudes de `http://localhost/api` al servicio backend.
*   **Monitoreo**: Integrado con Prometheus para la recolección de métricas (a través de Spring Boot Actuator) y Loki para la agregación de logs.

## 11. Consideraciones Profesionales

*   **Escalabilidad**: Diseñado con un enfoque reactivo (WebFlux) para manejar un gran número de solicitudes concurrentes de manera eficiente.
*   **Observabilidad**: Expone endpoints de Actuator para verificaciones de salud y métricas, que son consumidas por Prometheus.
*   **Mantenibilidad**: La arquitectura hexagonal promueve límites claros y facilita la evolución de la aplicación.
*   **Persistencia de Datos**: Para un entorno de producción, el `JsonProductRepository` sería reemplazado por una integración de base de datos real (por ejemplo, PostgreSQL, MongoDB) y una capa de acceso a datos robusta.

## 11. Contribución

Para obtener pautas sobre cómo contribuir a este proyecto, consulta el `README.md` principal y sigue el estilo de código y los principios arquitectónicos establecidos.
