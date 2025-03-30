import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import NotesList from "./NotesList";
import { useNavigate } from "react-router-dom"; 
import { useTranslation } from "react-i18next";

export default function Home() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate(); 
  const fetchUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.get("http://localhost:5000/api/users/profile", {
        withCredentials: true, 
        headers: token ? { Authorization: `Bearer ${token}` } : {}, 
      });

      setUser(response.data);
    } catch (error) {
      console.error("❌ Authentication error:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate("/login"); 
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]); 

  useEffect(() => {
    fetchUser();
  }, [fetchUser]); 

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
            <h1 className="text-2xl text-black font-bold mb-4">{t("HomeAi.hello")} {user.name}! 👋</h1>
            <p className="text-gray-600 mb-6">{t("HomeAi.hellonow")}</p>
            <NotesList />
          </>
        ) : (
          <p className="text-red-500 text-center">{t("HomeAi.errorlogin")}</p>
        )}
      </div>
    </div>
  );
}
