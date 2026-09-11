import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faGlobe,
  faDollarSign,
  faImage,
  faCloudArrowUp,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import "./AddExtra.css";
import useExtraDashbord from "../hooks/useExtraDashbord";

export default function AddExtra() {
  const navigate = useNavigate();

  const { createDashboardExtra, loading, error } = useExtraDashbord();

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
      const extraData = {
        nameEn: "",
        nameRu: "",
        nameTr: "",
        namePl: "",
        nameIt: "",

        price: extraPrice,

        available,
      };

      // =========================
      // LANGUAGE
      // =========================

      switch (language) {
        case "en":
          extraData.nameEn = name;
          break;

        case "ru":
          extraData.nameRu = name;
          break;

        case "tr":
          extraData.nameTr = name;
          break;

        case "pl":
          extraData.namePl = name;
          break;

        case "it":
          extraData.nameIt = name;
          break;

        default:
          break;
      }

      console.log("========== CREATE EXTRA DATA ==========");

      console.log(extraData);

      console.log("======================================");

      await createDashboardExtra(extraData);

      navigate("/dashboard/extras");
    } catch (err) {
      console.error("Create Extra Error:", err);
    }
  };

  return (
    <div className="add-extra-page">
      {/* ================= HEADER ================= */}

      <div className="add-extra-header">
        <div className="add-extra-header-content">
          <h1>Add Extra</h1>

          <p>Create a new extra and add it to your menu.</p>
        </div>

        <button
          type="button"
          className="add-extra-back-btn"
          onClick={() => navigate("/dashboard/extras")}
          aria-label="Back to extras"
          disabled={loading}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>

      {/* ================= ERROR ================= */}

      {error && (
        <div className="add-extra-error">
          {typeof error === "string"
            ? error
            : error?.message || "Unable to create extra."}
        </div>
      )}

      {/* ================= CARD ================= */}

      <div className="add-extra-card">
        <form className="add-extra-form" onSubmit={handleSubmit}>
          {/* ================= SECTION 01 ================= */}

          <div className="add-extra-section">
            <div className="add-extra-section-header">
              <div className="extra-section-number">01</div>

              <div>
                <h2>Basic Information</h2>

                <p>Enter the extra name and choose its language.</p>
              </div>
            </div>

            <div className="add-extra-field">
              <label className="add-extra-label">Extra Name</label>

              <div className="add-extra-language-row">
                <div className="add-extra-select-wrap">
                  <FontAwesomeIcon
                    icon={faGlobe}
                    className="add-extra-select-icon"
                  />

                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="add-extra-select"
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

                <span className="add-extra-language-hint">Language</span>
              </div>

              <input
                type="text"
                placeholder="Enter extra name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="add-extra-input"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* ================= SECTION 02 ================= */}

          <div className="add-extra-section">
            <div className="add-extra-section-header">
              <div className="extra-section-number">02</div>

              <div>
                <h2>Price & Availability</h2>

                <p>Set the price and availability status.</p>
              </div>
            </div>

            <div className="add-extra-field">
              <label className="add-extra-label">Price</label>

              <div className="add-extra-price-wrap">
                <span className="add-extra-currency">
                  <FontAwesomeIcon icon={faDollarSign} />
                  USD
                </span>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={extraPrice}
                  onChange={(e) => setExtraPrice(e.target.value)}
                  className="add-extra-input add-extra-price-input"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <label className={`add-extra-option ${available ? "active" : ""}`}>
              <input
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
                disabled={loading}
              />

              <span className="add-extra-checkbox">
                {available && <FontAwesomeIcon icon={faCheck} />}
              </span>

              <span className="add-extra-option-content">
                <strong>Available</strong>

                <small>Extra is currently available</small>
              </span>
            </label>
          </div>

          {/* ================= SECTION 03 ================= */}

          <div className="add-extra-section">
            <div className="add-extra-section-header">
              <div className="extra-section-number">03</div>

              <div>
                <h2>Extra Image</h2>

                <p>Upload a clear image for this extra.</p>
              </div>
            </div>

            <label
              htmlFor="extra-image"
              className={`add-extra-upload ${image ? "has-file" : ""}`}
            >
              <input
                id="extra-image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files?.[0] || null);
                }}
                disabled={loading}
              />

              <div className="add-extra-upload-icon">
                <FontAwesomeIcon icon={image ? faImage : faCloudArrowUp} />
              </div>

              <div className="add-extra-upload-content">
                <strong>{image ? image.name : "Upload extra image"}</strong>

                <span>
                  {image
                    ? "Image selected successfully"
                    : "Click to browse or choose an image"}
                </span>
              </div>

              <span className="add-extra-browse">Browse</span>
            </label>
          </div>

          {/* ================= ACTIONS ================= */}

          <div className="add-extra-actions">
            <button
              type="button"
              className="add-extra-cancel"
              onClick={() => navigate("/dashboard/extras")}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="add-extra-submit"
              disabled={loading}
            >
              {loading ? "Creating..." : "Add Extra"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
