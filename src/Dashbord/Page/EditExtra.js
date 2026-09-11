import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export default function EditExtra() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { extra, getDashboardExtra, editDashboardExtra, loading, error } =
    useExtraDashbord();

  // =========================
  // FORM STATE
  // =========================

  const [language, setLanguage] = useState("en");

  const [nameEn, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [nameTr, setNameTr] = useState("");
  const [namePl, setNamePl] = useState("");
  const [nameIt, setNameIt] = useState("");

  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);

  // New image selected by user
  const [image, setImage] = useState(null);

  // Current image returned by API
  const [existingImage, setExistingImage] = useState("");

  // =========================
  // GET SINGLE EXTRA
  // =========================

  useEffect(() => {
    if (!id) return;

    const fetchExtra = async () => {
      try {
        await getDashboardExtra(id);
      } catch (err) {
        console.error("Get Extra Error:", err);
      }
    };

    fetchExtra();
  }, [id]);

  // =========================
  // FILL FORM FROM API
  // =========================

  useEffect(() => {
    if (!extra) return;

    console.log("========== FILL EDIT EXTRA ==========");

    console.log("Extra Data:", extra);

    console.log("=====================================");

    // =========================
    // NAMES
    // =========================

    setNameEn(extra.nameEn ?? "");
    setNameRu(extra.nameRu ?? "");
    setNameTr(extra.nameTr ?? "");
    setNamePl(extra.namePl ?? "");
    setNameIt(extra.nameIt ?? "");

    // =========================
    // PRICE & AVAILABILITY
    // =========================

    setPrice(extra.price ?? "");
    setAvailable(Boolean(extra.available));

    // =========================
    // CURRENT IMAGE
    // =========================

    const imageUrl = extra.image
      ? extra.image.replace(/^http:\/\//i, "https://")
      : "";

    setExistingImage(imageUrl);

    // Reset new image
    setImage(null);

    // =========================
    // DEFAULT LANGUAGE
    // =========================

    if (extra.nameEn) {
      setLanguage("en");
    } else if (extra.nameRu) {
      setLanguage("ru");
    } else if (extra.nameTr) {
      setLanguage("tr");
    } else if (extra.namePl) {
      setLanguage("pl");
    } else if (extra.nameIt) {
      setLanguage("it");
    }
  }, [extra]);

  // =========================
  // GET CURRENT LANGUAGE NAME
  // =========================

  const getCurrentName = () => {
    switch (language) {
      case "en":
        return nameEn;

      case "ru":
        return nameRu;

      case "tr":
        return nameTr;

      case "pl":
        return namePl;

      case "it":
        return nameIt;

      default:
        return "";
    }
  };

  // =========================
  // SET CURRENT LANGUAGE NAME
  // =========================

  const handleNameChange = (value) => {
    switch (language) {
      case "en":
        setNameEn(value);
        break;

      case "ru":
        setNameRu(value);
        break;

      case "tr":
        setNameTr(value);
        break;

      case "pl":
        setNamePl(value);
        break;

      case "it":
        setNameIt(value);
        break;

      default:
        break;
    }
  };

  // =========================
  // LANGUAGE CHANGE
  // =========================

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;

    setLanguage(selectedLanguage);

    console.log("========== EXTRA LANGUAGE CHANGED ==========");

    console.log("Selected Language:", selectedLanguage);

    switch (selectedLanguage) {
      case "en":
        console.log("Selected Name:", nameEn);
        break;

      case "ru":
        console.log("Selected Name:", nameRu);
        break;

      case "tr":
        console.log("Selected Name:", nameTr);
        break;

      case "pl":
        console.log("Selected Name:", namePl);
        break;

      case "it":
        console.log("Selected Name:", nameIt);
        break;

      default:
        console.log("Selected Name:", "");
        break;
    }

    console.log("============================================");
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) return;

    try {
      const extraData = {
        extraId: id,

        // Preserve ALL languages
        nameEn,
        nameRu,
        nameTr,
        namePl,
        nameIt,

        price,
        available,

        // Send only the new image if selected
        image: image || null,
      };

      console.log("========== EDIT EXTRA DATA ==========");

      console.log(extraData);

      console.log("=====================================");

      await editDashboardExtra(extraData);

      navigate("/dashboard/extras");
    } catch (err) {
      console.error("Edit Extra Error:", err);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading && !extra) {
    return (
      <div className="add-extra-page">
        <div className="add-extra-card">
          <div className="add-extra-loading">Loading extra...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="add-extra-page">
      {/* ================= HEADER ================= */}

      <div className="add-extra-header">
        <div className="add-extra-header-content">
          <h1>Edit Extra</h1>

          <p>Update the extra information and save your changes.</p>
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
            : error?.message || "Unable to load or update extra."}
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

                <p>Update the extra name and choose its language.</p>
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
                    onChange={handleLanguageChange}
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
                value={getCurrentName()}
                onChange={(e) => handleNameChange(e.target.value)}
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

                <p>Update the price and availability status.</p>
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
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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

                <p>Replace the current image or keep it unchanged.</p>
              </div>
            </div>

            {/* CURRENT IMAGE */}

            {existingImage && !image && (
              <div className="add-extra-existing-image">
                <img src={existingImage} alt="Current extra" />

                <span>Current image</span>
              </div>
            )}

            {/* NEW IMAGE */}

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
                <strong>{image ? image.name : "Upload new extra image"}</strong>

                <span>
                  {image
                    ? "New image selected successfully"
                    : "Click to browse or choose a new image"}
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
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
