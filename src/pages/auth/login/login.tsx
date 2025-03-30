import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { IoMdArrowBack } from "react-icons/io";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import LanguageSwitcher from "../../../components/LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

interface UserData {
  token: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  username: string;
  message?: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const response = await axios.post<UserData>("http://localhost:5000/api/users/login", {
        email,
        password,
      });
  
      const { token, name, email: userEmail, role, avatar, username, message } = response.data;
  
      if (!token) {
        setError(message || t("Login.error"));
        toast.error(message || t("Login.error"));
        return;
      }
  
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ name, email: userEmail, role, avatar, username }));
  
      toast.success(t("Login.success"));
      navigate("/home");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message?: string }>;
        setError(axiosError.response?.data?.message || t("Login.serverError"));
        toast.error(axiosError.response?.data?.message || t("Login.serverError"));
      } else {
        setError(t("Login.connectionError"));
        toast.error(t("Login.connectionError"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-3 py-4 sm:p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/img/backgrondauthe.png')" }}
    >
      <Link to="/" className="btn btn-circle text-white hover:bg-[#7ab993] bg-[#45aa6d] btn-outline absolute top-4 sm:top-6 left-4 sm:left-6">
        <IoMdArrowBack className="text-lg sm:text-xl" />
      </Link>

      <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
        <LanguageSwitcher />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">{t("Login.title")}</h2>
        <p className="text-xs sm:text-sm text-gray-500 text-center mt-1 sm:mt-2">{t("Login.subtitle")}</p>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form onSubmit={handleLogin} className="mt-4 sm:mt-6 flex flex-col gap-3 sm:gap-4">
          <div className="relative">
            <FaEnvelope className="absolute top-3 sm:top-4 left-3 text-[#45aa6d] text-sm sm:text-base" />
            <input
              type="email"
              placeholder={t("Login.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 sm:p-3 pl-8 sm:pl-10 border text-[#385243] border-gray-300 rounded-lg focus:ring-2 focus:ring-[#33c26c]"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-3 sm:top-4 left-3 text-[#45aa6d] text-sm sm:text-base" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("Login.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 sm:p-3 pl-8 sm:pl-10 border text-[#385243] border-gray-300 rounded-lg focus:ring-2 focus:ring-[#33c26c] pr-8 sm:pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-2.5 sm:top-3 right-2 sm:right-3 text-[#45aa6d] text-sm sm:text-base"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex justify-between items-center text-xs sm:text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" checked={stayLoggedIn} onChange={() => setStayLoggedIn(!stayLoggedIn)} className="checkbox checkbox-success" />
              {t("Login.stayLoggedIn")}
            </label>
            <Link to="/forgotpassword" className="text-[#33c26c] hover:underline">
              {t("Login.forgotPassword")}
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full py-2 sm:py-3 border-2 border-black rounded-lg font-semibold transition-all ${
              loading ? "bg-[#52AE77] text-white cursor-not-allowed" : "bg-[#33c26c] hover:bg-[#7ab993] text-white"
            }`}
            disabled={loading}
          >
            {loading ? t("Login.login") : t("Login.button")}
          </button>
        </form>

        <p className="text-center text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4">
          {t("Login.alreadyHaveAccount")}{" "}
          <Link to="/signup" className="text-[#33c26c] hover:underline font-semibold">
            {t("Login.loginHere")}
          </Link>
        </p>

        <div className="flex items-center gap-2 sm:gap-4 mt-4 sm:mt-6 w-full">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-2 sm:px-4 py-0.5 sm:py-1 text-gray-500 font-medium">{t("Login.or")}</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex flex-col gap-3 mt-4 w-full max-w-md">
          <button className="flex items-center border-[#000000] border-2 justify-center gap-3 w-full py-2  rounded-lg hover:bg-gray-200 transition">
            <FcGoogle className="w-5 h-5" />
            <span className="text-gray-700">{t('SingUp.google')}</span>
          </button>
        
          <button className="flex items-center justify-center  gap-3 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
            <FaApple className="w-5 h-5" />
            <span>{t('SingUp.apple')}</span>
          </button>
        
          <button className="flex items-center justify-center gap-3 w-full py-2 border-[#000000] border-2  bg-[#1877F2] text-white rounded-lg hover:bg-[#166fe5] transition">
            <FaFacebook className="w-5 h-5" />
            <span>{t('SingUp.facebook')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
