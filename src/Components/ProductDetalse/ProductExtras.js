import "./ProductExtras.css";
import useCurrency from "../../hooks/useCurrency";

export default function ProductExtras({
  extras,
  selectedExtras,
  onExtraToggle,
}) {
  const { currency, convertPrice, loading: currencyLoading } = useCurrency();

  return (
    <div className="product-extras">
      {extras?.map((extra) => {
        const isSelected = selectedExtras.includes(extra.id);

        return (
          <div
            key={extra.id}
            className="extra-row"
            onClick={() => onExtraToggle(extra.id)}
          >
            <p className="extra-name">{extra.name}</p>

            <p className="extra-price">
              {currencyLoading
                ? "..."
                : `${convertPrice(extra.price)} ${currency}`}
            </p>

            <div className={`extra-checkbox ${isSelected ? "checked" : ""}`}>
              {isSelected && <i className="bi bi-check"></i>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
