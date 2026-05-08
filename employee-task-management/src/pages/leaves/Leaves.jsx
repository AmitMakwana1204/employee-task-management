import {
  FaCalendarAlt,
  FaPlus,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaSearch,
  FaEye,
  FaTrash,
} from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";

function Leaves() {
  const leaveData = [
    {
      id: 1,
      employee: "Amit Makwana",
      type: "Sick Leave",
      from: "08 May 2026",
      to: "10 May 2026",
      days: 3,
      status: "Approved",
    },

    {
      id: 2,
      employee: "Rahul Patel",
      type: "Casual Leave",
      from: "12 May 2026",
      to: "13 May 2026",
      days: 2,
      status: "Pending",
    },

    {
      id: 3,
      employee: "Priya Shah",
      type: "Emergency Leave",
      from: "15 May 2026",
      to: "16 May 2026",
      days: 2,
      status: "Rejected",
    },

    {
      id: 4,
      employee: "Jay Mehta",
      type: "Vacation",
      from: "20 May 2026",
      to: "25 May 2026",
      days: 6,
      status: "Approved",
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 p-6">

        {/* ================= HEADER ================= */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h1 className="flex items-center gap-3 text-4xl font-bold text-gray-800">
              <FaCalendarAlt className="text-indigo-600" />

              Leave Management
            </h1>

            <p className="mt-2 text-gray-500">
              Manage employee leave requests and approvals.
            </p>
          </div>

          <button
            className="
              flex items-center gap-3
              rounded-2xl
              bg-gradient-to-r from-blue-600 to-indigo-600
              px-6 py-4
              font-semibold text-white
              shadow-xl transition
              hover:scale-105
            "
          >
            <FaPlus />

            Apply Leave
          </button>

        </div>

        {/* ================= STATS ================= */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatsCard
            title="Total Leaves"
            value="84"
            icon={<FaCalendarAlt />}
            color="bg-blue-100 text-blue-600"
          />

          <StatsCard
            title="Approved"
            value="52"
            icon={<FaCheckCircle />}
            color="bg-green-100 text-green-600"
          />

          <StatsCard
            title="Pending"
            value="21"
            icon={<FaClock />}
            color="bg-yellow-100 text-yellow-600"
          />

          <StatsCard
            title="Rejected"
            value="11"
            icon={<FaTimesCircle />}
            color="bg-red-100 text-red-600"
          />

        </div>

        {/* ================= SEARCH BAR ================= */}

        <div className="mt-8 rounded-3xl bg-white p-5 shadow-lg">

          <div className="relative max-w-md">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search employee..."
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

        </div>

        {/* ================= TABLE ================= */}

        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-lg">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1000px]">

              {/* Header */}

              <thead className="bg-gray-50">

                <tr className="border-b border-gray-100 text-left">

                  <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                    Employee
                  </th>

                  <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                    Leave Type
                  </th>

                  <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                    From
                  </th>

                  <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                    To
                  </th>

                  <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                    Days
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

                {leaveData.map((leave) => (

                  <tr
                    key={leave.id}
                    className="
                      border-b border-gray-100 transition
                      hover:bg-gray-50
                    "
                  >

                    {/* Employee */}

                    <td className="px-6 py-5">

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {leave.employee}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Leave ID :
                          #{leave.id}
                        </p>
                      </div>

                    </td>

                    {/* Leave Type */}

                    <td className="px-6 py-5 text-gray-700">
                      {leave.type}
                    </td>

                    {/* From */}

                    <td className="px-6 py-5 text-gray-600">
                      {leave.from}
                    </td>

                    {/* To */}

                    <td className="px-6 py-5 text-gray-600">
                      {leave.to}
                    </td>

                    {/* Days */}

                    <td className="px-6 py-5">

                      <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-600">
                        {leave.days} Days
                      </span>

                    </td>

                    {/* Status */}

                    <td className="px-6 py-5">

                      {leave.status === "Approved" && (
                        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-600">
                          Approved
                        </span>
                      )}

                      {leave.status === "Pending" && (
                        <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-600">
                          Pending
                        </span>
                      )}

                      {leave.status === "Rejected" && (
                        <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-600">
                          Rejected
                        </span>
                      )}

                    </td>

                    {/* Actions */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <button
                          className="
                            flex h-10 w-10 items-center justify-center
                            rounded-xl bg-blue-100 text-blue-600 transition
                            hover:scale-110
                          "
                        >
                          <FaEye />
                        </button>

                        <button
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

                ))}

              </tbody>

            </table>

          </div>

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

export default Leaves;