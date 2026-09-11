import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetailsHeader from "../Components/ProductDetalse/DetalseHeader";
import ProductImageFlavors from "../Components/ProductDetalse/ProductImageFlavors";
import ProductExtras from "../Components/ProductDetalse/ProductExtras";
import ProductInfo from "../Components/ProductDetalse/ProductInfo";
import ProductFooter from "../Components/ProductDetalse/ProductFooter";
import useProductOptions from "../hooks/useProductDetalse";
import useCart from "../hooks/useCart";
import useLanguage from "../hooks/useLanguage";
import useCurrency from "../hooks/useCurrency";
import "./ProductDetails.css";
export default function ProductDetalse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { options, loading, error } = useProductOptions(id);
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const [selectedFlavorId, setSelectedFlavorId] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const { currency, convertPrice, loading: currencyLoading } = useCurrency();

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleExtraToggle = (extraId) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId],
    );
  };

  const calculateTotalPrice = () => {
    if (!options) return "0.00";

    let total = parseFloat(options.base_price);

    if (selectedFlavorId) {
      const selectedFlavor = options.flavors.find(
        (f) => f.id === selectedFlavorId,
      );

      if (selectedFlavor) {
        total += parseFloat(selectedFlavor.extra_price);
      }
    }

    selectedExtras.forEach((extraId) => {
      const extra = options.extras.find((e) => e.id === extraId);

      if (extra) {
        total += parseFloat(extra.price);
      }
    });

    total *= quantity;

    return total.toFixed(2);
  };

  const handleAddToBasket = () => {
    const selectedFlavor = options.flavors.find(
      (f) => f.id === selectedFlavorId,
    );

    const selectedExtrasData = options.extras.filter((e) =>
      selectedExtras.includes(e.id),
    );

    addToCart({
      productId: options.id,
      productName: options.name,
      productImage: options.image,
      basePrice: options.base_price,
      flavor: selectedFlavor || null,
      extras: selectedExtrasData,
      quantity,
      totalPrice: calculateTotalPrice(),
    });

    navigate("/menu");
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="product-details-page">
      <DetailsHeader />

      {loading && <p>{t("loading")}</p>}

      {error && <p>{t("failedToLoadOptions")}</p>}

      {!loading && !error && options && (
        <>
          <ProductImageFlavors
            productImage={options.image}
            productName={options.name}
            flavors={options.flavors}
            selectedFlavorId={selectedFlavorId}
            onFlavorClick={setSelectedFlavorId}
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />

          <ProductExtras
            extras={options.extras}
            selectedExtras={selectedExtras}
            onExtraToggle={handleExtraToggle}
          />

          <ProductInfo name={options.name} description={options.description} />

          <ProductFooter
            totalPrice={
              currencyLoading
                ? "..."
                : `${convertPrice(totalPrice)} ${currency}`
            }
            onAddToBasket={handleAddToBasket}
          />
        </>
      )}
    </div>
  );
}
