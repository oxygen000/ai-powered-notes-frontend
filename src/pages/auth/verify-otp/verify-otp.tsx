import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack, IoMdRefresh, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../../components/LanguageSwitcher/LanguageSwitcher";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [email] = useState("test@example.com"); 
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);
  const [message, setMessage] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleVerifyOTP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("✅ OTP verified successfully!");
    setTimeout(() => {
      navigate("/account-activated");
    }, 2000);
    setLoading(false);
  };

  

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/img/backgrondauthe.png')" }}
    >
      <button
        onClick={() => navigate(-1)}
        className="btn btn-circle text-white hover:bg-[#7ab993] bg-[#45aa6d] btn-outline absolute top-4 sm:top-6 left-4 sm:left-6"
      >
        <IoMdArrowBack className="text-2xl sm:text-3xl" />
      </button>
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
              <LanguageSwitcher />
            </div>

      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">{t("VerifyOTP.title")}</h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          {email ? `📩 ${t("VerifyOTP.subtitle")} ${email}` : t("VerifyOTP.noEmail")}
        </p>

        {message && <p className="text-green-500 text-center mt-2">{message}</p>}

        <form onSubmit={handleVerifyOTP} className="mt-6 flex flex-col gap-4">
          <input
            type="text"
            placeholder={t("VerifyOTP.otpPlaceholder")}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full text-[#385243] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52AE77]"
            required
          />

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
              loading ? "bg-[#52AE77] text-white cursor-not-allowed" : "bg-[#33c26c] hover:bg-[#7ab993] text-white"
            }`}
            disabled={loading}
          >
            {loading ? (
              <span>{t("VerifyOTP.verifying")}...</span>
            ) : (
              <>
                <IoMdCheckmarkCircleOutline className="text-xl" /> {t("VerifyOTP.verifyButton")}
              </>
            )}
          </button>
        </form>

        <button
          className={`w-full mt-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
            resendCooldown > 0 ? "bg-gray-400 text-white cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          disabled={resendCooldown > 0}
        >
          {resendCooldown > 0 ? <span>⏳ {resendCooldown}s</span> : <><IoMdRefresh className="text-xl" /> Resend OTP</>}
        </button>
      </div>
    </div>
  );
}
