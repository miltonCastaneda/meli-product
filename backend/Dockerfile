# #############################################################################
# ETAPA 1: CONSTRUCCIÓN (BUILD STAGE)
# Se usa una imagen con el JDK completo y Gradle para compilar el proyecto.
# #############################################################################
FROM eclipse-temurin:17-jdk-jammy AS builder

WORKDIR /app

# Copiar los archivos de build y el wrapper de Gradle
COPY build.gradle settings.gradle gradlew ./
COPY gradle/ gradle/

# Descargar dependencias primero para aprovechar el cache de Docker
# Si los archivos de build no cambian, esta capa no se vuelve a ejecutar.
RUN ./gradlew dependencies

# Copiar el código fuente de la aplicación
COPY src ./src

# Construir el JAR ejecutable
RUN ./gradlew bootJar

# #############################################################################
# ETAPA 2: EJECUCIÓN (RUNTIME STAGE)
# Se usa una imagen ligera solo con el JRE, que es lo único necesario para correr.
# #############################################################################
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Crear un usuario no-root por seguridad
RUN addgroup --system spring && adduser --system --ingroup spring spring
# Crear el directorio de logs y asignar permisos al usuario 'spring'
RUN mkdir -p /app/logs && chown spring:spring /app/logs
USER spring:spring

# Copiar únicamente el JAR construido desde la etapa anterior
ARG JAR_FILE=/app/build/libs/*.jar
COPY --from=builder ${JAR_FILE} app.jar

# Exponer el puerto en el que corre la aplicación
EXPOSE 8080

# Comando para iniciar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]