import { useCallback, useState } from "react";
import { PRODUCT_SEARCH } from "../API/API";
import axiosInstance from "../API/axiosInstance";

export default function useProductSearch() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchProducts = useCallback(async (query) => {
    if (!query.trim()) {
      setProducts([]);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get(
        `${PRODUCT_SEARCH}?q=${encodeURIComponent(query)}`,
      );

      setProducts(response.data.data);
    } catch (err) {
      setError(err);
      console.error("Error searching products:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setProducts([]);
    setError(null);
    setLoading(false);
  }, []);

  return {
    products,
    loading,
    error,
    searchProducts,
    clearSearch,
  };
}
