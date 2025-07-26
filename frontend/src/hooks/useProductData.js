import { useState, useEffect } from 'react';
import { fetchProductData } from '../api/productService';

export const useProductData = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const data = await fetchProductData();
        setProduct(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getProductData();
  }, []);

  return { product, loading, error };
};