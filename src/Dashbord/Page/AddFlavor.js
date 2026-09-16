import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faGlobe,
  faImage,
  faCloudArrowUp,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import "./AddFlavor.css";
import useFlavorDashbord from "../hooks/useFlavorDashbord";

export default function AddFlavor() {
  const navigate = useNavigate();

  const { createDashboardFlavor, loading, error } = useFlavorDashbord();

  const [language, setLanguage] = useState("");
  const [name, setName] = useState("");
  const [extraPrice, setExtraPrice] = useState("");
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState(null);

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const flavorData = {
        nameEn: "",
        nameRu: "",
        nameTr: "",
        namePl: "",
        nameIt: "",
        extraPrice,
        available,
        image,
      };

      // =========================
      // LANGUAGE
      // =========================

      switch (language) {
        case "en":
          flavorData.nameEn = name;
          break;

        case "ru":
          flavorData.nameRu = name;
          break;

        case "tr":
          flavorData.nameTr = name;
          break;

        case "pl":
          flavorData.namePl = name;
          break;

        case "it":
          flavorData.nameIt = name;
          break;

        default:
          break;
      }

      await createDashboardFlavor(flavorData);

      navigate("/dashboard/flavors");
    } catch (err) {
      console.error("Create Flavor Error:", err);
    }
  };

  return (
    <div className="add-flavor-page">
      {/* ================= HEADER ================= */}

      <div className="add-flavor-header">
        <div className="add-flavor-header-content">
          <h1>Add Flavor</h1>

          <p>Create a new flavor and add it to your menu.</p>
        </div>

        <button
          type="button"
          className="add-flavor-back-btn"
          onClick={() => navigate("/dashboard/flavors")}
          aria-label="Back to flavors"
          disabled={loading}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>

      {/* ================= ERROR ================= */}

      {error && (
        <div className="add-flavor-error">
          {typeof error === "string"
            ? error
            : error?.message || "Unable to create flavor."}
        </div>
      )}

      {/* ================= CARD ================= */}

      <div className="add-flavor-card">
        <form className="add-flavor-form" onSubmit={handleSubmit}>
          {/* ================================================= */}
          {/* BASIC INFORMATION */}
          {/* ================================================= */}

          <div className="add-flavor-section">
            <div className="add-flavor-section-header">
              <div className="flavor-section-number">01</div>

              <div>
                <h2>Basic Information</h2>

                <p>Enter the flavor name and language.</p>
              </div>
            </div>

            {/* NAME */}

            <div className="add-flavor-field">
              <label htmlFor="flavor-language" className="add-flavor-label">
                Flavor Name
              </label>

              <div className="add-flavor-language-row">
                <div className="add-flavor-select-wrap">
                  <FontAwesomeIcon
                    icon={faGlobe}
                    className="add-flavor-select-icon"
                  />

                  <select
                    id="flavor-language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="add-flavor-select"
                    required
                    disabled={loading}
                  >
                    <option value="">Select language</option>

                    <option value="en">English</option>

                    <option value="ru">Russian</option>

                    <option value="tr">Turkish</option>

                    <option value="pl">Polish</option>

                    <option value="it">Italian</option>
                  </select>
                </div>

                <span className="add-flavor-hint">Language</span>
              </div>

              <input
                id="flavor-name"
                type="text"
                placeholder="Enter flavor name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="add-flavor-input"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* ================================================= */}
          {/* PRICE & AVAILABILITY */}
          {/* ================================================= */}

          <div className="add-flavor-section">
            <div className="add-flavor-section-header">
              <div className="flavor-section-number">02</div>

              <div>
                <h2>Price & Availability</h2>

                <p>Set the additional price and availability status.</p>
              </div>
            </div>

            {/* PRICE */}

            <div className="add-flavor-field">
              <label htmlFor="extra-price" className="add-flavor-label">
                Extra Price
              </label>

              <div className="add-flavor-price-wrap">
                <span>USD</span>

                <input
                  id="extra-price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={extraPrice}
                  onChange={(e) => setExtraPrice(e.target.value)}
                  className="add-flavor-input"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* AVAILABLE */}

            <label className={`add-flavor-option ${available ? "active" : ""}`}>
              <input
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
                disabled={loading}
              />

              <span className="add-flavor-checkbox">
                {available && <FontAwesomeIcon icon={faCheck} />}
              </span>

              <span className="add-flavor-option-content">
                <strong>Available</strong>

                <small>Flavor is currently available</small>
              </span>
            </label>
          </div>

          {/* ================================================= */}
          {/* IMAGE */}
          {/* ================================================= */}

          <div className="add-flavor-section">
            <div className="add-flavor-section-header">
              <div className="flavor-section-number">03</div>

              <div>
                <h2>Flavor Image</h2>

                <p>Upload a clear image for this flavor.</p>
              </div>
            </div>

            <label
              htmlFor="flavor-image"
              className={`add-flavor-upload ${image ? "has-file" : ""}`}
            >
              <input
                id="flavor-image"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                disabled={loading}
              />

              <div className="add-flavor-upload-icon">
                <FontAwesomeIcon icon={image ? faImage : faCloudArrowUp} />
              </div>

              <div className="add-flavor-upload-content">
                <strong>{image ? image.name : "Upload flavor image"}</strong>

                <span>
                  {image
                    ? "Image selected successfully"
                    : "Click to browse or choose an image"}
                </span>
              </div>

              <span className="add-flavor-browse">Browse</span>
            </label>
          </div>

          {/* ================================================= */}
          {/* ACTIONS */}
          {/* ================================================= */}

          <div className="add-flavor-actions">
            <button
              type="button"
              className="add-flavor-cancel"
              onClick={() => navigate("/dashboard/flavors")}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="add-flavor-submit"
              disabled={loading}
            >
              {loading ? "Creating..." : "Add Flavor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
