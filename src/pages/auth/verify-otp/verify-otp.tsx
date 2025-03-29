import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack, IoMdRefresh, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      setError("❌ No email found. Please sign up again.");
    }
  }, []);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // ✅ التحقق من OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
  
    try {
      const response = await axios.post("http://localhost:5000/api/users/verify-otp", { email, otp });
  
      console.log("🔍 Response:", response.data); // ✅ تحقق من البيانات المستلمة
  
      if (response.data.message === "تم تفعيل الحساب بنجاح!") { // ✅ تحقق من الرسالة مباشرة
        setMessage("✅ Account activated successfully!");
        localStorage.removeItem("userEmail");
  
        // ✅ تأخير بسيط قبل التوجيه
        setTimeout(() => {
          navigate("/account-activated");
        }, 2000); 
      } else {
        setError(response.data.message || "❌ Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("❌ Server error:", err);
      setError("❌ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  

  // ✅ إعادة إرسال OTP
  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    if (!email) {
      setError("❌ No email found. Please sign up again.");
      return;
    }
  
    setResendLoading(true);
    setError("");
    setMessage("");
  
    try {
      const response = await axios.post("http://localhost:5000/api/users/resend-otp", { email });
  
      console.log("🔄 Resend Response:", response.data);
  
      if (response.data.success) {
        setMessage("✅ A new OTP has been sent to your email."); // ✅ تصحيح التخزين كنص
        setResendCooldown(30);
      } else {
        setError(response.data.message || "❌ Failed to resend OTP. Please try again.");
      }
    } catch (err) {
      console.error("❌ Server error:", err);
      setError("❌ Server error. Please try again later.");
    } finally {
      setResendLoading(false);
    }
  };
  
  
  

  return (
    
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/img/backgrondauthe.png')" }}
    >
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 bg-white p-2 rounded-full text-[#33c26c] hover:text-[#7bd39e] transition"
      >
        <IoMdArrowBack className="text-2xl" />
      </button>

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 text-center">{t("VerifyOTP.title")}</h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          {email ? `📩 ${t("VerifyOTP.subtitle")} ${email}` : t("VerifyOTP.noEmail")}
        </p>

        {message && <p className="text-green-500 text-center mt-2">{message}</p>}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form onSubmit={handleVerifyOTP} className="mt-6 flex flex-col gap-4">
          <input
            type="text"
            placeholder={t("VerifyOTP.otpPlaceholder")}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full text-[#385243]  p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52AE77]"
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

        {/* ✅ زر إعادة إرسال OTP */}
        <button
          onClick={handleResendOTP}
          className={`w-full mt-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
            resendCooldown > 0
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          disabled={resendCooldown > 0 || resendLoading}
        >
          {resendLoading ? (
            <span>🔄 Resending...</span>
          ) : resendCooldown > 0 ? (
            <span>⏳ {resendCooldown}s</span>
          ) : (
            <>
              <IoMdRefresh className="text-xl" /> {t("VerifyOTP.resendButton")}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
