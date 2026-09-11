import { useContext } from "react";
import { LanguageContext } from "../Context/LanguageContext";

export default function useLanguage() {
  return useContext(LanguageContext);
}
