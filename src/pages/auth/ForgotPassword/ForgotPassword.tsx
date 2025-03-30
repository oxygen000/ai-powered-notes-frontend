import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa";
import LanguageSwitcher from "../../../components/LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { t } = useTranslation();

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    setTimeout(() => {
      setMessage(t("ForgotPassword.success"));
      setLoading(false);
    }, 1500);
  };

  return (
    <div
    className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 bg-cover bg-center"
    style={{ backgroundImage: "url('/img/backgrondauthe.png')" }}
  >
      <Link to="/" className="btn btn-circle text-[#ffffff] hover:text-[#ffffff] bg-[#45aa6d] btn-outline absolute top-6 left-6">
        <IoMdArrowBack className="text-xl" />
      </Link>

            <div className="absolute top-6 right-6">
              <LanguageSwitcher/>
            </div>

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 text-center">{t("ForgotPassword.title")}</h2>
        <p className="text-sm text-gray-500 text-center mt-2">
        {t("ForgotPassword.subtitle")}
          </p>

        {message && <p className="text-green-500 text-center mt-4">{message}</p>}

        <form onSubmit={handleResetPassword} className="mt-6 flex flex-col gap-4">
          <div className="relative">
            <FaEnvelope className="absolute top-4 left-3 text-[#45aa6d]" />
            <input
              type="email"
              placeholder={t("ForgotPassword.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-black p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33c26c]"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              loading ? "bg-[#52AE77] text-white cursor-not-allowed" : "bg-[#33c26c] hover:bg-[#7ab993] text-white"
            }`}
            disabled={loading}
          >
            {loading ? t("ForgotPassword.sending") : t("ForgotPassword.button")}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          {t("ForgotPassword.remembered")}{" "}
          <Link to="/login" className="text-[#33c26c] hover:underline font-semibold">
          {t("ForgotPassword.loginHere")}
          </Link>
        </p>
      </div>
    </div>
  );
}
