# Guía de Logs y Troubleshooting por Servicio

Aquí tienes una guía para el mantenimiento, soporte y troubleshooting de los servicios desplegados con `docker-compose.yml`.

**Comandos Generales de Docker Compose:**

*   **Iniciar todos los servicios:** `docker-compose up -d` (en segundo plano)
*   **Detener todos los servicios:** `docker-compose down`
*   **Reiniciar un servicio específico:** `docker-compose restart <nombre_servicio>`
*   **Ver el estado de los servicios:** `docker-compose ps`
*   **Reconstruir y reiniciar servicios (si hay cambios en Dockerfile):** `docker-compose up -d --build`

---

**Guía de Logs y Troubleshooting por Servicio:**

Para ver los logs de un servicio específico, usa: `docker-compose logs <nombre_servicio>`
Para seguir los logs en tiempo real: `docker-compose logs -f <nombre_servicio>`

---

### 1. `traefik`

*   **Descripción:** Proxy inverso y balanceador de carga.
*   **Comando para logs:** `docker-compose logs traefik`
*   **Qué revisar en caso de errores:**
    *   **Acceso al Dashboard:** Intenta acceder al dashboard de Traefik en `http://localhost:8080`. Si no carga, Traefik podría no estar corriendo correctamente.
    *   **Reglas de enrutamiento:** Verifica los logs de Traefik para ver si hay errores relacionados con la configuración de las reglas (`rule=Host(...)`, `PathPrefix(...)`). Asegúrate de que los labels en `backend` y `frontend` estén correctamente definidos y que Traefik los esté detectando.
    *   **Puertos:** Confirma que el puerto 80 (HTTP) y 8080 (dashboard) no estén en uso por otra aplicación en tu host.

### 2. `backend`

*   **Descripción:** Microservicio de backend (Spring Boot).
*   **Comando para logs:** `docker-compose logs backend`
*   **Qué revisar en caso de errores:**
    *   **Errores de aplicación:** Busca excepciones Java, errores de conexión a la base de datos (aunque no hay una DB explícita aquí, podría haber configuraciones internas), o mensajes de error específicos de tu lógica de negocio.
    *   **Healthcheck:** Traefik está configurado para hacer un healthcheck en `/actuator/health`. Si el backend no responde a este endpoint, Traefik lo marcará como no saludable.
    *   **Puerto:** Asegúrate de que el puerto 8180 en tu host no esté en uso.
    *   **Archivo `data.json`:** Si el backend depende de `data.json`, verifica que el volumen `./storage:/app/storage` esté montado correctamente y que el backend pueda leer el archivo dentro del contenedor en `/app/storage/data.json`.

### 3. `frontend`

*   **Descripción:** Aplicación frontend (React/Vite).
*   **Comando para logs:** `docker-compose logs frontend`
*   **Qué revisar en caso de errores:**
    *   **Errores de compilación/runtime:** Busca errores de JavaScript en los logs, especialmente si la aplicación no carga en el navegador.
    *   **Conexión al backend:** Verifica si el frontend está intentando conectarse al backend en la URL correcta (a través de Traefik, `http://localhost/api/...`). Los errores de red en el navegador (F12 -> Network) pueden dar pistas.
    *   **Puerto:** Asegúrate de que el puerto 80 en tu host no esté en uso por otra aplicación (Traefik ya lo usa, pero si el frontend intentara exponerlo directamente, podría haber conflicto).

### 4. `prometheus`

*   **Descripción:** Sistema de monitoreo y alerta.
*   **Comando para logs:** `docker-compose logs prometheus`
*   **Qué revisar en caso de errores:**
    *   **Acceso a la UI:** Intenta acceder a la UI de Prometheus en `http://localhost:9090`.
    *   **Configuración:** Revisa los logs para ver si hay errores al cargar `prometheus.yml`. Asegúrate de que las configuraciones de `scrape_configs` sean correctas y que Prometheus pueda alcanzar los exporters (en este caso, el backend a través de Traefik o directamente si se configura).
    *   **Targets:** En la UI de Prometheus, ve a "Status" -> "Targets" para ver si el backend está siendo scrapeado correctamente.

### 5. `grafana`

*   **Descripción:** Plataforma de visualización de datos.
*   **Comando para logs:** `docker-compose logs grafana`
*   **Qué revisar en caso de errores:**
    *   **Acceso a la UI:** Intenta acceder a la UI de Grafana en `http://localhost:3001`.
    *   **Configuración de Data Sources/Dashboards:** Revisa los logs para ver si hay errores al cargar los datasources o dashboards desde los volúmenes montados (`./grafana/provisioning/...`).
    *   **Conexión a Prometheus:** Asegúrate de que Grafana pueda conectarse a Prometheus como fuente de datos. Verifica la configuración del datasource en Grafana.

### 6. `loki`

*   **Descripción:** Sistema de agregación de logs.
*   **Comando para logs:** `docker-compose logs loki`
*   **Qué revisar en caso de errores:**
    *   **Acceso a la API:** Loki expone una API en el puerto 3100. Puedes intentar acceder a `http://localhost:3100/ready` para verificar su estado.
    *   **Configuración:** Revisa los logs para ver si hay errores al cargar `local-config.yaml`.
    *   **Volumen de datos:** Asegúrate de que el volumen `./loki-data:/loki` esté montado correctamente y que Loki tenga permisos de escritura.

### 7. `promtail`

*   **Descripción:** Agente para enviar logs a Loki.
*   **Comando para logs:** `docker-compose logs promtail`
*   **Qué revisar en caso de errores:**
    *   **Configuración:** Revisa los logs para ver si hay errores al cargar `promtail-config.yml`.
    *   **Rutas de logs:** Asegúrate de que las rutas configuradas en `promtail-config.yml` para los logs de Docker sean correctas y que Promtail tenga permisos para leerlos (`/var/lib/docker/containers`).
    *   **Conexión a Loki:** Verifica que Promtail pueda enviar logs a Loki (generalmente a `http://loki:3100/loki/api/v1/push` dentro de la red Docker).

---

**Consejos Adicionales de Troubleshooting:**

*   **Redes Docker:** Si los servicios no pueden comunicarse entre sí, verifica la red `meli-network` usando `docker network inspect meli-network`.
*   **Uso de Recursos:** Monitorea el uso de CPU y memoria de tus contenedores con `docker stats`.
*   **Inspeccionar Contenedores:** Para depurar un contenedor en ejecución, puedes usar `docker exec -it <container_id_o_nombre> bash` (o `sh` si `bash` no está disponible) para entrar en el contenedor y revisar archivos o ejecutar comandos.
*   **Limpieza:** Si tienes problemas persistentes, a veces ayuda limpiar los volúmenes y las imágenes de Docker:
    *   `docker-compose down --volumes --rmi all` (¡Cuidado! Esto eliminará todos los datos de los volúmenes y las imágenes creadas por docker-compose).
    *   `docker system prune -a` (¡Cuidado! Esto eliminará todas las imágenes, contenedores, volúmenes y redes no utilizados).