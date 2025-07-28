[Volver al README Principal](../README.md)

# Servicio Prometheus

Este directorio contiene la configuración para Prometheus, un sistema de monitoreo de código abierto con una base de datos de series de tiempo.

## Resumen

Prometheus se utiliza para recolectar y almacenar métricas de los servicios de la aplicación (por ejemplo, backend, Traefik). Proporciona un potente lenguaje de consulta (PromQL) para analizar estas métricas.

## Tecnologías Utilizadas

*   **Prometheus**: Sistema de monitoreo y base de datos de series de tiempo.

## Configuración

*   `prometheus.yml`: El archivo de configuración principal para Prometheus, que define los objetivos de raspado (de dónde recolectar métricas) y las reglas de alerta.

## Integración con la Arquitectura

*   **Contenerizado**: Prometheus se ejecuta como un contenedor Docker.
*   **Docker Compose**: Orquestado por `docker-compose.yml`.
*   **Backend**: Recolecta métricas de los endpoints Actuator del backend de Spring Boot.
*   **Traefik**: Recolecta métricas de Traefik para obtener información sobre el rendimiento del API Gateway.
*   **Grafana**: Prometheus está configurado como una fuente de datos en Grafana para la visualización.
*   **Endpoint de Acceso**: `http://localhost:9090`
    *   **Lo que encontrarás**: La interfaz de usuario de Prometheus para consultar métricas (usando PromQL), ver objetivos y verificar el estado de tu configuración de monitoreo.

### Cómo Acceder y Navegar el Dashboard de Prometheus

El dashboard de Prometheus es la interfaz principal para interactuar con tu servidor Prometheus, permitiéndote consultar métricas, visualizar datos y verificar el estado de tus objetivos de monitoreo.

1.  **Acceder al Dashboard:**
    Asegúrate de que el servicio Prometheus esté en ejecución (usando `docker-compose up -d`). Luego, abre tu navegador web y navega a la siguiente URL:

    ```
    http://localhost:9090
    ```

2.  **Navegación Básica:**
    Una vez en el dashboard, verás una barra de navegación superior con las siguientes opciones clave:
    *   **Graph (Gráfico):** Es la sección principal para consultar y visualizar métricas. Aquí es donde pasarás la mayor parte del tiempo.
    *   **Alerts (Alertas):** Muestra el estado de las reglas de alerta configuradas.
    *   **Status (Estado):** Contiene subsecciones importantes:
        *   **Targets (Objetivos):** Muestra todos los servicios que Prometheus está intentando "raspar" (scrapear) y su estado actual (UP/DOWN). Es crucial verificar aquí si tus servicios están siendo monitoreados correctamente.
        *   **Configuration (Configuración):** Muestra la configuración actual de Prometheus (`prometheus.yml`).
        *   **Rules (Reglas):** Muestra las reglas de grabación y alerta cargadas.
    *   **Help (Ayuda):** Enlaces a la documentación de Prometheus.

3.  **Extrayendo Métricas de Valor (Usando PromQL):**
    En la pestaña **Graph**, puedes usar PromQL (Prometheus Query Language) para consultar tus métricas.

    *   **Consultas Básicas:**
        *   Para ver todas las métricas disponibles, simplemente escribe `up` y presiona "Execute". Esto te mostrará el estado de tus objetivos de scrapeo.
        *   Para ver las métricas de CPU del backend, puedes intentar con `process_cpu_usage` o `system_cpu_usage` (los nombres exactos pueden variar según la instrumentación de Spring Boot Actuator).
        *   Para métricas de memoria, busca `jvm_memory_used_bytes` o `process_resident_memory_bytes`.

    *   **Filtrado de Métricas:**
        Puedes filtrar métricas por etiquetas. Por ejemplo, para ver el uso de CPU solo del servicio `backend`:
        ```promql
        process_cpu_usage{job="backend"}
        ```
        (El `job` se define en `prometheus.yml` y corresponde al nombre del servicio en Docker Compose).

    *   **Funciones y Operadores:**
        PromQL es muy potente. Puedes usar funciones para agregar, promediar, contar, etc. Por ejemplo, para ver el promedio de uso de CPU del backend en los últimos 5 minutos:
        ```promql
        avg_over_time(process_cpu_usage{job="backend"}[5m])
        ```

    *   **Identificación de Métricas Clave:**
        Las métricas más valiosas para el troubleshooting suelen ser:
        *   **Uso de CPU y Memoria:** Indican problemas de rendimiento o fugas de memoria.
        *   **Latencia de Solicitudes:** Mide el tiempo que tarda el servicio en responder.
        *   **Tasa de Errores:** Muestra la frecuencia de errores en las solicitudes.
        *   **Conteo de Solicitudes:** Indica el volumen de tráfico.
        *   **Estado de Health Checks:** Verifica si el servicio está vivo y respondiendo.

    El dashboard de Prometheus es una herramienta fundamental para la observación directa del rendimiento y la salud de tus servicios. Para análisis más avanzados y dashboards personalizados, se recomienda utilizar Grafana.

## Consideraciones Profesionales

*   **Alertas**: Puede integrarse con Alertmanager para alertas sofisticadas basadas en umbrales de métricas.
*   **Alta Disponibilidad**: Para producción, considera ejecutar Prometheus en una configuración de alta disponibilidad con replicación y federación.
*   **Almacenamiento a Largo Plazo**: Para el almacenamiento de métricas a largo plazo, intégralo con soluciones de almacenamiento remoto (por ejemplo, Thanos, Cortex).
*   **Configuración de Raspado**: Asegúrate de que todos los servicios relevantes y sus instancias estén correctamente configurados como objetivos de raspado.
