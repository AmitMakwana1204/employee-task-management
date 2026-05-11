import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaUsers,
  FaSpinner,
} from "react-icons/fa";

import toast from "react-hot-toast";

import {
  getEmployees,
  deleteEmployee,
} from "../../services/employeeService";

function Employees() {
  const navigate = useNavigate();

  // ================= STATE =================

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // ================= FETCH EMPLOYEES =================

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;

      const data = await getEmployees(params);
      setEmployees(data.employees || []);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      toast.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [search, statusFilter]);

  // ================= DELETE EMPLOYEE =================

  const handleDelete = async (id, name) => {
    const confirm = window.confirm(
      `Are you sure you want to delete ${name}? This action cannot be undone.`
    );
    if (!confirm) return;

    try {
      setDeletingId(id);
      await deleteEmployee(id);
      toast.success("Employee deleted successfully");
      setEmployees((prev) => prev.filter((e) => e._id !== id));
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete employee"
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <MainLayout>

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 mb-8">

        <div>
          <h1 className="text-4xl font-bold text-gray-800">Employees</h1>
          <p className="text-gray-500 mt-2">
            Manage all employees and their details.
          </p>
        </div>

        <button
          onClick={() => navigate("/employees/add")}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white px-5 py-3 rounded-2xl flex items-center gap-2 shadow-lg transition"
        >
          <FaPlus />
          Add Employee
        </button>

      </div>

      {/* Top Actions */}
      <div className="bg-white rounded-3xl shadow p-5 mb-6">

        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">

          {/* Search */}
          <div className="relative w-full lg:max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search employee by name, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 border border-gray-200 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-12 px-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

        </div>

      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <FaSpinner className="animate-spin text-4xl text-indigo-600" />
          </div>
        ) : employees.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24">
            <FaUsers className="text-7xl text-gray-300" />
            <h2 className="mt-6 text-3xl font-bold text-gray-700">
              No Employees Found
            </h2>
            <p className="mt-3 text-gray-500">
              {search || statusFilter
                ? "Try changing your search or filter."
                : "Start by adding your first employee."}
            </p>
            {!search && !statusFilter && (
              <button
                onClick={() => navigate("/employees/add")}
                className="mt-6 rounded-2xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg hover:bg-indigo-700 transition"
              >
                Add First Employee
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">

              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Employee</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Department</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Email</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((employee) => (
                  <tr
                    key={employee._id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >

                    {/* Employee */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        {employee.profileImage ? (
                          <img
                            src={employee.profileImage}
                            alt={employee.name}
                            className="w-14 h-14 rounded-2xl object-cover"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                            {employee.name?.charAt(0)?.toUpperCase()}
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {employee.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {employee.phone || "No phone"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="px-6 py-5 text-gray-700 font-medium">
                      {employee.department || "—"}
                    </td>

                    {/* Email */}
                    <td className="px-6 py-5 text-gray-500">
                      {employee.email}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          employee.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : employee.status === "Inactive"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-3">

                        {/* View */}
                        <button
                          onClick={() => navigate(`/employees/${employee._id}`)}
                          className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition flex items-center justify-center"
                          title="View"
                        >
                          <FaEye />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => navigate(`/employees/edit/${employee._id}`)}
                          className="w-10 h-10 rounded-xl bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition flex items-center justify-center"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(employee._id, employee.name)}
                          disabled={deletingId === employee._id}
                          className="w-10 h-10 rounded-xl bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition flex items-center justify-center disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === employee._id ? (
                            <FaSpinner className="animate-spin" />
                          ) : (
                            <FaTrash />
                          )}
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 text-sm text-gray-500">
              Showing {employees.length} employee{employees.length !== 1 ? "s" : ""}
            </div>

          </div>
        )}

      </div>

    </MainLayout>
  );
}

export default Employees;