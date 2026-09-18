import { useCallback, useEffect, useState } from "react";

import { GET_COMPLETED_ORDERS } from "../../API/API";
import dashboardAxiosInstance from "../../API/dashboardAxiosInstance";

const useCompletedOrder = (branchId) => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCompletedOrders = useCallback(async () => {
    console.log("========== GET COMPLETED ORDERS ==========");
    console.log("Branch ID:", branchId);
    console.log("Endpoint:", GET_COMPLETED_ORDERS);

    if (!branchId) {
      console.log("❌ No Branch ID!");
      setCompletedOrders([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await dashboardAxiosInstance.get(GET_COMPLETED_ORDERS, {
        params: {
          branch_id: branchId,
        },
      });

      console.log("✅ API RESPONSE:", response);
      console.log("✅ API DATA:", response.data);
      console.log("✅ DATA IS ARRAY:", Array.isArray(response.data));

      setCompletedOrders(response.data);
    } catch (err) {
      console.error("❌ COMPLETED ORDERS ERROR:", err);
      console.error("❌ ERROR RESPONSE:", err.response);
      console.error("❌ ERROR DATA:", err.response?.data);

      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Failed to load completed orders.",
      );
    } finally {
      setLoading(false);

      console.log("========== GET COMPLETED ORDERS FINISHED ==========");
    }
  }, [branchId]);

  useEffect(() => {
    getCompletedOrders();
  }, [getCompletedOrders]);

  return {
    completedOrders,
    loading,
    error,
    getCompletedOrders,
  };
};

export default useCompletedOrder;
