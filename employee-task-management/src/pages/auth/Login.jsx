import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import { loginUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

function Login() {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [remember, setRemember] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.email ||
        !formData.password) {

      toast.error(
        "All fields are required"
      );

      return;
    }

    try {

      setLoading(true);

      // Real API call
      const data = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      // Store user + token via AuthContext
      login(data.user, data.token);

      toast.success("Login Successful! Welcome back 👋");

      // Role-based redirect
      navigate("/dashboard");

    } catch (error) {

      const message =
        error?.response?.data?.message ||
        "Login failed. Check your credentials.";

      toast.error(message);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 p-5">

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.6,
        }}

        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2"
      >

        {/* Left */}
        <div className="hidden md:flex bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10 flex-col justify-center relative overflow-hidden">

          <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-20 -left-20"></div>

          <div className="absolute w-72 h-72 bg-white/10 rounded-full -bottom-20 -right-20"></div>

          <div className="relative z-10">

            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
              <FaLock className="text-4xl" />
            </div>

            <h1 className="text-5xl font-bold leading-tight">
              Employee
              <br />
              Task Manager
            </h1>

            <p className="mt-5 text-lg text-blue-100">
              Manage employees,
              tasks and workflow
              efficiently.
            </p>

          </div>

        </div>

        {/* Right */}
        <div className="p-8 md:p-12 flex flex-col justify-center">

          <h2 className="text-4xl font-bold text-gray-800">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mt-2 mb-8">
            Login to continue
            managing your workspace.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <div className="relative">

                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-12 border border-gray-300 rounded-xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative">

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-12 border border-gray-300 rounded-xl pl-12 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword
                    ? <FaEyeSlash />
                    : <FaEye />}
                </button>

              </div>

            </div>

            {/* Remember */}
            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center gap-2 cursor-pointer">

                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() =>
                    setRemember(
                      !remember
                    )
                  }
                />

                Remember me

              </label>

              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 transition rounded-xl text-white font-semibold text-lg flex items-center justify-center"
            >

              {loading ? (

                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

              ) : (

                "Login"

              )}

            </button>

            {/* Divider */}
            <div className="relative">

              <div className="border-t border-gray-300"></div>

              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-400">
                OR
              </span>

            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full h-12 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
            >
              Continue with Google
            </button>

            {/* Register */}
            <p className="text-center text-gray-500">

              Don&apos;t have an account?{" "}

              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                Register
              </Link>

            </p>

          </form>

        </div>

      </motion.div>

    </div>
  );
}

export default Login;