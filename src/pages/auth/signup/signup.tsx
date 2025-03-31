import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaApple, FaFacebook } from "react-icons/fa";
import LanguageSwitcher from "../../../components/LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("❌ Passwords do not match");
      return;
    }

    console.log("User Data:", { name, username, email, password });
    // Simulating a successful signup process
    navigate("/otp");
  };
  

  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 bg-cover bg-center"
     style={{ backgroundImage: "url('/img/backgrondauthe.png')" }}>
  
  <Link to="/" className="btn btn-circle text-white bg-[#45aa6d] btn-outline absolute top-4 left-4 md:top-6 md:left-6">
    <IoMdArrowBack className="text-lg md:text-xl" />
  </Link>

  <div className="absolute top-4 right-4 md:top-6 md:right-6">
    <LanguageSwitcher />
  </div>

  <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm sm:max-w-md">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">{t("SingUp.title")}</h2>
    <p className="text-xs md:text-sm text-gray-500 text-center mt-2">{t("SingUp.subtitle")}</p>

    {error && <p className="text-red-500 text-center text-sm mt-2">{error}</p>}

    <form onSubmit={handleSignup} className="mt-4 flex flex-col gap-3">
      <div className="relative">
        <FaUser className="absolute top-3 left-3 text-[#45aa6d]" />
        <input type="text" placeholder={t("SingUp.name")} value={name} onChange={(e) => setName(e.target.value)}
               className="w-full text-[#385243] p-2 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52AE77]" required />
      </div>

      <div className="relative">
        <FaUser className="absolute top-3 left-3 text-[#45aa6d]" />
        <input type="text" placeholder={t("SingUp.username")} value={username} onChange={(e) => setUsername(e.target.value)}
               className="w-full text-[#385243] p-2 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52AE77]" required />
      </div>

      <div className="relative">
        <FaEnvelope className="absolute top-3 left-3 text-[#45aa6d]" />
        <input type="email" placeholder={t("SingUp.email")} value={email} onChange={(e) => setEmail(e.target.value)}
               className="w-full text-[#385243] p-2 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52AE77]" required />
      </div>

      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-[#45aa6d]" />
        <input type={showPassword ? "text" : "password"} placeholder={t("SingUp.password")} value={password} onChange={(e) => setPassword(e.target.value)}
               className="w-full text-[#385243] p-2 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52AE77] pr-10" required />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-3 right-3 text-[#45aa6d]">
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-[#45aa6d]" />
        <input type={showConfirmPassword ? "text" : "password"} placeholder={t("SingUp.confirmPassword")} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
               className="w-full text-[#385243] p-2 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52AE77] pr-10" required />
        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute top-3 right-3 text-[#45aa6d]">
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <button type="submit" className="w-full py-2 bg-[#33c26c] border-2 border-black text-white rounded-lg">
        {t("SingUp.button")}</button>

    </form>

    <p className="text-center text-xs md:text-sm text-gray-600 mt-4">
      {t("SingUp.alreadyHaveAccount")}{" "}
      <Link to="/login" className="text-[#33c26c] hover:underline font-semibold">
        {t("SingUp.loginHere")}
      </Link>
    </p>

    <div className="flex items-center gap-4 mt-4 w-full">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="px-4 text-xs md:text-sm text-gray-500 font-medium">{t('SingUp.or')}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>

    <div className="flex flex-col gap-2 mt-4 w-full">
      <button className="flex items-center justify-center gap-3 w-full py-2 border border-black text-sm rounded-lg hover:bg-gray-200 transition">
        <FcGoogle className="w-5 h-5" />
        <span className="text-gray-700">{t('SingUp.google')}</span>
      </button>

      <button className="flex items-center justify-center gap-3 w-full py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition">
        <FaApple className="w-5 h-5" />
        <span>{t('SingUp.apple')}</span>
      </button>

      <button className="flex items-center justify-center gap-3 w-full py-2 border border-black bg-[#1877F2] text-white text-sm rounded-lg hover:bg-[#166fe5] transition">
        <FaFacebook className="w-5 h-5" />
        <span>{t('SingUp.facebook')}</span>
      </button>
    </div>
  </div>
</div>

  );
}
