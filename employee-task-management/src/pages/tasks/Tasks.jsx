import { useState, useEffect } from "react";

import {
  FaTasks,
  FaPlus,
  FaSearch,
  FaFilter,
  FaCheckCircle,
  FaClock,
  FaSpinner,
  FaEye,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import { getTasks, deleteTask } from "../../services/taskService";

function Tasks() {
  const navigate = useNavigate();

  // ================= STATES =================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [total, setTotal] = useState(0);

  // ================= FETCH TASKS =================

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;

      const data = await getTasks(params);
      setTasks(data.tasks || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Failed to load tasks:", error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, statusFilter, priorityFilter]);

  // ================= DELETE TASK =================

  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(
      `Delete task "${title}"? This cannot be undone.`
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await deleteTask(id);
      toast.success("Task deleted successfully");
      setTasks((prev) => prev.filter((t) => t._id !== id));
      setTotal((prev) => prev - 1);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete task"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ================= HELPERS =================

  const statusStyles = {
    Completed: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-600",
    "In Progress": "bg-blue-100 text-blue-600",
  };

  const priorityStyles = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-600",
    Low: "bg-green-100 text-green-600",
  };

  const completedCount = tasks.filter((t) => t.status === "Completed").length;
  const pendingCount = tasks.filter((t) => t.status === "Pending").length;
  const inProgressCount = tasks.filter((t) => t.status === "In Progress").length;

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 p-6">

        {/* ================= HEADER ================= */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-4xl font-bold text-gray-800">
              <FaTasks className="text-indigo-600" />
              Tasks Management
            </h1>
            <p className="mt-2 text-gray-500">
              Manage employee tasks, deadlines and productivity.
            </p>
          </div>

          {/* Add Button */}
          <button
            onClick={() => navigate("/tasks/add")}
            className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 font-semibold text-white shadow-xl transition hover:scale-105"
          >
            <FaPlus />
            Add New Task
          </button>
        </div>

        {/* ================= STATS ================= */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatsCard
            title="Total Tasks"
            value={loading ? "..." : total}
            icon={<FaTasks />}
            color="bg-blue-100 text-blue-600"
          />

          <StatsCard
            title="Completed"
            value={loading ? "..." : completedCount}
            icon={<FaCheckCircle />}
            color="bg-green-100 text-green-600"
          />

          <StatsCard
            title="Pending"
            value={loading ? "..." : pendingCount}
            icon={<FaClock />}
            color="bg-yellow-100 text-yellow-600"
          />

          <StatsCard
            title="In Progress"
            value={loading ? "..." : inProgressCount}
            icon={<FaSpinner />}
            color="bg-purple-100 text-purple-600"
          />

        </div>

        {/* ================= FILTER BAR ================= */}

        <div className="mt-8 flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-lg lg:flex-row lg:items-center lg:justify-between">

          {/* Search */}
          <div className="relative w-full lg:max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-100 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-12 rounded-2xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="h-12 rounded-2xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

        </div>

        {/* ================= TABLE ================= */}

        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-lg">

          {/* Loading */}
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <FaSpinner className="animate-spin text-4xl text-indigo-600" />
            </div>
          ) : tasks.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-24">
              <FaTasks className="text-7xl text-gray-300" />
              <h2 className="mt-6 text-3xl font-bold text-gray-700">
                No Tasks Found
              </h2>
              <p className="mt-3 text-gray-500">
                {search || statusFilter || priorityFilter
                  ? "Try changing your search or filter."
                  : "Create your first task to get started."}
              </p>
              {!search && !statusFilter && !priorityFilter && (
                <button
                  onClick={() => navigate("/tasks/add")}
                  className="mt-6 rounded-2xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg hover:bg-indigo-700 transition"
                >
                  Create First Task
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px]">

                  {/* Header */}
                  <thead className="bg-gray-50">
                    <tr className="border-b border-gray-100 text-left">
                      <th className="px-6 py-5 text-sm font-semibold text-gray-600">Task</th>
                      <th className="px-6 py-5 text-sm font-semibold text-gray-600">Assigned To</th>
                      <th className="px-6 py-5 text-sm font-semibold text-gray-600">Priority</th>
                      <th className="px-6 py-5 text-sm font-semibold text-gray-600">Due Date</th>
                      <th className="px-6 py-5 text-sm font-semibold text-gray-600">Status</th>
                      <th className="px-6 py-5 text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>

                  {/* Body */}
                  <tbody>
                    {tasks.map((task) => (
                      <tr
                        key={task._id}
                        className="border-b border-gray-100 transition hover:bg-gray-50"
                      >

                        {/* Task */}
                        <td className="px-6 py-5">
                          <div>
                            <h3 className="font-semibold text-gray-800">{task.title}</h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {task.department || "General"}
                            </p>
                          </div>
                        </td>

                        {/* Assigned */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                              {task.assignedTo?.name?.charAt(0)?.toUpperCase() || "?"}
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">
                                {task.assignedTo?.name || "Unknown"}
                              </p>
                              <p className="text-xs text-gray-400">
                                {task.assignedTo?.department || ""}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Priority */}
                        <td className="px-6 py-5">
                          <span className={`rounded-full px-4 py-2 text-sm font-medium ${priorityStyles[task.priority]}`}>
                            {task.priority}
                          </span>
                        </td>

                        {/* Due Date */}
                        <td className="px-6 py-5 text-gray-600">
                          {task.dueDate
                            ? new Date(task.dueDate).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "—"}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-5">
                          <span className={`rounded-full px-4 py-2 text-sm font-medium ${statusStyles[task.status]}`}>
                            {task.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">

                            {/* View */}
                            <button
                              onClick={() => navigate(`/tasks/details/${task._id}`)}
                              className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition hover:scale-110 hover:bg-blue-600 hover:text-white"
                              title="View"
                            >
                              <FaEye />
                            </button>

                            {/* Edit */}
                            <button
                              onClick={() => navigate(`/tasks/edit/${task._id}`)}
                              className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600 transition hover:scale-110 hover:bg-yellow-500 hover:text-white"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(task._id, task.title)}
                              disabled={deletingId === task._id}
                              className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 transition hover:scale-110 hover:bg-red-600 hover:text-white disabled:opacity-50"
                              title="Delete"
                            >
                              {deletingId === task._id ? (
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
              </div>

              {/* Footer */}
              <div className="flex flex-col gap-4 border-t border-gray-100 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
                <p className="text-sm text-gray-500">
                  Showing {tasks.length} of {total} tasks
                </p>
              </div>
            </>
          )}

        </div>

      </div>
    </MainLayout>
  );
}

/* ================= STATS CARD ================= */

function StatsCard({ title, value, icon, color }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">{title}</p>
          <h2 className="mt-3 text-4xl font-bold text-gray-800">{value}</h2>
        </div>
        <div className={`rounded-2xl p-4 ${color}`}>{icon}</div>
      </div>
    </div>
  );
}

export default Tasks;