[Volver al README Principal](../README.md)

# Servicio Traefik

Este directorio contiene la configuración para Traefik, un moderno proxy inverso HTTP y balanceador de carga que facilita el despliegue de microservicios.

## Resumen

Traefik actúa como el API Gateway para la aplicación, enrutando las solicitudes entrantes a los servicios correctos (frontend, API backend). Descubre automáticamente los servicios que se ejecutan en Docker y aplica reglas de enrutamiento basadas en las etiquetas definidas en `docker-compose.yml`.

## Tecnologías Utilizadas

*   **Traefik**: Enrutador de Borde y API Gateway.

## Configuración

La configuración de Traefik se define principalmente a través de argumentos de línea de comandos y etiquetas de Docker en el archivo `docker-compose.yml`. Las configuraciones clave incluyen:

*   **Proveedores**: Configurado para usar Docker como proveedor, lo que permite el descubrimiento automático de servicios.
*   **Puntos de Entrada (Entrypoints)**: Define los puertos en los que Traefik escucha (por ejemplo, `web` en el puerto 80).
*   **Enrutadores (Routers)**: Reglas para enrutar las solicitudes entrantes a servicios específicos basadas en nombres de host y prefijos de ruta.
*   **Middlewares**: Aplicados a las solicitudes para características como reintentos y disyuntores (circuit breakers).
*   **Métricas**: Configurado para exponer métricas de Prometheus para monitoreo.

## Integración con la Arquitectura

*   **Contenerizado**: Traefik se ejecuta como un contenedor Docker.
*   **Docker Compose**: Orquestado por `docker-compose.yml`.
*   **Exposición de Frontend y Backend**: Expone la aplicación frontend en `http://localhost` y enruta las llamadas a la API al servicio backend a través del prefijo de ruta `/api`.
*   **Monitoreo**: Expone métricas que son recolectadas por Prometheus.
*   **Endpoint de Acceso (Dashboard)**: `http://localhost:8080/dashboard`
    *   **Lo que encontrarás**: El dashboard de Traefik, que proporciona una visión general visual de tus enrutadores, servicios y middlewares configurados, junto con métricas de tráfico en tiempo real.
*   **Endpoint de Acceso (UI Web)**: `http://localhost`
    *   **Lo que encontrarás**: La aplicación frontend, servida por Traefik.

## Acceso y Verificación del Dashboard de Traefik

El Dashboard de Traefik es una interfaz de usuario web que proporciona una visión en tiempo real del estado de tus servicios, enrutadores y middlewares. Es una herramienta invaluable para el monitoreo y la depuración.

### Cómo Acceder al Dashboard

Asegúrate de que el servicio Traefik esté en ejecución (usando `docker-compose up -d`). Luego, abre tu navegador web y navega a la siguiente URL:

```
http://localhost:8080/dashboard
```

### Qué Verificar en el Dashboard

Una vez en el dashboard, puedes revisar las siguientes secciones para verificar la configuración y el estado de Traefik:

*   **Routers (Enrutadores):**
    *   Verifica que todos los enrutadores esperados (por ejemplo, para `backend` y `frontend`) estén listados y en estado "OK".
    *   Haz clic en cada enrutador para ver sus reglas (`Rule`), puntos de entrada (`Entrypoints`) y servicios asociados (`Service`). Asegúrate de que las reglas de enrutamiento (`Host`, `PathPrefix`) coincidan con lo esperado.
*   **Services (Servicios):**
    *   Confirma que los servicios `backend` y `frontend` estén detectados y en estado "OK".
    *   Revisa los detalles de cada servicio, incluyendo los servidores (`Servers`) y el estado de sus health checks. Si un servicio no está saludable, Traefik lo indicará aquí.
*   **Middlewares:**
    *   Verifica que los middlewares configurados en `docker-compose.yml` (como `resilience-middlewares`, `retry-policy`, `circuit-breaker`) estén presentes y correctamente aplicados a los enrutadores.
    *   Puedes inspeccionar la configuración de cada middleware para asegurarte de que los parámetros (ej., `attempts` para `retry`, `expression` para `circuitbreaker`) sean correctos.
*   **Entrypoints (Puntos de Entrada):**
    *   Asegúrate de que los puntos de entrada (`web` en el puerto 80) estén escuchando correctamente.
*   **HTTP/TCP:**
    *   El dashboard te permite alternar entre la configuración HTTP y TCP. Para esta aplicación, la configuración principal estará bajo HTTP.

El dashboard es una herramienta poderosa para diagnosticar problemas de enrutamiento, verificar la salud de los servicios y entender cómo Traefik está manejando el tráfico.

## Consideraciones Profesionales

*   **Configuración Dinámica**: La capacidad de Traefik para configurar dinámicamente el enrutamiento basado en etiquetas de Docker simplifica el despliegue y la gestión de servicios.
*   **Balanceo de Carga**: Proporciona balanceo de carga incorporado entre múltiples instancias de un servicio.
*   **Seguridad**: Puede configurarse para terminación SSL/TLS, autenticación y otras características de seguridad.
*   **Observabilidad**: Las métricas enriquecidas y un dashboard fácil de usar proporcionan una excelente visibilidad del flujo de tráfico y la salud del servicio.
*   **Alta Disponibilidad**: Puede desplegarse en una configuración de alta disponibilidad para entornos de producción.
