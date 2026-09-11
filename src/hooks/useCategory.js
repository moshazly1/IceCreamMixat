import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL, GET_CATEGORY } from "../API/API";
import axiosInstance from "../API/axiosInstance";

export default function useCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategory = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`${GET_CATEGORY}`);
        setCategories(response.data.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    getCategory();
  }, []);

  return { categories, loading, error };
}
