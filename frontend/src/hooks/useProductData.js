import { useState, useEffect } from 'react';
import { fetchProductById } from '../api/productService';

export const useProductData = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return
    };

    const getProductData = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getProductData();
  }, [id]);

  return { product, loading, error };
};
