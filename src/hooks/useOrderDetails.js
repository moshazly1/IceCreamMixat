import { useEffect, useState } from "react";
import axiosInstance from "../API/axiosInstance";
import { GET_ORDER_DETAILS } from "../API/API";

export default function useOrderDetails(orderId) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    const getOrder = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `${GET_ORDER_DETAILS}/${orderId}/`,
        );
        setOrder(response.data.data || response.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching order details:", err);
      } finally {
        setLoading(false);
      }
    };

    getOrder();
  }, [orderId]);

  return { order, loading, error };
}
