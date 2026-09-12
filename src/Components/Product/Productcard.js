import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import useCurrency from "../../hooks/useCurrency";

export default function ProductCard({ id, image, price, name }) {
  const navigate = useNavigate();

  const { currency, convertPrice, loading: currencyLoading } = useCurrency();

  return (
    <div className="product-card d-flex align-items-center justify-content-between">
      <div className="product-data">
        <button
          className="product-add-btn"
          onClick={() => navigate(`/product/${id}`)}
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
      <img src={image} alt={name} className="product-img" />
    </div>
  );
}
