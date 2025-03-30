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
  const [email, setEmail] = useState<string>(""); // ✅ تحديد نوع `email`
  const [password, setPassword] = useState<string>(""); // ✅ تحديد نوع `password`
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("❌ No token found, redirecting to login...");
      navigate("/login");
    } else {
      console.log("✅ Token found:", token);
    }
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
  
      console.log("🔹 Server Response:", response.data);
  
      const { token, name, email: userEmail, role, avatar, username, message } = response.data;
  
      if (!token) {
        setError(message || "⚠️ البريد الإلكتروني أو كلمة المرور غير صحيحة.");
        toast.error(message || "⚠️ البريد الإلكتروني أو كلمة المرور غير صحيحة.");
        return;
      }
  
      // ✅ حفظ بيانات المستخدم في localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ name, email: userEmail, role, avatar, username }));
  
      console.log("🔹 Stored User Data:", JSON.parse(localStorage.getItem("user") || "{}"));
  
      // ✅ عرض إشعار نجاح باستخدام `toast`
      toast.success("✅ تسجيل الدخول ناجح!");
  
      navigate("/home");
    } catch (err: unknown) {
      console.error("❌ خطأ أثناء تسجيل الدخول:", err);
  
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message?: string }>;
        const errorMsg = axiosError.response?.data?.message || "❌ حدث خطأ ما. يرجى المحاولة مرة أخرى.";
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        setError("❌ لا يمكن الاتصال بالخادم.");
        toast.error("❌ لا يمكن الاتصال بالخادم.");
      }
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 bg-cover bg-center"
    style={{ backgroundImage: "url('/img/backgrondauthe.png')" }}
  >
    <Link to="/" className="btn btn-circle text-[#ffffff] hover:text-[#ffffff] bg-[#45aa6d] btn-outline absolute top-6 left-6">
      <IoMdArrowBack className="text-xl" />
    </Link>

    <div className="absolute top-6 right-6">
      <LanguageSwitcher />
    </div>

    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h2 className="text-3xl font-bold text-gray-900 text-center">{t("Login.title")}</h2>
      <p className="text-sm text-gray-500 text-center mt-2">{t("Login.subtitle")}</p>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
        <div className="relative">
          <FaEnvelope className="absolute top-4 left-3 text-[#45aa6d]" />
          <input
            type="email"
            placeholder={t("Login.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 pl-10 border text-[#385243] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33c26c]"
            required
          />
        </div>

        <div className="relative">
          <FaLock className="absolute top-4 left-3 text-[#45aa6d]" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder={t("Login.password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pl-10 border text-[#385243] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33c26c] pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-3 right-3 text-[#45aa6d] hover:text-[#66bd89]"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="flex justify-between items-center">
          <label className="flex items-center gap-2 text-gray-600 text-sm">
          <input type="checkbox" checked={stayLoggedIn} onChange={() => setStayLoggedIn(!stayLoggedIn)} className="checkbox checkbox-success" />
            {t("Login.stayLoggedIn")}
          </label>
          <Link to="/forgotpassword" className="text-sm text-[#33c26c] hover:underline">
            {t("Login.forgotPassword")}
          </Link>
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-semibold transition-all ${
            loading ? "bg-[#52AE77] text-white cursor-not-allowed" : "bg-[#33c26c] hover:bg-[#7ab993] text-white"
          }`}
          disabled={loading}
        >
          {loading ? t("Login.login") : t("Login.button")}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        {t("Login.alreadyHaveAccount")}{" "}
        <Link to="/signup" className="text-[#33c26c] hover:underline font-semibold">
          {t("Login.loginHere")}
        </Link>
      </p>

      <div className="flex items-center gap-4 mt-6 w-full">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-4 py-1 text-gray-500 font-medium rounded-full">{t("Login.or")}</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="flex flex-col gap-3 mt-4 w-full max-w-md">
        <button className="flex items-center justify-center gap-3 w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
          <FcGoogle className="w-5 h-5" />
          <span className="text-gray-700">{t("Login.google")}</span>
        </button>

        <button className="flex items-center justify-center gap-3 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
          <FaApple className="w-5 h-5" />
          <span>{t("Login.apple")}</span>
        </button>

        <button className="flex items-center justify-center gap-3 w-full py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#166fe5] transition">
          <FaFacebook className="w-5 h-5" />
          <span>{t("Login.facebook")}</span>
        </button>
      </div>
    </div>
  </div>
  );
}



