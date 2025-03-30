import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Nav() {
  const { t } = useTranslation();

  return (
    <nav className="bg-white shadow w-full flex items-center justify-between px-4 md:px-6 py-2 md:py-4">
    <Link to="/" className="flex items-center gap-2 md:gap-3">
      <img src="/logo.svg" alt="Logo" className="h-7 md:h-10" />
      <h1 className="text-sm md:text-xl font-semibold text-gray-700 whitespace-nowrap">
        AI-Powered Notes
      </h1>
    </Link>

    <div className="flex gap-2 md:gap-4">
      <Link
        to="/signup"
        className="bg-[#52AE77] px-3 py-1.5 md:px-6 md:py-2 rounded-md text-white font-medium text-xs md:text-sm border-[#000000] border-2 hover:bg-[#7ab993] transition"
      >
        {t("signIn")}
      </Link>
      <Link
        to="/login"
        className="bg-[#52AE77] px-3 py-1.5 md:px-6 md:py-2 rounded-md text-white font-medium text-xs md:text-sm border-[#000000] border-2 hover:bg-[#7ab993] transition"
      >
        {t("login")}
      </Link>
    </div>
  </nav>
  );
}
