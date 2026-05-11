import { useContext, useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Clock,
  CheckCircle2,
  AlertCircle,
  Activity,
  Pencil,
  Camera,
  Award,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import { AuthContext } from "../../context/AuthContext";
import { getDashboardStats } from "../../services/taskService";

function Profile() {

  const { user } = useContext(AuthContext);

  const [stats, setStats] = useState({ completedTasks: 0, pendingTasks: 0, totalTasks: 0, inProgressTasks: 0 });
  const [recentTasks, setRecentTasks] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data.stats);
        setRecentTasks(data.recentTasks || []);
      } catch (e) {
        console.error("Profile stats error:", e);
      }
    };
    fetchStats();
  }, []);

  // Use AuthContext user data or defaults
  const employee = {
    name: user?.name || "—",
    role: user?.department || user?.role || "—",
    email: user?.email || "—",
    phone: user?.phone || "Not set",
    location: user?.address || "Not set",
    joinDate: user?.createdAt
      ? new Date(user.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
      : "—",
    department: user?.department || user?.role || "—",
    status: user?.status || "Active",
    completedTasks: stats.completedTasks,
    pendingTasks: stats.pendingTasks,
    inProgressTasks: stats.inProgressTasks,
    totalTasks: stats.totalTasks,
  };

  return (
    <MainLayout>

      <div className="min-h-screen bg-gray-100 p-6">

        {/* ================= PROFILE BANNER ================= */}

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 p-8 shadow-2xl">

          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            {/* ================= LEFT ================= */}

            <div className="flex items-center gap-5">

              <div className="relative">

                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="profile"
                    className="h-28 w-28 rounded-3xl border-4 border-white object-cover shadow-xl"
                  />
                ) : (
                  <div className="h-28 w-28 rounded-3xl border-4 border-white shadow-xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white text-5xl font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}

                <button className="absolute bottom-0 right-0 rounded-full bg-black p-2 text-white shadow-lg transition hover:scale-110">
                  <Camera size={16} />
                </button>
              </div>

              <div className="text-white">

                <h1 className="text-4xl font-bold">
                  {employee.name}
                </h1>

                <p className="mt-1 text-lg text-indigo-100">
                  {employee.role}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">

                  <span className="rounded-full bg-white/20 px-4 py-1 text-sm backdrop-blur">
                    {employee.department}
                  </span>

                  <span className="rounded-full bg-green-400/20 px-4 py-1 text-sm text-green-100">
                    {employee.status}
                  </span>

                </div>

                {/* ================= SOCIAL LINKS ================= */}

                <div className="mt-5 flex items-center gap-4">

                  <a
                    href="https://github.com/AmitMakwana1204"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-white/10 p-3 transition hover:scale-110 hover:bg-white/20"
                  >
                    <FaGithub />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/amit-makwana-aa255b407"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-white/10 p-3 transition hover:scale-110 hover:bg-white/20"
                  >
                    <FaLinkedin />
                  </a>

                  <a
                    href="https://new-portfolio-ten-peach.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-white/10 p-3 transition hover:scale-110 hover:bg-white/20"
                  >
                    <FaGlobe />
                  </a>

                </div>
              </div>
            </div>

            {/* ================= RIGHT ================= */}

            <div className="flex gap-3">

              <a
                href="https://github.com/AmitMakwana1204"
                target="_blank"
                rel="noreferrer"
                className="
                  flex items-center gap-2 rounded-2xl
                  bg-white px-5 py-3 font-semibold
                  text-black transition hover:scale-105
                "
              >
                <Pencil size={18} />

                GitHub
              </a>

              <a
                href="https://new-portfolio-ten-peach.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="
                  rounded-2xl border border-white/40
                  px-5 py-3 font-semibold text-white
                  backdrop-blur transition hover:bg-white/10
                "
              >
                View Portfolio
              </a>

            </div>
          </div>
        </div>

        {/* ================= MAIN GRID ================= */}

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* ================= LEFT SIDE ================= */}

          <div className="space-y-6 xl:col-span-2">

            {/* ================= INFO ================= */}

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="mb-6 flex items-center justify-between">

                <h2 className="text-2xl font-bold text-gray-800">
                  Developer Information
                </h2>

                <ShieldCheck className="text-indigo-600" />
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <InfoCard
                  icon={<Mail />}
                  title="Email"
                  value={employee.email}
                />

                <InfoCard
                  icon={<Phone />}
                  title="Phone"
                  value={employee.phone}
                />

                <InfoCard
                  icon={<MapPin />}
                  title="Location"
                  value={employee.location}
                />

                <InfoCard
                  icon={<Calendar />}
                  title="Joining Date"
                  value={employee.joinDate}
                />

                <InfoCard
                  icon={<Briefcase />}
                  title="Department"
                  value={employee.department}
                />

                <InfoCard
                  icon={<User />}
                  title="Role"
                  value={employee.role}
                />

              </div>
            </div>

            {/* ================= RECENT TASKS ================= */}

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="mb-6 flex items-center justify-between">

                <h2 className="text-2xl font-bold text-gray-800">
                  Recent Tasks
                </h2>

                <Activity className="text-indigo-600" />
              </div>

              <div className="space-y-4">

                {recentTasks.map((task, index) => (

                  <div
                    key={index}
                    className="
                      flex flex-col gap-4 rounded-2xl
                      border border-gray-100 p-5
                      transition hover:shadow-md
                      md:flex-row md:items-center
                      md:justify-between
                    "
                  >

                    <div>

                      <h3 className="text-lg font-semibold text-gray-800">
                        {task.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Priority: {task.priority}
                      </p>
                    </div>

                    <div>

                      {task.status === "Completed" && (
                        <span className="
                          flex items-center gap-2 rounded-full
                          bg-green-100 px-4 py-2 text-sm
                          font-medium text-green-700
                        ">
                          <CheckCircle2 size={16} />

                          Completed
                        </span>
                      )}

                      {task.status === "In Progress" && (
                        <span className="
                          flex items-center gap-2 rounded-full
                          bg-yellow-100 px-4 py-2 text-sm
                          font-medium text-yellow-700
                        ">
                          <Clock size={16} />

                          In Progress
                        </span>
                      )}

                      {task.status === "Pending" && (
                        <span className="
                          flex items-center gap-2 rounded-full
                          bg-red-100 px-4 py-2 text-sm
                          font-medium text-red-700
                        ">
                          <AlertCircle size={16} />

                          Pending
                        </span>
                      )}

                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div className="space-y-6">

            {/* ================= STATS ================= */}

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                Performance Stats
              </h2>

              <div className="space-y-5">

                <StatCard
                  icon={<CheckCircle2 />}
                  title="Completed Tasks"
                  value={employee.completedTasks}
                  color="bg-green-100 text-green-700"
                />

                <StatCard
                  icon={<AlertCircle />}
                  title="Pending Tasks"
                  value={employee.pendingTasks}
                  color="bg-red-100 text-red-700"
                />

                <StatCard
                  icon={<Activity />}
                  title="In Progress"
                  value={employee.inProgressTasks}
                  color="bg-blue-100 text-blue-700"
                />

                <StatCard
                  icon={<TrendingUp />}
                  title="Total Tasks"
                  value={employee.totalTasks}
                  color="bg-indigo-100 text-indigo-700"
                />

              </div>
            </div>

            {/* ================= ACHIEVEMENT ================= */}

            <div className="
              rounded-3xl bg-gradient-to-br
              from-indigo-600 to-purple-700
              p-6 text-white shadow-2xl
            ">

              <div className="flex items-center justify-between">

                <h2 className="text-2xl font-bold">
                  Achievement
                </h2>

                <Award size={30} />
              </div>

              <div className="mt-6 rounded-2xl bg-white/10 p-5 backdrop-blur">

                <h3 className="text-xl font-semibold">
                  MERN Stack Developer
                </h3>

                <p className="mt-2 text-sm text-indigo-100">
                  Building modern full-stack web applications
                  using React.js, Node.js, Express.js and MongoDB.
                </p>

                <a
                  href="https://new-portfolio-ten-peach.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    mt-5 inline-block rounded-xl bg-white
                    px-5 py-3 font-semibold text-indigo-700
                    transition hover:scale-105
                  "
                >
                  View Portfolio
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

// ================= INFO CARD =================

function InfoCard({ icon, title, value }) {
  return (
    <div className="
      flex items-start gap-4 rounded-2xl
      bg-gray-50 p-5 transition hover:shadow-md
    ">

      <div className="rounded-xl bg-indigo-100 p-3 text-indigo-700">
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

// ================= STAT CARD =================

function StatCard({ icon, title, value, color }) {
  return (
    <div className="
      flex items-center justify-between
      rounded-2xl border border-gray-100
      p-5 transition hover:shadow-md
    ">

      <div className="flex items-center gap-4">

        <div className={`rounded-xl p-3 ${color}`}>
          {icon}
        </div>

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h3 className="text-xl font-bold text-gray-800">
            {value}
          </h3>

        </div>
      </div>
    </div>
  );
}

export default Profile;