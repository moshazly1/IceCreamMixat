import { createContext, useState } from "react";
import translations from "../translations";

export const LanguageContext = createContext();

const LANGUAGE_KEY = "selected_language";

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem(LANGUAGE_KEY) || "en",
  );

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem(LANGUAGE_KEY, newLanguage);
  };

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
   