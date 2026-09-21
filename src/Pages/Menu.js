import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./Menu.css";
import MenuHeader from "../Components/common/MenuHeader";
import OfferSectio from "../Components/offer/OfferSection";
import ProductCard from "../Components/Product/Productcard";
import useProduct from "../hooks/useProduct";
import useCategory from "../hooks/useCategory";
import { useNavigate } from "react-router-dom";
import useProductSearch from "../hooks/useProductSearch";
import Loading from "../Components/common/Loading";
import PoliciesModal from "../Components/PoliciesModel/PoliciesModal";
import useLanguage from "../hooks/useLanguage";

const AUTO_SLIDE_INTERVAL = 20000;
const SEARCH_DEBOUNCE = 500;

export default function Menu() {
  const { t } = useLanguage();
  const { categories } = useCategory();
  const navigate = useNavigate();

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPolicies, setShowPolicies] = useState(false);

  /*
    Responsive products per page:
    Mobile / Tablet = 2
    Desktop = 3
  */
  const getProductsPerPage = () => {
    if (typeof window === "undefined") {
      return 2;
    }

    return window.innerWidth >= 992 ? 3 : 2;
  };

  const [productsPerPage, setProductsPerPage] = useState(getProductsPerPage());

  const {
    products: categoryProducts,
    loading: categoryLoading,
    error: categoryError,
  } = useProduct(selectedCategoryId);

  const {
    products: searchProducts,
    loading: searchLoading,
    error: searchError,
    searchProducts: searchProductsApi,
    clearSearch,
  } = useProductSearch();

  /* =========================================================
     RESPONSIVE PRODUCTS COUNT
  ========================================================= */

  useEffect(() => {
    const handleResize = () => {
      const newProductsPerPage = window.innerWidth >= 992 ? 3 : 2;

      setProductsPerPage((prev) => {
        if (prev !== newProductsPerPage) {
          setCurrentPage(1);
          return newProductsPerPage;
        }

        return prev;
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* =========================================================
     DEFAULT CATEGORY
  ========================================================= */

  useEffect(() => {
    if (categories.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories, selectedCategoryId]);

  /* =========================================================
     SELECTED CATEGORY
  ========================================================= */

  const selectedCategory = categories.find(
    (cat) => cat.id === selectedCategoryId,
  );

  /* =========================================================
     PRODUCTS SOURCE
  ========================================================= */

  const isSearching = searchQuery.trim().length > 0;

  const products = isSearching ? searchProducts : categoryProducts;

  const loading = isSearching ? searchLoading : categoryLoading;

  const error = isSearching ? searchError : categoryError;

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.ceil(products.length / productsPerPage);

  const pages = Array.from({ length: totalPages }, (_, i) =>
    products.slice(i * productsPerPage, i * productsPerPage + productsPerPage),
  );

  /* =========================================================
     RESET PAGE
  ========================================================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategoryId, productsPerPage]);

  /* =========================================================
     SAFETY
  ========================================================= */

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  /* =========================================================
     AUTO SLIDE
  ========================================================= */

  useEffect(() => {
    if (totalPages <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev >= totalPages ? 1 : prev + 1));
    }, AUTO_SLIDE_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [totalPages]);

  /* =========================================================
     CATEGORY
  ========================================================= */

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setSearchQuery("");
    setCurrentPage(1);

    clearSearch();
  };

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const query = searchQuery.trim();

    if (!query) {
      clearSearch();
      return;
    }

    const timer = setTimeout(() => {
      searchProductsApi(query);
    }, SEARCH_DEBOUNCE);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, searchProductsApi, clearSearch]);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="menu-page">
      <MenuHeader
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onCategoryClick={handleCategoryClick}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <OfferSectio />

      <Container className="p-3">
        {/* SECTION TITLE */}

        <h4 className="section-title">
          {isSearching ? t("searchResults") : selectedCategory?.name}
        </h4>

        {/* LOADING */}

        {loading && <Loading text={t("loading")} />}

        {/* ERROR */}

        {error && (
          <p>
            {isSearching ? t("somethingWentWrong") : t("failedToLoadProducts")}
          </p>
        )}

        {/* EMPTY */}

        {!loading && !error && products.length === 0 && (
          <div className="products-empty-state">
            <div className="products-empty-icon">
              <i className="bi bi-cup-straw"></i>
            </div>

            <h3>{t("noProductsFound")}</h3>

            <p>
              {isSearching ? t("tryAnotherSearch") : t("noProductsAvailable")}
            </p>
          </div>
        )}

        {/* PRODUCTS */}

        {!loading && !error && products.length > 0 && (
          <div className="carousel-viewport">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${(currentPage - 1) * 100}%)`,
              }}
            >
              {pages.map((pageProducts, pageIndex) => (
                <div className="carousel-page" key={pageIndex}>
                  {pageProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      id={p.id}
                      image={p.image}
                      price={p.base_price}
                      name={p.name}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGINATION */}

        {!loading && !error && totalPages > 1 && (
          <div className="pagination-dots">
            {Array.from({
              length: totalPages,
            }).map((_, index) => (
              <span
                key={index}
                className={`dot ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => setCurrentPage(index + 1)}
              />
            ))}
          </div>
        )}
      </Container>

      {/* =====================================================
          MENU FOOTER
      ===================================================== */}

      <footer className="menu-footer">
        {/* TOP FOOTER BAR */}

        <div className="footer-top-bar">
          {/* ORDERS */}

          <button
            type="button"
            className="footer-action footer-action-left"
            onClick={() => navigate("/orders")}
            aria-label={t("footerOrders")}
          >
            <i className="bi bi-fork-knife"></i>
          </button>

          {/* BASKET */}

          <div className="footer-cart-wrapper">
            <button
              type="button"
              className="footer-cart-btn"
              onClick={() => navigate("/basket")}
              aria-label={t("footerBasket")}
            >
              <i className="bi bi-bag-fill"></i>
            </button>
          </div>

          {/* PHONE */}

          <a
            href="tel:01154450813"
            className="footer-action footer-action-right"
            aria-label={t("footerPhone")}
          >
            <i className="bi bi-telephone-fill"></i>
          </a>
        </div>

        {/* FOOTER INFORMATION */}

        <div className="footer-information">
          <div className="footer-information-inner">
            {/* POLICIES */}

            <div className="footer-column footer-policies">
              <h3>{t("footerPolicies")}</h3>

              <button type="button" onClick={() => setShowPolicies(true)}>
                {t("footerRefundShipping")}
              </button>

              <button type="button" onClick={() => setShowPolicies(true)}>
                {t("footerPreparationCancellation")}
              </button>

              <button type="button" onClick={() => setShowPolicies(true)}>
                {t("footerTerms")}
              </button>
            </div>

            {/* CONTACT INFORMATION */}

            <div className="footer-column footer-contact">
              <h3>{t("footerContactInformation")}</h3>

              <a href="tel:01154450813">
                <span>{t("footerPhoneLabel")}</span>

                <strong>01154450813</strong>
              </a>

              <a href="mailto:ahmed.aa0777@gmail.com">
                <span>{t("footerEmailLabel")}</span>

                <strong>ahmed.aa0777@gmail.com</strong>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================
          POLICIES MODAL
      ===================================================== */}

      {showPolicies && (
        <PoliciesModal
          requireAcceptance={false}
          onClose={() => setShowPolicies(false)}
        />
      )}
    </div>
  );
}
