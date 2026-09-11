import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

import "./OrdersDashboard.css";
import useOrderDashboard from "../hooks/useOrderDashboard";

const BRANCH_ID = 1;

const ORDER_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  PREPARING: "preparing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export default function OrdersDashboard() {
  const {
    unpaidOrders,
    activeOrders,
    queuedOrders,
    loading,
    updatingOrderId,
    error,
    getDashboardOrders,
    updateOrderStatus,
  } = useOrderDashboard();

  const [selectedOrder, setSelectedOrder] = useState(null);

  // =========================================================
  // GET ORDERS
  // =========================================================
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getDashboardOrders(BRANCH_ID);

        const allOrders = [
          ...(data?.unpaid_orders || []),
          ...(data?.active_orders || []),
          ...(data?.queued_orders || []),
        ];

        if (allOrders.length > 0) {
          setSelectedOrder(allOrders[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  // =========================================================
  // CONFIRM PAYMENT
  // pending -> paid
  // =========================================================
  const handleConfirmPayment = async (orderId) => {
    try {
      await updateOrderStatus(orderId, ORDER_STATUS.PAID);

      const data = await getDashboardOrders(BRANCH_ID);

      const nextUnpaidOrder = data?.unpaid_orders?.[0];

      setSelectedOrder(nextUnpaidOrder?.id ?? null);
    } catch (err) {
      console.error("Failed to confirm payment:", err);
    }
  };

  // =========================================================
  // START COOKING
  // paid -> preparing
  // =========================================================
  const handleStartCooking = async (orderId) => {
    try {
      await updateOrderStatus(orderId, ORDER_STATUS.PREPARING);

      await getDashboardOrders(BRANCH_ID);
    } catch (err) {
      console.error("Failed to start cooking:", err);
    }
  };

  // =========================================================
  // COMPLETE ORDER
  // preparing -> completed
  // =========================================================
  const handleDone = async (orderId) => {
    try {
      await updateOrderStatus(orderId, ORDER_STATUS.COMPLETED);

      await getDashboardOrders(BRANCH_ID);
    } catch (err) {
      console.error("Failed to complete order:", err);
    }
  };

  // =========================================================
  // ORDER HELPERS
  // =========================================================
  const getOrderNumber = (order) => order?.daily_order_number ?? order?.id;

  const getTotal = (order) => order?.total_price_customer ?? "0.00";

  const getCurrency = (order) => order?.currency ?? "USD";

  const getTime = (order) => order?.created_time ?? "";

  const getItems = (order) => (Array.isArray(order?.items) ? order.items : []);

  const getItemName = (item) =>
    item?.name ||
    item?.product_name ||
    item?.productName ||
    item?.product?.name ||
    "Product";

  const getItemQuantity = (item) =>
    item?.quantity ?? item?.qty ?? item?.count ?? 1;

  const getItemImage = (item) =>
    item?.image ||
    item?.product_image ||
    item?.productImage ||
    item?.product?.image ||
    "🍿";

  const getItemFlavor = (item) =>
    item?.flavor ||
    item?.flavor_name ||
    item?.flavorName ||
    item?.flavor?.name ||
    "";

  const getItemExtras = (item) => {
    if (Array.isArray(item?.extras)) {
      return item.extras;
    }

    if (Array.isArray(item?.extra)) {
      return item.extra;
    }

    return [];
  };

  // =========================================================
  // CHECK IF IMAGE IS A URL
  // =========================================================
  const isImageUrl = (value) => {
    return (
      typeof value === "string" &&
      (value.startsWith("http://") || value.startsWith("https://"))
    );
  };

  // =========================================================
  // ORDER CARD
  // =========================================================
  const renderOrderCard = (order, index) => {
    const orderId = order?.id;

    const items = getItems(order);

    const firstItem = items.length > 0 ? items[0] : null;

    const flavor = firstItem ? getItemFlavor(firstItem) : "";

    const extras = firstItem ? getItemExtras(firstItem) : [];

    const status =
      typeof order?.status === "string" ? order.status.toLowerCase() : "";

    const isUpdating = updatingOrderId === orderId;

    return (
      <article key={`${orderId}-${index}`} className="dashboard-order-card">
        {/* CARD HEADER */}
        <div className="dashboard-order-card-header">
          <strong>#{getOrderNumber(order)}</strong>

          <span>{getTime(order)}</span>
        </div>

        {/* CARD BODY */}
        <div className="dashboard-order-card-body">
          {items.length > 0 ? (
            items.map((item, itemIndex) => {
              const itemImage = getItemImage(item);

              return (
                <div className="dashboard-order-product" key={itemIndex}>
                  <div className="dashboard-product-image">
                    {isImageUrl(itemImage) ? (
                      <img src={itemImage} alt={getItemName(item)} />
                    ) : (
                      <span>{itemImage}</span>
                    )}
                  </div>

                  <div className="dashboard-product-info">
                    <strong>{getItemName(item)}</strong>

                    <span className="dashboard-product-qty">
                      x{getItemQuantity(item)}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="dashboard-order-product">
              <div className="dashboard-product-image">
                <span>🍿</span>
              </div>

              <div className="dashboard-product-info">
                <strong>Product</strong>

                <span className="dashboard-product-qty">x1</span>
              </div>
            </div>
          )}

          {/* FLAVOR */}
          {flavor && (
            <div className="dashboard-product-detail">
              <strong>Flavor:</strong> {flavor}
            </div>
          )}

          {/* EXTRAS */}
          {extras.length > 0 && (
            <>
              <div className="dashboard-product-detail dashboard-extras-title">
                <strong>Extras</strong>
              </div>

              <div className="dashboard-extra-list">
                {extras.map((extra, extraIndex) => (
                  <span key={extraIndex}>
                    {typeof extra === "object"
                      ? extra?.name || extra?.title || extra?.extra_name || ""
                      : extra}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* TOTAL */}
          <div className="dashboard-total">
            <strong>TOTAL</strong>

            <span>
              {getCurrency(order)} {Number(getTotal(order)).toFixed(2)}
            </span>
          </div>
        </div>

        {/* CARD FOOTER */}
        <div className="dashboard-order-card-footer">
          <div className="dashboard-preparing">
            <span className="preparing-dot" />

            <span>
              {status === ORDER_STATUS.COMPLETED
                ? "Ready for Pickup"
                : status === ORDER_STATUS.PREPARING
                  ? "Being Prepared"
                  : status === ORDER_STATUS.PAID
                    ? "Paid — In Queue"
                    : status === ORDER_STATUS.PENDING
                      ? "Awaiting Counter Payment"
                      : order?.status || "Pending"}
            </span>
          </div>

          <button
            type="button"
            className="dashboard-done-btn"
            disabled={isUpdating}
            onClick={() => handleDone(orderId)}
          >
            <FontAwesomeIcon icon={faCheck} />

            {isUpdating ? "..." : "DONE!"}
          </button>
        </div>
      </article>
    );
  };

  // =========================================================
  // LOADING
  // =========================================================
  if (
    loading &&
    unpaidOrders.length === 0 &&
    activeOrders.length === 0 &&
    queuedOrders.length === 0
  ) {
    return (
      <div className="orders-dashboard-page">
        <div className="orders-dashboard-main">
          <div className="orders-dashboard-heading">
            <h1>ORDERS</h1>

            <div className="orders-dashboard-time">
              {new Date().toLocaleTimeString()}
            </div>
          </div>

          <div
            style={{
              minHeight: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: 600,
              color: "#555",
            }}
          >
            Loading orders...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-dashboard-page">
      {/* =====================================================
          LEFT - UNPAID ORDERS
      ===================================================== */}
      <aside className="orders-dashboard-left">
        <div className="orders-queue-list">
          {unpaidOrders.map((order, index) => {
            const orderId = order?.id;

            const isSelected = selectedOrder === orderId;

            const isUpdating = updatingOrderId === orderId;

            return (
              <button
                key={`${orderId}-${index}`}
                type="button"
                className={`orders-queue-item ${isSelected ? "selected" : ""}`}
                onClick={() => handleConfirmPayment(orderId)}
                disabled={isUpdating}
              >
                <div className="orders-queue-icon">
                  <FontAwesomeIcon icon={faPlus} />
                </div>

                <strong>#{getOrderNumber(order)}</strong>

                <span>
                  {getCurrency(order)} {Number(getTotal(order)).toFixed(2)}
                </span>

                <span className="orders-not-paid">
                  <span />

                  {isUpdating ? "CONFIRMING..." : "NOT PAID"}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* =====================================================
          MAIN - ACTIVE ORDERS
      ===================================================== */}
      <main className="orders-dashboard-main">
        <div className="orders-dashboard-heading">
          <h1>ORDERS</h1>

          <div className="orders-dashboard-time">
            {new Date().toLocaleTimeString()}
          </div>
        </div>

        {error && (
          <div
            style={{
              marginBottom: "15px",
              padding: "12px 15px",
              borderRadius: "6px",
              background: "#fff1f1",
              color: "#e53935",
              fontWeight: 600,
              border: "1px solid #ffcaca",
            }}
          >
            {error}
          </div>
        )}

        <div className="orders-main-grid">
          {activeOrders.length === 0 ? (
            <div
              style={{
                gridColumn: "1 / -1",
                minHeight: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#777",
                fontWeight: 600,
              }}
            >
              No active orders.
            </div>
          ) : (
            activeOrders.map(renderOrderCard)
          )}
        </div>
      </main>

      {/* =====================================================
          RIGHT - QUEUED ORDERS
      ===================================================== */}
      <aside className="orders-dashboard-right">
        {queuedOrders.map((order, index) => {
          const orderId = order?.id;

          const items = getItems(order);

          const isFirst = index === 0;

          const isUpdating = updatingOrderId === orderId;

          return (
            <article
              key={`${orderId}-queued-${index}`}
              className={`cooking-order-card ${isFirst ? "active" : ""}`}
            >
              <div className="cooking-order-header">
                <strong>#{getOrderNumber(order)}</strong>

                <span>{getTime(order)}</span>
              </div>

              {isFirst && (
                <div className="cooking-order-expanded">
                  {items.length > 0 ? (
                    items.map((item, itemIndex) => {
                      const itemImage = getItemImage(item);

                      return (
                        <div className="cooking-product-row" key={itemIndex}>
                          <div className="cooking-product-icon">
                            {isImageUrl(itemImage) ? (
                              <img src={itemImage} alt={getItemName(item)} />
                            ) : (
                              itemImage
                            )}
                          </div>

                          <strong>{getItemName(item)}</strong>

                          <span>x{getItemQuantity(item)}</span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="cooking-product-row">
                      <div className="cooking-product-icon">🍿</div>

                      <strong>Product</strong>

                      <span>x1</span>
                    </div>
                  )}

                  <div className="cooking-order-actions">
                    <span className="paid-status">
                      <span className="paid-dot" />
                      Paid
                    </span>

                    <button
                      type="button"
                      className="start-cooking-btn"
                      disabled={isUpdating}
                      onClick={() => handleStartCooking(orderId)}
                    >
                      <FontAwesomeIcon icon={faPlus} />

                      {isUpdating ? "..." : "Start Cooking"}
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </aside>
    </div>
  );
}
