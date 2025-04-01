import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Menu } from "@headlessui/react";
import { useEffect, useState } from "react";

export default function Nav({ toggleSidebar }: { toggleSidebar: () => void }) {
  const userImage = localStorage.getItem("userImage") || "/img/profile.jpg";
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (storedUser?.name && storedUser?.email) {
        setUser(storedUser);
      }
    }
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userImage");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white shadow border-b-2 border-black  w-full flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
      <button onClick={toggleSidebar} className="text-gray-600 hover:text-gray-800 text-2xl transition md:hidden">
        <FaBars />
      </button>
      <Link to="/home" className="flex items-center gap-2 md:gap-3">
        <img src="/logo.svg" alt="Logo" className="h-8 md:h-10" />
        <h1 className="text-lg md:text-xl font-semibold text-gray-700 whitespace-nowrap">
          AI-Powered Notes
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center gap-2 cursor-pointer focus:outline-none">
            <img
              src={userImage} 
              alt="User"
              title="Profile"
              className="w-10 h-10 rounded-full border-2 border-black hover:shadow-md transition"
            />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
            <div className="px-4 py-3 text-gray-700 text-sm">
              <p className="font-medium">{user?.name || "No name available"}</p>
              <p className="text-xs text-gray-500">{user?.email || "No email available"}</p>
            </div>
            <div className="border-t"></div>
            <Menu.Item>
              {({ active }) => (
                <Link to="/profile" className={`flex items-center gap-2 px-4 py-2 text-gray-700 ${active ? "bg-gray-100" : ""}`}>
                  <FaUser />
                  Profile
                </Link>
              )}
            </Menu.Item>
            <div className="border-t"></div>
            <Menu.Item>
              {({ active }) => (
                <button onClick={handleLogout} className={`w-full flex items-center gap-2 px-4 py-2 text-red-600 ${active ? "bg-gray-100" : ""}`}>
                  <FiLogOut />
                  Logout
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </nav>
  );
}
