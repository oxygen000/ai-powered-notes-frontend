import { useEffect, useState } from "react";
import NotesList from "./NotesList";
import { useNavigate } from "react-router-dom"; 
import { useTranslation } from "react-i18next";

export default function Home() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-[#52AE77]"></span>
      </div>
    );
  }
  return (
    <div className="min-h-screen p-2">
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
