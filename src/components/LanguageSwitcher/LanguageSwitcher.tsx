import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [, setDirection] = useState("ltr");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLang);
    const dir = savedLang === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = savedLang;
    setDirection(dir);
  }, [i18n]);

  const changeLanguage = (newLang: string) => {
    i18n.changeLanguage(newLang);
    const dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = newLang;
    setDirection(dir);
    localStorage.setItem("language", newLang);
  };

  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn flex items-center gap-2 px-3 py-2 rounded-lg text-white bg-[#45aa6d] border-[#000000] hover:bg-[#7ab993] transition-all duration-300 text-sm sm:text-base"
      >
        <FaGlobe className="text-base sm:text-lg " />
        <span className="hidden sm:inline">{i18n.language.toUpperCase()}</span>
      </label>

      <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-auto min-w-[130px] border border-[#45aa6d]">
        <li>
          <button
            onClick={() => changeLanguage("en")}
            className="btn btn-ghost w-full text-sm sm:text-base hover:bg-[#7ab993] hover:text-white transition-colors duration-300 font-medium tracking-wide text-left"
          >
            English
          </button>
        </li>
        <li>
          <button
            onClick={() => changeLanguage("ar")}
            className="btn btn-ghost w-full text-sm sm:text-base hover:bg-[#7ab993] hover:text-white transition-colors duration-300 font-medium tracking-wide text-right"
          >
            العربية
          </button>
        </li>
      </ul>
    </div>
  );
}
