import { useState } from "react";
import { GET_DASHBOARD_ORDERS, UPDATE_ORDER_STATUS } from "../../API/API";
import dashboardAxiosInstance from "../../API/dashboardAxiosInstance";

export const ORDER_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  PREPARING: "preparing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export default function useOrderDashboard() {
  const [orders, setOrders] = useState({
    unpaid_orders: [],
    active_orders: [],
    queued_orders: [],
  });

  const [loading, setLoading] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [error, setError] = useState(null);

  // =========================================================
  // GET ORDERS
  // =========================================================
  const getDashboardOrders = async (branchId = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await dashboardAxiosInstance.get(GET_DASHBOARD_ORDERS, {
        params: {
          branch_id: branchId,
        },
      });

      const data = response.data;

      console.log("ORDERS API RESPONSE:", response);
      console.log("ORDERS API DATA:", data);

      const normalizedOrders = {
        unpaid_orders: Array.isArray(data?.unpaid_orders)
          ? data.unpaid_orders
          : [],

        active_orders: Array.isArray(data?.active_orders)
          ? data.active_orders
          : [],

        queued_orders: Array.isArray(data?.queued_orders)
          ? data.queued_orders
          : [],
      };

      setOrders(normalizedOrders);

      console.log("NORMALIZED ORDERS:", normalizedOrders);

      return normalizedOrders;
    } catch (err) {
      console.error("Get dashboard orders error:", err);
      console.error("GET ORDERS ERROR RESPONSE:", err?.response?.data);

      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        "Failed to load orders.";

      setError(errorMessage);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // UPDATE ORDER STATUS
  // PATCH /api/shop/staff/orders/<order_id>/status/
  // =========================================================
  const updateOrderStatus = async (orderId, status) => {
    setUpdatingOrderId(orderId);
    setError(null);

    try {
      const response = await dashboardAxiosInstance.patch(
        `${UPDATE_ORDER_STATUS}${orderId}/status/`,
        {
          status,
        },
      );

      console.log("UPDATE ORDER STATUS RESPONSE:", response.data);

      return response.data;
    } catch (err) {
      console.error("Update order status error:", err);
      console.error("UPDATE ORDER STATUS ERROR:", err?.response?.data);

      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        "Failed to update order status.";

      setError(errorMessage);

      throw err;
    } finally {
      setUpdatingOrderId(null);
    }
  };

  return {
    unpaidOrders: orders.unpaid_orders,
    activeOrders: orders.active_orders,
    queuedOrders: orders.queued_orders,

    loading,
    updatingOrderId,
    error,

    getDashboardOrders,
    updateOrderStatus,
  };
}
