# Desafíos y Soluciones en el Proyecto MELI Product

Este documento traza la evolución del proyecto MELI Product, destacando los desafíos clave enfrentados durante su desarrollo y las soluciones implementadas para superarlos, resultando en un sistema de microservicios robusto y observable.

## Fase 1: Concepción y Funcionalidad Central (MVP)

El proyecto MELI Product nació con la visión de simular una página de detalle de producto similar a la de Mercado Libre. El objetivo principal era demostrar la capacidad de exponer un endpoint REST para consumir información detallada de un producto.

*   **Backend Inicial:** Se optó por un microservicio en **Spring Boot (Java)** para desarrollar la API REST que serviría los detalles del producto. La elección de Java y Spring Boot se basó en su robustez, madurez y la amplia disponibilidad de recursos y librerías.
*   **Frontend Básico:** Para la interfaz de usuario, se desarrolló un **frontend en React**, con un enfoque minimalista, limitándose a la consulta y visualización del detalle del producto. La elección de React y Vite sugiere una preferencia por un desarrollo rápido y una experiencia de usuario moderna.
*   **Fuente de Datos Simple:** Para agilizar el prototipado, la información del producto se almacenó inicialmente en un archivo **`data.json`**. Esto permitió un rápido inicio sin la complejidad de una base de datos completa.
*   **Orquestación Inicial:** Un archivo **`docker-compose.yml`** básico se creó para orquestar el despliegue del backend y el frontend, facilitando la ejecución conjunta de ambos servicios en un entorno contenerizado.

### Desafío: Elección del Stack y Curva de Aprendizaje

*   **Reto:** Al iniciar un proyecto desde cero, la elección del stack tecnológico (especialmente para el frontend con React y Tailwind CSS) representó una curva de aprendizaje inicial. Además, la necesidad de generar los "prompts correctos" para guiar el desarrollo sin reprocesos era crucial.
*   **Solución:** Se invirtió tiempo en la investigación y el aprendizaje de las tecnologías seleccionadas. Para el frontend, la combinación de React y Tailwind CSS se eligió por su eficiencia y capacidad de construir interfaces responsivas rápidamente. La claridad en la definición de los requisitos y la iteración constante en el diseño de la API REST del backend ayudaron a minimizar los reprocesos.

## Fase 2: Refinamiento Arquitectónico del Backend

A medida que el proyecto avanzaba, surgió la necesidad de una arquitectura más robusta y mantenible para el backend, anticipando una posible expansión y complejidad.

*   **Adopción de Arquitectura Hexagonal:** Se tomó la decisión de implementar una **Arquitectura Hexagonal (Ports and Adapters)**. Esto se evidencia en la estructura de paquetes (`domain`, `application`, `infrastructure`), buscando aislar la lógica de negocio central de los detalles de infraestructura y tecnología. Esta elección subraya un compromiso con la mantenibilidad, la testabilidad y la flexibilidad para futuras integraciones.
*   **Elección de Spring WebFlux y Netty:** El backend se construyó utilizando **Spring WebFlux** y **Netty** como servidor web embebido. Esta elección reactiva sugiere una previsión para manejar un alto volumen de solicitudes concurrentes de manera eficiente, optimizando el uso de recursos y la escalabilidad.

## Fase 3: Introducción de Infraestructura y Gateway

Con la aplicación central funcionando, se identificó la necesidad de un componente que gestionara el tráfico de manera inteligente y proporcionara funcionalidades de gateway.

*   **Implementación de Traefik:** Se integró **Traefik** como el **API Gateway y balanceador de carga**. Traefik, con su capacidad de descubrimiento automático de servicios a través de etiquetas de Docker, simplificó enormemente el enrutamiento de solicitudes al frontend y al backend. La configuración de middlewares como reintentos y disyuntores (circuit breakers) en Traefik demuestra un enfoque proactivo en la resiliencia del sistema.
*   **Montaje de Volumen para Datos:** El archivo `data.json` se montó como un volumen (`./storage:/app/storage`) en el contenedor del backend. Esto permitió que el archivo de datos fuera externo a la imagen del backend, facilitando su gestión y actualización sin necesidad de reconstruir la imagen del servicio.

