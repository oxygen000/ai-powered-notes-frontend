import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../public/locale/en/en.json";
import ar from "../public/locale/ar/ar.json";

const changeDirection = (lang: string) => {
  const dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.setAttribute("dir", dir); 
  document.documentElement.setAttribute("lang", lang);
};

i18n
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    lng: localStorage.getItem("language") || "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: [
        'cookie',
        'localStorage',
        'sessionStorage',
        'navigator',
        'htmlTag', 
        'path', 
        'subdomain'
        ],
      caches: ["localStorage"],
    },
  });

changeDirection(i18n.language); 

i18n.on("languageChanged", (lang) => {
  localStorage.setItem("language", lang);
  changeDirection(lang);
});

export default i18n;
