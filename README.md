# Aplicación de Producto MELI

Este repositorio alberga una aplicación de demostración que simula una página de producto de Mercado Libre. Su propósito principal es presentar la informacion detallada de un producto consultado, para ello se consume un endpoint REST quien consulta la informacion requerida en un archivo JSON. La lógica del frontend se limita a la consulta y visualización de este detalle. Además, el proyecto integra herramientas robustas como Traefik, Loki, Prometheus y Grafana para garantizar una completa observabilidad, monitoreo y escalabilidad de los servicios.



## Documentación

*   [Arquitectura del Proyecto](docs/architecture.md): Descripción de la arquitectura de infraestructura y observabilidad del proyecto.
*   [Guía de Logs y Troubleshooting por Servicio](docs/guia-de-logs-y-troubleshooting-por-servicio.md): Guía completa para el mantenimiento, soporte y troubleshooting de los servicios.
*   [ Backend](backend/README.md): Resumen, APIs, detalles de integración y guía completa para la configuración, pruebas, mantenimiento y soporte del backend.
*   [ Frontend](frontend/README.md): Instrucciones detalladas para ejecutar y consumir la aplicación frontend.
*   [ Traefik](traefik/README.md): Detalles sobre el API Gateway y balanceador de carga.
*   [ Prometheus](prometheus/README.md): Información sobre la recolección y monitoreo de métricas.
*   [ Grafana](grafana/README.md): Guía para la visualización y creación de dashboards.
*   [ Loki](loki/README.md): Detalles sobre la agregación de logs.
*   [ Promtail](promtail/README.md): Información sobre la recolección y envío de logs.


## Prerrequisitos

Antes de ejecutar la aplicación, asegúrate de tener lo siguiente instalado:

*   [Docker](https://www.docker.com/get-started)
*   [Docker Compose](https://docs.docker.com/compose/install/)

## Cómo Ejecutar el Proyecto Completo

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/miltonCastaneda/meli-product.git
    cd meli-product
    ```

2.  **Construir y ejecutar los contenedores Docker:**

    Navega al directorio raíz del proyecto (donde se encuentra `docker-compose.yml`) y ejecuta:

    ```bash
    docker-compose up --build
    ```

    Este comando:
    *   Construirá las imágenes Docker de `backend` y `frontend`.
    *   Iniciará todos los servicios definidos en `docker-compose.yml` (Traefik, backend, frontend, Prometheus, Grafana).

## Accediendo a las Aplicaciones

Una vez que todos los servicios estén en funcionamiento:

*   **Aplicación Frontend:** Accede a la página del producto en `http://localhost`
    *   **Ruta de Prueba:** `http://localhost/ABC123-Samsung-Galaxy-A55` (ejemplo de página de detalle de producto)
*   **Dashboard de Traefik:** Visualiza el dashboard de Traefik (API Gateway) en `http://localhost:8080/dashboard`
*   **Dashboard de Prometheus:** Accede a Prometheus en `http://localhost:9090`
*   **Dashboard de Grafana:** Accede a Grafana en `http://localhost:3001` (credenciales por defecto: `admin`/`admin`)

## Deteniendo las Aplicaciones

Para detener todos los contenedores Docker en ejecución y eliminar las redes creadas por `docker-compose`:

```bash
docker-compose down
```