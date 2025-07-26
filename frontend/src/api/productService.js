const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'; // Configure this in your .env file (e.g., VITE_API_BASE_URL=http://localhost:8080)

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/items/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};