import { useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import {
  FaUser,
  FaEnvelope,
  FaBriefcase,
  FaPhone,
  FaMapMarkerAlt,
  FaCamera,
  FaSave,
} from "react-icons/fa";

import toast from "react-hot-toast";

function EditEmployee() {

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "Amit",
      email: "amit@gmail.com",
      role: "Frontend Developer",
      phone: "+91 9876543210",
      address: "Vadodara, Gujarat",
      status: "Active",
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

    try {

      setLoading(true);

      // Fake API Delay
      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      toast.success(
        "Employee Updated Successfully"
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
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">

        <div>

          <h1 className="text-4xl font-bold text-gray-800">
            Edit Employee
          </h1>

          <p className="text-gray-500 mt-2">
            Update employee information and details.
          </p>

        </div>

      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">

        {/* Top Banner */}
        <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-600 relative">

          {/* Profile */}
          <div className="absolute -bottom-16 left-8">

            <div className="relative">

              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="profile"
                className="w-32 h-32 rounded-3xl border-4 border-white object-cover shadow-lg"
              />

              <button className="absolute bottom-2 right-2 w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition">

                <FaCamera />

              </button>

            </div>

          </div>

        </div>

        {/* Content */}
        <div className="pt-24 p-8">

          {/* User Info */}
          <div className="mb-10">

            <h2 className="text-3xl font-bold text-gray-800">
              {formData.name}
            </h2>

            <p className="text-gray-500 mt-2">
              {formData.role}
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-14 border border-gray-200 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
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
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-14 border border-gray-200 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            {/* Role */}
            <div>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Role
              </label>

              <div className="relative">

                <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full h-14 border border-gray-200 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            {/* Phone */}
            <div>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Phone Number
              </label>

              <div className="relative">

                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-14 border border-gray-200 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            {/* Address */}
            <div className="md:col-span-2">

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Address
              </label>

              <div className="relative">

                <FaMapMarkerAlt className="absolute left-4 top-6 text-gray-400" />

                <textarea
                  rows="4"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>

              </div>

            </div>

            {/* Status */}
            <div>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full h-14 border border-gray-200 rounded-2xl px-4 outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option>
                  Active
                </option>

                <option>
                  Pending
                </option>

                <option>
                  Inactive
                </option>

              </select>

            </div>

            {/* Button */}
            <div className="md:col-span-2 flex justify-end">

              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white px-8 py-4 rounded-2xl flex items-center gap-3 shadow-lg transition font-medium"
              >

                {loading ? (

                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                ) : (

                  <>
                    <FaSave />
                    Save Changes
                  </>

                )}

              </button>

            </div>

          </form>

        </div>

      </div>

    </MainLayout>
  );
}

export default EditEmployee;