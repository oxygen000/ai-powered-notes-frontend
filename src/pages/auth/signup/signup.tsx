import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaApple, FaFacebook } from "react-icons/fa";
import LanguageSwitcher from "../../../components/LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [role] = useState("user"); // الدور الافتراضي



  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("🚀 Starting Signup Process");

    if (password !== confirmPassword) {
      setError("❌ Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      console.log("🔗 Sending request to backend...");
      const response = await axios.post("http://localhost:5000/api/users/register", {
        name,
        username,
        email,
        password,
        role,
      });

      console.log("✅ Server Response:", response.data);

      if (response.status === 201 && response.data.redirect) {
        console.log("🔄 Redirecting to:", response.data.redirect);
        
        // 🟢 تخزين البريد الإلكتروني لاستخدامه في صفحة OTP
        localStorage.setItem("userEmail", email);

        // ✅ التوجيه إلى صفحة OTP
        navigate(response.data.redirect);
      } else {
        setError(response.data.message || "Something went wrong");
      }
    } catch (err: unknown) {
      console.error("❌ Error during signup:", err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Something went wrong. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div
    className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 bg-cover bg-center"
    style={{ backgroundImage: "url('/img/backgrondauthe.png')" }}
  >
      <Link to="/" className="absolute top-6 left-6 bg-white p-1 rounded-full text-[#33c26c] hover:text-[#7bd39e] transition">
      <IoMdArrowBack className="text-2xl" />
      </Link>
            <div className="absolute top-6 right-6">
              <LanguageSwitcher/>
            </div>

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 text-center">{t("SingUp.title")}</h2>
        <p className="text-sm text-gray-500 text-center mt-2">
        {t("SingUp.subtitle")}
        </p>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form onSubmit={handleSignup} className="mt-6 flex flex-col gap-4">
        <div className="relative">
    <FaUser className="absolute top-4 left-3 text-[#45aa6d]" />
    <input
      type="text"
      placeholder={t("SingUp.name")}
      value={name}
      onChange={(e) => setName(e.target.value)} // استخدم setName هنا
      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52AE77]"
      required
    />
  </div>

          <div className="relative">
            <FaUser className="absolute top-4 left-3 text-[#45aa6d]" />
            <input
              type="text"
              placeholder={t("SingUp.username")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52AE77]"
              required
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute top-4 left-3 text-[#45aa6d]" />
            <input
              type="email"
              placeholder={t("SingUp.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52AE77]"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-4 left-3 text-[#45aa6d]" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("SingUp.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52AE77] pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 text-[#45aa6d]  hover:text-[#66bd89] "
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative">
            <FaLock className="absolute top-4 left-3 text-[#45aa6d]  " />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t("SingUp.confirmPassword")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52AE77]  pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-3 right-3 text-[#45aa6d]  hover:text-[#66bd89]"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              loading ? "bg-[#52AE77] text-white cursor-not-allowed" : "bg-[#33c26c] hover:bg-[#7ab993] text-white"
            }`}
            disabled={loading}
          >
            {loading ? t("SingUp.signingUp") : t("SingUp.button")}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
         {t("SingUp.alreadyHaveAccount")}{" "}
          <Link to="/login" className="text-[#33c26c] hover:underline font-semibold">
          {t("SingUp.loginHere")}
          </Link>
        </p>
        <div className="flex items-center gap-4 mt-6 w-full">
  <div className="flex-grow border-t border-gray-300"></div>
  <span className="px-4 py-1  text-gray-500 font-medium rounded-full ">
  {t('SingUp.or')}
  </span>
  <div className="flex-grow border-t border-gray-300"></div>
</div>


<div className="flex flex-col gap-3 mt-4 w-full max-w-md">
  <button className="flex items-center justify-center gap-3 w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
    <FcGoogle className="w-5 h-5" />
    <span className="text-gray-700">{t('SingUp.google')}</span>
  </button>

  <button className="flex items-center justify-center gap-3 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
    <FaApple className="w-5 h-5" />
    <span>{t('SingUp.apple')}</span>
  </button>

  <button className="flex items-center justify-center gap-3 w-full py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#166fe5] transition">
    <FaFacebook className="w-5 h-5" />
    <span>{t('SingUp.facebook')}</span>
  </button>
</div>
      </div>
      

    </div>
  );
}
