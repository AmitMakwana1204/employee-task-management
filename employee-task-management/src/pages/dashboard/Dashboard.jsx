import {
  Users,
  ClipboardList,
  CheckCircle2,
  Clock3,
  CalendarCheck,
  Bell,
  ArrowUpRight,
  Activity,
  BriefcaseBusiness,
  TrendingUp,
  DollarSign,
  UserPlus,
  BarChart3,
  FolderKanban,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

function Dashboard() {
  const navigate = useNavigate();

  // ================= STATS =================

  const stats = [
    {
      title: "Total Employees",
      value: "148",
      icon: <Users size={28} />,
      color:
        "bg-blue-100 text-blue-700",
    },

    {
      title: "Active Tasks",
      value: "326",
      icon: (
        <ClipboardList size={28} />
      ),
      color:
        "bg-purple-100 text-purple-700",
    },

    {
      title: "Completed Tasks",
      value: "1,240",
      icon: (
        <CheckCircle2 size={28} />
      ),
      color:
        "bg-green-100 text-green-700",
    },

    {
      title: "Pending Reviews",
      value: "18",
      icon: <Clock3 size={28} />,
      color:
        "bg-yellow-100 text-yellow-700",
    },
  ];

  // ================= RECENT TASKS =================

  const recentTasks = [
    {
      id: 1,
      title:
        "Employee Management UI",
      team: "Frontend Team",
      status: "Completed",
    },

    {
      id: 2,
      title:
        "Task API Integration",
      team: "Backend Team",
      status: "In Progress",
    },

    {
      id: 3,
      title:
        "Attendance Report System",
      team: "HR Department",
      status: "Pending",
    },

    {
      id: 4,
      title:
        "Dashboard Analytics",
      team: "Admin Team",
      status: "Completed",
    },
  ];

  // ================= TOP EMPLOYEES =================

  const employees = [
    {
      name: "Amit Makwana",
      role:
        "Frontend Developer",
      performance: "92%",
    },

    {
      name: "Rahul Patel",
      role:
        "Backend Developer",
      performance: "88%",
    },

    {
      name: "Priya Shah",
      role: "UI/UX Designer",
      performance: "95%",
    },
  ];

  // ================= QUICK ACTIONS =================

  const quickActions = [
    {
      title: "Add Employee",
      icon: <UserPlus size={24} />,
      path: "/employees/add",
      color:
        "from-blue-500 to-indigo-600",
    },

    {
      title: "Create Task",
      icon: (
        <FolderKanban size={24} />
      ),
      path: "/tasks/add",
      color:
        "from-purple-500 to-pink-600",
    },

    {
      title: "Attendance",
      icon: (
        <CalendarCheck size={24} />
      ),
      path: "/attendance",
      color:
        "from-green-500 to-emerald-600",
    },

    {
      title: "Analytics",
      icon: <BarChart3 size={24} />,
      path: "/dashboard",
      color:
        "from-orange-500 to-red-600",
    },
  ];

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
                text-4xl font-bold
                text-gray-800
              "
            >
              Employee Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
              Monitor employees,
              tasks, productivity
              and company performance.
            </p>
          </div>

          <div className="flex items-center gap-4">

            {/* Notification */}

            <button
              className="
                relative rounded-2xl
                bg-white p-4 shadow-md
                transition hover:shadow-xl
              "
            >
              <Bell />

              <span
                className="
                  absolute right-3 top-3
                  h-2 w-2 rounded-full
                  bg-red-500
                "
              ></span>
            </button>

            {/* Report */}

            <button
              className="
                rounded-2xl
                bg-indigo-600
                px-6 py-3
                font-semibold text-white
                shadow-lg transition
                hover:scale-105
                hover:bg-indigo-700
              "
            >
              Generate Report
            </button>

          </div>
        </div>

        {/* ================= STATS ================= */}

        <div
          className="
            grid grid-cols-1 gap-6

            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          {stats.map(
            (item, index) => (
              <div
                key={index}
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
                      {item.title}
                    </p>

                    <h2
                      className="
                        mt-3 text-4xl
                        font-bold text-gray-800
                      "
                    >
                      {item.value}
                    </h2>

                  </div>

                  <div
                    className={`rounded-2xl p-4 ${item.color}`}
                  >
                    {item.icon}
                  </div>

                </div>

                <div
                  className="
                    mt-5 flex items-center
                    gap-2 text-sm
                    font-medium text-green-600
                  "
                >
                  <TrendingUp
                    size={16}
                  />

                  +12% from last month
                </div>

              </div>
            )
          )}
        </div>

        {/* ================= QUICK ACTIONS ================= */}

        <div className="mt-8">

          <div className="mb-5 flex items-center justify-between">

            <h2
              className="
                text-2xl font-bold
                text-gray-800
              "
            >
              Quick Actions
            </h2>

          </div>

          <div
            className="
              grid grid-cols-1 gap-6

              sm:grid-cols-2
              xl:grid-cols-4
            "
          >

            {quickActions.map(
              (
                action,
                index
              ) => (

                <button
                  key={index}
                  onClick={() =>
                    navigate(
                      action.path
                    )
                  }
                  className={`
                    rounded-3xl bg-gradient-to-r
                    ${action.color}
                    p-6 text-left text-white
                    shadow-xl transition

                    hover:-translate-y-1
                    hover:scale-[1.02]
                  `}
                >

                  <div
                    className="
                      mb-5 flex h-14 w-14
                      items-center justify-center
                      rounded-2xl
                      bg-white/20
                    "
                  >
                    {action.icon}
                  </div>

                  <h3
                    className="
                      text-xl font-bold
                    "
                  >
                    {action.title}
                  </h3>

                  <p className="mt-2 text-sm text-white/80">
                    Open module
                  </p>

                </button>

              )
            )}

          </div>

        </div>

        {/* ================= MAIN GRID ================= */}

        <div
          className="
            mt-8 grid grid-cols-1 gap-6

            xl:grid-cols-3
          "
        >

          {/* ================= LEFT ================= */}

          <div
            className="
              space-y-6
              xl:col-span-2
            "
          >

            {/* ================= RECENT TASKS ================= */}

            <div
              className="
                rounded-3xl bg-white
                p-6 shadow-lg
              "
            >

              <div
                className="
                  mb-6 flex items-center
                  justify-between
                "
              >

                <h2
                  className="
                    text-2xl font-bold
                    text-gray-800
                  "
                >
                  Recent Tasks
                </h2>

                <ClipboardList
                  className="text-indigo-600"
                />

              </div>

              <div className="space-y-4">

                {recentTasks.map(
                  (
                    task,
                    index
                  ) => (

                    <div
                      key={index}
                      className="
                        flex flex-col gap-4
                        rounded-2xl border
                        border-gray-100 p-5
                        transition

                        hover:shadow-md

                        md:flex-row
                        md:items-center
                        md:justify-between
                      "
                    >

                      <div>

                        <h3
                          className="
                            text-lg font-semibold
                            text-gray-800
                          "
                        >
                          {
                            task.title
                          }
                        </h3>

                        <p
                          className="
                            mt-1 text-sm
                            text-gray-500
                          "
                        >
                          {task.team}
                        </p>

                      </div>

                      <div className="flex items-center gap-3">

                        {task.status ===
                          "Completed" && (
                          <span
                            className="
                              rounded-full
                              bg-green-100
                              px-4 py-2
                              text-sm font-medium
                              text-green-700
                            "
                          >
                            Completed
                          </span>
                        )}

                        {task.status ===
                          "In Progress" && (
                          <span
                            className="
                              rounded-full
                              bg-yellow-100
                              px-4 py-2
                              text-sm font-medium
                              text-yellow-700
                            "
                          >
                            In Progress
                          </span>
                        )}

                        {task.status ===
                          "Pending" && (
                          <span
                            className="
                              rounded-full
                              bg-red-100
                              px-4 py-2
                              text-sm font-medium
                              text-red-700
                            "
                          >
                            Pending
                          </span>
                        )}

                        <button
                          onClick={() =>
                            navigate(
                              `/tasks/details/${task.id}`
                            )
                          }
                          className="
                            rounded-xl
                            bg-indigo-600 p-2
                            text-white transition
                            hover:bg-indigo-700
                          "
                        >
                          <ArrowUpRight
                            size={18}
                          />
                        </button>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* ================= ACTIVITY ================= */}

            <div
              className="
                rounded-3xl bg-white
                p-6 shadow-lg
              "
            >

              <div
                className="
                  mb-6 flex items-center
                  justify-between
                "
              >

                <h2
                  className="
                    text-2xl font-bold
                    text-gray-800
                  "
                >
                  Company Activity
                </h2>

                <Activity
                  className="text-indigo-600"
                />

              </div>

              <div className="space-y-5">

                <ActivityItem
                  title="New employee joined company"
                  desc="Rahul Patel joined Backend Team"
                  time="2 hours ago"
                />

                <ActivityItem
                  title="Task completed successfully"
                  desc="Dashboard UI task marked as completed"
                  time="5 hours ago"
                />

                <ActivityItem
                  title="Meeting scheduled"
                  desc="HR department meeting at 4:30 PM"
                  time="Today"
                />

              </div>

            </div>

          </div>

          {/* ================= RIGHT ================= */}

          <div className="space-y-6">

            {/* Attendance */}

            <div
              className="
                rounded-3xl
                bg-gradient-to-br
                from-indigo-600
                to-purple-700
                p-6 text-white
                shadow-2xl
              "
            >

              <div
                className="
                  flex items-center
                  justify-between
                "
              >

                <h2
                  className="
                    text-2xl font-bold
                  "
                >
                  Attendance
                </h2>

                <CalendarCheck
                  size={30}
                />

              </div>

              <div className="mt-8">

                <h1
                  className="
                    text-6xl font-black
                  "
                >
                  92%
                </h1>

                <p
                  className="
                    mt-2 text-indigo-100
                  "
                >
                  Overall employee
                  attendance this month.
                </p>

              </div>

              <button
                onClick={() =>
                  navigate(
                    "/attendance"
                  )
                }
                className="
                  mt-8 rounded-2xl
                  bg-white px-5 py-3
                  font-semibold
                  text-indigo-700 transition
                  hover:scale-105
                "
              >
                View Details
              </button>

            </div>

            {/* Top Employees */}

            <div
              className="
                rounded-3xl bg-white
                p-6 shadow-lg
              "
            >

              <div
                className="
                  mb-6 flex items-center
                  justify-between
                "
              >

                <h2
                  className="
                    text-2xl font-bold
                    text-gray-800
                  "
                >
                  Top Employees
                </h2>

                <BriefcaseBusiness
                  className="text-indigo-600"
                />

              </div>

              <div className="space-y-5">

                {employees.map(
                  (
                    employee,
                    index
                  ) => (

                    <div
                      key={index}
                      className="
                        flex items-center
                        justify-between
                        rounded-2xl border
                        border-gray-100 p-4
                        transition hover:shadow-md
                      "
                    >

                      <div>

                        <h3
                          className="
                            font-semibold
                            text-gray-800
                          "
                        >
                          {
                            employee.name
                          }
                        </h3>

                        <p
                          className="
                            text-sm text-gray-500
                          "
                        >
                          {
                            employee.role
                          }
                        </p>

                      </div>

                      <div
                        className="
                          rounded-xl
                          bg-green-100
                          px-4 py-2
                          font-semibold
                          text-green-700
                        "
                      >
                        {
                          employee.performance
                        }
                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* Revenue Card */}

            <div
              className="
                rounded-3xl
                bg-gradient-to-r
                from-green-500
                to-emerald-600
                p-6 text-white
                shadow-2xl
              "
            >

              <div
                className="
                  flex items-center
                  justify-between
                "
              >

                <h2
                  className="
                    text-2xl font-bold
                  "
                >
                  Revenue
                </h2>

                <DollarSign
                  size={32}
                />

              </div>

              <div className="mt-8">

                <h1
                  className="
                    text-5xl font-black
                  "
                >
                  ₹8.2L
                </h1>

                <p
                  className="
                    mt-2 text-green-100
                  "
                >
                  Monthly company revenue growth.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

function ActivityItem({
  title,
  desc,
  time,
}) {
  return (
    <div className="flex gap-4">

      <div
        className="
          mt-1 h-3 w-3
          rounded-full bg-indigo-600
        "
      ></div>

      <div>

        <h3
          className="
            font-semibold
            text-gray-800
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-1 text-sm
            text-gray-500
          "
        >
          {desc}
        </p>

        <p
          className="
            mt-2 text-xs
            text-gray-400
          "
        >
          {time}
        </p>

      </div>

    </div>
  );
}

export default Dashboard;