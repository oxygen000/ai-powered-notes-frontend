import { Link } from "react-router-dom";
import { FaBars, FaSearch, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Menu } from "@headlessui/react";

export default function Nav({ toggleSidebar }: { toggleSidebar: () => void }) {
  const userName = localStorage.getItem("userName") || "User";
  const userEmail = localStorage.getItem("userEmail") || "user@example.com";
  const userImage = localStorage.getItem("userImage") || "/default-avatar.png";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userImage");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white shadow w-full flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
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
        <button className="text-gray-600 hover:text-gray-800 text-xl transition">
          <FaSearch />
        </button>

        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center gap-2 cursor-pointer focus:outline-none">
            <img
              src={userImage}
              alt="User"
              title="Profile"
              className="w-10 h-10 rounded-full border border-gray-300 hover:shadow-md transition"
            />
          </Menu.Button>

          <Menu.Items className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
            <div className="px-4 py-3 text-gray-700 text-sm">
              <p className="font-medium">{userName}</p>
              <p className="text-xs text-gray-500">{userEmail}</p>
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
