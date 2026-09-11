import { useNavigate } from "react-router-dom";
import useOrdersBatch from "../hooks/useOrdersBatch";
import "./Orders.css";
import useLanguage from "../hooks/useLanguage";
import useCurrency from "../hooks/useCurrency";
import SubBanner from "../components/SubBanner";

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
      {/* Sub Banner */}
      <SubBanner title="myOrders" subtitle="trackOrders" />

      {/* Content */}
      <div className="orders-content">
        {loading && (
          <div className="orders-state">
            <div className="orders-loader"></div>
            <p>{t("loadingOrders")}</p>
          </div>
        )}

        {error && (
          <div className="orders-state error-state">
            <div className="state-icon">
              <i className="bi bi-exclamation-circle"></i>
            </div>

            <h3>{t("somethingWentWrong")}</h3>
            <p>{t("failedToLoadOrders")}</p>
          </div>
        )}

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
                <div className="order-img-box">
                  {order.image ? (
                    <img src={order.image} alt="order" />
                  ) : (
                    <i className="bi bi-cup-straw"></i>
                  )}
                </div>

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
                        : `${convertPrice(order.total_price)} ${currency}`}
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
