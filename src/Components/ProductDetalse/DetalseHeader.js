// src/Components/productDetails/DetailsHeader.jsx
import { useNavigate } from "react-router-dom";
import "./DetailsHeader.css";
import { Container } from "react-bootstrap";
import useLanguage from "../../hooks/useLanguage";
export default function DetailsHeader() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return (
    <Container>
      <div className=" details-header  d-flex align-items-center justify-align-content-between gap-3">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i>
        </button>
        <h5 className="details-title mb-0">{t("pickFlavor")}</h5>
      </div>
    </Container>
  );
}
