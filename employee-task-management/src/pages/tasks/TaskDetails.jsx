import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  FaTasks,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaSpinner,
  FaFlag,
  FaEdit,
  FaTrash,
  FaArrowLeft,
} from "react-icons/fa";

import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import { getTaskById, deleteTask, updateTask } from "../../services/taskService";
import { AuthContext } from "../../context/AuthContext";

function TaskDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // ================= FETCH TASK =================

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const data = await getTaskById(id);
        setTask(data.task);
      } catch (error) {
        toast.error("Failed to load task details");
        navigate("/tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  // ================= UPDATE STATUS (Employee) =================

  const handleStatusChange = async (newStatus) => {
    try {
      setStatusUpdating(true);
      const data = await updateTask(id, { status: newStatus });
      setTask(data.task);
      toast.success(`Status updated to "${newStatus}"`);
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setStatusUpdating(false);
    }
  };

  // ================= DELETE TASK (Admin) =================

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this task? This cannot be undone."
    );
    if (!confirm) return;

    try {
      setDeleting(true);
      await deleteTask(id);
      toast.success("Task deleted successfully");
      navigate("/tasks");
    } catch (error) {
      toast.error("Failed to delete task");
      setDeleting(false);
    }
  };

  // ================= STATUS STYLES =================

  const statusColor = {
    Completed: "bg-green-100 text-green-600",
    "In Progress": "bg-blue-100 text-blue-600",
    Pending: "bg-yellow-100 text-yellow-600",
  };

  const priorityColor = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-600",
    Low: "bg-green-100 text-green-600",
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-96">
          <FaSpinner className="animate-spin text-4xl text-indigo-600" />
        </div>
      </MainLayout>
    );
  }

  if (!task) return null;

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 p-6">

        {/* ================= HEADER ================= */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-4xl font-bold text-gray-800">
              <FaTasks className="text-indigo-600" />
              Task Details
            </h1>
            <p className="mt-2 text-gray-500">
              Detailed information about this task.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() => navigate("/tasks")}
              className="flex items-center gap-2 rounded-2xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
            >
              <FaArrowLeft />
              Back
            </button>

            {user?.role === "admin" && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 rounded-2xl bg-red-100 px-5 py-3 font-medium text-red-700 transition hover:scale-105 disabled:opacity-50"
              >
                {deleting ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaTrash />
                )}
                Delete
              </button>
            )}

          </div>
        </div>

        {/* ================= MAIN GRID ================= */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* ================= LEFT SIDE ================= */}

          <div className="space-y-6 xl:col-span-2">

            {/* Task Info */}
            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Task Information</h2>
                <span className={`rounded-full px-4 py-2 text-sm font-medium ${statusColor[task.status]}`}>
                  {task.status}
                </span>
              </div>

              {/* Title & Description */}
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-gray-800">{task.title}</h3>
                {task.description ? (
                  <p className="mt-4 leading-relaxed text-gray-500">{task.description}</p>
                ) : (
                  <p className="mt-4 text-gray-400 italic">No description provided.</p>
                )}
              </div>

              {/* Grid of Info */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <InfoCard
                  icon={<FaUser />}
                  title="Assigned To"
                  value={task.assignedTo?.name || "Unknown"}
                  sub={task.assignedTo?.email}
                />

                <InfoCard
                  icon={<FaFlag />}
                  title="Priority"
                  value={task.priority}
                  badge={priorityColor[task.priority]}
                />

                <InfoCard
                  icon={<FaCalendarAlt />}
                  title="Created On"
                  value={new Date(task.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                />

                <InfoCard
                  icon={<FaClock />}
                  title="Due Date"
                  value={new Date(task.dueDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                />

                <InfoCard
                  icon={<FaTasks />}
                  title="Department"
                  value={task.department || "General"}
                />

                <InfoCard
                  icon={<FaCheckCircle />}
                  title="Assigned By"
                  value={task.assignedBy?.name || "Admin"}
                />

              </div>

            </div>

            {/* Employee Status Update */}
            {user?.role === "employee" && (
              <div className="rounded-3xl bg-white p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Update Task Status
                </h2>
                <p className="text-gray-500 text-sm mb-5">
                  Update your progress on this task.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Pending", "In Progress", "Completed"].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(s)}
                      disabled={statusUpdating || task.status === s}
                      className={`rounded-2xl px-6 py-3 font-semibold transition hover:scale-105 disabled:opacity-50 ${
                        task.status === s
                          ? "bg-indigo-600 text-white shadow-lg"
                          : "border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {statusUpdating && task.status !== s ? (
                        <FaSpinner className="animate-spin inline mr-2" />
                      ) : null}
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div className="space-y-6">

            {/* Status Card */}
            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Current Status</h2>
                <FaCheckCircle className="text-3xl" />
              </div>

              <div className="mt-8">
                <h1 className="text-4xl font-black">{task.status}</h1>
                <p className="mt-3 text-blue-100">
                  Priority:{" "}
                  <span className="font-bold">{task.priority}</span>
                </p>
                <p className="mt-2 text-blue-100 text-sm">
                  Due:{" "}
                  {new Date(task.dueDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Assigned Employee Card */}
            {task.assignedTo && (
              <div className="rounded-3xl bg-white p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-5">
                  Assigned Employee
                </h2>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    {task.assignedTo.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{task.assignedTo.name}</h3>
                    <p className="text-sm text-gray-500">{task.assignedTo.email}</p>
                    {task.assignedTo.department && (
                      <span className="mt-2 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-600">
                        {task.assignedTo.department}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

/* ================= INFO CARD ================= */

function InfoCard({ icon, title, value, sub, badge }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-gray-50 p-5 transition hover:shadow-md">
      <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        {badge ? (
          <span className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-semibold ${badge}`}>
            {value}
          </span>
        ) : (
          <h3 className="mt-1 text-lg font-semibold text-gray-800">{value}</h3>
        )}
        {sub && <p className="mt-1 text-xs text-gray-400">{sub}</p>}
      </div>
    </div>
  );
}

export default TaskDetails;