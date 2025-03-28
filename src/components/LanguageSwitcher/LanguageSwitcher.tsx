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
    setDirection(dir);
  }, [i18n]);

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    const dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    setDirection(dir);
    localStorage.setItem("language", newLang);
  };

  return (
    <div className="relative inline-block bg-white rounded-lg p-2">
      <div className="flex items-center border border-none  px-3 py-2  ">
        <FaGlobe className="text-[#45aa6d]  text-lg mr-2 rtl:ml-2 " />

        <select
          value={i18n.language}
          onChange={changeLanguage}
          className="px-4 py text-[#45aa6d] text-sm max-w-28 "

        >
          <option value="en"> English</option>
          <option value="ar"> العربية</option>
        </select>
      </div>
    </div>
  );
}