### Desafío: Balanceo de Carga y Configuración Dinámica del Gateway

*   **Reto:** ¿Cómo balancear la carga entre múltiples instancias de un servicio cuando se escala? ¿El gateway debe configurarse cada vez que se agrega un nuevo contenedor?
*   **Solución:** La elección de **Traefik** abordó directamente este desafío. Su capacidad de **descubrimiento automático de servicios basado en etiquetas de Docker** eliminó la necesidad de reconfiguraciones manuales cada vez que se escalaba un servicio. Traefik detecta automáticamente los nuevos contenedores y los incluye en su balanceo de carga, garantizando una distribución equitativa del tráfico sin intervención manual.

## Fase 4: Implementación de Observabilidad

Para garantizar la visibilidad sobre el rendimiento y el comportamiento del sistema distribuido, se implementó una pila de observabilidad completa.

*   **Monitoreo con Prometheus y Grafana:**
    *   **Prometheus** se integró para la recolección y almacenamiento de métricas de los servicios (backend a través de Spring Boot Actuator y Traefik). Esto permitió el monitoreo del rendimiento y la salud de los componentes.
    *   **Grafana** se añadió para la visualización de estas métricas, proporcionando dashboards interactivos y la capacidad de crear alertas, ofreciendo una visión unificada del estado del sistema.
*   **Agregación de Logs con Loki y Promtail:**
    *   **Loki** se implementó como un sistema de agregación de logs, optimizado para la rentabilidad al indexar solo metadatos. Esto permitió centralizar los logs de todos los servicios.
    *   **Promtail** se configuró como el agente encargado de recolectar los logs de los contenedores Docker y enviarlos a Loki, completando la cadena de logs.

### Desafío: Visualización y Diagnóstico de Logs en Entornos Escalados

*   **Reto:** Cuando se consultan productos por muchos usuarios simultáneamente y es necesario escalar, ¿cómo visualizar los logs de diferentes contenedores de forma fácil y ágil para diagnosticar problemas?
*   **Solución:** La combinación de **Loki, Promtail y Grafana** fue la respuesta. Promtail recolecta logs de todos los contenedores y los envía a Loki. Luego, Grafana se conecta a Loki como fuente de datos, permitiendo la **visualización centralizada de logs a través de un dashboard**. La capacidad de Grafana para aplicar filtros por nombre de contenedor, etiquetas y contenido de log facilita enormemente el diagnóstico rápido en entornos con múltiples instancias. Esto permite a los equipos de soporte y desarrollo entender qué está sucediendo en el sistema en tiempo real y tomar decisiones informadas para el troubleshooting.

## Fase 5: Documentación y Operacionalización

Con el sistema en funcionamiento y monitoreado, se puso un fuerte énfasis en la documentación para facilitar el mantenimiento, el soporte y la colaboración.

*   **Documentación Detallada:** Se crearon y actualizaron `README.md` específicos para cada servicio (`backend`, `frontend`, `traefik`, `prometheus`, `grafana`, `loki`, `promtail`), detallando su propósito, configuración e integración.
*   **Guías Operacionales:** Se desarrolló una `Guía de Logs y Troubleshooting por Servicio` para proporcionar instrucciones claras sobre cómo diagnosticar y resolver problemas en el entorno de Docker Compose.
*   **Documentación Arquitectónica:** Se creó un documento de `Arquitectura del Proyecto` para ofrecer una visión general de la infraestructura y la observabilidad, incluyendo diagramas explicativos.
*   **Localización:** Toda la documentación clave fue traducida al español para asegurar su accesibilidad a un público más amplio.
*   **Mejoras Continuas:** Se incorporaron consideraciones profesionales en la documentación, como la escalabilidad, la seguridad, la alta disponibilidad y la persistencia de datos, reflejando un enfoque en las mejores prácticas de desarrollo y operaciones.

Este historial refleja un proceso de desarrollo iterativo, donde la funcionalidad central se construyó primero, seguida de mejoras arquitectónicas, la introducción de componentes de infraestructura clave y, finalmente, la implementación de una sólida pila de observabilidad y documentación exhaustiva para garantizar la robustez y facilidad de uso del proyecto MELI Product.
