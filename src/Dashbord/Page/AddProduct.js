import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faGlobe,
  faTags,
  faIceCream,
  faPlus,
  faImage,
  faCloudArrowUp,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import "./AddProduct.css";

import useProductDashbord from "../hooks/useProductDashbord";
import useCategoryDashbord from "../hooks/useCategoryDashbord";

export default function AddProduct() {
  const navigate = useNavigate();

  // =========================
  // PRODUCT HOOK
  // =========================

  const {
    createDashboardProduct,
    getProductItems,
    flavors,
    extras,
    loading: productLoading,
    itemsLoading,
  } = useProductDashbord();

  // =========================
  // CATEGORY HOOK
  // =========================

  const {
    categories,
    getDashboardCategories,
    loading: categoryLoading,
  } = useCategoryDashbord();

  // =========================
  // FORM STATES
  // =========================

  const [nameLanguage, setNameLanguage] = useState("");

  const [name, setName] = useState("");

  const [descriptionLanguage, setDescriptionLanguage] = useState("");

  const [description, setDescription] = useState("");

  const [basePrice, setBasePrice] = useState("");

  const [category, setCategory] = useState("");

  const [available, setAvailable] = useState(true);

  const [offer, setOffer] = useState(true);

  const [offerPercent, setOfferPercent] = useState("");

  const [selectedFlavors, setSelectedFlavors] = useState([]);

  const [selectedExtras, setSelectedExtras] = useState([]);

  const [flavorValue, setFlavorValue] = useState("");

  const [extraValue, setExtraValue] = useState("");

  const [image, setImage] = useState(null);

  // =========================
  // GET CATEGORIES
  // =========================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await getDashboardCategories(1);
      } catch (err) {
        console.error("Categories Fetch Error:", err);
      }
    };

    fetchCategories();
  }, []);

  // =========================
  // GET FLAVORS & EXTRAS
  // =========================

  useEffect(() => {
    const fetchProductItems = async () => {
      try {
        await getProductItems();
      } catch (err) {
        console.error("Product Items Fetch Error:", err);
      }
    };

    fetchProductItems();
  }, []);

  // =========================
  // ADD FLAVOR
  // =========================

  const addFlavor = () => {
    if (!flavorValue) return;

    const selected = flavors.find((item) => item.id === Number(flavorValue));

    if (!selected) return;

    const exists = selectedFlavors.some((item) => item.id === selected.id);

    if (!exists) {
      setSelectedFlavors([...selectedFlavors, selected]);
    }

    setFlavorValue("");
  };

  // =========================
  // REMOVE FLAVOR
  // =========================

  const removeFlavor = (id) => {
    setSelectedFlavors(selectedFlavors.filter((item) => item.id !== id));
  };

  // =========================
  // ADD EXTRA
  // =========================

  const addExtra = () => {
    if (!extraValue) return;

    const selected = extras.find((item) => item.id === Number(extraValue));

    if (!selected) return;

    const exists = selectedExtras.some((item) => item.id === selected.id);

    if (!exists) {
      setSelectedExtras([...selectedExtras, selected]);
    }

    setExtraValue("");
  };

  // =========================
  // REMOVE EXTRA
  // =========================

  const removeExtra = (id) => {
    setSelectedExtras(selectedExtras.filter((item) => item.id !== id));
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // =========================
      // NAME LANGUAGES
      // =========================

      const nameValues = {
        en: "",
        ru: "",
        tr: "",
        pl: "",
        it: "",
      };

      if (
        nameLanguage &&
        Object.prototype.hasOwnProperty.call(nameValues, nameLanguage)
      ) {
        nameValues[nameLanguage] = name;
      }

      // =========================
      // DESCRIPTION LANGUAGES
      // =========================

      const descriptionValues = {
        en: "",
        ru: "",
        tr: "",
        pl: "",
        it: "",
      };

      if (
        descriptionLanguage &&
        Object.prototype.hasOwnProperty.call(
          descriptionValues,
          descriptionLanguage,
        )
      ) {
        descriptionValues[descriptionLanguage] = description;
      }

      // =========================
      // IDS
      // =========================

      const flavorsIds = selectedFlavors.map((item) => item.id);

      const extrasIds = selectedExtras.map((item) => item.id);

      // =========================
      // DEBUG
      // =========================

      // =========================
      // CREATE PRODUCT
      // =========================

      const response = await createDashboardProduct({
        nameEn: nameValues.en,
        nameRu: nameValues.ru,
        nameTr: nameValues.tr,
        namePl: nameValues.pl,
        nameIt: nameValues.it,

        descriptionEn: descriptionValues.en,
        descriptionRu: descriptionValues.ru,
        descriptionTr: descriptionValues.tr,
        descriptionPl: descriptionValues.pl,
        descriptionIt: descriptionValues.it,

        basePrice,

        categoryId: category,

        available,
        offer,

        offerPrecent: offer ? offerPercent : "",

        flavorsIds,

        extrasIds,

        image,
      });

      navigate("/dashboard/products");
    } catch (err) {
      console.error("Create Product Failed:", err);
    }
  };

  const loading = productLoading || categoryLoading || itemsLoading;

  return (
    <div className="add-product-page">
      {/* ================= HEADER ================= */}

      <div className="add-product-header">
        <div className="add-product-header-content">
          <h1>Add Product</h1>

          <p>Create a new product and add it to your menu.</p>
        </div>

        <button
          type="button"
          className="add-product-back-btn"
          onClick={() => navigate("/dashboard/products")}
          aria-label="Back to products"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>

      {/* ================= FORM CARD ================= */}

      <div className="add-product-card">
        <form className="add-product-form" onSubmit={handleSubmit}>
          {/* ================================================= */}
          {/* BASIC INFORMATION */}
          {/* ================================================= */}

          <div className="add-product-section">
            <div className="add-product-section-header">
              <div className="section-number">01</div>

              <div>
                <h2>Basic Information</h2>

                <p>Enter the main information about your product.</p>
              </div>
            </div>

            {/* NAME */}

            <div className="add-product-field">
              <label className="add-product-label">Product Name</label>

              <div className="add-product-language-row">
                <div className="add-product-select-wrap">
                  <FontAwesomeIcon
                    icon={faGlobe}
                    className="add-product-select-icon"
                  />

                  <select
                    value={nameLanguage}
                    onChange={(e) => setNameLanguage(e.target.value)}
                    className="add-product-select"
                    required
                  >
                    <option value="">Select language</option>

                    <option value="en">English</option>

                    <option value="ru">Russian</option>

                    <option value="tr">Turkish</option>

                    <option value="pl">Polish</option>

                    <option value="it">Italian</option>
                  </select>
                </div>

                <span className="add-product-field-hint">Language</span>
              </div>

              <input
                type="text"
                placeholder="Enter product name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="add-product-input"
                required
              />
            </div>

            {/* DESCRIPTION */}

            <div className="add-product-field">
              <label className="add-product-label">Description</label>

              <div className="add-product-language-row">
                <div className="add-product-select-wrap">
                  <FontAwesomeIcon
                    icon={faGlobe}
                    className="add-product-select-icon"
                  />

                  <select
                    value={descriptionLanguage}
                    onChange={(e) => setDescriptionLanguage(e.target.value)}
                    className="add-product-select"
                    required
                  >
                    <option value="">Select language</option>

                    <option value="en">English</option>

                    <option value="ru">Russian</option>

                    <option value="tr">Turkish</option>

                    <option value="pl">Polish</option>

                    <option value="it">Italian</option>
                  </select>
                </div>

                <span className="add-product-field-hint">Language</span>
              </div>

              <textarea
                placeholder="Describe your product..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="add-product-textarea"
              />
            </div>
          </div>

          {/* ================================================= */}
          {/* PRICING & CATEGORY */}
          {/* ================================================= */}

          <div className="add-product-section">
            <div className="add-product-section-header">
              <div className="section-number">02</div>

              <div>
                <h2>Pricing & Category</h2>

                <p>Set the price and product category.</p>
              </div>
            </div>

            <div className="add-product-grid">
              <div className="add-product-field">
                <label className="add-product-label">Base Price</label>

                <div className="price-input-wrap">
                  <span>USD</span>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    className="add-product-input price-input"
                    required
                  />
                </div>
              </div>

              <div className="add-product-field">
                <label className="add-product-label">Category</label>

                <div className="add-product-select-wrap">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="add-product-select category-select"
                    required
                    disabled={categoryLoading}
                  >
                    <option value="">
                      {categoryLoading
                        ? "Loading categories..."
                        : "Select category"}
                    </option>

                    {categories.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name || `Category ${item.id}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================= */}
          {/* AVAILABILITY & OFFER */}
          {/* ================================================= */}

          <div className="add-product-section">
            <div className="add-product-section-header">
              <div className="section-number">03</div>

              <div>
                <h2>Availability & Offer</h2>

                <p>Control availability and discount settings.</p>
              </div>
            </div>

            <div className="add-product-options">
              <label
                className={`add-product-option ${available ? "active" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={available}
                  onChange={(e) => setAvailable(e.target.checked)}
                />

                <span className="custom-check">
                  {available && <FontAwesomeIcon icon={faCheck} />}
                </span>

                <span className="option-content">
                  <strong>Available</strong>

                  <small>Product is currently available</small>
                </span>
              </label>

              <label className={`add-product-option ${offer ? "active" : ""}`}>
                <input
                  type="checkbox"
                  checked={offer}
                  onChange={(e) => {
                    setOffer(e.target.checked);

                    if (!e.target.checked) {
                      setOfferPercent("");
                    }
                  }}
                />

                <span className="custom-check">
                  {offer && <FontAwesomeIcon icon={faCheck} />}
                </span>

                <span className="option-content">
                  <strong>Offer</strong>

                  <small>Add a discount to this product</small>
                </span>
              </label>
            </div>

            {offer && (
              <div className="offer-percent-wrap">
                <label className="add-product-label">Offer Percent</label>

                <div className="percent-input-wrap">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0"
                    value={offerPercent}
                    onChange={(e) => setOfferPercent(e.target.value)}
                    className="add-product-input"
                  />

                  <span>%</span>
                </div>
              </div>
            )}
          </div>

          {/* ================================================= */}
          {/* FLAVORS */}
          {/* ================================================= */}

          <div className="add-product-section">
            <div className="add-product-section-header">
              <div className="section-number">04</div>

              <div>
                <h2>Flavors</h2>

                <p>Select the flavors available for this product.</p>
              </div>
            </div>

            <div className="add-product-selection-row">
              <div className="add-product-select-wrap selection-wrap">
                <FontAwesomeIcon
                  icon={faIceCream}
                  className="add-product-select-icon"
                />

                <select
                  value={flavorValue}
                  onChange={(e) => setFlavorValue(e.target.value)}
                  className="add-product-select"
                  disabled={itemsLoading}
                >
                  <option value="">
                    {itemsLoading ? "Loading flavors..." : "Select flavor"}
                  </option>

                  {flavors.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="add-product-small-btn"
                onClick={addFlavor}
                disabled={itemsLoading}
              >
                <FontAwesomeIcon icon={faPlus} />
                Add
              </button>
            </div>

            <div className="add-product-selected-items">
              {selectedFlavors.map((item) => (
                <div key={item.id} className="add-product-chip">
                  <span>{item.name}</span>

                  <button
                    type="button"
                    onClick={() => removeFlavor(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ================================================= */}
          {/* EXTRAS */}
          {/* ================================================= */}

          <div className="add-product-section">
            <div className="add-product-section-header">
              <div className="section-number">05</div>

              <div>
                <h2>Extras</h2>

                <p>Add optional extras to the product.</p>
              </div>
            </div>

            <div className="add-product-selection-row">
              <div className="add-product-select-wrap selection-wrap">
                <FontAwesomeIcon
                  icon={faTags}
                  className="add-product-select-icon"
                />

                <select
                  value={extraValue}
                  onChange={(e) => setExtraValue(e.target.value)}
                  className="add-product-select"
                  disabled={itemsLoading}
                >
                  <option value="">
                    {itemsLoading ? "Loading extras..." : "Select extra"}
                  </option>

                  {extras.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="add-product-small-btn"
                onClick={addExtra}
                disabled={itemsLoading}
              >
                <FontAwesomeIcon icon={faPlus} />
                Add
              </button>
            </div>

            <div className="add-product-selected-items">
              {selectedExtras.map((item) => (
                <div key={item.id} className="add-product-chip">
                  <span>{item.name}</span>

                  <button
                    type="button"
                    onClick={() => removeExtra(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ================================================= */}
          {/* IMAGE */}
          {/* ================================================= */}

          <div className="add-product-section">
            <div className="add-product-section-header">
              <div className="section-number">06</div>

              <div>
                <h2>Product Image</h2>

                <p>Upload a clear image of the product.</p>
              </div>
            </div>

            <label
              htmlFor="product-image"
              className={`add-product-upload ${image ? "has-file" : ""}`}
            >
              <input
                id="product-image"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />

              <div className="add-product-upload-icon">
                <FontAwesomeIcon icon={image ? faImage : faCloudArrowUp} />
              </div>

              <div className="add-product-upload-content">
                <strong>{image ? image.name : "Upload product image"}</strong>

                <span>
                  {image
                    ? "Image selected successfully"
                    : "Click to browse or choose an image"}
                </span>
              </div>

              <span className="add-product-browse">Browse</span>
            </label>
          </div>

          {/* ================================================= */}
          {/* ACTIONS */}
          {/* ================================================= */}

          <div className="add-product-actions">
            <button
              type="button"
              className="add-product-cancel"
              onClick={() => navigate("/dashboard/products")}
              disabled={productLoading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="add-product-submit"
              disabled={loading}
            >
              {productLoading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
