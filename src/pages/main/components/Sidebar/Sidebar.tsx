import { Link, useLocation } from "react-router-dom";
import { FaHome, FaStickyNote, FaStar, FaTimes } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

export default function Sidebar({ isOpen, closeSidebar }: SidebarProps) {
  const location = useLocation();
    const { t } = useTranslation();
  
  const menuItems = [
    { name: t("Sidebar.Home"), path: "/home", icon: <FaHome /> },
    { name: t("Sidebar.Notes"), path: "/notes", icon: <FaStickyNote /> },
    { name: t("Sidebar.Favorites"), path: "/favorites", icon: <FaStar /> },
    { name: t("Sidebar.MyNote"), path: "/my-notes", icon: <LuNotebookPen  /> },
  ];

  return (
    <div>
      {isOpen && <div className="fixed inset-0 bg-black/90 z-20 md:hidden " onClick={closeSidebar} />}

      <div className={`bg-[#52AE77] border-2 border-black text-white h-screen  w-64 p-4 fixed top-0 left-0 z-30 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 md:relative`}>
        <button onClick={closeSidebar} className="text-white text-2xl p-2  absolute top-4 right-4  md:hidden">
          <FaTimes />
        </button>

        <h1 className="text-2xl font-bold mt-12">{t("Sidebar.Title")}</h1>
        <nav className="space-y-2 mt-4">
  {menuItems.map((item) => (
    <Link 
      key={item.path} 
      to={item.path} 
      onClick={closeSidebar} 
      className={`flex items-center gap-3 p-2 rounded-md hover:opacity-75 hover:border-b-4 transition-all duration-[100ms] ${
        location.pathname === item.path ? "border-b-4" : ""
      }`}
    >
      {item.icon} {item.name}
    </Link>
  ))}
</nav>

      </div>
    </div>
  );
}
