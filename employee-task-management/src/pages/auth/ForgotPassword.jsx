import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { forgotPasswordApi } from "../../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      await forgotPasswordApi(email);
      setSent(true);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 p-5">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl shadow-2xl p-10"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                  <FaEnvelope className="text-white text-3xl" />
                </div>
              </div>

              {/* Heading */}
              <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
                Forgot Password?
              </h1>
              <p className="text-gray-500 text-center mb-8 text-sm leading-relaxed">
                No worries! Enter your registered email and we'll send you a
                secure link to reset your password.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 border border-gray-300 rounded-xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-700"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition rounded-xl text-white font-semibold text-base flex items-center justify-center shadow-lg shadow-blue-200"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>

              {/* Back to login */}
              <div className="mt-6 flex justify-center">
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-gray-500 hover:text-blue-600 text-sm font-medium transition"
                >
                  <FaArrowLeft className="text-xs" />
                  Back to Login
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              className="bg-white rounded-3xl shadow-2xl p-10 text-center"
            >
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 250 }}
                className="flex justify-center mb-6"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                  <FaCheckCircle className="text-white text-4xl" />
                </div>
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Check Your Email!
              </h2>

              <p className="text-gray-500 text-sm leading-relaxed mb-2">
                We've sent a password reset link to:
              </p>
              <p className="text-blue-600 font-semibold text-base mb-6">
                {email}
              </p>
              <p className="text-gray-400 text-xs leading-relaxed mb-8">
                The link will expire in{" "}
                <span className="font-semibold text-gray-600">15 minutes</span>.
                Check your spam folder if you don't see it.
              </p>

              {/* Resend */}
              <button
                onClick={() => setSent(false)}
                className="text-blue-600 hover:text-blue-700 text-sm font-semibold underline-offset-2 hover:underline transition"
              >
                Didn't receive it? Send again
              </button>

              {/* Back to login */}
              <div className="mt-6">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 text-gray-500 hover:text-blue-600 text-sm font-medium transition"
                >
                  <FaArrowLeft className="text-xs" />
                  Back to Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
