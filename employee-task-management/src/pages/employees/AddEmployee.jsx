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

function AddEmployee() {

  const [loading, setLoading] =
    useState(false);

  const [imagePreview, setImagePreview] =
    useState(
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    );

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      role: "",
      phone: "",
      address: "",
      status: "Active",
    });

  // Handle Input
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  // Image Upload
  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      setImagePreview(
        URL.createObjectURL(file)
      );

    }
  };

  // Submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.role
    ) {

      toast.error(
        "Please fill all required fields"
      );

      return;
    }

    try {

      setLoading(true);

      // Fake Delay
      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      console.log(formData);

      toast.success(
        "Employee Added Successfully"
      );

      // Reset
      setFormData({
        name: "",
        email: "",
        role: "",
        phone: "",
        address: "",
        status: "Active",
      });

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
            Add Employee
          </h1>

          <p className="text-gray-500 mt-2">
            Create a new employee profile and details.
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
                src={imagePreview}
                alt="profile"
                className="w-32 h-32 rounded-3xl border-4 border-white object-cover shadow-lg"
              />

              <label className="absolute bottom-2 right-2 w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition cursor-pointer">

                <FaCamera />

                <input
                  type="file"
                  hidden
                  onChange={
                    handleImageChange
                  }
                />

              </label>

            </div>

          </div>

        </div>

        {/* Content */}
        <div className="pt-24 p-8">

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
                  placeholder="Enter employee name"
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
                  placeholder="Enter email"
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
                  placeholder="Enter role"
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
                  placeholder="Enter phone number"
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
                  placeholder="Enter address"
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

            {/* Submit */}
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
                    Add Employee
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

export default AddEmployee;