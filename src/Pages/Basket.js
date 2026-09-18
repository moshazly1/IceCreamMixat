import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import useCreateOrder from "../hooks/useCreateOrder";
import useOrderHistory from "../hooks/useOrederHistory";
import useLanguage from "../hooks/useLanguage";
import useCurrency from "../hooks/useCurrency";
import PoliciesModal from "../Components/PoliciesModel/PoliciesModal.jsx";

import "./Basket.css";

export default function Basket() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [showRefundPolicy, setShowRefundPolicy] = useState(false);

  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const { createOrder, loading, error } = useCreateOrder();

  const { addOrderId } = useOrderHistory();

  const {
    currency,
    rate,
    convertPrice,
    loading: currencyLoading,
  } = useCurrency();

  // مجموع السلة بالدولار
  const totalAmount = cartItems.reduce(
    (total, item) => total + Number(item.totalPrice),
    0,
  );

  const handlePlaceOrder = async () => {
    try {
      const result = await createOrder(cartItems, 1, currency, rate);

      addOrderId(result.data.order_id);
      clearCart();

      navigate("/receipt", {
        state: { orderId: result.data.order_id },
      });
    } catch (err) {
      alert(t("failedToPlaceOrder"));
    }
  };

  return (
    <div className="basket-page">
      {/* Header */}
      <div className="basket-header">
        <button className="basket-back-btn" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i>
        </button>

        <h1>{t("basket")}</h1>
      </div>

      {/* Refund Policy */}
      <button
        className="refund-policy-btn"
        onClick={() => setShowRefundPolicy(true)}
      >
        <i className="bi bi-info-circle-fill"></i>
        View Refund Policy
      </button>

      {/* Basket Content */}
      <div className="basket-content">
        {cartItems.length === 0 ? (
          <div className="empty-basket">
            <h2>{t("emptyBasket")}</h2>

            <button onClick={() => navigate("/menu")} className="add-items-btn">
              {t("addItems")}
            </button>
          </div>
        ) : (
          <>
            {/* Products */}
            <div className="basket-products">
              {cartItems.map((item) => (
                <div className="basket-product" key={item.cartItemId}>
                  {/* Product Image */}
                  <div className="basket-product-image">
                    <img src={item.productImage} alt={item.productName} />
                  </div>

                  {/* Product Info */}
                  <div className="basket-product-info">
                    <h3>{item.productName}</h3>

                    {/* Flavor */}
                    {item.flavor && (
                      <p className="basket-flavor">{item.flavor.name}</p>
                    )}

                    {/* Extras */}
                    {item.extras?.length > 0 && (
                      <p className="basket-extras">
                        {item.extras.map((extra) => extra.name).join(", ")}
                      </p>
                    )}

                    <p className="basket-price">
                      {currencyLoading
                        ? "..."
                        : `${convertPrice(item.basePrice)} ${currency}`}
                    </p>

                    {/* Quantity */}
                    <div className="quantity-control">
                      <button
                        onClick={() =>
                          updateQuantity(item.cartItemId, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(item.cartItemId, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    className="remove-product"
                    onClick={() => removeFromCart(item.cartItemId)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Payment Summary */}
            <div className="payment-summary">
              <h2>{t("paymentSummary")}</h2>

              {cartItems.map((item) => (
                <div className="summary-row" key={item.cartItemId}>
                  <div>
                    <span>{item.productName}</span>
                    <small>× {item.quantity}</small>
                  </div>

                  <span>
                    {currencyLoading
                      ? "..."
                      : `${convertPrice(item.totalPrice)} ${currency}`}
                  </span>
                </div>
              ))}

              <div className="summary-divider"></div>

              <div className="total-row">
                <span>{t("totalAmount")}</span>

                <strong>
                  {currencyLoading
                    ? "..."
                    : `${convertPrice(totalAmount)} ${currency}`}
                </strong>
              </div>
            </div>

            {error && (
              <p className="text-danger text-center mt-2">
                {t("failedToPlaceOrder")}
              </p>
            )}

            {/* Bottom Buttons */}
            <div className="basket-actions">
              <button
                className="add-items-btn"
                onClick={() => navigate("/menu")}
              >
                {t("addItems")}
              </button>

              <button
                className="place-order-btn"
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading ? t("placingOrder") : t("placeOrder")}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Refund Policy Modal */}
      {showRefundPolicy && (
        <PoliciesModal
          requireAcceptance={false}
          onClose={() => setShowRefundPolicy(false)}
        />
      )}
    </div>
  );
}
