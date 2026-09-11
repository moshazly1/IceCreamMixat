import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import useOrderDetails from "../hooks/useOrderDetails";
import "./Receipt.css";
import useLanguage from "../hooks/useLanguage";
import useCurrency from "../hooks/useCurrency";

export default function Receipt() {
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useLanguage();
  const { currency, convertPrice, loading: currencyLoading } = useCurrency();

  const orderId = location.state?.orderId;
  const { order, loading, error } = useOrderDetails(orderId);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="receipt-page">
      <Container>
        {loading && (
          <div className="receipt-loading">
            <span>{t("loading")}</span>
          </div>
        )}

        {error && (
          <div className="receipt-error">
            <p>{t("failedToLoadOrder")}</p>

            <button onClick={() => navigate("/menu")}>{t("backToMenu")}</button>
          </div>
        )}

        {!loading && !error && order && (
          <div className="receipt-card">
            {/* Header */}
            <div className="receipt-header">
              <div className="success-icon">
                <i className="bi bi-check-lg"></i>
              </div>

              <h1>{t("orderConfirmed")}</h1>

              <p>{t("orderConfirmedSubtitle")}</p>
            </div>

            {/* Order Information */}
            <div className="receipt-meta">
              <div className="meta-card">
                <div className="meta-icon">
                  <i className="bi bi-calendar3"></i>
                </div>

                <div>
                  <span>{t("orderDate")}</span>
                  <strong>{formatDate(order.date)}</strong>
                </div>
              </div>

              <div className="meta-card">
                <div className="meta-icon">
                  <i className="bi bi-hash"></i>
                </div>

                <div>
                  <span>{t("refNumber")}</span>
                  <strong>{order.reference_code}</strong>
                </div>
              </div>

              <div className="meta-card">
                <div className="meta-icon">
                  <i className="bi bi-clock"></i>
                </div>

                <div>
                  <span>{t("status")}</span>
                  <strong className="status-text">
                    {order.customer_status}
                  </strong>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="receipt-section">
              <div className="section-title">
                <h2>{t("orderItems")}</h2>

                <span>
                  {order.items.length} {t("items")}
                </span>
              </div>

              <div className="receipt-items">
                {order.items.map((item) => (
                  <div className="receipt-item" key={item.id}>
                    <div className="item-img-box">
                      {item.image ? (
                        <img src={item.image} alt={item.product_name} />
                      ) : (
                        <i className="bi bi-cup-straw"></i>
                      )}
                    </div>

                    <div className="item-details">
                      <h3>{item.product_name}</h3>

                      <span>
                        {t("quantity")}: {item.quantity}
                      </span>
                    </div>

                    <div className="item-price">
                      {currencyLoading
                        ? "..."
                        : `${Number(item.item_total_price || 0).toFixed(
                            2,
                          )} ${order.currency}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="receipt-total">
              <div>
                <span>{t("totalAmount")}</span>

                <small>{t("includingAllItems")}</small>
              </div>

              <strong>
                {currencyLoading
                  ? "..."
                  : `${Number(order.total_price_customer || 0).toFixed(
                      2,
                    )} ${order.currency}`}
              </strong>
            </div>

            {/* Order Number */}
            <div className="order-number-badge">
              <i className="bi bi-ticket-perforated-fill"></i>

              <span>
                {t("orderNumber")} #{order.daily_order_number}
              </span>
            </div>

            <p className="thank-you-text">{t("thankYouShopping")} ❤️</p>

            {/* Back */}
            <button
              className="back-btn-circle"
              onClick={() => navigate("/menu")}
            >
              <i className="bi bi-arrow-left"></i>
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}
