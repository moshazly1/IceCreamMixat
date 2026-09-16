import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export default function EditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    languages,
    getLanguages,
    loading: languagesLoading,
    error: languagesError,
  } = useLanguage();

  const {
    getDashboardCategory,
    editDashboardCategory,
    loading: categoryLoading,
    error: categoryError,
  } = useCategoryDashbord();

  const [category, setCategory] = useState(null);

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
      } catch (err) {
        console.error("Languages Fetch Error:", err);
      }
    };

    fetchLanguages();
  }, []);

  // =========================
  // GET CATEGORY DATA
  // =========================

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getDashboardCategory(id);

        const categoryData = response?.data || response;

        setCategory(categoryData);

        // =========================
        // FIND FIRST LANGUAGE
        // THAT HAS A NAME
        // =========================

        const languageNames = [
          {
            prefix: "en",
            value: categoryData?.nameEn,
          },
          {
            prefix: "ru",
            value: categoryData?.nameRu,
          },
          {
            prefix: "tr",
            value: categoryData?.nameTr,
          },
          {
            prefix: "pl",
            value: categoryData?.namePl,
          },
          {
            prefix: "it",
            value: categoryData?.nameIt,
          },
        ];

        const activeLanguage = languageNames.find(
          (item) => item.value && item.value.trim() !== "",
        );

        if (activeLanguage) {
          setLanguage(activeLanguage.prefix);
          setName(activeLanguage.value);
        }
      } catch (err) {
        console.error("Edit Category Fetch Error:", err);
      }
    };

    if (id) {
      fetchCategory();
    }
  }, [id]);

  // =========================
  // GET NAME BY LANGUAGE
  // =========================

  const getNameByLanguage = (selectedLanguage, categoryData = category) => {
    if (!categoryData) {
      return "";
    }

    switch (selectedLanguage) {
      case "en":
        return categoryData?.nameEn || "";

      case "ru":
        return categoryData?.nameRu || "";

      case "tr":
        return categoryData?.nameTr || "";

      case "pl":
        return categoryData?.namePl || "";

      case "it":
        return categoryData?.nameIt || "";

      default:
        return "";
    }
  };

  // =========================
  // LANGUAGE CHANGE
  // =========================

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;

    setLanguage(selectedLanguage);

    const selectedName = getNameByLanguage(selectedLanguage);

    setName(selectedName);
  };

  // =========================
  // EDIT CATEGORY
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // =========================
      // CATEGORY ID
      // =========================

      formData.append("categoryId", id);

      // =========================
      // IMAGE
      // ONLY SEND IF NEW IMAGE
      // WAS SELECTED
      // =========================

      if (image) {
        formData.append("image", image);
      }

      // =========================
      // CATEGORY NAME
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

      // =========================
      // API REQUEST
      // =========================

      const response = await editDashboardCategory(formData);

      // =========================
      // SUCCESS
      // =========================

      navigate("/dashboard/categories");
    } catch (err) {
      console.error("Edit Category Error:", err);
    }
  };

  return (
    <div className="add-category-page">
      {/* ================= HEADER ================= */}

      <div className="add-category-header">
        <div>
          <h1>Edit Category</h1>

          <p>Update your category information.</p>
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
                  onChange={handleLanguageChange}
                  className="add-category-select"
                  required
                  disabled={languagesLoading || categoryLoading}
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
              placeholder={
                categoryLoading
                  ? "Loading category..."
                  : "Enter category name..."
              }
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="add-category-input"
              required
              disabled={categoryLoading}
            />
          </div>

          {/* ================= IMAGE ================= */}

          <div className="add-category-field">
            <label className="add-category-label">
              Category Image
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "400",
                  marginLeft: "8px",
                  opacity: "0.6",
                }}
              >
                (Optional)
              </span>
            </label>

            <label
              htmlFor="category-image"
              className={`add-category-upload ${image ? "has-file" : ""}`}
            >
              <input
                id="category-image"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                disabled={categoryLoading}
              />

              <div className="add-category-upload-icon">
                <FontAwesomeIcon icon={image ? faImage : faCloudArrowUp} />
              </div>

              <div className="add-category-upload-content">
                <span className="add-category-upload-title">
                  {image ? image.name : "Upload new category image (optional)"}
                </span>

                <span className="add-category-upload-text">
                  {image
                    ? "Image selected successfully"
                    : "Leave empty to keep the current image"}
                </span>
              </div>

              <span className="add-category-browse">Browse</span>
            </label>
          </div>

          {/* ================= ERROR ================= */}

          {categoryError && (
            <small className="add-category-error">
              Unable to load or update category. Please try again.
            </small>
          )}

          {/* ================= ACTIONS ================= */}

          <div className="add-category-actions">
            <button
              type="button"
              className="add-category-cancel"
              onClick={() => navigate("/dashboard/categories")}
              disabled={categoryLoading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="add-category-submit"
              disabled={categoryLoading || languagesLoading}
            >
              {categoryLoading ? "Updating..." : "Update Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
