import { useState, useContext } from "react";

import {
  FaTachometerAlt,
  FaUsers,
  FaTasks,
  FaCalendarCheck,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaClipboardList,
  FaUserShield,
  FaChartBar,
  FaUserCircle,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

function Sidebar() {

  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [collapsed, setCollapsed] = useState(false);

  // ================= HANDLE LOGOUT =================

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ================= MENU ITEMS (role-based) =================

  const allMenuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
      roles: ["admin", "employee"],
    },
    {
      name: "Employees",
      path: "/employees",
      icon: <FaUsers />,
      roles: ["admin"],
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: <FaTasks />,
      roles: ["admin", "employee"],
    },
    {
      name: "Projects",
      path: "/projects",
      icon: <FaClipboardList />,
      roles: ["admin", "employee"],
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FaChartBar />,
      roles: ["admin"],
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: <FaCalendarCheck />,
      roles: ["admin", "employee"],
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />,
      roles: ["admin", "employee"],
    },
  ];

  // Filter menu items based on user role
  const menuItems = allMenuItems.filter(
    (item) => !user?.role || item.roles.includes(user.role)
  );

  const avatarLetter = user?.name?.charAt(0)?.toUpperCase() || "U";
  const displayName = user?.name?.split(" ")[0] || "User";
  const displayRole = user?.role === "admin" ? "Administrator" : "Employee";

  return (
    <aside
      className={`h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white flex flex-col justify-between transition-all duration-300 border-r border-gray-800 sticky top-0
      ${collapsed ? "w-24" : "w-72"}`}
    >

      {/* Top */}
      <div>

        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-gray-800">

          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <FaUserShield className="text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-wide">EMS</h1>
                <p className="text-xs text-gray-400">Management System</p>
              </div>
            </div>
          )}

          {/* Collapse Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition"
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>

        </div>

        {/* User Profile Card */}
        {!collapsed && (
          <div className="mx-4 mt-6 bg-gray-800 rounded-2xl p-4 flex items-center gap-4">

            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="profile"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500"
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl border-2 border-blue-500 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                {avatarLetter}
              </div>
            )}

            <div>
              <h2 className="font-semibold">{displayName}</h2>
              <p className="text-sm text-gray-400">{displayRole}</p>
            </div>

          </div>
        )}

        {/* Collapsed Avatar */}
        {collapsed && (
          <div className="flex justify-center mt-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold border-2 border-blue-500">
              {avatarLetter}
            </div>
          </div>
        )}

        {/* Menu */}
        <div className="mt-8 flex flex-col gap-2 px-4">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg"
                    : "hover:bg-gray-800"
                }`
              }
              title={collapsed ? item.name : ""}
            >
              {/* Icon */}
              <span className="text-xl">{item.icon}</span>

              {/* Text */}
              {!collapsed && (
                <span className="font-medium text-sm tracking-wide">
                  {item.name}
                </span>
              )}
            </NavLink>
          ))}
        </div>

      </div>

      {/* Bottom — Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 px-4 py-4 rounded-2xl transition font-medium shadow-lg"
        >
          <FaSignOutAlt />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;