import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
} from "react-icons/fa";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

function Register() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {

      toast.error(
        "All fields are required"
      );

      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      toast.error(
        "Passwords do not match"
      );

      return;
    }

    try {

      setLoading(true);

      // Fake API Delay
      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );

      console.log(formData);

      toast.success(
        "Registration Successful"
      );

      navigate("/");

    } catch (error) {

      toast.error(
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 p-5">

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

        {/* Left Side */}
        <div className="hidden md:flex bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-10 flex-col justify-center relative overflow-hidden">

          <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-20 -left-20"></div>

          <div className="absolute w-72 h-72 bg-white/10 rounded-full -bottom-20 -right-20"></div>

          <div className="relative z-10">

            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
              <FaUserPlus className="text-4xl" />
            </div>

            <h1 className="text-5xl font-bold leading-tight">
              Create
              <br />
              Account
            </h1>

            <p className="mt-5 text-lg text-indigo-100">
              Join the Employee Task
              Management System and
              manage workflow smarter.
            </p>

          </div>

        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12 flex flex-col justify-center">

          <h2 className="text-4xl font-bold text-gray-800">
            Get Started 🚀
          </h2>

          <p className="text-gray-500 mt-2 mb-8">
            Create your account to
            continue.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Name */}
            <div>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <div className="relative">

                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-12 border border-gray-300 rounded-xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
                />

              </div>

            </div>

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
                  className="w-full h-12 border border-gray-300 rounded-xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
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
                  className="w-full h-12 border border-gray-300 rounded-xl pl-12 pr-12 outline-none focus:ring-2 focus:ring-indigo-500"
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

            {/* Confirm Password */}
            <div>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Confirm Password
              </label>

              <div className="relative">

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                  className="w-full h-12 border border-gray-300 rounded-xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
                />

              </div>

            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 transition rounded-xl text-white font-semibold text-lg flex items-center justify-center"
            >

              {loading ? (

                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

              ) : (

                "Create Account"

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

            {/* Login */}
            <p className="text-center text-gray-500">

              Already have an account?{" "}

              <Link
                to="/"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Login
              </Link>

            </p>

          </form>

        </div>

      </motion.div>

    </div>
  );
}

export default Register;