import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Profile() {
  const [user, setUser] = useState({ name: "", email: "", avatar: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://server-p97f6rgqo-oxygen000s-projects.vercel.app/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("❌ خطأ أثناء جلب البيانات:", error);
      toast.error("فشل تحميل البيانات");
    } finally {
      setLoading(false);
    }
  };


  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("❌ لا يوجد توكن");

      await axios.put(
        "http://localhost:5000/api/users/profile",
        { name: user.name, email: user.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("تم حفظ التغييرات بنجاح!");
    } catch (error) {
      console.error("❌ خطأ أثناء حفظ التغييرات:", error);
      toast.error("فشل حفظ التغييرات");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-[#52AE77]"></span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="card w-full max-w-md bg-white shadow-xl p-6 rounded-lg">
        <div className="flex flex-col items-center">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-[#52AE77] ring-offset-base-100 ring-offset-2">
              <img src='/img/profile.jpg' alt="User Avatar" />
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            className="mt-3 file-input file-input-bordered file-input-primary  w-full max-w-xs"
            onChange={(e) => console.log(e.target.files?.[0])}
          />
        </div>

        <div className="mt-6 space-y-4">
          <div className="form-control">
            <label className="label"><span className="label-text">الاسم</span></label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={user.name}
              onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>
          
          <div className="form-control">
            <label className="label"><span className="label-text">البريد الإلكتروني</span></label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={user.email}
              onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
            />
          </div>
        </div>

        <button
          onClick={handleSaveChanges}
          disabled={saving}
          className="btn btn-primary w-full mt-6 bg-[#52AE77] border-none hover:bg-[#469a66]"
        >
          {saving ? "جارٍ الحفظ..." : "حفظ التغييرات"}
        </button>
      </div>
    </div>
  );
}