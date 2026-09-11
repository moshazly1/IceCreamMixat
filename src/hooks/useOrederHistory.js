const STORAGE_KEY = "ice_cream_order_ids";

export default function useOrderHistory() {
  const getOrderIds = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Error reading order ids:", err);
      return [];
    }
  };

  const addOrderId = (orderId) => {
    const currentIds = getOrderIds();
    const updatedIds = [...currentIds, orderId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIds));
  };

  return { getOrderIds, addOrderId };
}
