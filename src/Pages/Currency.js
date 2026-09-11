import { useNavigate } from "react-router-dom";
import "./Currency.css";
import useCurrency from "../hooks/useCurrency";
import useLanguage from "../hooks/useLanguage";

export default function Currency() {
  const navigate = useNavigate();

  const { currency, changeCurrency } = useCurrency();
  const { t } = useLanguage();

  const currencies = [
    {
      id: "USD",
      symbol: "$",
      name: "currency_USD",
    },
    {
      id: "EUR",
      symbol: "€",
      name: "currency_EUR",
    },
    {
      id: "EGP",
      symbol: "£",
      name: "currency_EGP",
    },
    {
      id: "GBP",
      symbol: "£",
      name: "currency_GBP",
    },
  ];

  return (
    <div className="currency-page">
      {/* Header */}
      <div className="currency-header">
        <button className="currency-back-btn" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i>
        </button>

        <h1>{t("chooseCurrency")}</h1>
      </div>

      {/* Currency List */}
      <div className="currency-list">
        {currencies.map((item) => (
          <button
            key={item.id}
            className={`currency-item ${currency === item.id ? "active" : ""}`}
            onClick={() => changeCurrency(item.id)}
          >
            <div className="currency-info">
              <div className="currency-icon">{item.symbol}</div>

              <span>{t(item.name)}</span>
            </div>

            {currency === item.id && (
              <i className="bi bi-check-circle-fill currency-selected"></i>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
