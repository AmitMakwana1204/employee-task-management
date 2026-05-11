import { useState, useContext } from "react";

import MainLayout from "../../layouts/MainLayout";

import {
  FaUserCog,
  FaBell,
  FaLock,
  FaMoon,
  FaSave,
  FaGlobe,
  FaKey,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

function Settings() {

  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);

  const [settings, setSettings] = useState({
    darkMode: false,
    emailNotification: true,
    smsNotification: false,
    language: "English",
    privacy: "Public",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ================= TOGGLE =================

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  // ================= SELECT =================

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  // ================= PASSWORD CHANGE =================

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // ================= SAVE SETTINGS =================

  const handleSave = async () => {
    try {
      setLoading(true);
      await api.put("/auth/me", {
        settings: {
          darkMode: settings.darkMode,
          language: settings.language,
          emailNotifications: settings.emailNotification,
          profileVisibility: settings.privacy.toLowerCase(),
        },
      });
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  // ================= CHANGE PASSWORD =================

  const handleChangePassword = async () => {
    if (!passwords.currentPassword || !passwords.newPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (passwords.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    try {
      setLoading(true);
      await api.put("/auth/change-password", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      toast.success("Password changed successfully!");
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>

      {/* ================= HEADER ================= */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Settings</h1>
        <p className="mt-2 text-gray-500">
          Manage your profile settings and application preferences.
        </p>
      </div>

      {/* ================= MAIN GRID ================= */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* ================= LEFT MENU ================= */}

        <div className="h-fit rounded-3xl bg-white p-6 shadow">

          <h2 className="mb-6 text-xl font-bold text-gray-800">Preferences</h2>

          <div className="space-y-3">

            <button className="flex w-full items-center gap-3 rounded-2xl bg-blue-50 px-4 py-4 font-medium text-blue-600">
              <FaUserCog /> General
            </button>

            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-gray-700 transition hover:bg-gray-100">
              <FaBell /> Notifications
            </button>

            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-gray-700 transition hover:bg-gray-100">
              <FaLock /> Privacy &amp; Security
            </button>

            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-gray-700 transition hover:bg-gray-100">
              <FaGlobe /> Language
            </button>

          </div>

        </div>

        {/* ================= SETTINGS CONTENT ================= */}

        <div className="xl:col-span-2 space-y-6">

          {/* ================= PROFILE CARD ================= */}

          <div className="rounded-3xl bg-white p-8 shadow">

            <div className="flex items-center gap-5 border-b border-gray-200 pb-6">

              {/* Avatar */}
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="profile"
                  className="h-24 w-24 rounded-3xl border-4 border-blue-100 object-cover"
                />
              ) : (
                <div className="h-24 w-24 rounded-3xl border-4 border-blue-100 bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {user?.name || "User"}
                </h2>

                <p className="mt-1 text-gray-500">{user?.email || ""}</p>

                <span className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                  user?.role === "admin"
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-green-100 text-green-700"
                }`}>
                  {user?.role === "admin" ? "Administrator" : "Employee"}
                </span>
              </div>

            </div>

            {/* ================= GENERAL SETTINGS ================= */}

            <div className="border-b border-gray-200 py-6">

              <h2 className="mb-5 text-xl font-bold text-gray-800">General Settings</h2>

              <div className="space-y-5">

                {/* Dark Mode */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-700">
                      <FaMoon />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Dark Mode</h3>
                      <p className="text-sm text-gray-500">Enable dark theme</p>
                    </div>
                  </div>
                  <Toggle active={settings.darkMode} onToggle={() => handleToggle("darkMode")} color="blue" />
                </div>

                {/* Email Notifications */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive updates by email</p>
                  </div>
                  <Toggle active={settings.emailNotification} onToggle={() => handleToggle("emailNotification")} color="green" />
                </div>

                {/* SMS Notifications */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">SMS Notifications</h3>
                    <p className="text-sm text-gray-500">Receive SMS alerts</p>
                  </div>
                  <Toggle active={settings.smsNotification} onToggle={() => handleToggle("smsNotification")} color="green" />
                </div>

              </div>

            </div>

            {/* ================= PREFERENCES ================= */}

            <div className="py-6">

              <h2 className="mb-5 text-xl font-bold text-gray-800">Preferences</h2>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Language */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Language
                  </label>
                  <select
                    name="language"
                    value={settings.language}
                    onChange={handleChange}
                    className="h-14 w-full rounded-2xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Gujarati</option>
                  </select>
                </div>

                {/* Privacy */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Profile Visibility
                  </label>
                  <select
                    name="privacy"
                    value={settings.privacy}
                    onChange={handleChange}
                    className="h-14 w-full rounded-2xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Public</option>
                    <option>Private</option>
                  </select>
                </div>

              </div>

            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-medium text-white shadow-lg transition hover:opacity-90 disabled:opacity-60"
              >
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                  <><FaSave /> Save Settings</>
                )}
              </button>
            </div>

          </div>

          {/* ================= CHANGE PASSWORD ================= */}

          <div className="rounded-3xl bg-white p-8 shadow">

            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-red-100 p-3 text-red-600">
                <FaKey />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Change Password</h2>
                <p className="text-sm text-gray-500">Keep your account secure</p>
              </div>
            </div>

            <div className="space-y-4">

              {/* Current Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPw ? "text" : "password"}
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                    className="h-14 w-full rounded-2xl border border-gray-200 px-4 pr-12 outline-none focus:ring-2 focus:ring-red-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPw ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPw ? "text" : "password"}
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                    className="h-14 w-full rounded-2xl border border-gray-200 px-4 pr-12 outline-none focus:ring-2 focus:ring-red-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw(!showNewPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPw ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Re-enter new password"
                  className="h-14 w-full rounded-2xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

            </div>

            <button
              onClick={handleChangePassword}
              disabled={loading}
              className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 px-8 py-4 font-medium text-white shadow-lg transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              ) : (
                <><FaKey /> Change Password</>
              )}
            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

/* ================= TOGGLE COMPONENT ================= */

function Toggle({ active, onToggle, color = "blue" }) {
  const colors = {
    blue: "bg-blue-600",
    green: "bg-green-500",
  };
  return (
    <button
      onClick={onToggle}
      className={`flex h-8 w-14 items-center rounded-full px-1 transition ${
        active ? `justify-end ${colors[color]}` : "justify-start bg-gray-300"
      }`}
    >
      <div className="h-6 w-6 rounded-full bg-white shadow"></div>
    </button>
  );
}

export default Settings;
