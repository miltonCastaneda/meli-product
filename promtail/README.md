[Volver al README Principal](../README.md)

# Servicio Promtail

Este directorio contiene la configuración para Promtail, un agente que envía el contenido de los logs locales a una instancia de Loki.

## Resumen

Promtail es responsable de descubrir archivos de log en el sistema anfitrión, adjuntarles etiquetas y enviarlos a Loki para su agregación y almacenamiento.

## Tecnologías Utilizadas

*   **Promtail**: Agente de recolección de logs de Grafana Labs.

## Configuración

*   `promtail-config.yml`: El archivo de configuración principal para Promtail, que define dónde encontrar los archivos de log, cómo analizarlos y qué etiquetas adjuntar.

## Integración con la Arquitectura

*   **Contenerizado**: Promtail se ejecuta como un contenedor Docker.
*   **Docker Compose**: Orquestado por `docker-compose.yml`.
*   **Loki**: Envía los logs recolectados al servicio Loki.
*   **Docker Socket**: Monta el socket de Docker para descubrir logs de otros contenedores.
*   **Endpoint de Acceso**: Promtail no expone un endpoint directo para el usuario.
    *   **Lo que encontrarás**: Promtail opera en segundo plano, recolectando y enviando logs a Loki. Su estado y logs se pueden ver a través de los logs de Docker (`docker logs <id_contenedor_promtail>`).

## Consideraciones Profesionales

*   **Descubrimiento de Logs**: Configura Promtail para descubrir automáticamente los logs de nuevos contenedores o servicios.
*   **Etiquetado**: Utiliza etiquetas significativas para categorizar los logs, facilitando su consulta en Loki y Grafana.
*   **Uso de Recursos**: Monitorea el consumo de recursos de Promtail para asegurar que no afecte el rendimiento de las aplicaciones que está monitoreando.
*   **Manejo de Errores**: Implementa mecanismos robustos de manejo de errores y reintentos para el envío de logs para prevenir la pérdida de datos.
