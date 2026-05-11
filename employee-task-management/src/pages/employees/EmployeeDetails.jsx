import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaArrowLeft,
  FaEdit,
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaSpinner,
} from "react-icons/fa";

import toast from "react-hot-toast";
import { getEmployeeById } from "../../services/employeeService";

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [taskStats, setTaskStats] = useState({
    total: 0, completed: 0, pending: 0, inProgress: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const data = await getEmployeeById(id);
        setEmployee(data.employee);
        setTaskStats(data.taskStats || {});
      } catch (error) {
        toast.error("Failed to load employee details");
        navigate("/employees");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-96">
          <FaSpinner className="animate-spin text-4xl text-indigo-600" />
        </div>
      </MainLayout>
    );
  }

  if (!employee) return null;

  const stats = [
    { label: "Total Tasks", value: taskStats.total || 0, color: "bg-blue-100 text-blue-600", icon: <FaTasks /> },
    { label: "Completed", value: taskStats.completed || 0, color: "bg-green-100 text-green-600", icon: <FaCheckCircle /> },
    { label: "Pending", value: taskStats.pending || 0, color: "bg-yellow-100 text-yellow-600", icon: <FaClock /> },
    { label: "In Progress", value: taskStats.inProgress || 0, color: "bg-purple-100 text-purple-600", icon: <FaSpinner /> },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 p-6">

        {/* Header */}
        <div className="mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Employee Details</h1>
            <p className="text-gray-500 mt-2">Full profile and task statistics.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/employees")}
              className="flex items-center gap-2 rounded-2xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
            >
              <FaArrowLeft /> Back
            </button>
            <button
              onClick={() => navigate(`/employees/edit/${id}`)}
              className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              <FaEdit /> Edit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Left — Profile */}
          <div className="space-y-6">

            {/* Profile Card */}
            <div className="rounded-3xl bg-white shadow-lg overflow-hidden">
              <div className="h-28 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
              <div className="px-6 pb-6 -mt-12">
                <div className="w-24 h-24 rounded-3xl border-4 border-white shadow-lg bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white text-4xl font-bold mb-4">
                  {employee.name?.charAt(0)?.toUpperCase()}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{employee.name}</h2>
                <p className="text-gray-500 mt-1">{employee.department || "No department"}</p>
                <span className={`mt-3 inline-block rounded-full px-4 py-1 text-sm font-medium ${
                  employee.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : employee.status === "Inactive"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {employee.status}
                </span>
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-3xl bg-white shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-5">Contact Info</h3>
              <div className="space-y-4">
                <InfoRow icon={<FaEnvelope />} label="Email" value={employee.email} />
                <InfoRow icon={<FaPhone />} label="Phone" value={employee.phone || "Not set"} />
                <InfoRow icon={<FaMapMarkerAlt />} label="Address" value={employee.address || "Not set"} />
                <InfoRow icon={<FaBriefcase />} label="Department" value={employee.department || "Not set"} />
              </div>
            </div>

          </div>

          {/* Right — Stats */}
          <div className="xl:col-span-2 space-y-6">

            {/* Task Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="rounded-3xl bg-white shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">{s.label}</p>
                      <h2 className="text-4xl font-bold text-gray-800 mt-2">{s.value}</h2>
                    </div>
                    <div className={`rounded-2xl p-4 ${s.color}`}>{s.icon}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Account Info */}
            <div className="rounded-3xl bg-white shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-5">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InfoRow icon={<FaBriefcase />} label="Role" value={employee.role || "employee"} />
                <InfoRow icon={<FaCheckCircle />} label="Member Since" value={
                  new Date(employee.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit", month: "long", year: "numeric"
                  })
                } />
              </div>
              <div className="mt-6 rounded-2xl bg-blue-50 border border-blue-200 p-4">
                <p className="text-sm text-blue-700">
                  <span className="font-semibold">🔑 Login credentials:</span> This employee can login with their email.
                  If the password was never changed, default password is <strong>Employee@123</strong>.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </MainLayout>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4">
      <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export default EmployeeDetails;
