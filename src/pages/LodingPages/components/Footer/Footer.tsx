import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import LanguageSwitcher from "../../../../components/LanguageSwitcher/LanguageSwitcher";
import SubscribeInput from "../SubscribeInput/SubscribeInput";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-200 p-6 md:p-8 text-center">
      <div className="flex flex-col items-center justify-center gap-3">
        <img src="/logo.svg" alt="logo" className="h-10" />
        <p className="text-gray-700 text-xl md:text-2xl font-semibold">AI-Powered Notes</p>
      </div>

      <div className="mt-6">
        <SubscribeInput />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-center mt-10">
        <div>
          <h3 className="text-lg text-black font-semibold">{t("footer.product.title")}</h3>
          <ul className="text-gray-600 space-y-1">
            <li><Link to="/">{t("footer.product.features")}</Link></li>
            <li><Link to="/">{t("footer.product.pricing")}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg text-black font-semibold">{t("footer.resources.title")}</h3>
          <ul className="text-gray-600 space-y-1">
            <li><Link to="/">{t("footer.resources.blog")}</Link></li>
            <li><Link to="/">{t("footer.resources.guides")}</Link></li>
            <li><Link to="/">{t("footer.resources.webinars")}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg text-black font-semibold">{t("footer.company.title")}</h3>
          <ul className="text-gray-600 space-y-1">
            <li><Link to="/">{t("footer.company.about")}</Link></li>
            <li><Link to="/">{t("footer.company.contact")}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg text-black font-semibold">{t("footer.plans.title")}</h3>
          <ul className="text-gray-600 space-y-1">
            <li><Link to="/">{t("footer.plans.personal")}</Link></li>
            <li><Link to="/">{t("footer.plans.startup")}</Link></li>
            <li><Link to="/">{t("footer.plans.organization")}</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-300 mt-8 pt-4 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <LanguageSwitcher />
        <p className="text-gray-600 text-sm mt-2 md:mt-0">
          © {new Date().getFullYear()} {t("footer.copyright")}
        </p>
        <div className="flex gap-3 mt-2 md:mt-0">
          <FaFacebookF className="text-gray-600 text-xl cursor-pointer hover:text-gray-800 transition" />
          <FaTwitter className="text-gray-600 text-xl cursor-pointer hover:text-gray-800 transition" />
          <FaLinkedinIn className="text-gray-600 text-xl cursor-pointer hover:text-gray-800 transition" />
          <FaInstagram className="text-gray-600 text-xl cursor-pointer hover:text-gray-800 transition" />
        </div>
      </div>
    </footer>
  );
}
