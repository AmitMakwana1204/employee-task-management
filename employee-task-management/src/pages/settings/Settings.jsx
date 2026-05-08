import { useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import {
  FaUserCog,
  FaBell,
  FaLock,
  FaMoon,
  FaSave,
  FaGlobe,
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

  // Toggle
  const handleToggle = (key) => {

    setSettings({
      ...settings,
      [key]:
        !settings[key],
    });

  };

  // Select
  const handleChange = (e) => {

    setSettings({
      ...settings,
      [e.target.name]:
        e.target.value,
    });

  };

  // Save
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

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage application preferences and account settings.
        </p>

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left Menu */}
        <div className="bg-white rounded-3xl shadow p-6 h-fit">

          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Preferences
          </h2>

          <div className="space-y-3">

            <button className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl bg-blue-50 text-blue-600 font-medium">

              <FaUserCog />

              General

            </button>

            <button className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-gray-100 text-gray-700 transition">

              <FaBell />

              Notifications

            </button>

            <button className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-gray-100 text-gray-700 transition">

              <FaLock />

              Privacy & Security

            </button>

            <button className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-gray-100 text-gray-700 transition">

              <FaGlobe />

              Language

            </button>

          </div>

        </div>

        {/* Settings Content */}
        <div className="xl:col-span-2 bg-white rounded-3xl shadow p-8">

          {/* Profile */}
          <div className="flex items-center gap-5 pb-8 border-b border-gray-200">

            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="profile"
              className="w-24 h-24 rounded-3xl object-cover border-4 border-blue-100"
            />

            <div>

              <h2 className="text-2xl font-bold text-gray-800">
                Amit
              </h2>

              <p className="text-gray-500 mt-1">
                admin@gmail.com
              </p>

              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition">
                Change Photo
              </button>

            </div>

          </div>

          {/* General Settings */}
          <div className="py-8 border-b border-gray-200">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              General Settings
            </h2>

            <div className="space-y-6">

              {/* Dark Mode */}
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-700">

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
                  className={`w-14 h-8 rounded-full flex items-center px-1 transition
                  ${
                    settings.darkMode
                      ? "bg-blue-600 justify-end"
                      : "bg-gray-300 justify-start"
                  }`}
                >

                  <div className="w-6 h-6 rounded-full bg-white"></div>

                </button>

              </div>

              {/* Email Notification */}
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
                  className={`w-14 h-8 rounded-full flex items-center px-1 transition
                  ${
                    settings.emailNotification
                      ? "bg-green-500 justify-end"
                      : "bg-gray-300 justify-start"
                  }`}
                >

                  <div className="w-6 h-6 rounded-full bg-white"></div>

                </button>

              </div>

              {/* SMS Notification */}
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
                  className={`w-14 h-8 rounded-full flex items-center px-1 transition
                  ${
                    settings.smsNotification
                      ? "bg-green-500 justify-end"
                      : "bg-gray-300 justify-start"
                  }`}
                >

                  <div className="w-6 h-6 rounded-full bg-white"></div>

                </button>

              </div>

            </div>

          </div>

          {/* Language */}
          <div className="py-8 border-b border-gray-200">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Preferences
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Language */}
              <div>

                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Language
                </label>

                <select
                  name="language"
                  value={settings.language}
                  onChange={handleChange}
                  className="w-full h-14 border border-gray-200 rounded-2xl px-4 outline-none focus:ring-2 focus:ring-blue-500"
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

              {/* Privacy */}
              <div>

                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Privacy
                </label>

                <select
                  name="privacy"
                  value={settings.privacy}
                  onChange={handleChange}
                  className="w-full h-14 border border-gray-200 rounded-2xl px-4 outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Save */}
          <div className="pt-8 flex justify-end">

            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white px-8 py-4 rounded-2xl flex items-center gap-3 shadow-lg transition font-medium"
            >

              {loading ? (

                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

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