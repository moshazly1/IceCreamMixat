import { Container } from "react-bootstrap";
import "./Homepage.css";
import Popcorn from "../Assets/popcorn.png";
import IceCream from "../Assets/icecream.png";
import { useNavigate } from "react-router-dom";
import useLanguage from "../hooks/useLanguage";
import { useEffect, useState } from "react";
import PoliciesModal from "../Components/PoliciesModel/PoliciesModal";

const POLICIES_KEY = "icecream_policies_accepted";

export default function Homepage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [showPolicies, setShowPolicies] = useState(false);

  useEffect(() => {
    const policiesAccepted = localStorage.getItem(POLICIES_KEY);

    if (policiesAccepted !== "true") {
      setShowPolicies(true);
    }
  }, []);

  const handleAcceptPolicies = () => {
    localStorage.setItem(POLICIES_KEY, "true");
    setShowPolicies(false);
  };

  return (
    <div className="hero-section">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="brand-logo fw-bold mb-0">{t("brandName")}</h1>
      </div>

      <div className="d-flex justify-content-between align-items-start hero-images">
        <img src={Popcorn} alt="popcorn" className="hero-img-left" />

        <img src={IceCream} alt="ice cream" className="hero-img-right" />
      </div>

      <Container className="text-center hero-content">
        <h1 className="hero-title fw-bold">{t("welcomeTitle")}</h1>

        <p className="hero-subtitle">{t("welcomeSubtitle")}</p>

        <button className="hero-btn" onClick={() => navigate("/menu")}>
          {t("getStarted")}
        </button>

        <p className="hero-note">
          <strong className="fw-bold fs-6">{t("pleaseNote")}</strong>{" "}
          {t("pleaseNoteText")}
        </p>
      </Container>

      {/* Policies */}
      {showPolicies && (
        <PoliciesModal
          requireAcceptance={true}
          onClose={handleAcceptPolicies}
        />
      )}
    </div>
  );
}
