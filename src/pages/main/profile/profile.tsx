import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    job: "",
    address: "",
    avatar: "/img/profile.jpg",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const storedUser = {
      name: localStorage.getItem("userName") || "",
      email: localStorage.getItem("userEmail") || "",
      phone: localStorage.getItem("userPhone") || "",
      job: localStorage.getItem("userJob") || "",
      address: localStorage.getItem("userAddress") || "",
      avatar: localStorage.getItem("userImage") || "/img/profile.jpg",
    };
    setUser(storedUser);
  }, []);

  const handleSaveChanges = () => {
    setSaving(true);
    try {
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userPhone", user.phone);
      localStorage.setItem("userJob", user.job);
      localStorage.setItem("userAddress", user.address);
      toast.success("Changes saved successfully!");
    } catch (error) {
      console.error("❌ Error saving changes:", error);
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center space-y-4 md:col-span-1">
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user.avatar} alt="User Avatar" />
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered file-input-success bg-white text-black w-full max-w-xs "
            onChange={(e) => console.log(e.target.files?.[0])}
          />
        </div>

        {/* User Details Section */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label"><span className="label-text text-black">Name</span></label>
            <input
              type="text"
              className="input input-bordered w-full border-gray-300 bg-white text-black"
              value={user.name}
              onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>
          
          <div className="form-control">
            <label className="label"><span className="label-text text-black">Email</span></label>
            <input
              type="email"
              className="input input-bordered w-full border-gray-300 bg-white text-black"
              value={user.email}
              onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text text-black">Phone</span></label>
            <input
              type="text"
              className="input input-bordered w-full border-gray-300 bg-white text-black"
              value={user.phone}
              onChange={(e) => setUser((prev) => ({ ...prev, phone: e.target.value }))}
            />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text text-black">Job Title</span></label>
            <input
              type="text"
              className="input input-bordered w-full border-gray-300 bg-white text-black"
              value={user.job}
              onChange={(e) => setUser((prev) => ({ ...prev, job: e.target.value }))}
            />
          </div>

          <div className="form-control md:col-span-2">
            <label className="label"><span className="label-text text-black">Address</span></label>
            <input
              type="text"
              className="input input-bordered w-full border-gray-300 bg-white text-black"
              value={user.address}
              onChange={(e) => setUser((prev) => ({ ...prev, address: e.target.value }))}
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSaveChanges}
        disabled={saving}
        className="btn btn-primary  mt-6 text-lg bg-[#52AE77] border-[#000000] hover:bg-[#7ab993] border "
      >
        {saving ? "Saving..." : "Save "}
      </button>
    </div>
  );
}