import { useState } from "react";

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

import MainLayout from "../../layouts/MainLayout";

function Tasks() {
  const navigate = useNavigate();

  // ================= STATES =================

  const [search, setSearch] =
    useState("");

  const [tasks, setTasks] =
    useState([
      {
        id: 1,
        title:
          "Build Dashboard UI",
        assignedTo:
          "Amit Makwana",
        priority: "High",
        deadline:
          "10 May 2026",
        status: "In Progress",
      },

      {
        id: 2,
        title:
          "Employee API Integration",
        assignedTo:
          "Rahul Patel",
        priority: "Medium",
        deadline:
          "14 May 2026",
        status: "Pending",
      },

      {
        id: 3,
        title:
          "Task Analytics Module",
        assignedTo:
          "Priya Shah",
        priority: "High",
        deadline:
          "18 May 2026",
        status: "Completed",
      },

      {
        id: 4,
        title:
          "Attendance System",
        assignedTo:
          "Jay Mehta",
        priority: "Low",
        deadline:
          "21 May 2026",
        status: "Pending",
      },
    ]);

  // ================= FILTER TASKS =================

  const filteredTasks =
    tasks.filter((task) =>
      task.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // ================= DELETE TASK =================

  const handleDelete = (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this task?"
      );

    if (confirmDelete) {
      const updatedTasks =
        tasks.filter(
          (task) =>
            task.id !== id
        );

      setTasks(updatedTasks);
    }
  };

  // ================= STATUS STYLES =================

  const statusStyles = {
    Completed:
      "bg-green-100 text-green-600",

    Pending:
      "bg-yellow-100 text-yellow-600",

    "In Progress":
      "bg-blue-100 text-blue-600",
  };

  // ================= PRIORITY STYLES =================

  const priorityStyles = {
    High:
      "bg-red-100 text-red-600",

    Medium:
      "bg-yellow-100 text-yellow-600",

    Low:
      "bg-green-100 text-green-600",
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 p-6">

        {/* ================= HEADER ================= */}

        <div
          className="
            mb-8 flex flex-col gap-5

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <div>
            <h1 className="flex items-center gap-3 text-4xl font-bold text-gray-800">
              <FaTasks className="text-indigo-600" />

              Tasks Management
            </h1>

            <p className="mt-2 text-gray-500">
              Manage employee tasks,
              deadlines and productivity.
            </p>
          </div>

          {/* Add Button */}

          <button
            onClick={() =>
              navigate(
                "/tasks/add"
              )
            }
            className="
              flex items-center gap-3
              rounded-2xl
              bg-gradient-to-r
              from-blue-600 to-indigo-600
              px-6 py-4
              font-semibold text-white
              shadow-xl transition
              hover:scale-105
            "
          >
            <FaPlus />

            Add New Task
          </button>
        </div>

        {/* ================= STATS ================= */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatsCard
            title="Total Tasks"
            value={tasks.length}
            icon={<FaTasks />}
            color="bg-blue-100 text-blue-600"
          />

          <StatsCard
            title="Completed"
            value={
              tasks.filter(
                (task) =>
                  task.status ===
                  "Completed"
              ).length
            }
            icon={
              <FaCheckCircle />
            }
            color="bg-green-100 text-green-600"
          />

          <StatsCard
            title="Pending"
            value={
              tasks.filter(
                (task) =>
                  task.status ===
                  "Pending"
              ).length
            }
            icon={<FaClock />}
            color="bg-yellow-100 text-yellow-600"
          />

          <StatsCard
            title="In Progress"
            value={
              tasks.filter(
                (task) =>
                  task.status ===
                  "In Progress"
              ).length
            }
            icon={<FaSpinner />}
            color="bg-purple-100 text-purple-600"
          />

        </div>

        {/* ================= FILTER BAR ================= */}

        <div
          className="
            mt-8 flex flex-col gap-4
            rounded-3xl bg-white p-5 shadow-lg

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* Search */}

          <div className="relative w-full lg:max-w-md">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                h-12 w-full rounded-2xl
                border border-gray-200
                bg-gray-100 pl-12 pr-4
                outline-none transition

                focus:border-blue-500
                focus:bg-white
              "
            />

          </div>

          {/* Buttons */}

          <div className="flex flex-wrap gap-3">

            <button
              className="
                flex items-center gap-2
                rounded-2xl border border-gray-200
                bg-white px-5 py-3
                font-medium text-gray-700 transition
                hover:bg-gray-100
              "
            >
              <FaFilter />

              Filter
            </button>

            <button
              className="
                rounded-2xl bg-indigo-600
                px-5 py-3
                font-medium text-white transition
                hover:bg-indigo-700
              "
            >
              Export
            </button>

          </div>
        </div>

        {/* ================= TABLE ================= */}

        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-lg">

          {/* Empty State */}

          {filteredTasks.length ===
          0 ? (
            <div className="flex flex-col items-center justify-center py-24">

              <FaTasks className="text-7xl text-gray-300" />

              <h2 className="mt-6 text-3xl font-bold text-gray-700">
                No Tasks Found
              </h2>

              <p className="mt-3 text-gray-500">
                Try searching another task
                or create a new one.
              </p>

            </div>
          ) : (
            <>
              {/* Table */}

              <div className="overflow-x-auto">

                <table className="w-full min-w-[1100px]">

                  {/* Header */}

                  <thead className="bg-gray-50">

                    <tr className="border-b border-gray-100 text-left">

                      <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                        Task
                      </th>

                      <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                        Assigned To
                      </th>

                      <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                        Priority
                      </th>

                      <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                        Deadline
                      </th>

                      <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                        Status
                      </th>

                      <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                        Actions
                      </th>

                    </tr>

                  </thead>

                  {/* Body */}

                  <tbody>

                    {filteredTasks.map(
                      (task) => (

                        <tr
                          key={task.id}
                          className="
                            border-b border-gray-100 transition
                            hover:bg-gray-50
                          "
                        >

                          {/* Task */}

                          <td className="px-6 py-5">

                            <div>

                              <h3 className="font-semibold text-gray-800">
                                {task.title}
                              </h3>

                              <p className="mt-1 text-sm text-gray-500">
                                Task ID :
                                #{task.id}
                              </p>

                            </div>

                          </td>

                          {/* Assigned */}

                          <td className="px-6 py-5 font-medium text-gray-700">
                            {
                              task.assignedTo
                            }
                          </td>

                          {/* Priority */}

                          <td className="px-6 py-5">

                            <span
                              className={`rounded-full px-4 py-2 text-sm font-medium ${priorityStyles[task.priority]}`}
                            >
                              {
                                task.priority
                              }
                            </span>

                          </td>

                          {/* Deadline */}

                          <td className="px-6 py-5 text-gray-600">
                            {
                              task.deadline
                            }
                          </td>

                          {/* Status */}

                          <td className="px-6 py-5">

                            <span
                              className={`rounded-full px-4 py-2 text-sm font-medium ${statusStyles[task.status]}`}
                            >
                              {
                                task.status
                              }
                            </span>

                          </td>

                          {/* Actions */}

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              {/* View */}

                              <button
                                onClick={() =>
                                  navigate(
                                    `/tasks/details/${task.id}`
                                  )
                                }
                                className="
                                  flex h-10 w-10 items-center justify-center
                                  rounded-xl bg-blue-100 text-blue-600 transition
                                  hover:scale-110
                                "
                              >
                                <FaEye />
                              </button>

                              {/* Edit */}

                              <button
                                className="
                                  flex h-10 w-10 items-center justify-center
                                  rounded-xl bg-yellow-100 text-yellow-600 transition
                                  hover:scale-110
                                "
                              >
                                <FaEdit />
                              </button>

                              {/* Delete */}

                              <button
                                onClick={() =>
                                  handleDelete(
                                    task.id
                                  )
                                }
                                className="
                                  flex h-10 w-10 items-center justify-center
                                  rounded-xl bg-red-100 text-red-600 transition
                                  hover:scale-110
                                "
                              >
                                <FaTrash />
                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

              {/* Footer */}

              <div
                className="
                  flex flex-col gap-4 border-t border-gray-100
                  px-6 py-5

                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                "
              >

                <p className="text-sm text-gray-500">
                  Showing
                  {" "}
                  {filteredTasks.length}
                  {" "}
                  of
                  {" "}
                  {tasks.length}
                  {" "}
                  tasks
                </p>

                {/* Pagination */}

                <div className="flex items-center gap-3">

                  <button
                    className="
                      flex h-10 w-10 items-center justify-center
                      rounded-xl border border-gray-200
                      transition hover:bg-gray-100
                    "
                  >
                    <FaChevronLeft />
                  </button>

                  <button
                    className="
                      rounded-xl bg-indigo-600
                      px-4 py-2
                      font-medium text-white
                    "
                  >
                    1
                  </button>

                  <button
                    className="
                      flex h-10 w-10 items-center justify-center
                      rounded-xl border border-gray-200
                      transition hover:bg-gray-100
                    "
                  >
                    <FaChevronRight />
                  </button>

                </div>

              </div>
            </>
          )}

        </div>

      </div>
    </MainLayout>
  );
}

/* ================= STATS CARD ================= */

function StatsCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div
      className="
        rounded-3xl bg-white p-6 shadow-lg transition
        hover:-translate-y-1 hover:shadow-2xl
      "
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-800">
            {value}
          </h2>

        </div>

        <div
          className={`rounded-2xl p-4 ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

export default Tasks;