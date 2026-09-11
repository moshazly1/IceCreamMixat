import useLanguage from "../../hooks/useLanguage";
import "./ProductFooter.css";

export default function ProductFooter({ totalPrice, onAddToBasket }) {
  const { t } = useLanguage();

  return (
    <div className="product-footer d-flex align-items-center justify-content-between">
      <span className="footer-price">{totalPrice}</span>

      <button className="add-basket-btn" onClick={onAddToBasket}>
        <i className="bi bi-bag-fill me-2"></i>
        {t("addToBasket")}
      </button>
    </div>
  );
}
