import { useNavigate } from "react-router-dom";
import useOfferSection from "../../hooks/useOfferSection";
import useCart from "../../hooks/useCart";
import "./offer.css";
import useLanguage from "../../hooks/useLanguage";
import useCurrency from "../../hooks/useCurrency";

export default function OfferSectio() {
  const { offers, loading, error } = useOfferSection();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const { currency, convertPrice, loading: currencyLoading } = useCurrency();

  if (loading) {
    return null;
  }

  /*
    404 هنا معناها:
    مفيش Offer حاليًا
  */

  if (error) {
    return null;
  }

  if (!offers) {
    return null;
  }

  const offer = Array.isArray(offers) ? offers[0] : offers;

  if (!offer) {
    return null;
  }

  const handleAddToCart = () => {
    addToCart({
      productId: offer.id,
      productName: offer.name,
      productImage: offer.image,
      basePrice: offer.base_price,
      flavor: null,
      extras: [],
      quantity: 1,
      totalPrice: offer.base_price,
    });

    navigate("/basket");
  };

  return (
    <>
      <div className="offer-banner d-flex align-items-center">
        <div className="offer-icon">
          <i className="bi bi-percent"></i>
        </div>

        <span className="offer-text">
          {offer.offer_precent}% {t("offOffer")}
        </span>
      </div>

      <div className="featured-card d-flex align-items-center">
        <div className="featured-img-wrapper">
          <img src={offer.image} alt={offer.name} className="featured-img" />
        </div>

        <div className="featured-info flex-grow-1">
          <h5 className="featured-title">{offer.name}</h5>

          <p className="featured-desc">{offer.description}</p>

          <p className="featured-price">
            {currencyLoading
              ? "..."
              : `${convertPrice(offer.base_price)} ${currency}`}
          </p>
        </div>

        <button
          className="featured-add-btn"
          onClick={handleAddToCart}
          aria-label="Add offer to cart"
        >
          <i className="bi bi-plus"></i>
        </button>
      </div>
    </>
  );
}
