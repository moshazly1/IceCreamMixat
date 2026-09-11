import useLanguage from "../../hooks/useLanguage";
import "./ProductImageFlavors.css";
export default function ProductImageFlavors({
  productImage,
  productName,
  flavors,
  selectedFlavorId,
  onFlavorClick,
  quantity,
  onIncrease,
  onDecrease,
}) {
  const { t } = useLanguage();
  return (
    <div className="image-flavors-wrapper">
      <div className="product-main-img-box">
        <img
          src={productImage}
          alt={productName}
          className="product-main-img"
        />
      </div>

      <div className="flavors-box">
        <p className="flavors-title">{t("flavors")}</p>

        <div className="flavors-list">
          {flavors.map((flavor) => (
            <div
              key={flavor.id}
              className={`flavor-icon ${
                selectedFlavorId === flavor.id ? "selected" : ""
              }`}
              onClick={() => onFlavorClick(flavor.id)}
            >
              <img src={flavor.image} alt={flavor.name} />
            </div>
          ))}
        </div>

        <div className="quantity-counter d-flex align-items-center justify-content-center gap-2">
          <button className="counter-btn" onClick={onDecrease}>
            <i className="bi bi-dash"></i>
          </button>
          <span className="counter-value">{quantity}</span>
          <button className="counter-btn" onClick={onIncrease}>
            <i className="bi bi-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
