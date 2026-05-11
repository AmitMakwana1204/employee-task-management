import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import {
  FaUser,
  FaEnvelope,
  FaBriefcase,
  FaPhone,
  FaMapMarkerAlt,
  FaSave,
  FaArrowLeft,
  FaSpinner,
} from "react-icons/fa";

import toast from "react-hot-toast";

import { getEmployeeById, updateEmployee } from "../../services/employeeService";

function EditEmployee() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    address: "",
    status: "Active",
  });

  // ================= FETCH EMPLOYEE =================

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setFetchLoading(true);
        const data = await getEmployeeById(id);
        const emp = data.employee;

        setFormData({
          name: emp.name || "",
          email: emp.email || "",
          phone: emp.phone || "",
          department: emp.department || "",
          address: emp.address || "",
          status: emp.status || "Active",
        });
      } catch (error) {
        toast.error("Failed to load employee data");
        navigate("/employees");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= HANDLE SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Name and email are required");
      return;
    }

    try {
      setLoading(true);

      await updateEmployee(id, formData);

      toast.success("Employee updated successfully!");

      navigate("/employees");

    } catch (error) {

      const message =
        error?.response?.data?.message ||
        "Failed to update employee.";

      toast.error(message);

    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-96">
          <FaSpinner className="animate-spin text-4xl text-indigo-600" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Edit Employee</h1>
          <p className="text-gray-500 mt-2">Update employee profile details.</p>
        </div>

        <button
          onClick={() => navigate("/employees")}
          className="flex items-center gap-2 rounded-2xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
        >
          <FaArrowLeft />
          Back to Employees
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">

        {/* Top Banner */}
        <div className="h-32 bg-gradient-to-r from-green-500 to-emerald-600 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 rounded-3xl bg-white border-4 border-white shadow-lg flex items-center justify-center text-green-600 text-4xl font-bold">
              {formData.name?.charAt(0)?.toUpperCase() || "?"}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-20 p-8">

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter employee name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full h-14 border border-gray-200 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full h-14 border border-gray-200 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Department / Role
              </label>
              <div className="relative">
                <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="department"
                  placeholder="e.g. Frontend Developer"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full h-14 border border-gray-200 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full h-14 border border-gray-200 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-500"
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
                  rows="3"
                  name="address"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-green-500 resize-none"
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
                className="w-full h-14 border border-gray-200 rounded-2xl px-4 outline-none focus:ring-2 focus:ring-green-500"
              >
                <option>Active</option>
                <option>Pending</option>
                <option>Inactive</option>
              </select>
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white px-8 py-4 rounded-2xl flex items-center gap-3 shadow-lg transition font-medium disabled:opacity-60"
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

              <button
                type="button"
                onClick={() => navigate("/employees")}
                className="rounded-2xl border border-gray-300 px-8 py-4 font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>

          </form>

        </div>
      </div>

    </MainLayout>
  );
}

export default EditEmployee;