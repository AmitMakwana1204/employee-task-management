import { useState } from "react";

import {
  FaFolderOpen,
  FaPlus,
  FaSearch,
  FaFilter,
  FaUsers,
  FaTasks,
  FaClock,
  FaCheckCircle,
  FaSpinner,
  FaEye,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
} from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";

function Projects() {
  // ================= SEARCH =================

  const [search, setSearch] =
    useState("");

  // ================= PROJECTS =================

  const [projects, setProjects] =
    useState([
      {
        id: 1,
        name:
          "Employee Management System",

        team: "Frontend Team",

        manager:
          "Amit Makwana",

        deadline:
          "15 May 2026",

        tasks: 24,

        progress: 72,

        status: "In Progress",
      },

      {
        id: 2,
        name:
          "Task Automation Platform",

        team: "Backend Team",

        manager:
          "Rahul Patel",

        deadline:
          "25 May 2026",

        tasks: 18,

        progress: 45,

        status: "Pending",
      },

      {
        id: 3,
        name:
          "Attendance Analytics",

        team: "HR Team",

        manager:
          "Priya Shah",

        deadline:
          "12 May 2026",

        tasks: 30,

        progress: 100,

        status: "Completed",
      },
    ]);

  // ================= FILTER =================

  const filteredProjects =
    projects.filter((project) =>
      project.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // ================= DELETE =================

  const handleDelete = (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this project?"
      );

    if (confirmDelete) {
      const updatedProjects =
        projects.filter(
          (project) =>
            project.id !== id
        );

      setProjects(
        updatedProjects
      );
    }
  };

  // ================= STATUS COLORS =================

  const statusStyles = {
    Completed:
      "bg-green-100 text-green-600",

    Pending:
      "bg-yellow-100 text-yellow-600",

    "In Progress":
      "bg-blue-100 text-blue-600",
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

            <h1
              className="
                flex items-center gap-3
                text-4xl font-bold
                text-gray-800
              "
            >

              <FaFolderOpen className="text-indigo-600" />

              Projects Management

            </h1>

            <p className="mt-2 text-gray-500">
              Manage company projects,
              teams and deadlines.
            </p>

          </div>

          {/* Add Project */}

          <button
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

            Add New Project

          </button>

        </div>

        {/* ================= STATS ================= */}

        <div
          className="
            grid grid-cols-1 gap-6

            md:grid-cols-2
            xl:grid-cols-4
          "
        >

          <StatsCard
            title="Total Projects"
            value={projects.length}
            icon={<FaFolderOpen />}
            color="bg-blue-100 text-blue-600"
          />

          <StatsCard
            title="Completed"
            value={
              projects.filter(
                (project) =>
                  project.status ===
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
              projects.filter(
                (project) =>
                  project.status ===
                  "Pending"
              ).length
            }
            icon={<FaClock />}
            color="bg-yellow-100 text-yellow-600"
          />

          <StatsCard
            title="In Progress"
            value={
              projects.filter(
                (project) =>
                  project.status ===
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
            rounded-3xl bg-white p-5
            shadow-lg

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          {/* Search */}

          <div className="relative w-full lg:max-w-md">

            <FaSearch
              className="
                absolute left-4 top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Search projects..."
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

          <div className="flex gap-3">

            <button
              className="
                flex items-center gap-2
                rounded-2xl border
                border-gray-200
                bg-white px-5 py-3
                font-medium text-gray-700
                transition

                hover:bg-gray-100
              "
            >

              <FaFilter />

              Filter

            </button>

            <button
              className="
                rounded-2xl
                bg-indigo-600
                px-5 py-3
                font-medium text-white
                transition

                hover:bg-indigo-700
              "
            >
              Export
            </button>

          </div>

        </div>

        {/* ================= PROJECT TABLE ================= */}

        <div
          className="
            mt-8 overflow-hidden
            rounded-3xl bg-white
            shadow-lg
          "
        >

          {/* Empty State */}

          {filteredProjects.length ===
          0 ? (

            <div className="flex flex-col items-center justify-center py-24">

              <FaFolderOpen className="text-7xl text-gray-300" />

              <h2 className="mt-6 text-3xl font-bold text-gray-700">
                No Projects Found
              </h2>

              <p className="mt-3 text-gray-500">
                Try another search or
                create a new project.
              </p>

            </div>

          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[1200px]">

                {/* Header */}

                <thead className="bg-gray-50">

                  <tr className="border-b border-gray-100 text-left">

                    <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                      Project
                    </th>

                    <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                      Team
                    </th>

                    <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                      Manager
                    </th>

                    <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                      Deadline
                    </th>

                    <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                      Tasks
                    </th>

                    <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                      Progress
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

                  {filteredProjects.map(
                    (project) => (

                      <tr
                        key={project.id}
                        className="
                          border-b border-gray-100
                          transition

                          hover:bg-gray-50
                        "
                      >

                        {/* Project */}

                        <td className="px-6 py-5">

                          <div>

                            <h3 className="font-semibold text-gray-800">
                              {project.name}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                              Project ID :
                              #{project.id}
                            </p>

                          </div>

                        </td>

                        {/* Team */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-2 text-gray-700">

                            <FaUsers />

                            {project.team}

                          </div>

                        </td>

                        {/* Manager */}

                        <td className="px-6 py-5 text-gray-700">
                          {project.manager}
                        </td>

                        {/* Deadline */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-2 text-gray-600">

                            <FaCalendarAlt />

                            {project.deadline}

                          </div>

                        </td>

                        {/* Tasks */}

                        <td className="px-6 py-5">

                          <span
                            className="
                              rounded-full
                              bg-indigo-100
                              px-4 py-2
                              text-sm font-medium
                              text-indigo-600
                            "
                          >
                            {project.tasks}
                            {" "}
                            Tasks
                          </span>

                        </td>

                        {/* Progress */}

                        <td className="px-6 py-5">

                          <div className="w-40">

                            <div className="mb-2 flex items-center justify-between">

                              <span className="text-sm font-medium text-gray-600">
                                {
                                  project.progress
                                }
                                %
                              </span>

                            </div>

                            <div className="h-3 overflow-hidden rounded-full bg-gray-200">

                              <div
                                style={{
                                  width: `${project.progress}%`,
                                }}
                                className="
                                  h-full rounded-full
                                  bg-gradient-to-r
                                  from-blue-500
                                  to-indigo-600
                                "
                              ></div>

                            </div>

                          </div>

                        </td>

                        {/* Status */}

                        <td className="px-6 py-5">

                          <span
                            className={`rounded-full px-4 py-2 text-sm font-medium ${statusStyles[project.status]}`}
                          >
                            {
                              project.status
                            }
                          </span>

                        </td>

                        {/* Actions */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            {/* View */}

                            <button
                              className="
                                flex h-10 w-10
                                items-center justify-center
                                rounded-xl
                                bg-blue-100
                                text-blue-600 transition

                                hover:scale-110
                              "
                            >

                              <FaEye />

                            </button>

                            {/* Edit */}

                            <button
                              className="
                                flex h-10 w-10
                                items-center justify-center
                                rounded-xl
                                bg-yellow-100
                                text-yellow-600 transition

                                hover:scale-110
                              "
                            >

                              <FaEdit />

                            </button>

                            {/* Delete */}

                            <button
                              onClick={() =>
                                handleDelete(
                                  project.id
                                )
                              }
                              className="
                                flex h-10 w-10
                                items-center justify-center
                                rounded-xl
                                bg-red-100
                                text-red-600 transition

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
        rounded-3xl bg-white p-6
        shadow-lg transition

        hover:-translate-y-1
        hover:shadow-2xl
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

export default Projects;