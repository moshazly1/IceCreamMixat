import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faGlobe,
  faImage,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";

import "./AddCategory.css";
import useLanguage from "../hooks/useLanguage";
import useCategoryDashbord from "../hooks/useCategoryDashbord";

export default function AddCategory() {
  const navigate = useNavigate();

  const {
    languages,
    getLanguages,
    loading: languagesLoading,
    error: languagesError,
  } = useLanguage();

  const {
    createDashboardCategory,
    loading: createLoading,
    error: createError,
  } = useCategoryDashbord();

  const [language, setLanguage] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  // =========================
  // GET LANGUAGES
  // =========================

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await getLanguages();

        console.log("Languages Response:", response);
      } catch (err) {
        console.error("Languages Fetch Error:", err);
      }
    };

    fetchLanguages();
  }, []);

  // =========================
  // CREATE CATEGORY
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // =========================
      // IMAGE
      // =========================

      formData.append("image", image);

      // =========================
      // LANGUAGE NAME
      // =========================

      if (language === "en") {
        formData.append("nameEn", name);
      }

      if (language === "ru") {
        formData.append("nameRu", name);
      }

      if (language === "tr") {
        formData.append("nameTr", name);
      }

      if (language === "pl") {
        formData.append("namePl", name);
      }

      if (language === "it") {
        formData.append("nameIt", name);
      }

      // =========================
      // DEBUG
      // =========================

      console.log("========== CREATE CATEGORY ==========");

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      console.log("=====================================");

      // =========================
      // API REQUEST
      // =========================

      const response = await createDashboardCategory(formData);

      console.log("Create Category Response:", response);

      // =========================
      // SUCCESS
      // =========================

      navigate("/dashboard/categories");
    } catch (err) {
      console.error("Create Category Error:", err);
    }
  };

  return (
    <div className="add-category-page">
      {/* ================= HEADER ================= */}

      <div className="add-category-header">
        <div>
          <h1>Add Category</h1>
          <p>Create a new category for your menu.</p>
        </div>

        <button
          type="button"
          className="add-category-back-btn"
          onClick={() => navigate("/dashboard/categories")}
          aria-label="Back to categories"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>

      {/* ================= FORM CARD ================= */}

      <div className="add-category-card">
        <form className="add-category-form" onSubmit={handleSubmit}>
          {/* ================= NAME ================= */}

          <div className="add-category-field">
            <label htmlFor="category-language" className="add-category-label">
              Name
            </label>

            <div className="add-category-language-row">
              <div className="add-category-select-wrapper">
                <FontAwesomeIcon
                  icon={faGlobe}
                  className="add-category-select-icon"
                />

                <select
                  id="category-language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="add-category-select"
                  required
                  disabled={languagesLoading || createLoading}
                >
                  <option value="">
                    {languagesLoading
                      ? "Loading languages..."
                      : "Select language"}
                  </option>

                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.prefix}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <span className="add-category-hint">Language</span>
            </div>

            {languagesError && (
              <small className="add-category-error">
                Unable to load languages.
              </small>
            )}

            <input
              type="text"
              id="category-name"
              placeholder="Enter category name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="add-category-input"
              required
              disabled={createLoading}
            />
          </div>

          {/* ================= IMAGE ================= */}

          <div className="add-category-field">
            <label className="add-category-label">Category Image</label>

            <label
              htmlFor="category-image"
              className={`add-category-upload ${image ? "has-file" : ""}`}
            >
              <input
                id="category-image"
                type="file"
                accept="image/*"
                required
                disabled={createLoading}
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />

              <div className="add-category-upload-icon">
                <FontAwesomeIcon icon={image ? faImage : faCloudArrowUp} />
              </div>

              <div className="add-category-upload-content">
                <span className="add-category-upload-title">
                  {image ? image.name : "Upload category image"}
                </span>

                <span className="add-category-upload-text">
                  {image
                    ? "Image selected successfully"
                    : "Click to browse or choose an image"}
                </span>
              </div>

              <span className="add-category-browse">Browse</span>
            </label>
          </div>

          {/* ================= ERROR ================= */}

          {createError && (
            <small className="add-category-error">
              Unable to create category. Please try again.
            </small>
          )}

          {/* ================= ACTIONS ================= */}

          <div className="add-category-actions">
            <button
              type="button"
              className="add-category-cancel"
              onClick={() => navigate("/dashboard/categories")}
              disabled={createLoading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="add-category-submit"
              disabled={createLoading || languagesLoading}
            >
              {createLoading ? "Adding..." : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
