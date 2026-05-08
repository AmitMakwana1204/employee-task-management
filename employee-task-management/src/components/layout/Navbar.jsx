import { useState } from "react";

import {
  FaBell,
  FaSearch,
  FaMoon,
  FaSun,
  FaBars,
  FaChevronDown,
} from "react-icons/fa";

import {
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineCog,
} from "react-icons/hi";

import {
  useNavigate,
} from "react-router-dom";

function Navbar() {
  const navigate =
    useNavigate();

  const [darkMode, setDarkMode] =
    useState(false);

  const [showProfile, setShowProfile] =
    useState(false);

  const notifications = [
    "New task assigned",
    "Meeting at 4 PM",
    "Task completed successfully",
  ];

  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.clear();

    navigate("/");
  };

  // ================= DARK MODE =================

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);

    document.documentElement.classList.toggle(
      "dark"
    );
  };

  return (
    <nav
      className="
        sticky top-0 z-50
        flex h-20 w-full items-center justify-between
        border-b border-gray-200
        bg-white/90 px-6
        backdrop-blur-xl
      "
    >
      {/* ================= LEFT ================= */}

      <div className="flex items-center gap-4">

        {/* Mobile Menu */}

        <button
          className="
            text-2xl text-gray-700
            lg:hidden
          "
        >
          <FaBars />
        </button>

        {/* Logo */}

        <div>

          <h1
            className="
              bg-gradient-to-r
              from-blue-600 to-indigo-600
              bg-clip-text
              text-2xl font-bold
              text-transparent
            "
          >
            EMS Dashboard
          </h1>

          <p className="mt-1 text-xs text-gray-400">
            Employee Task Management
          </p>

        </div>

      </div>

      {/* ================= CENTER ================= */}

      <div
        className="
          mx-10 hidden w-full max-w-xl
          items-center
          md:flex
        "
      >

        <div className="relative w-full">

          <FaSearch
            className="
              absolute left-4 top-1/2
              -translate-y-1/2 text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Search employees, tasks..."
            className="
              h-12 w-full rounded-2xl
              border border-transparent
              bg-gray-100 pl-12 pr-4
              outline-none transition-all

              focus:border-blue-500
              focus:bg-white
              focus:shadow-lg
            "
          />

        </div>

      </div>

      {/* ================= RIGHT ================= */}

      <div className="flex items-center gap-5">

        {/* ================= DARK MODE ================= */}

        <button
          onClick={
            toggleDarkMode
          }
          className="
            flex h-11 w-11 items-center justify-center
            rounded-xl bg-gray-100 transition
            hover:scale-105
            hover:bg-gray-200
          "
        >

          {darkMode ? (
            <FaSun
              className="
                text-lg text-yellow-500
              "
            />
          ) : (
            <FaMoon
              className="
                text-lg text-gray-700
              "
            />
          )}

        </button>

        {/* ================= NOTIFICATIONS ================= */}

        <div className="group relative">

          <button
            className="
              relative flex h-11 w-11
              items-center justify-center
              rounded-xl bg-gray-100 transition
              hover:scale-105
              hover:bg-gray-200
            "
          >

            <FaBell
              className="
                text-lg text-gray-700
              "
            />

            <span
              className="
                absolute right-2 top-2
                h-2.5 w-2.5 rounded-full
                bg-red-500
              "
            ></span>

          </button>

          {/* Dropdown */}

          <div
            className="
              invisible absolute right-0 mt-3
              w-80 rounded-2xl border
              border-gray-100 bg-white
              opacity-0 shadow-2xl transition-all
              duration-300

              group-hover:visible
              group-hover:opacity-100
            "
          >

            <div className="border-b p-4">

              <h2
                className="
                  font-semibold text-gray-800
                "
              >
                Notifications
              </h2>

            </div>

            <div className="max-h-80 overflow-y-auto">

              {notifications.map(
                (
                  item,
                  index
                ) => (

                  <div
                    key={index}
                    className="
                      cursor-pointer border-b
                      px-4 py-4 transition
                      hover:bg-gray-50
                    "
                  >

                    <p
                      className="
                        text-sm text-gray-700
                      "
                    >
                      {item}
                    </p>

                    <span
                      className="
                        text-xs text-gray-400
                      "
                    >
                      Just now
                    </span>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

        {/* ================= PROFILE ================= */}

        <div className="relative">

          <button
            onClick={() =>
              setShowProfile(
                !showProfile
              )
            }
            className="
              flex items-center gap-3
              rounded-2xl bg-gray-100
              px-3 py-2 transition
              hover:bg-gray-200
            "
          >

            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="profile"
              className="
                h-11 w-11 rounded-xl
                object-cover
              "
            />

            <div
              className="
                hidden text-left
                md:block
              "
            >

              <h3
                className="
                  text-sm font-semibold
                  text-gray-800
                "
              >
                Amit
              </h3>

              <p
                className="
                  text-xs text-gray-500
                "
              >
                Administrator
              </p>

            </div>

            <FaChevronDown
              className="
                text-sm text-gray-500
              "
            />

          </button>

          {/* ================= PROFILE DROPDOWN ================= */}

          {showProfile && (

            <div
              className="
                absolute right-0 mt-3
                w-64 overflow-hidden
                rounded-2xl border
                border-gray-100 bg-white
                shadow-2xl
              "
            >

              {/* Top */}

              <div
                className="
                  border-b bg-gradient-to-r
                  from-blue-600 to-indigo-600
                  p-5 text-white
                "
              >

                <div className="flex items-center gap-3">

                  <img
                    src="https://i.pravatar.cc/150?img=12"
                    alt="profile"
                    className="
                      h-14 w-14 rounded-xl
                      border-2 border-white
                    "
                  />

                  <div>

                    <h2 className="font-semibold">
                      Amit
                    </h2>

                    <p
                      className="
                        text-sm text-blue-100
                      "
                    >
                      admin@gmail.com
                    </p>

                  </div>

                </div>

              </div>

              {/* Menu */}

              <div className="p-2">

                {/* Profile */}

                <button
                  onClick={() =>
                    navigate(
                      "/profile"
                    )
                  }
                  className="
                    flex w-full items-center gap-3
                    rounded-xl px-4 py-3
                    text-gray-700 transition
                    hover:bg-gray-100
                  "
                >

                  <HiOutlineUser className="text-lg" />

                  My Profile

                </button>

                {/* Settings */}

                <button
                  onClick={() =>
                    navigate(
                      "/settings"
                    )
                  }
                  className="
                    flex w-full items-center gap-3
                    rounded-xl px-4 py-3
                    text-gray-700 transition
                    hover:bg-gray-100
                  "
                >

                  <HiOutlineCog className="text-lg" />

                  Settings

                </button>

                {/* Logout */}

                <button
                  onClick={
                    handleLogout
                  }
                  className="
                    flex w-full items-center gap-3
                    rounded-xl px-4 py-3
                    text-red-600 transition
                    hover:bg-red-50
                  "
                >

                  <HiOutlineLogout className="text-lg" />

                  Logout

                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;