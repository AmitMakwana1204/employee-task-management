import {
  FaTasks,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaSpinner,
  FaFlag,
  FaComments,
  FaPaperclip,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";

function TaskDetails() {
  const task = {
    title: "Dashboard UI Development",
    description:
      "Create a modern responsive admin dashboard UI for the Employee Task Management System with analytics cards, charts, tables and responsive layouts.",

    assignedTo: "Amit Makwana",

    priority: "High",

    status: "In Progress",

    startDate: "08 May 2026",

    deadline: "15 May 2026",

    department: "Frontend Team",

    progress: 72,
  };

  const comments = [
    {
      id: 1,
      user: "Rahul Patel",
      message:
        "API integration will be completed by tomorrow.",
      time: "2 hours ago",
    },

    {
      id: 2,
      user: "Priya Shah",
      message:
        "UI design updated successfully.",
      time: "5 hours ago",
    },
  ];

  const attachments = [
    "dashboard-design.fig",
    "task-requirements.pdf",
    "analytics-ui.png",
  ];

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
              Detailed information about assigned task and progress.
            </p>
          </div>

          {/* Action Buttons */}

          <div className="flex flex-wrap gap-3">

            <button
              className="
                flex items-center gap-2
                rounded-2xl bg-yellow-100
                px-5 py-3
                font-medium text-yellow-700 transition
                hover:scale-105
              "
            >
              <FaEdit />

              Edit
            </button>

            <button
              className="
                flex items-center gap-2
                rounded-2xl bg-red-100
                px-5 py-3
                font-medium text-red-700 transition
                hover:scale-105
              "
            >
              <FaTrash />

              Delete
            </button>

          </div>

        </div>

        {/* ================= MAIN GRID ================= */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* ================= LEFT SIDE ================= */}

          <div className="space-y-6 xl:col-span-2">

            {/* Task Info */}

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="mb-6 flex items-center justify-between">

                <h2 className="text-2xl font-bold text-gray-800">
                  Task Information
                </h2>

                {task.status === "In Progress" && (
                  <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600">
                    In Progress
                  </span>
                )}

              </div>

              {/* Title */}

              <div className="mb-6">

                <h3 className="text-3xl font-bold text-gray-800">
                  {task.title}
                </h3>

                <p className="mt-4 leading-relaxed text-gray-500">
                  {task.description}
                </p>

              </div>

              {/* Grid */}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <InfoCard
                  icon={<FaUser />}
                  title="Assigned To"
                  value={task.assignedTo}
                />

                <InfoCard
                  icon={<FaFlag />}
                  title="Priority"
                  value={task.priority}
                />

                <InfoCard
                  icon={<FaCalendarAlt />}
                  title="Start Date"
                  value={task.startDate}
                />

                <InfoCard
                  icon={<FaClock />}
                  title="Deadline"
                  value={task.deadline}
                />

                <InfoCard
                  icon={<FaTasks />}
                  title="Department"
                  value={task.department}
                />

                <InfoCard
                  icon={<FaCheckCircle />}
                  title="Progress"
                  value={`${task.progress}%`}
                />

              </div>

              {/* Progress */}

              <div className="mt-8">

                <div className="mb-3 flex items-center justify-between">

                  <h3 className="font-semibold text-gray-700">
                    Task Progress
                  </h3>

                  <span className="font-bold text-indigo-600">
                    {task.progress}%
                  </span>

                </div>

                <div className="h-4 overflow-hidden rounded-full bg-gray-200">

                  <div
                    style={{
                      width: `${task.progress}%`,
                    }}
                    className="
                      h-full rounded-full
                      bg-gradient-to-r
                      from-blue-500 to-indigo-600
                    "
                  ></div>

                </div>

              </div>

            </div>

            {/* Comments */}

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="mb-6 flex items-center gap-3">

                <FaComments className="text-2xl text-indigo-600" />

                <h2 className="text-2xl font-bold text-gray-800">
                  Team Comments
                </h2>

              </div>

              <div className="space-y-5">

                {comments.map((comment) => (

                  <div
                    key={comment.id}
                    className="
                      rounded-2xl border border-gray-100
                      p-5 transition hover:shadow-md
                    "
                  >

                    <div className="flex items-center justify-between">

                      <h3 className="font-semibold text-gray-800">
                        {comment.user}
                      </h3>

                      <span className="text-sm text-gray-400">
                        {comment.time}
                      </span>

                    </div>

                    <p className="mt-3 text-gray-600">
                      {comment.message}
                    </p>

                  </div>

                ))}

              </div>

              {/* Comment Input */}

              <div className="mt-6 flex gap-3">

                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="
                    h-12 flex-1 rounded-2xl
                    border border-gray-200
                    bg-gray-100 px-4
                    outline-none transition

                    focus:border-blue-500
                    focus:bg-white
                  "
                />

                <button
                  className="
                    rounded-2xl
                    bg-gradient-to-r from-blue-600 to-indigo-600
                    px-6
                    font-semibold text-white shadow-lg transition
                    hover:scale-105
                  "
                >
                  Send
                </button>

              </div>

            </div>

          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div className="space-y-6">

            {/* Status Card */}

            <div
              className="
                rounded-3xl
                bg-gradient-to-br
                from-blue-600 to-indigo-700
                p-6 text-white shadow-2xl
              "
            >

              <div className="flex items-center justify-between">

                <h2 className="text-2xl font-bold">
                  Current Status
                </h2>

                <FaSpinner className="text-3xl" />

              </div>

              <div className="mt-8">

                <h1 className="text-5xl font-black">
                  72%
                </h1>

                <p className="mt-3 text-blue-100">
                  Task completion progress currently running smoothly.
                </p>

              </div>

            </div>

            {/* Attachments */}

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="mb-6 flex items-center gap-3">

                <FaPaperclip className="text-xl text-indigo-600" />

                <h2 className="text-2xl font-bold text-gray-800">
                  Attachments
                </h2>

              </div>

              <div className="space-y-4">

                {attachments.map(
                  (
                    file,
                    index
                  ) => (

                    <div
                      key={index}
                      className="
                        flex items-center justify-between
                        rounded-2xl border border-gray-100
                        p-4 transition hover:shadow-md
                      "
                    >

                      <div>
                        <h3 className="font-medium text-gray-700">
                          {file}
                        </h3>

                        <p className="text-sm text-gray-400">
                          Uploaded file
                        </p>
                      </div>

                      <button
                        className="
                          rounded-xl bg-indigo-100
                          px-4 py-2
                          text-sm font-medium text-indigo-600 transition
                          hover:bg-indigo-200
                        "
                      >
                        View
                      </button>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

/* ================= INFO CARD ================= */

function InfoCard({
  icon,
  title,
  value,
}) {
  return (
    <div
      className="
        flex items-start gap-4
        rounded-2xl bg-gray-50 p-5 transition
        hover:shadow-md
      "
    >

      <div
        className="
          rounded-xl bg-indigo-100
          p-3 text-indigo-600
        "
      >
        {icon}
      </div>

      <div>

        <p className="text-sm text-gray-500">
          {title}
        </p>

        <h3 className="mt-1 text-lg font-semibold text-gray-800">
          {value}
        </h3>

      </div>

    </div>
  );
}

export default TaskDetails;