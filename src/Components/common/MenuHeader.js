import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./MenuHeader.css";
import useLanguage from "../../hooks/useLanguage";

export default function MenuHeader({
  categories,
  selectedCategoryId,
  onCategoryClick,
  searchQuery,
  onSearchChange,
}) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="menu-header">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="search-bar d-flex align-items-center">
            <div className="search-icon-circle mx-1">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t("searchDessert")}
            />
          </div>

          <div className="d-flex gap-2">
            <div className="icon-circle" onClick={() => navigate("/currency")}>
              <i className="bi bi-coin fs-2"></i>
            </div>

            <div className="icon-circle" onClick={() => navigate("/languages")}>
              <i className="bi bi-globe fs-2"></i>
            </div>
          </div>
        </div>

        <h2 className="fw-bold text-white mb-1">{t("findIceCream")}</h2>

        <p className="text-white mb-4">{t("orderPreparation")}</p>

        <div className="d-flex gap-3 category-icons">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`category-icon ${
                selectedCategoryId === cat.id ? "active" : ""
              }`}
              onClick={() => onCategoryClick(cat.id)}
            >
              <img src={cat.image} alt={cat.name || `category-${cat.id}`} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
