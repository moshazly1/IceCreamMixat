import "./ProductInfo.css";

export default function ProductInfo({ name, description }) {
  return (
    <div className="product-info-section">
      <h3 className="product-info-name">{name}</h3>
      <p className="product-info-desc">{description}</p>
    </div>
  );
}
