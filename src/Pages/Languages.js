import { useNavigate } from "react-router-dom";

import "./Languages.css";

import English from "../Assets/eng.png";
import Rusian from "../Assets/rus.png";
import Italian from "../Assets/ita.png";
import Turkish from "../Assets/tur.png";
import Polish from "../Assets/pod.png";
import useLanguage from "../hooks/useLanguage";

const languages = [
  {
    id: "en",
    name: "English",
    image: English,
  },
  {
    id: "ru",
    name: "Russian",
    image: Rusian,
  },
  {
    id: "it",
    name: "Italian",
    image: Italian,
  },
  {
    id: "pl",
    name: "Polish",
    image: Polish,
  },
  {
    id: "tr",
    name: "Turkish",
    image: Turkish,
  },
];

export default function Languages() {
  const navigate = useNavigate();

  const { language, changeLanguage, t } = useLanguage();

  return (
    <div className="languages-page">
      {/* Header */}
      <div className="languages-header">
        <h1>{t("languages")}</h1>
      </div>

      {/* Content */}
      <div className="languages-content">
        {/* Top */}
        <div className="languages-top">
          <button className="languages-back-btn" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left"></i>
          </button>

          <h2>{t("chooseLanguage")}</h2>
        </div>

        {/* Languages */}
        <div className="languages-list">
          {languages.map((lang) => (
            <button
              key={lang.id}
              className="language-item"
              onClick={() => changeLanguage(lang.id)}
            >
              <div className="language-info">
                <img
                  src={lang.image}
                  alt={t(`lang_${lang.id}`)}
                  className="language-flag"
                />

                <span>{t(`lang_${lang.id}`)}</span>
              </div>

              {language === lang.id && (
                <i className="bi bi-check-circle-fill language-selected"></i>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
