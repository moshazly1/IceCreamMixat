import { useNavigate } from "react-router-dom";
import useOrdersBatch from "../hooks/useOrdersBatch";
import "./Orders.css";
import useLanguage from "../hooks/useLanguage";
import useCurrency from "../hooks/useCurrency";
import Loading from "../Components/common/Loading";

export default function Orders() {
  const navigate = useNavigate();

  const { orders, loading, error } = useOrdersBatch();

  const { currency, convertPrice, loading: currencyLoading } = useCurrency();

  const { t } = useLanguage();

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="orders-page">
      {/* Header */}
      <div className="orders-header">
        <button className="orders-back-btn" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i>
        </button>

        <div className="orders-header-title">
          <h1>{t("myOrders")}</h1>
          <p>{t("trackOrders")}</p>
        </div>
      </div>

      {/* Content */}
      <div className="orders-content">
        {/* Loading */}
        {loading && <Loading text={t("loadingOrders")} />}

        {/* Error */}
        {error && (
          <div className="orders-state error-state">
            <div className="state-icon">
              <i className="bi bi-exclamation-circle"></i>
            </div>

            <h3>{t("somethingWentWrong")}</h3>

            <p>{t("failedToLoadOrders")}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && orders.length === 0 && (
          <div className="orders-state empty-state">
            <div className="state-icon">
              <i className="bi bi-bag-x"></i>
            </div>

            <h3>{t("noOrders")}</h3>

            <p>
              {t("noOrdersText")}
              <br />
              {t("startExploring")}
            </p>

            <button
              className="browse-menu-btn"
              onClick={() => navigate("/menu")}
            >
              {t("browseMenu")}
            </button>
          </div>
        )}

        {/* Orders */}
        {!loading && !error && orders.length > 0 && (
          <div className="orders-list">
            {orders.map((order) => (
              <div
                className="order-card"
                key={order.order_id}
                onClick={() =>
                  navigate("/receipt", {
                    state: { orderId: order.order_id },
                  })
                }
                style={{ cursor: "pointer" }}
              >
                {/* Image */}
                <div className="order-img-box">
                  {order.image ? (
                    <img src={order.image} alt="order" />
                  ) : (
                    <i className="bi bi-cup-straw"></i>
                  )}
                </div>

                {/* Info */}
                <div className="order-info">
                  <div className="order-top">
                    <span className="order-label">
                      {t("orderNumber")} #{order.order_id}
                    </span>

                    <i className="bi bi-chevron-right order-arrow"></i>
                  </div>

                  <p className="order-date">
                    <i className="bi bi-calendar3"></i>
                    {formatDate(order.date)}
                  </p>

                  <div className="order-bottom">
                    <span className="order-status">
                      <span className="status-dot"></span>

                      {order.customer_status || order.order_status}
                    </span>

                    <span className="order-price">
                      {currencyLoading
                        ? "..."
                        : `${convertPrice(order.total_price_base)} ${currency}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
