import { useEffect, useState } from "react";
import { GET_PRODUCT_OPTIONS } from "../API/API";
import axiosInstance from "../API/axiosInstance";
import useLanguage from "./useLanguage";

export default function useProductOptions(productId) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { language } = useLanguage();

  useEffect(() => {
    if (!productId) return;

    const getOptions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get(
          `${GET_PRODUCT_OPTIONS}/${productId}/options/`,
        );

        setOptions(response.data.data || response.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching product options:", err);
      } finally {
        setLoading(false);
      }
    };

    getOptions();
  }, [productId, language]);

  return { options, loading, error };
}
