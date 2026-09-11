import { useState } from "react";
import { GET_DASHBOARD_ANALYTICS } from "../../API/API";
import dashboardAxiosInstance from "../../API/dashboardAxiosInstance";

export default function useAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDashboardAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await dashboardAxiosInstance.get(
        GET_DASHBOARD_ANALYTICS,
      );

      console.log("========== DASHBOARD ANALYTICS RESPONSE ==========");
      console.log("Status:", response.status);
      console.log("Response:", response);
      console.log("Response Data:", response.data);
      console.log(
        "Response Data JSON:",
        JSON.stringify(response.data, null, 2),
      );
      console.log("=================================================");

      const data = response.data?.data ?? response.data;

      setAnalytics(data);

      return data;
    } catch (err) {
      console.error("========== ANALYTICS ERROR ==========");
      console.error("Error:", err);
      console.error("Status:", err?.response?.status);
      console.error("Error Data:", err?.response?.data);
      console.error("====================================");

      setError(err?.response?.data || err?.message || "Something went wrong");

      setAnalytics(null);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    analytics,
    loading,
    error,
    getDashboardAnalytics,
  };
}
