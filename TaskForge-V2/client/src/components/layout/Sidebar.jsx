import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaTasks,
  FaFolderOpen,
  FaCog,
} from "react-icons/fa";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Projects",
    path: "/projects",
    icon: <FaProjectDiagram />,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: <FaTasks />,
  },
  {
    name: "Files",
    path: "/files",
    icon: <FaFolderOpen />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <FaCog />,
  },
];

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-center">
          🚀 TaskForge
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700 text-center text-sm text-gray-400">
        TaskForge v1.0
      </div>

    </aside>
  );
}

export default Sidebar;