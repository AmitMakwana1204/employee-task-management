import { useState, useEffect, useContext } from "react";

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
  UserPlus,
  BarChart3,
  FolderKanban,
  Loader2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import { getDashboardStats } from "../../services/taskService";
import { AuthContext } from "../../context/AuthContext";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // ================= STATE =================

  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
  });

  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH STATS =================

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getDashboardStats();
        setStats(data.stats);
        setRecentTasks(data.recentTasks || []);
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // ================= STAT CARDS =================

  const statCards = [
    ...(user?.role === "admin"
      ? [
          {
            title: "Total Employees",
            value: stats.totalEmployees,
            icon: <Users size={28} />,
            color: "bg-blue-100 text-blue-700",
          },
        ]
      : []),
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: <ClipboardList size={28} />,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Completed Tasks",
      value: stats.completedTasks,
      icon: <CheckCircle2 size={28} />,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Pending Tasks",
      value: stats.pendingTasks,
      icon: <Clock3 size={28} />,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "In Progress",
      value: stats.inProgressTasks,
      icon: <Activity size={28} />,
      color: "bg-orange-100 text-orange-700",
    },
  ];

  // ================= QUICK ACTIONS =================

  const quickActions = [
    ...(user?.role === "admin"
      ? [
          {
            title: "Add Employee",
            icon: <UserPlus size={24} />,
            path: "/employees/add",
            color: "from-blue-500 to-indigo-600",
          },
        ]
      : []),
    {
      title: "Create Task",
      icon: <FolderKanban size={24} />,
      path: "/tasks/add",
      color: "from-purple-500 to-pink-600",
      adminOnly: true,
    },
    {
      title: "Attendance",
      icon: <CalendarCheck size={24} />,
      path: "/attendance",
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Analytics",
      icon: <BarChart3 size={24} />,
      path: "/reports",
      color: "from-orange-500 to-red-600",
    },
  ].filter((a) => !a.adminOnly || user?.role === "admin");

  // ================= STATUS BADGE =================

  const statusBadge = (status) => {
    const map = {
      Completed: "bg-green-100 px-4 py-2 text-sm font-medium text-green-700",
      "In Progress": "bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700",
      Pending: "bg-red-100 px-4 py-2 text-sm font-medium text-red-700",
    };
    return map[status] || "bg-gray-100 text-gray-600 px-4 py-2 text-sm font-medium";
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 p-6">

        {/* ================= HEADER ================= */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              {user?.role === "admin" ? "Admin Dashboard" : "My Dashboard"}
            </h1>

            <p className="mt-2 text-gray-500">
              Welcome back, <span className="font-semibold text-indigo-600">{user?.name}</span> 👋
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative rounded-2xl bg-white p-4 shadow-md transition hover:shadow-xl">
              <Bell />
              <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {user?.role === "admin" && (
              <button
                onClick={() => navigate("/reports")}
                className="rounded-2xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-indigo-700"
              >
                Generate Report
              </button>
            )}
          </div>
        </div>

        {/* ================= LOADING ================= */}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
              <p className="text-gray-500">Loading dashboard data...</p>
            </div>
          </div>
        ) : (
          <>
            {/* ================= STATS ================= */}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {statCards.map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500">{item.title}</p>
                      <h2 className="mt-3 text-4xl font-bold text-gray-800">
                        {item.value}
                      </h2>
                    </div>
                    <div className={`rounded-2xl p-4 ${item.color}`}>
                      {item.icon}
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-sm font-medium text-green-600">
                    <TrendingUp size={16} />
                    Real-time data
                  </div>
                </div>
              ))}
            </div>

            {/* ================= QUICK ACTIONS ================= */}

            <div className="mt-8">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  Quick Actions
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(action.path)}
                    className={`rounded-3xl bg-gradient-to-r ${action.color} p-6 text-left text-white shadow-xl transition hover:-translate-y-1 hover:scale-[1.02]`}
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                      {action.icon}
                    </div>
                    <h3 className="text-xl font-bold">{action.title}</h3>
                    <p className="mt-2 text-sm text-white/80">Open module</p>
                  </button>
                ))}
              </div>
            </div>

            {/* ================= MAIN GRID ================= */}

            <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">

              {/* ================= RECENT TASKS ================= */}

              <div className="space-y-6 xl:col-span-2">
                <div className="rounded-3xl bg-white p-6 shadow-lg">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Recent Tasks
                    </h2>
                    <ClipboardList className="text-indigo-600" />
                  </div>

                  {recentTasks.length === 0 ? (
                    <div className="py-12 text-center text-gray-400">
                      <ClipboardList className="mx-auto mb-4 h-16 w-16 opacity-30" />
                      <p className="text-lg font-medium">No tasks yet</p>
                      <p className="mt-1 text-sm">Tasks will appear here once created.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentTasks.map((task, index) => (
                        <div
                          key={task._id || index}
                          className="flex flex-col gap-4 rounded-2xl border border-gray-100 p-5 transition hover:shadow-md md:flex-row md:items-center md:justify-between"
                        >
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {task.title}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Assigned to: {task.assignedTo?.name || "—"}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className={`rounded-full ${statusBadge(task.status)}`}>
                              {task.status}
                            </span>
                            <button
                              onClick={() => navigate(`/tasks/details/${task._id}`)}
                              className="rounded-xl bg-indigo-600 p-2 text-white transition hover:bg-indigo-700"
                            >
                              <ArrowUpRight size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => navigate("/tasks")}
                    className="mt-6 w-full rounded-2xl border border-indigo-200 py-3 text-center font-semibold text-indigo-600 transition hover:bg-indigo-50"
                  >
                    View All Tasks →
                  </button>
                </div>
              </div>

              {/* ================= RIGHT ================= */}

              <div className="space-y-6">

                {/* Attendance Card */}
                <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white shadow-2xl">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Attendance</h2>
                    <CalendarCheck size={30} />
                  </div>
                  <div className="mt-8">
                    <h1 className="text-6xl font-black">92%</h1>
                    <p className="mt-2 text-indigo-100">
                      Overall employee attendance this month.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/attendance")}
                    className="mt-8 rounded-2xl bg-white px-5 py-3 font-semibold text-indigo-700 transition hover:scale-105"
                  >
                    View Details
                  </button>
                </div>

                {/* Profile Summary */}
                <div className="rounded-3xl bg-white p-6 shadow-lg">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">My Profile</h2>
                    <BriefcaseBusiness className="text-indigo-600" />
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mb-3">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{user?.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                    <p className="text-sm text-gray-400 mt-1">{user?.email}</p>

                    <button
                      onClick={() => navigate("/profile")}
                      className="mt-4 rounded-xl bg-indigo-50 px-5 py-2 font-semibold text-indigo-600 transition hover:bg-indigo-100"
                    >
                      View Profile
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </>
        )}

      </div>
    </MainLayout>
  );
}

export default Dashboard;