import { useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import {
  FaUserCog,
  FaBell,
  FaLock,
  FaMoon,
  FaSave,
  FaGlobe,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import toast from "react-hot-toast";

function Settings() {

  const [loading, setLoading] =
    useState(false);

  const [settings, setSettings] =
    useState({
      darkMode: false,
      emailNotification: true,
      smsNotification: false,
      language: "English",
      privacy: "Public",
    });

  // ================= TOGGLE =================

  const handleToggle = (key) => {

    setSettings({
      ...settings,
      [key]:
        !settings[key],
    });

  };

  // ================= SELECT =================

  const handleChange = (e) => {

    setSettings({
      ...settings,
      [e.target.name]:
        e.target.value,
    });

  };

  // ================= SAVE =================

  const handleSave = async () => {

    try {

      setLoading(true);

      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      toast.success(
        "Settings Saved Successfully"
      );

    } catch (error) {

      toast.error(
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <MainLayout>

      {/* ================= HEADER ================= */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your profile settings and application preferences.
        </p>

      </div>

      {/* ================= MAIN GRID ================= */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* ================= LEFT MENU ================= */}

        <div className="h-fit rounded-3xl bg-white p-6 shadow">

          <h2 className="mb-6 text-xl font-bold text-gray-800">
            Preferences
          </h2>

          <div className="space-y-3">

            <button className="flex w-full items-center gap-3 rounded-2xl bg-blue-50 px-4 py-4 font-medium text-blue-600">

              <FaUserCog />

              General

            </button>

            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-gray-700 transition hover:bg-gray-100">

              <FaBell />

              Notifications

            </button>

            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-gray-700 transition hover:bg-gray-100">

              <FaLock />

              Privacy & Security

            </button>

            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-gray-700 transition hover:bg-gray-100">

              <FaGlobe />

              Language

            </button>

          </div>

        </div>

        {/* ================= SETTINGS CONTENT ================= */}

        <div className="xl:col-span-2 rounded-3xl bg-white p-8 shadow">

          {/* ================= PROFILE ================= */}

          <div className="flex items-center gap-5 border-b border-gray-200 pb-8">

            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="profile"
              className="h-24 w-24 rounded-3xl border-4 border-blue-100 object-cover"
            />

            <div>

              <h2 className="text-2xl font-bold text-gray-800">
                Amit Makwana
              </h2>

              <p className="mt-1 text-gray-500">
                makwanaamit985@gmail.com
              </p>

              {/* ================= BUTTONS ================= */}

              <div className="mt-4 flex flex-wrap gap-3">

                {/* Portfolio */}

                <a
                  href="https://new-portfolio-ten-peach.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-block rounded-xl
                    bg-blue-600 px-5 py-2
                    text-white transition
                    hover:bg-blue-700
                  "
                >
                  View Portfolio
                </a>

                {/* GitHub */}

                <a
                  href="https://github.com/AmitMakwana1204"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-flex items-center gap-2
                    rounded-xl bg-black px-5 py-2
                    text-white transition
                    hover:bg-gray-900
                  "
                >

                  <FaGithub />

                  GitHub

                </a>

                {/* LinkedIn */}

                <a
                  href="https://www.linkedin.com/in/amit-makwana-aa255b407"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-flex items-center gap-2
                    rounded-xl bg-blue-500 px-5 py-2
                    text-white transition
                    hover:bg-blue-600
                  "
                >

                  <FaLinkedin />

                  LinkedIn

                </a>

              </div>

            </div>

          </div>

          {/* ================= GENERAL SETTINGS ================= */}

          <div className="border-b border-gray-200 py-8">

            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              General Settings
            </h2>

            <div className="space-y-6">

              {/* ================= DARK MODE ================= */}

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-700">

                    <FaMoon />

                  </div>

                  <div>

                    <h3 className="font-semibold text-gray-800">
                      Dark Mode
                    </h3>

                    <p className="text-sm text-gray-500">
                      Enable dark theme
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    handleToggle(
                      "darkMode"
                    )
                  }
                  className={`flex h-8 w-14 items-center rounded-full px-1 transition
                  ${
                    settings.darkMode
                      ? "justify-end bg-blue-600"
                      : "justify-start bg-gray-300"
                  }`}
                >

                  <div className="h-6 w-6 rounded-full bg-white"></div>

                </button>

              </div>

              {/* ================= EMAIL ================= */}

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="font-semibold text-gray-800">
                    Email Notifications
                  </h3>

                  <p className="text-sm text-gray-500">
                    Receive updates by email
                  </p>

                </div>

                <button
                  onClick={() =>
                    handleToggle(
                      "emailNotification"
                    )
                  }
                  className={`flex h-8 w-14 items-center rounded-full px-1 transition
                  ${
                    settings.emailNotification
                      ? "justify-end bg-green-500"
                      : "justify-start bg-gray-300"
                  }`}
                >

                  <div className="h-6 w-6 rounded-full bg-white"></div>

                </button>

              </div>

              {/* ================= SMS ================= */}

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="font-semibold text-gray-800">
                    SMS Notifications
                  </h3>

                  <p className="text-sm text-gray-500">
                    Receive SMS alerts
                  </p>

                </div>

                <button
                  onClick={() =>
                    handleToggle(
                      "smsNotification"
                    )
                  }
                  className={`flex h-8 w-14 items-center rounded-full px-1 transition
                  ${
                    settings.smsNotification
                      ? "justify-end bg-green-500"
                      : "justify-start bg-gray-300"
                  }`}
                >

                  <div className="h-6 w-6 rounded-full bg-white"></div>

                </button>

              </div>

            </div>

          </div>

          {/* ================= PREFERENCES ================= */}

          <div className="border-b border-gray-200 py-8">

            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Preferences
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              {/* ================= LANGUAGE ================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Language
                </label>

                <select
                  name="language"
                  value={settings.language}
                  onChange={handleChange}
                  className="
                    h-14 w-full rounded-2xl
                    border border-gray-200 px-4
                    outline-none focus:ring-2
                    focus:ring-blue-500
                  "
                >

                  <option>
                    English
                  </option>

                  <option>
                    Hindi
                  </option>

                  <option>
                    Gujarati
                  </option>

                </select>

              </div>

              {/* ================= PRIVACY ================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Privacy
                </label>

                <select
                  name="privacy"
                  value={settings.privacy}
                  onChange={handleChange}
                  className="
                    h-14 w-full rounded-2xl
                    border border-gray-200 px-4
                    outline-none focus:ring-2
                    focus:ring-blue-500
                  "
                >

                  <option>
                    Public
                  </option>

                  <option>
                    Private
                  </option>

                </select>

              </div>

            </div>

          </div>

          {/* ================= SAVE BUTTON ================= */}

          <div className="flex justify-end pt-8">

            <button
              onClick={handleSave}
              disabled={loading}
              className="
                flex items-center gap-3 rounded-2xl
                bg-gradient-to-r from-blue-600
                to-indigo-600 px-8 py-4
                font-medium text-white shadow-lg
                transition hover:opacity-90
              "
            >

              {loading ? (

                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>

              ) : (

                <>
                  <FaSave />

                  Save Settings
                </>

              )}

            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Settings;
