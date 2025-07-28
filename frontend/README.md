[Volver al README Principal](../README.md)

# Frontend - Prototipo Página de Producto MercadoLibre

## 1. Visión General
Este frontend es una SPA (Single Page Application) desarrollada en React y Vite, que simula la página de detalle de producto de MercadoLibre. Su objetivo es mostrar información del producto de manera moderna, responsiva y con una experiencia de usuario similar a la de un e-commerce real. Consume los datos necesarios desde un backend vía API REST.

## 2. Arquitectura del Frontend
- **React** para la construcción de interfaces y componentes reutilizables.
- **Vite** como bundler y servidor de desarrollo ultrarrápido.
- **Tailwind CSS** para estilos utilitarios y diseño responsivo.
- **Testing** con Vitest y Testing Library.

Flujo principal:
```
Usuario
   |
   v
Frontend (React + Vite + Tailwind)
   |
   v
API REST Backend (Spring Boot)
```

## 3. Stack Tecnológico
| Componente         | Tecnología Utilizada         |
|--------------------|-----------------------------|
| Framework UI       | React 19.x                  |
| Bundler            | Vite 7.x                    |
| Estilos            | Tailwind CSS 4.x            |
| Testing            | Vitest, Testing Library      |
| Linter             | ESLint                      |
| E2E Testing        | Playwright                  |

## 4. Estructura de Carpetas
```
frontend/
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   │   ├── icons/
│   │   └── layout/
│   ├── features/
│   │   └── product-detail/
│   │       └── components/
│   ├── hooks/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tests/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 5. Requisitos Previos
- Node.js >= 18.x
- npm >= 9.x (o yarn/pnpm)
- (Opcional) Docker para despliegue en producción

## 6. Configuración
- Variables de entorno pueden definirse en `.env` (ejemplo: `VITE_API_BASE_URL` para apuntar al backend).
- El archivo `vite.config.js` ya incluye configuración para React y Tailwind.
- Los assets y favicons están en `public/`.

## 7. Modo de Uso
### Desarrollo local
```sh
npm install
npm run dev
```
Esto levanta el frontend en modo desarrollo en [http://localhost:5173](http://localhost:5173) por defecto.

### Build de producción
```sh
npm run build
```
El resultado se genera en la carpeta `dist/`.

### Previsualización del build
```sh
npm run preview
```

### Linter y pruebas
```sh
npm run lint      # Linting
npm run test      # Unit tests
npm run coverage  # Cobertura de tests
```

## 8. Puntos de Acceso y Rutas
| Ruta                        | Descripción                                 |
|-----------------------------|---------------------------------------------|
| `/`                         | Página principal SPA                        |
| `/[productId]`| Página de detalle de producto               |

## 9. Testing
- Pruebas unitarias con Vitest y Testing Library.
- Pruebas E2E con Playwright (ver carpeta `tests/`).
- Cobertura de tests disponible con `npm run coverage`.

## 10. Notas de Estilo y UX
- El diseño es responsivo y mobile-first.
- Se utilizan componentes reutilizables y composición de layouts.
- El header y los íconos simulan la experiencia de MercadoLibre.

## 11. Despliegue en Producción con Docker y Docker Compose

El frontend está preparado para ser desplegado en producción usando Docker y Docker Compose. El proceso de despliegue genera una imagen optimizada que sirve los archivos estáticos de la aplicación mediante Nginx.

### Pasos para el despliegue
1. Asegúrate de tener Docker y Docker Compose instalados en el servidor de producción.
2. Desde la raíz del proyecto, ejecuta:
   ```sh
   docker-compose up -d --build frontend
   ```
   Esto construirá la imagen del frontend y levantará el contenedor en modo background.
3. El contenedor expone el frontend en el puerto configurado (por defecto, 80 o el que definas en el `docker-compose.yml`).

### Ejemplo de acceso en producción
- Accede a la aplicación desde un navegador en:
  - http://localhost/ (si es local)
  - http://<tu-dominio-o-ip>/ (en producción)

### Ejemplo de consumo de la API desde el frontend
El frontend realiza peticiones al backend para obtener los datos del producto. Ejemplo de endpoint consumido:

```
GET http://localhost/api/items/ABC123-Samsung-Galaxy-A55
```

Respuesta esperada (ejemplo):
```json
{
  "id": "ABC123-Samsung-Galaxy-A55",
  "title": "Samsung Galaxy A55",
  "price": 1200,
  "images": ["https://..."],
  "description": "Smartphone de última generación...",
  ...
}
```

Asegúrate de que la variable de entorno `VITE_API_BASE_URL` apunte correctamente al backend en producción si usas un dominio o IP diferente.

---

### Ejemplo de url que se consume desde el navegador para consultar un producto dado

```
http://localhost/ABC123-Samsung-Galaxy-A55
```



---

Este README cubre todo lo necesario para desarrollar, probar y mantener el frontend del prototipo de página de producto inspirado en MercadoLibre.