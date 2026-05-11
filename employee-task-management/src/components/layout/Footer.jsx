import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaHeart,
  FaArrowUp,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Footer() {
  // ================= SCROLL TO TOP =================

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ================= QUICK LINKS =================

  const quickLinks = [
    {
      name: "Home",
      path: "/",
    },

    {
      name: "Employees",
      path: "/employees",
    },

    {
      name: "Tasks",
      path: "/tasks",
    },
  ];

  return (
    <footer
      className="
        relative mt-10 overflow-hidden
        border-t border-gray-200
        bg-white

        dark:border-gray-800
        dark:bg-gray-950
      "
    >
      {/* ================= TOP GRADIENT ================= */}

      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

      {/* ================= MAIN CONTENT ================= */}

      <div className="relative px-6 py-10 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">

          {/* ================= BRAND ================= */}

          <div>
            <div className="flex items-center gap-4">
              <div
                className="
                  flex h-14 w-14 items-center justify-center
                  rounded-2xl
                  bg-gradient-to-r from-blue-500 to-indigo-600
                  text-2xl font-bold text-white
                  shadow-xl
                "
              >
                TP
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  TaskPilot
                </h2>

                <p className="text-sm text-gray-500">
                  Employee Task Management
                </p>
              </div>
            </div>

            <p className="mt-4 leading-relaxed text-gray-500">
              Modern employee task management system
              built using MERN stack.
            </p>

            {/* ================= SOCIAL ================= */}

            <div className="mt-6 flex items-center gap-4">

              <a
                href="https://github.com/AmitMakwana1204"
                target="_blank"
                rel="noreferrer"
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-2xl bg-gray-100 text-lg transition
                  hover:scale-110 hover:bg-black hover:text-white

                  dark:bg-gray-800
                  dark:text-white
                "
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-2xl bg-gray-100 text-lg transition
                  hover:scale-110 hover:bg-blue-600 hover:text-white

                  dark:bg-gray-800
                  dark:text-white
                "
              >
                <FaLinkedin />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-2xl bg-gray-100 text-lg transition
                  hover:scale-110 hover:bg-pink-500 hover:text-white

                  dark:bg-gray-800
                  dark:text-white
                "
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}

          <div>
            <h3 className="mb-5 text-xl font-bold text-gray-800 dark:text-white">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4">
              {quickLinks.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  className="
                    text-gray-500 transition
                    hover:translate-x-1
                    hover:text-blue-600
                  "
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ================= CONTACT ================= */}

          <div>
            <h3 className="mb-5 text-xl font-bold text-gray-800 dark:text-white">
              Contact
            </h3>

            <div className="space-y-5">

              <div className="flex items-start gap-4">
                <div
                  className="
                    flex h-11 w-11 items-center justify-center
                    rounded-2xl bg-blue-100 text-blue-600

                    dark:bg-gray-800
                  "
                >
                  <FaEnvelope />
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Email
                  </p>

                  <h4 className="font-medium text-gray-700 dark:text-gray-200">
                    makwanaamit985@gmail.com
                  </h4>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="
                    flex h-11 w-11 items-center justify-center
                    rounded-2xl bg-green-100 text-green-600

                    dark:bg-gray-800
                  "
                >
                  <FaPhoneAlt />
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Phone
                  </p>

                  <h4 className="font-medium text-gray-700 dark:text-gray-200">
                    +91 63528 63230
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM ================= */}

        <div
          className="
            mt-10 flex flex-col gap-5
            border-t border-gray-200 pt-6

            dark:border-gray-800

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* ================= LEFT ================= */}

          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span>
              © 2026 All Rights Reserved.
            </span>

            <span>|</span>

            <span className="flex items-center gap-2">
              Made with

              <FaHeart className="text-red-500" />

              by

              <span className="font-semibold text-blue-600">
                Amit Makwana
              </span>
            </span>
          </div>

          {/* ================= RIGHT ================= */}

          <button
            onClick={scrollToTop}
            className="
              flex h-12 w-12 items-center justify-center
              rounded-2xl
              bg-gradient-to-r from-blue-500 to-indigo-600
              text-white shadow-xl transition
              hover:scale-110
            "
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;