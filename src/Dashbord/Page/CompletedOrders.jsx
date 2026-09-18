import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faCircleInfo,
  faXmark,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import "./CompletedOrders.css";
import useCompletedOrder from "../hooks/useCompletedOrders";

const ORDERS_PER_PAGE = 8;

export default function CompletedOrders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // =========================================================
  // GET DASHBOARD USER
  // =========================================================

  const dashboardUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("dashboard_user") || "{}");
    } catch {
      return {};
    }
  }, []);

  const branchId = dashboardUser?.branch_id;

  // =========================================================
  // GET COMPLETED ORDERS
  // =========================================================

  const { completedOrders, loading, error } = useCompletedOrder(branchId);

  // =========================================================
  // GET ORDERS FROM API RESPONSE
  // =========================================================

  const orders = useMemo(() => {
    if (Array.isArray(completedOrders?.completed_orders)) {
      return completedOrders.completed_orders;
    }

    return [];
  }, [completedOrders]);

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;

    return orders.slice(startIndex, startIndex + ORDERS_PER_PAGE);
  }, [orders, currentPage]);

  // =========================================================
  // ORDER ID
  // =========================================================

  const getOrderId = (order) => {
    return order?.id ?? "-";
  };

  // =========================================================
  // REFERENCE NUMBER
  // =========================================================

  const getReferenceNumber = (order) => {
    return order?.reference_code ?? "-";
  };

  // =========================================================
  // TOTAL PRICE
  // =========================================================

  const getTotalPrice = (order) => {
    const price = order?.total_price_customer;

    const currency = order?.currency;

    if (price === undefined || price === null) {
      return "-";
    }

    return `${price} ${currency ?? ""}`.trim();
  };

  // =========================================================
  // DATE
  // =========================================================

  const getOrderDate = (order) => {
    const reference = order?.reference_code;

    if (!reference) {
      return "-";
    }

    // Example:
    // ORD-20260918-715348

    const match = reference.match(/ORD-(\d{4})(\d{2})(\d{2})-/);

    if (!match) {
      return "-";
    }

    const [, year, month, day] = match;

    return `${year}/${month}/${day}`;
  };

  // =========================================================
  // ITEMS
  // =========================================================

  const getItems = (order) => {
    if (Array.isArray(order?.items)) {
      return order.items;
    }

    return [];
  };

  // =========================================================
  // PRODUCT NAME
  // =========================================================

  const getProductName = (item) => {
    return (
      item?.product_name ??
      item?.productName ??
      item?.product?.name ??
      item?.product?.title ??
      item?.name ??
      item?.title ??
      "Product"
    );
  };

  // =========================================================
  // QUANTITY
  // =========================================================

  const getQuantity = (item) => {
    return item?.quantity ?? item?.qty ?? item?.count ?? 1;
  };

  // =========================================================
  // FLAVOR
  // =========================================================

  const getFlavor = (item) => {
    return item?.flavor_name ?? item?.flavorName ?? item?.flavor?.name ?? null;
  };

  // =========================================================
  // EXTRAS
  // =========================================================

  const getExtras = (item) => {
    if (Array.isArray(item?.extras)) {
      return item.extras;
    }

    if (Array.isArray(item?.extra)) {
      return item.extra;
    }

    return [];
  };

  // =========================================================
  // EXTRA NAME
  // =========================================================

  const getExtraName = (extra) => {
    if (typeof extra === "string") {
      return extra;
    }

    return (
      extra?.name ??
      extra?.extra_name ??
      extra?.extraName ??
      extra?.title ??
      "Extra"
    );
  };

  // =========================================================
  // OPEN ORDER DETAILS
  // =========================================================

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  // =========================================================
  // CLOSE ORDER DETAILS
  // =========================================================

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  // =========================================================
  // CHANGE PAGE
  // =========================================================

  const changePage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="completed-orders-page">
      <div className="completed-orders-card">
        {/* =====================================================
            TITLE
        ===================================================== */}

        <div className="completed-orders-title">Completed Orders</div>

        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading && (
          <div className="completed-orders-state">
            Loading completed orders...
          </div>
        )}

        {/* =====================================================
            ERROR
        ===================================================== */}

        {!loading && error && (
          <div className="completed-orders-state error">{error}</div>
        )}

        {/* =====================================================
            EMPTY
        ===================================================== */}

        {!loading && !error && orders.length === 0 && (
          <div className="completed-orders-state">
            No completed orders found.
          </div>
        )}

        {/* =====================================================
            TABLE
        ===================================================== */}

        {!loading && !error && orders.length > 0 && (
          <>
            <div className="completed-orders-table-wrapper">
              <table className="completed-orders-table">
                <thead>
                  <tr>
                    <th>Reference Number</th>

                    <th>ID</th>

                    <th>Total Price</th>

                    <th>Date</th>

                    <th>Tools</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedOrders.map((order, index) => (
                    <tr
                      key={
                        getOrderId(order) !== "-" ? getOrderId(order) : index
                      }
                    >
                      {/* Reference Number */}
                      <td>{getReferenceNumber(order)}</td>

                      {/* ID */}
                      <td>#{getOrderId(order)}</td>

                      {/* Total Price */}
                      <td>{getTotalPrice(order)}</td>

                      {/* Date */}
                      <td>{getOrderDate(order)}</td>

                      {/* Tools */}
                      <td>
                        <button
                          type="button"
                          className="completed-orders-view-btn"
                          onClick={() => openOrderDetails(order)}
                          aria-label="View order"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* =================================================
                  PAGINATION
              ================================================= */}

            {totalPages > 1 && (
              <div className="completed-orders-pagination">
                <button
                  type="button"
                  className="pagination-arrow"
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>

                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    type="button"
                    key={page}
                    className={`pagination-number ${
                      currentPage === page ? "active" : ""
                    }`}
                    onClick={() => changePage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  className="pagination-arrow"
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* =========================================================
          ORDER INFORMATION MODAL
      ========================================================= */}

      {selectedOrder && (
        <div
          className="completed-order-modal-overlay"
          onMouseDown={closeOrderDetails}
        >
          <div
            className="completed-order-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            {/* ===================================================
                MODAL HEADER
            =================================================== */}

            <div className="completed-order-modal-header">
              <div className="completed-order-modal-title">
                <span className="completed-order-info-icon">
                  <FontAwesomeIcon icon={faCircleInfo} />
                </span>

                <span>Order Information</span>
              </div>

              <button
                type="button"
                className="completed-order-close-icon"
                onClick={closeOrderDetails}
                aria-label="Close"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            {/* ===================================================
                MODAL CONTENT
            =================================================== */}

            <div className="completed-order-modal-content">
              {getItems(selectedOrder).length === 0 ? (
                <div className="completed-order-no-items">
                  No order items found.
                </div>
              ) : (
                getItems(selectedOrder).map((item, index) => {
                  const flavor = getFlavor(item);

                  const extras = getExtras(item);

                  return (
                    <div className="completed-order-item" key={index}>
                      <div className="completed-order-item-top">
                        <div className="completed-order-product-image">
                          {item?.product?.image ||
                          item?.image ||
                          item?.product_image ||
                          item?.productImage ? (
                            <img
                              src={
                                item?.product?.image ??
                                item?.image ??
                                item?.product_image ??
                                item?.productImage
                              }
                              alt={getProductName(item)}
                            />
                          ) : (
                            <div className="completed-order-product-placeholder">
                              🍿
                            </div>
                          )}
                        </div>

                        <div className="completed-order-product-name">
                          {getProductName(item)}
                        </div>

                        <div className="completed-order-product-quantity">
                          x{getQuantity(item)}
                        </div>
                      </div>

                      {/* Flavor */}

                      {flavor && (
                        <div className="completed-order-flavor">
                          <strong>Flavor:</strong> {flavor}
                        </div>
                      )}

                      {/* Extras */}

                      <div className="completed-order-extras-title">Extras</div>

                      {extras.length > 0 ? (
                        <div className="completed-order-extras">
                          {extras.map((extra, extraIndex) => (
                            <span
                              className="completed-order-extra"
                              key={extraIndex}
                            >
                              {getExtraName(extra)}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="completed-order-no-extras">
                          No extras
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* ===================================================
                MODAL FOOTER
            =================================================== */}

            <div className="completed-order-modal-footer">
              <button
                type="button"
                className="completed-order-close-btn"
                onClick={closeOrderDetails}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
