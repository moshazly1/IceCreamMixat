import { useEffect, useState } from "react";
import axiosInstance from "../API/axiosInstance";
import { GET_ORDERS_BATCH } from "../API/API";
import useOrderHistory from "./useOrederHistory";

export default function useOrdersBatch() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getOrderIds } = useOrderHistory();

  useEffect(() => {
    const orderIds = getOrderIds();

    if (orderIds.length === 0) {
      setLoading(false);
      return;
    }

    const getOrders = async () => {
      try {
        setLoading(true);
        const idsParam = orderIds.join(",");
        const response = await axiosInstance.get(
          `${GET_ORDERS_BATCH}?ids=${idsParam}`,
        );
        setOrders(response.data.data || response.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching orders batch:", err);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { orders, loading, error };
}
