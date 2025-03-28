import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Nav() {
  const { t } = useTranslation();

  return (
    <nav className="bg-white shadow w-full flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
      <Link to="/" className="flex items-center gap-2 md:gap-3">
        <img src="/logo.svg" alt="Logo" className="h-8 md:h-10" />
        <h1 className="text-lg md:text-xl font-semibold text-gray-700 whitespace-nowrap">
          AI-Powered Notes
        </h1>
      </Link>

      <div className="flex gap-2 md:gap-4">
        <Link
          to="/signup"
          className="bg-[#52AE77] px-4 md:px-6 py-2 rounded-md text-white font-medium text-sm md:text-base hover:bg-[#419a66] transition"
        >
          {t("signIn")}
        </Link>
        <Link
          to="/login"
          className="bg-[#52AE77] px-4 md:px-6 py-2 rounded-md text-white font-medium text-sm md:text-base hover:bg-[#419a66] transition"
        >
          {t("login")}
        </Link>
      </div>
    </nav>
  );
}
