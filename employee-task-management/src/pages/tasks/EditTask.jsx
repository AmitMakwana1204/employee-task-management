import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaTasks,
  FaUserTie,
  FaCalendarAlt,
  FaFlag,
  FaClipboardList,
  FaSave,
  FaLayerGroup,
  FaArrowLeft,
  FaSpinner,
} from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import toast from "react-hot-toast";

import { getTaskById, updateTask } from "../../services/taskService";
import { getEmployees } from "../../services/employeeService";
import { AuthContext } from "../../context/AuthContext";

function EditTask() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(true);

  const [taskData, setTaskData] = useState({
    title: "",
    assignedTo: "",
    department: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
    description: "",
  });

  // ================= FETCH TASK =================

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setFetchLoading(true);
        const data = await getTaskById(id);
        const t = data.task;
        setTaskData({
          title: t.title || "",
          assignedTo: t.assignedTo?._id || t.assignedTo || "",
          department: t.department || "",
          priority: t.priority || "Medium",
          status: t.status || "Pending",
          dueDate: t.dueDate
            ? new Date(t.dueDate).toISOString().slice(0, 10)
            : "",
          description: t.description || "",
        });
      } catch (error) {
        toast.error("Failed to load task");
        navigate("/tasks");
      } finally {
        setFetchLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  // ================= FETCH EMPLOYEES =================

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setEmpLoading(true);
        const data = await getEmployees({ status: "Active" });
        setEmployees(data.employees || []);
      } catch (error) {
        console.error("Failed to load employees:", error);
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  // ================= HANDLE SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskData.title || !taskData.assignedTo || !taskData.dueDate) {
      toast.error("Title, assigned employee, and due date are required");
      return;
    }

    try {
      setLoading(true);
      await updateTask(id, taskData);
      toast.success("Task updated successfully!");
      navigate("/tasks");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update task."
      );
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
      <div className="min-h-screen bg-gray-100 p-6">

        {/* Header */}
        <div className="mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-3 text-4xl font-bold text-gray-800">
              <FaTasks className="text-indigo-600" />
              Edit Task
            </h1>
            <p className="mt-2 text-gray-500">Update task details below.</p>
          </div>
          <button
            onClick={() => navigate("/tasks")}
            className="flex items-center gap-2 rounded-2xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            <FaArrowLeft /> Back to Tasks
          </button>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">

          {/* Top Banner */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-8 text-white">
            <h2 className="text-3xl font-bold">Update Task</h2>
            <p className="mt-2 text-yellow-100">Modify any field and save changes.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              {/* Title */}
              <div>
                <label className="mb-3 block font-semibold text-gray-700">Task Title *</label>
                <div className="relative">
                  <FaClipboardList className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="title"
                    value={taskData.title}
                    onChange={handleChange}
                    placeholder="Enter task title"
                    required
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-100 pl-12 pr-4 outline-none transition focus:border-yellow-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Assign To */}
              <div>
                <label className="mb-3 block font-semibold text-gray-700">Assign To *</label>
                <div className="relative">
                  <FaUserTie className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  {empLoading ? (
                    <div className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-100 flex items-center pl-12 text-gray-400">
                      <FaSpinner className="animate-spin mr-2" /> Loading...
                    </div>
                  ) : (
                    <select
                      name="assignedTo"
                      value={taskData.assignedTo}
                      onChange={handleChange}
                      required
                      className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-100 pl-12 pr-4 outline-none transition focus:border-yellow-500 focus:bg-white"
                    >
                      <option value="">Select Employee</option>
                      {employees.map((emp) => (
                        <option key={emp._id} value={emp._id}>
                          {emp.name} {emp.department ? `— ${emp.department}` : ""}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="mb-3 block font-semibold text-gray-700">Department / Team</label>
                <div className="relative">
                  <FaLayerGroup className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="department"
                    value={taskData.department}
                    onChange={handleChange}
                    placeholder="e.g. Frontend Team"
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-100 pl-12 pr-4 outline-none transition focus:border-yellow-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="mb-3 block font-semibold text-gray-700">Due Date *</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    name="dueDate"
                    value={taskData.dueDate}
                    onChange={handleChange}
                    required
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-100 pl-12 pr-4 outline-none transition focus:border-yellow-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="mb-3 block font-semibold text-gray-700">Priority</label>
                <div className="relative">
                  <FaFlag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    name="priority"
                    value={taskData.priority}
                    onChange={handleChange}
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-100 pl-12 pr-4 outline-none transition focus:border-yellow-500 focus:bg-white"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="mb-3 block font-semibold text-gray-700">Status</label>
                <div className="relative">
                  <FaTasks className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    name="status"
                    value={taskData.status}
                    onChange={handleChange}
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-100 pl-12 pr-4 outline-none transition focus:border-yellow-500 focus:bg-white"
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="mb-3 block font-semibold text-gray-700">Task Description</label>
              <textarea
                name="description"
                value={taskData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Write detailed task description..."
                className="w-full rounded-2xl border border-gray-200 bg-gray-100 p-5 outline-none transition focus:border-yellow-500 focus:bg-white resize-none"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 font-semibold text-white shadow-xl transition hover:scale-105 disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <><FaSave /> Save Changes</>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/tasks")}
                className="rounded-2xl border border-gray-300 px-8 py-4 font-semibold text-gray-700 transition hover:bg-gray-100"
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

export default EditTask;
