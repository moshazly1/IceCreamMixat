import { useState } from "react";
import dashboardAxiosInstance from "../../API/dashboardAxiosInstance";
import { LOGIN } from "../../API/API";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const payload = {
        email,
        password,
      };

      const response = await dashboardAxiosInstance.post(LOGIN, payload);

      console.log("========== LOGIN RESPONSE ==========");
      console.log("Status:", response.status);
      console.log("Response Data:", response.data);
      console.log("====================================");

      return response.data;
    } catch (err) {
      console.error("========== LOGIN ERROR ==========");
      console.error("Status:", err?.response?.status);
      console.error("Error Data:", err?.response?.data);
      console.error("=================================");

      setError(err?.response?.data || err?.message || "Login failed");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
}
