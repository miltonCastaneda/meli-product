[Volver al README Principal](../README.md)

# Servicio Grafana

Este directorio contiene la configuración para Grafana, una plataforma de código abierto para monitoreo y observabilidad.

## Resumen

Grafana se utiliza para visualizar métricas recolectadas por Prometheus y logs recolectados por Loki, proporcionando dashboards para monitorear la salud y el rendimiento de los servicios de la aplicación.

## Tecnologías Utilizadas

*   **Grafana**: Solución de análisis y monitoreo de código abierto.

## Configuración

*   `provisioning/datasources/datasource.yml`: Configura Prometheus y Loki como fuentes de datos para Grafana.
*   `provisioning/dashboards/dashboard.yml`: Define los dashboards que se cargarán en Grafana.

## Integración con la Arquitectura

*   **Contenerizado**: Grafana se ejecuta como un contenedor Docker.
*   **Docker Compose**: Orquestado por `docker-compose.yml`.
*   **Prometheus**: Se conecta a Prometheus para obtener datos de métricas.
*   **Loki**: Se conecta a Loki para obtener datos de logs.
*   **Endpoint de Acceso**: `http://localhost:3001`
    *   **Lo que encontrarás**: Dashboards de Grafana para visualizar métricas y logs de tu aplicación.
    *   **Credenciales**: `admin`/`admin` (por defecto, cambiar en producción).

## Acceso y Uso del Dashboard de Grafana

El dashboard de Grafana es tu centro de control para visualizar y analizar las métricas y logs de tu aplicación. Aquí te explicamos cómo acceder y realizar consultas básicas.

### Cómo Acceder al Dashboard

Asegúrate de que el servicio Grafana esté en ejecución (usando `docker-compose up -d`). Luego, abre tu navegador web y navega a la siguiente URL:

```
http://localhost:3001
```

Utiliza las credenciales por defecto `admin`/`admin` para iniciar sesión (se recomienda cambiarlas en un entorno de producción).

### Navegar a las Fuentes de Datos (Data Sources)

Para verificar o gestionar las fuentes de datos configuradas:

1.  Una vez logueado en Grafana, haz clic en el icono de **engranaje (Configuration)** en el menú lateral izquierdo.
2.  Selecciona **Data Sources**.
3.  Aquí verás las fuentes de datos `Prometheus` y `Loki` ya configuradas a través de `provisioning/datasources/datasource.yml`. Puedes hacer clic en ellas para ver sus detalles o probar la conexión.

### Realizar Consultas por Nombre de Contenedor (Logs con Loki)

Para consultar logs de un contenedor específico utilizando Loki como fuente de datos:

1.  En el menú lateral izquierdo, haz clic en el icono de **Explore (Explorar)** (parece una brújula).
2.  En la parte superior de la página, selecciona la fuente de datos **Loki** en el desplegable.
3.  En el campo **Log labels**, puedes empezar a escribir para ver las etiquetas disponibles. Para filtrar por nombre de contenedor, puedes usar la etiqueta `container_name`.
4.  Introduce una consulta similar a esta en el campo de consulta (Log labels):

    ```logql
    {container_name="backend"}
    ```
    O para el frontend:
    ```logql
    {container_name="frontend"}
    ```
    Puedes combinar etiquetas y usar operadores de LogQL para refinar tus búsquedas (por ejemplo, `{container_name="backend"} |= "error"` para buscar errores en los logs del backend).

5.  Haz clic en el botón **Run query (Ejecutar consulta)**. Los logs del contenedor especificado aparecerán en la parte inferior de la pantalla.

Esta funcionalidad es extremadamente útil para depurar problemas específicos de un servicio, ya que te permite aislar y analizar sus logs de manera eficiente.

## Consideraciones Profesionales

*   **Dashboards como Código**: La configuración se gestiona como código (archivos `.yml`) para control de versiones y un despliegue más sencillo.
*   **Alertas**: Puede configurarse para enviar alertas basadas en umbrales predefinidos para métricas y logs.
*   **Gestión de Usuarios**: En un entorno de producción, integra con un sistema de autenticación (por ejemplo, LDAP, OAuth) para un acceso seguro de los usuarios.
*   **Persistencia**: Para producción, asegúrate de que los datos de Grafana (dashboards, usuarios, etc.) se persistan fuera del volumen del contenedor.
