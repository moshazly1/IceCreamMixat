import { useState } from "react";
import { CREATE_ORDER } from "../API/API";
import axiosInstance from "../API/axiosInstance";

export default function useCreateOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createOrder = async (
    cartItems,
    branchId = 1,
    currency = "USD",
    exchangeRate = 1,
  ) => {
    const items = cartItems.map((item) => ({
      product_id: item.productId,
      quantity: item.quantity,
      flavor_ids: item.flavor ? [item.flavor.id] : [],
      extra_ids: item.extras ? item.extras.map((extra) => extra.id) : [],
    }));

    const payload = {
      branch_id: branchId,
      currency,
      exchange_rate: exchangeRate,
      items,
    };

    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.post(CREATE_ORDER, payload);

      return response.data;
    } catch (err) {
      setError(err);

      console.error("Error creating order:", err);
      console.error("API Error Response:", err.response?.data);
      console.error("API Error Status:", err.response?.status);
      console.error("API Error Payload:", payload);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createOrder,
    loading,
    error,
  };
}
