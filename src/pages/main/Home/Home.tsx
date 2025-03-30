import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import NotesList from "./NotesList";
import { useNavigate } from "react-router-dom"; // Vite يستخدم React Router

export default function Home() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // استخدم useNavigate بدلاً من useRouter

  const fetchUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token"); // جلب التوكن من LocalStorage
      const response = await axios.get("http://localhost:5000/api/users/profile", {
        withCredentials: true, // إرسال ملفات تعريف الارتباط
        headers: token ? { Authorization: `Bearer ${token}` } : {}, // إضافة التوكن إذا كان موجودًا
      });

      setUser(response.data);
    } catch (error) {
      console.error("❌ Authentication error:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate("/login"); // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]); // أضف `navigate` لأنه يتم استخدامه داخل `fetchUser`

  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // ✅ أضف `fetchUser` كمُعتمد

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
      <span className="loading loading-spinner text-[#52AE77]"></span>
    </div>
    
    );
  }

  return (
    <div className="min-h-screen  p-2">
      <div className="max-w-4xl mx-auto rounded-lg p-2">
        {user ? (
          <>
            <h1 className="text-2xl text-black font-bold mb-4">مرحبًا، {user.name}! 👋</h1>
            <p className="text-gray-600 mb-6">يمكنك الآن الوصول إلى ملاحظاتك.</p>
            <NotesList />
          </>
        ) : (
          <p className="text-red-500 text-center">❌ لم يتم تسجيل الدخول. سيتم تحويلك إلى صفحة تسجيل الدخول.</p>
        )}
      </div>
    </div>
  );
}
