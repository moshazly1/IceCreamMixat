import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  // =========================
  // PRODUCT HOOK
  // =========================

  const {
    product,
    flavors,
    extras,
    getDashboardProduct,
    getProductItems,
    editDashboardProduct,
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

  const [nameLanguage, setNameLanguage] = useState("en");
  const [name, setName] = useState("");

  const [descriptionLanguage, setDescriptionLanguage] = useState("en");
  const [description, setDescription] = useState("");

  const [basePrice, setBasePrice] = useState("");
  const [category, setCategory] = useState("");

  const [available, setAvailable] = useState(true);

  const [offer, setOffer] = useState(false);
  const [offerPercent, setOfferPercent] = useState("");

  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);

  const [flavorValue, setFlavorValue] = useState("");
  const [extraValue, setExtraValue] = useState("");

  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  // =========================
  // GET PRODUCT + ITEMS + CATEGORIES
  // =========================

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          getDashboardProduct(id),
          getProductItems(),
          getDashboardCategories(1),
        ]);
      } catch (err) {
        console.error("Edit Product Data Error:", err);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // =========================
  // FILL FORM
  // =========================

  useEffect(() => {
    if (!product) return;

    console.log("========== EDIT PRODUCT DATA ==========");
    console.log("Product:", product);

    // =========================
    // NAME
    // =========================

    const nameData = [
      {
        language: "en",
        value: product.nameEn,
      },
      {
        language: "ru",
        value: product.nameRu,
      },
      {
        language: "tr",
        value: product.nameTr,
      },
      {
        language: "pl",
        value: product.namePl,
      },
      {
        language: "it",
        value: product.nameIt,
      },
    ];

    const currentName = nameData.find(
      (item) =>
        item.value !== null && item.value !== undefined && item.value !== "",
    );

    if (currentName) {
      setNameLanguage(currentName.language);
      setName(currentName.value);
    }

    // =========================
    // DESCRIPTION
    // =========================

    const descriptionData = [
      {
        language: "en",
        value: product.descriptionEn,
      },
      {
        language: "ru",
        value: product.descriptionRu,
      },
      {
        language: "tr",
        value: product.descriptionTr,
      },
      {
        language: "pl",
        value: product.descriptionPl,
      },
      {
        language: "it",
        value: product.descriptionIt,
      },
    ];

    const currentDescription = descriptionData.find(
      (item) =>
        item.value !== null && item.value !== undefined && item.value !== "",
    );

    if (currentDescription) {
      setDescriptionLanguage(currentDescription.language);
      setDescription(currentDescription.value);
    }

    // =========================
    // BASE PRICE
    // =========================

    setBasePrice(product.basePrice ?? "");

    // =========================
    // CATEGORY
    // =========================

    if (
      product.category &&
      Array.isArray(categories) &&
      categories.length > 0
    ) {
      const currentCategory = categories.find(
        (item) =>
          item.name?.toLowerCase().trim() ===
          product.category?.toLowerCase().trim(),
      );

      if (currentCategory) {
        setCategory(String(currentCategory.id));
      }
    }

    // =========================
    // AVAILABLE
    // =========================

    setAvailable(Boolean(product.avaiable));

    // =========================
    // OFFER
    // =========================

    setOffer(Boolean(product.offer));

    // =========================
    // OFFER PERCENT
    // =========================

    setOfferPercent(product.offerPrecent ?? "");

    // =========================
    // IMAGE
    // =========================

    if (product.image) {
      setExistingImage(product.image);
    }

    // =========================
    // FLAVORS
    // =========================

    if (Array.isArray(product.flavors)) {
      const productFlavorIds = product.flavors.map((item) =>
        typeof item === "object" ? item.id : item,
      );

      setSelectedFlavors(
        flavors.filter((item) => productFlavorIds.includes(item.id)),
      );
    } else {
      setSelectedFlavors([]);
    }

    // =========================
    // EXTRAS
    // =========================

    if (Array.isArray(product.extras)) {
      const productExtraIds = product.extras.map((item) =>
        typeof item === "object" ? item.id : item,
      );

      setSelectedExtras(
        extras.filter((item) => productExtraIds.includes(item.id)),
      );
    } else {
      setSelectedExtras([]);
    }
  }, [product, categories, flavors, extras]);

  // =========================
  // GET NAME BY LANGUAGE
  // =========================

  const getNameByLanguage = (selectedLanguage) => {
    if (!product) return "";

    switch (selectedLanguage) {
      case "en":
        return product.nameEn || "";

      case "ru":
        return product.nameRu || "";

      case "tr":
        return product.nameTr || "";

      case "pl":
        return product.namePl || "";

      case "it":
        return product.nameIt || "";

      default:
        return "";
    }
  };

  // =========================
  // GET DESCRIPTION BY LANGUAGE
  // =========================

  const getDescriptionByLanguage = (selectedLanguage) => {
    if (!product) return "";

    switch (selectedLanguage) {
      case "en":
        return product.descriptionEn || "";

      case "ru":
        return product.descriptionRu || "";

      case "tr":
        return product.descriptionTr || "";

      case "pl":
        return product.descriptionPl || "";

      case "it":
        return product.descriptionIt || "";

      default:
        return "";
    }
  };

  // =========================
  // NAME LANGUAGE CHANGE
  // =========================

  const handleNameLanguageChange = (e) => {
    const selectedLanguage = e.target.value;

    setNameLanguage(selectedLanguage);

    const selectedName = getNameByLanguage(selectedLanguage);

    setName(selectedName);

    console.log("========== NAME LANGUAGE CHANGED ==========");

    console.log("Selected Language:", selectedLanguage);

    console.log("Selected Name:", selectedName);

    console.log("===========================================");
  };

  // =========================
  // DESCRIPTION LANGUAGE CHANGE
  // =========================

  const handleDescriptionLanguageChange = (e) => {
    const selectedLanguage = e.target.value;

    setDescriptionLanguage(selectedLanguage);

    const selectedDescription = getDescriptionByLanguage(selectedLanguage);

    setDescription(selectedDescription);

    console.log("========== DESCRIPTION LANGUAGE CHANGED ==========");

    console.log("Selected Language:", selectedLanguage);

    console.log("Selected Description:", selectedDescription);

    console.log("==================================================");
  };

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
      // PRESERVE EXISTING VALUES
      // =========================

      const nameValues = {
        en: product?.nameEn || "",
        ru: product?.nameRu || "",
        tr: product?.nameTr || "",
        pl: product?.namePl || "",
        it: product?.nameIt || "",
      };

      if (Object.prototype.hasOwnProperty.call(nameValues, nameLanguage)) {
        nameValues[nameLanguage] = name;
      }

      // =========================
      // DESCRIPTION LANGUAGES
      // PRESERVE EXISTING VALUES
      // =========================

      const descriptionValues = {
        en: product?.descriptionEn || "",
        ru: product?.descriptionRu || "",
        tr: product?.descriptionTr || "",
        pl: product?.descriptionPl || "",
        it: product?.descriptionIt || "",
      };

      if (
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

      console.log("========== UPDATE PRODUCT DATA ==========");

      console.log("Product ID:", id);

      console.log("Name Language:", nameLanguage);

      console.log("Name:", name);

      console.log("Description Language:", descriptionLanguage);

      console.log("Description:", description);

      console.log("Category ID:", category);

      console.log("Available:", available);

      console.log("Offer:", offer);

      console.log("Offer Percent:", offerPercent);

      console.log("Flavors IDs:", flavorsIds);

      console.log("Extras IDs:", extrasIds);

      console.log("Name Values:", nameValues);

      console.log("Description Values:", descriptionValues);

      console.log("=========================================");

      // =========================
      // UPDATE PRODUCT
      // =========================

      const response = await editDashboardProduct({
        productId: id,

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

      console.log("========== PRODUCT UPDATED ==========");

      console.log("Update Response:", response);

      console.log("====================================");

      navigate("/dashboard/products");
    } catch (err) {
      console.error("Update Product Failed:", err);
    }
  };

  const loading = productLoading || categoryLoading || itemsLoading;

  // =========================
  // INITIAL LOADING
  // =========================

  if (productLoading && !product) {
    return (
      <div className="add-product-page">
        <div className="add-product-card">
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
              fontSize: "18px",
              color: "#7b5036",
            }}
          >
            Loading product...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="add-product-page">
      {/* ================= HEADER ================= */}

      <div className="add-product-header">
        <div className="add-product-header-content">
          <h1>Edit Product</h1>

          <p>Update the product information and menu options.</p>
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

                <p>Update the main information about your product.</p>
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
                    onChange={handleNameLanguageChange}
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
                    onChange={handleDescriptionLanguageChange}
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

                <p>Update the price and product category.</p>
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

                <p>Update availability and discount settings.</p>
              </div>
            </div>

            <div className="add-product-options">
              {/* AVAILABLE */}

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

              {/* OFFER */}

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

                <p>Update the product image.</p>
              </div>
            </div>

            {existingImage && !image && (
              <div
                style={{
                  marginBottom: "16px",
                  fontSize: "14px",
                  color: "#7b5036",
                  wordBreak: "break-all",
                }}
              >
                Current image: {existingImage}
              </div>
            )}

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
                <strong>
                  {image
                    ? image.name
                    : existingImage
                      ? "Choose new image"
                      : "Upload product image"}
                </strong>

                <span>
                  {image
                    ? "New image selected successfully"
                    : existingImage
                      ? "Leave empty to keep the current image"
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
              {productLoading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
