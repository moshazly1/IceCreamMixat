import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import useCurrency from "../../hooks/useCurrency";

export default function ProductCard({ id, image, price, name }) {
  const navigate = useNavigate();

  const { currency, convertPrice, loading: currencyLoading } = useCurrency();

  return (
    <div className="product-card">
      {/* Product information */}
      <div className="product-data">
        <button
          type="button"
          className="product-add-btn"
          onClick={() => navigate(`/product/${id}`)}
          aria-label={`Add ${name}`}
        >
          <i className="bi bi-plus"></i>
        </button>

        <div className="product-info">
          <p className="product-price">
            {currencyLoading ? "..." : `${convertPrice(price)} ${currency}`}
          </p>

          <p className="product-name">{name}</p>
        </div>
      </div>

      {/* Product image */}
      <div className="product-image-wrapper">
        <img src={image} alt={name} className="product-img" />
      </div>
    </div>
  );
}
