import { useEffect, useState } from "react";
import { GET_PRODUCT } from "../API/API";
import axiosInstance from "../API/axiosInstance";

export default function useProduct(categoryId) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryId) return;

    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `${GET_PRODUCT}/${categoryId}/products/`,
        );
        setProducts(response.data.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [categoryId]);

  return { products, loading, error };
}
