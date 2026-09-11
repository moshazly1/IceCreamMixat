import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export default function EditFlavor() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { flavor, getDashboardFlavor, editDashboardFlavor, loading, error } =
    useFlavorDashbord();

  // =========================
  // FORM STATE
  // =========================

  const [language, setLanguage] = useState("en");

  const [nameEn, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [nameTr, setNameTr] = useState("");
  const [namePl, setNamePl] = useState("");
  const [nameIt, setNameIt] = useState("");

  const [extraPrice, setExtraPrice] = useState("");
  const [available, setAvailable] = useState(true);

  // New image selected by user
  const [image, setImage] = useState(null);

  // Current image returned by API
  const [existingImage, setExistingImage] = useState("");

  // =========================
  // GET SINGLE FLAVOR
  // =========================

  useEffect(() => {
    if (!id) return;

    const fetchFlavor = async () => {
      try {
        await getDashboardFlavor(id);
      } catch (err) {
        console.error("Get Flavor Error:", err);
      }
    };

    fetchFlavor();
  }, [id]);

  // =========================
  // FILL FORM FROM API
  // =========================

  useEffect(() => {
    if (!flavor) return;

    console.log("========== FILL EDIT FLAVOR ==========");

    console.log("Flavor Data:", flavor);

    console.log("======================================");

    setNameEn(flavor.nameEn ?? "");
    setNameRu(flavor.nameRu ?? "");
    setNameTr(flavor.nameTr ?? "");
    setNamePl(flavor.namePl ?? "");
    setNameIt(flavor.nameIt ?? "");

    setExtraPrice(flavor.extraPrice ?? "");
    setAvailable(Boolean(flavor.available));

    setExistingImage(flavor.image ?? "");
    setImage(null);

    // =========================
    // DEFAULT LANGUAGE
    // =========================

    // English first if it exists
    if (flavor.nameEn) {
      setLanguage("en");
    } else if (flavor.nameRu) {
      setLanguage("ru");
    } else if (flavor.nameTr) {
      setLanguage("tr");
    } else if (flavor.namePl) {
      setLanguage("pl");
    } else if (flavor.nameIt) {
      setLanguage("it");
    }
  }, [flavor]);

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

    console.log("========== FLAVOR LANGUAGE CHANGED ==========");

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

    console.log("=============================================");
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) return;

    try {
      const flavorData = {
        flavorId: id,

        // Preserve ALL languages
        nameEn,
        nameRu,
        nameTr,
        namePl,
        nameIt,

        extraPrice,
        available,

        // Only send a file if user selected a new one
        image: image || null,
      };

      console.log("========== EDIT FLAVOR DATA ==========");

      console.log(flavorData);

      console.log("======================================");

      await editDashboardFlavor(flavorData);

      navigate("/dashboard/flavors");
    } catch (err) {
      console.error("Edit Flavor Error:", err);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading && !flavor) {
    return (
      <div className="add-flavor-page">
        <div className="add-flavor-card">
          <div className="add-flavor-loading">Loading flavor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="add-flavor-page">
      {/* ================= HEADER ================= */}

      <div className="add-flavor-header">
        <div className="add-flavor-header-content">
          <h1>Edit Flavor</h1>

          <p>Update the flavor information and save your changes.</p>
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
            : error?.message || "Unable to load or update flavor."}
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

                <p>Update the flavor name and language.</p>
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
                    onChange={handleLanguageChange}
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
                value={getCurrentName()}
                onChange={(e) => handleNameChange(e.target.value)}
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

                <p>Update the additional price and availability status.</p>
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

                <p>Replace the current image or keep it unchanged.</p>
              </div>
            </div>

            {/* CURRENT IMAGE */}

            {existingImage && !image && (
              <div className="add-flavor-existing-image">
                <img src={existingImage} alt="Current flavor" />

                <span>Current image</span>
              </div>
            )}

            {/* NEW IMAGE */}

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
                <strong>
                  {image ? image.name : "Upload new flavor image"}
                </strong>

                <span>
                  {image
                    ? "New image selected successfully"
                    : "Click to browse or choose a new image"}
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
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
