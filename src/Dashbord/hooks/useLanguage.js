import { useState } from "react";
import { GET_LANGUAGES } from "../../API/API";
import axiosInstance from "../../API/axiosInstance";

export default function useLanguage() {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // =========================
  // GET LANGUAGES
  // =========================
  const getLanguages = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("========== LANGUAGES REQUEST ==========");
      console.log("Method:", "GET");
      console.log("URL:", GET_LANGUAGES);

      const response = await axiosInstance.get(GET_LANGUAGES);

      console.log("========== LANGUAGES RESPONSE ==========");
      console.log("Status:", response.status);
      console.log("Response:", response);
      console.log("Response Data:", response.data);
      console.log(
        "Response Data JSON:",
        JSON.stringify(response.data, null, 2),
      );
      console.log("========================================");

      const data = response.data?.data;

      if (Array.isArray(data)) {
        setLanguages(data);
      } else {
        setLanguages([]);
      }

      return response.data;
    } catch (err) {
      console.error("========== LANGUAGES ERROR ==========");
      console.error("Error:", err);
      console.error("Status:", err?.response?.status);
      console.error("Error Data:", err?.response?.data);
      console.error("====================================");

      setError(err?.response?.data || err?.message || "Something went wrong");

      setLanguages([]);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    languages,
    getLanguages,
    loading,
    error,
  };
}
