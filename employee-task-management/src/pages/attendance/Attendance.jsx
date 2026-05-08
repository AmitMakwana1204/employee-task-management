import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  TimerReset,
  Search,
  Download,
  Filter,
  UserCircle2,
} from "lucide-react";

import MainLayout from "../../layouts/MainLayout";

function Attendance() {
  const attendanceData = [
    {
      id: 1,
      name: "Amit Makwana",
      role: "Frontend Developer",
      date: "08 May 2026",
      checkIn: "09:12 AM",
      checkOut: "06:20 PM",
      status: "Present",
      hours: "9h 08m",
    },

    {
      id: 2,
      name: "Rahul Patel",
      role: "Backend Developer",
      date: "08 May 2026",
      checkIn: "09:45 AM",
      checkOut: "06:00 PM",
      status: "Late",
      hours: "8h 15m",
    },

    {
      id: 3,
      name: "Priya Shah",
      role: "UI/UX Designer",
      date: "08 May 2026",
      checkIn: "--",
      checkOut: "--",
      status: "Absent",
      hours: "--",
    },

    {
      id: 4,
      name: "Jay Mehta",
      role: "Project Manager",
      date: "08 May 2026",
      checkIn: "08:55 AM",
      checkOut: "06:35 PM",
      status: "Present",
      hours: "9h 40m",
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 p-6">
        {/* ===== HEADER ===== */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Attendance Management
            </h1>

            <p className="mt-2 text-gray-500">
              Monitor employee attendance, work hours and daily reports.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-indigo-700">
            <Download size={18} />
            Export Report
          </button>
        </div>

        {/* ===== STATS ===== */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Present Employees"
            value="148"
            icon={<CheckCircle2 />}
            color="bg-green-100 text-green-700"
          />

          <StatsCard
            title="Absent Employees"
            value="12"
            icon={<XCircle />}
            color="bg-red-100 text-red-700"
          />

          <StatsCard
            title="Late Check-Ins"
            value="19"
            icon={<TimerReset />}
            color="bg-yellow-100 text-yellow-700"
          />

          <StatsCard
            title="Working Hours"
            value="8.7h"
            icon={<Clock3 />}
            color="bg-indigo-100 text-indigo-700"
          />
        </div>

        {/* ===== FILTER BAR ===== */}
        <div className="mt-8 rounded-3xl bg-white p-5 shadow-lg">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-[350px]">
              <Search
                className="absolute left-4 top-3.5 text-gray-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search employee..."
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:bg-white"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 font-medium transition hover:bg-gray-100">
                <CalendarDays size={18} />
                Today
              </button>

              <button className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 font-medium transition hover:bg-gray-100">
                <Filter size={18} />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* ===== TABLE ===== */}
        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-lg">
          {/* Table Header */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-gray-50">
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                    Employee
                  </th>

                  <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                    Date
                  </th>

                  <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                    Check In
                  </th>

                  <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                    Check Out
                  </th>

                  <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                    Working Hours
                  </th>

                  <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {attendanceData.map((employee) => (
                  <tr
                    key={employee.id}
                    className="border-b border-gray-100 transition hover:bg-gray-50"
                  >
                    {/* Employee */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-700">
                          <UserCircle2 size={24} />
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {employee.name}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {employee.role}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5 text-gray-600">
                      {employee.date}
                    </td>

                    {/* Check In */}
                    <td className="px-6 py-5 font-medium text-gray-700">
                      {employee.checkIn}
                    </td>

                    {/* Check Out */}
                    <td className="px-6 py-5 font-medium text-gray-700">
                      {employee.checkOut}
                    </td>

                    {/* Hours */}
                    <td className="px-6 py-5 font-semibold text-indigo-600">
                      {employee.hours}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      {employee.status === "Present" && (
                        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                          Present
                        </span>
                      )}

                      {employee.status === "Late" && (
                        <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">
                          Late
                        </span>
                      )}

                      {employee.status === "Absent" && (
                        <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700">
                          Absent
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="px-6 py-5">
                      <button className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function StatsCard({ title, value, icon, color }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-800">
            {value}
          </h2>
        </div>

        <div className={`rounded-2xl p-4 ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default Attendance;