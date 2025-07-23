# Frontend Application

This is a React.js application that displays product information, simulating a Mercado Libre product page.

## Technologies Used

*   React.js
*   HTML/CSS
*   JavaScript

## How to Run

1.  **Install Dependencies:**

    ```bash
    npm install
    ```

2.  **Start the Development Server:**

    ```bash
    npm start
    ```

    This will start the application in development mode and open it in your default browser (usually at `http://localhost:3000`).

## Features

*   Displays product details (title, price, description, etc.).
*   Fetches product data from a backend API (expects `/api/items/123`).
*   Basic UI simulating a product page.

## API Interaction

The application makes a `GET` request to `/api/items/123` to retrieve product data. Ensure your backend service is running and accessible at this endpoint.
