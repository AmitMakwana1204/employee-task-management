import { useState } from "react";

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
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Sidebar() {

  const [collapsed, setCollapsed] =
    useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Employees",
      path: "/employees",
      icon: <FaUsers />,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: <FaTasks />,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: <FaClipboardList />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FaChartBar />,
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: <FaCalendarCheck />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <aside
      className={`h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white flex flex-col justify-between transition-all duration-300 border-r border-gray-800 sticky top-0
      ${
        collapsed
          ? "w-24"
          : "w-72"
      }`}
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

                <h1 className="text-2xl font-bold tracking-wide">
                  EMS
                </h1>

                <p className="text-xs text-gray-400">
                  Management System
                </p>

              </div>

            </div>

          )}

          {/* Collapse Button */}
          <button
            onClick={() =>
              setCollapsed(
                !collapsed
              )
            }
            className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition"
          >

            {collapsed ? (
              <FaChevronRight />
            ) : (
              <FaChevronLeft />
            )}

          </button>

        </div>

        {/* User */}
        {!collapsed && (

          <div className="mx-4 mt-6 bg-gray-800 rounded-2xl p-4 flex items-center gap-4">

            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="profile"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500"
            />

            <div>

              <h2 className="font-semibold">
                Amit
              </h2>

              <p className="text-sm text-gray-400">
                Administrator
              </p>

            </div>

          </div>

        )}

        {/* Menu */}
        <div className="mt-8 flex flex-col gap-2 px-4">

          {menuItems.map(
            (item, index) => (

              <NavLink
                key={index}
                to={item.path}

                className={({
                  isActive,
                }) =>
                  `group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg"
                      : "hover:bg-gray-800"
                  }`
                }
              >

                {/* Icon */}
                <span className="text-xl">

                  {item.icon}

                </span>

                {/* Text */}
                {!collapsed && (

                  <span className="font-medium text-sm tracking-wide">
                    {item.name}
                  </span>

                )}

              </NavLink>

            )
          )}

        </div>

      </div>

      {/* Bottom */}
      <div className="p-4 border-t border-gray-800">

        <button className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 px-4 py-4 rounded-2xl transition font-medium shadow-lg">

          <FaSignOutAlt />

          {!collapsed && (
            <span>
              Logout
            </span>
          )}

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;