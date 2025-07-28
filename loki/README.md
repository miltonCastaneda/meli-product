[Volver al README Principal](../README.md)

# Servicio Loki

Este directorio contiene la configuración para Loki, un sistema de agregación de logs escalable horizontalmente, de alta disponibilidad y multi-inquilino, inspirado en Prometheus.

## Resumen

Loki está diseñado para almacenar y consultar logs de todos los servicios en la aplicación. Está optimizado para la rentabilidad y la simplicidad, indexando solo metadatos (etiquetas) en lugar del contenido completo del log.

## Tecnologías Utilizadas

*   **Loki**: Sistema de agregación de logs de Grafana Labs.

## Configuración

*   `local-config.yaml`: El archivo de configuración principal para Loki, que define su almacenamiento, ingester y configuraciones de querier.

## Integración con la Arquitectura

*   **Contenerizado**: Loki se ejecuta como un contenedor Docker.
*   **Docker Compose**: Orquestado por `docker-compose.yml`.
*   **Promtail**: Los logs son enviados a Loki por los agentes de Promtail que se ejecutan junto a los servicios de la aplicación.
*   **Grafana**: Loki está configurado como una fuente de datos en Grafana, permitiendo a los usuarios consultar y visualizar logs. Para aprender a consultar logs por nombre de contenedor en Grafana, consulta la sección ["Acceso y Uso del Dashboard de Grafana"](../grafana/README.md#acceso-y-uso-del-dashboard-de-grafana) en el README de Grafana.
*   **Endpoint de Acceso**: `http://localhost:3100`
    *   **Lo que encontrarás**: La API HTTP de Loki para la ingesta y consulta de logs. Típicamente accedida por Promtail y Grafana, no directamente por los usuarios.

## Consideraciones Profesionales

*   **Escalabilidad**: Loki está diseñado para la escalabilidad horizontal, lo que lo hace adecuado para la agregación de logs a gran escala.
*   **Rentabilidad**: Al indexar solo etiquetas, Loki ofrece una solución más rentable para el almacenamiento de logs en comparación con los sistemas de indexación de texto completo.
*   **Persistencia**: Para producción, asegúrate de que los datos de Loki se persistan en una solución de almacenamiento duradera (por ejemplo, S3, GCS) para evitar la pérdida de datos en caso de reinicios o fallos del contenedor.
*   **Políticas de Retención**: Implementa políticas de retención de logs adecuadas para gestionar los costos de almacenamiento y los requisitos de cumplimiento.
