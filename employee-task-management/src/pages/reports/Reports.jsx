import {
  FaChartBar,
  FaUsers,
  FaTasks,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaArrowUp,
  FaArrowDown,
  FaDownload,
  FaFilePdf,
  FaFileExcel,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";

function Reports() {
  // ================= REPORT DATA =================

  const reportStats = [
    {
      title: "Total Employees",
      value: "148",
      icon: <FaUsers />,
      growth: "+12%",
      increase: true,
      color:
        "bg-blue-100 text-blue-600",
    },

    {
      title: "Completed Tasks",
      value: "1,240",
      icon: <FaTasks />,
      growth: "+18%",
      increase: true,
      color:
        "bg-green-100 text-green-600",
    },

    {
      title: "Attendance Rate",
      value: "92%",
      icon: (
        <FaCalendarCheck />
      ),
      growth: "-2%",
      increase: false,
      color:
        "bg-yellow-100 text-yellow-600",
    },

    {
      title: "Revenue",
      value: "₹8.2L",
      icon: (
        <FaMoneyBillWave />
      ),
      growth: "+24%",
      increase: true,
      color:
        "bg-purple-100 text-purple-600",
    },
  ];

  // ================= RECENT REPORTS =================

  const reports = [
    {
      id: 1,
      name:
        "Monthly Employee Performance",

      type: "PDF",

      created:
        "08 May 2026",

      status: "Completed",
    },

    {
      id: 2,
      name:
        "Attendance Analytics",

      type: "Excel",

      created:
        "06 May 2026",

      status: "Pending",
    },

    {
      id: 3,
      name:
        "Task Productivity Report",

      type: "PDF",

      created:
        "02 May 2026",

      status: "Completed",
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
                flex items-center gap-3
                text-4xl font-bold
                text-gray-800
              "
            >

              <FaChartBar className="text-indigo-600" />

              Reports & Analytics

            </h1>

            <p className="mt-2 text-gray-500">
              Track company performance,
              analytics and productivity reports.
            </p>

          </div>

          {/* Export Buttons */}

          <div className="flex flex-wrap gap-3">

            <button
              className="
                flex items-center gap-2
                rounded-2xl
                bg-red-500 px-5 py-3
                font-medium text-white
                shadow-lg transition

                hover:scale-105
              "
            >

              <FaFilePdf />

              Export PDF

            </button>

            <button
              className="
                flex items-center gap-2
                rounded-2xl
                bg-green-600 px-5 py-3
                font-medium text-white
                shadow-lg transition

                hover:scale-105
              "
            >

              <FaFileExcel />

              Export Excel

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

          {reportStats.map(
            (
              item,
              index
            ) => (

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

                {/* Growth */}

                <div
                  className={`
                    mt-5 flex items-center gap-2
                    text-sm font-medium

                    ${
                      item.increase
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  `}
                >

                  {item.increase ? (
                    <FaArrowUp />
                  ) : (
                    <FaArrowDown />
                  )}

                  {item.growth}
                  {" "}
                  from last month

                </div>

              </div>

            )
          )}

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

            {/* Performance Overview */}

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
                  Performance Overview
                </h2>

                <FaChartBar className="text-indigo-600" />

              </div>

              {/* Fake Chart */}

              <div className="space-y-5">

                <ChartBar
                  label="Employees Productivity"
                  value={85}
                  color="from-blue-500 to-indigo-600"
                />

                <ChartBar
                  label="Task Completion"
                  value={72}
                  color="from-green-500 to-emerald-600"
                />

                <ChartBar
                  label="Attendance Rate"
                  value={92}
                  color="from-yellow-500 to-orange-500"
                />

                <ChartBar
                  label="Revenue Growth"
                  value={68}
                  color="from-purple-500 to-pink-600"
                />

              </div>

            </div>

            {/* Recent Reports */}

            <div
              className="
                overflow-hidden rounded-3xl
                bg-white shadow-lg
              "
            >

              <div className="p-6">

                <h2
                  className="
                    text-2xl font-bold
                    text-gray-800
                  "
                >
                  Recent Reports
                </h2>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full min-w-[800px]">

                  {/* Header */}

                  <thead className="bg-gray-50">

                    <tr className="border-b border-gray-100 text-left">

                      <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                        Report Name
                      </th>

                      <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                        Type
                      </th>

                      <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                        Created
                      </th>

                      <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                        Status
                      </th>

                      <th className="px-6 py-5 text-sm font-semibold text-gray-600">
                        Action
                      </th>

                    </tr>

                  </thead>

                  {/* Body */}

                  <tbody>

                    {reports.map(
                      (report) => (

                        <tr
                          key={report.id}
                          className="
                            border-b border-gray-100
                            transition

                            hover:bg-gray-50
                          "
                        >

                          {/* Name */}

                          <td className="px-6 py-5">

                            <div>

                              <h3 className="font-semibold text-gray-800">
                                {report.name}
                              </h3>

                              <p className="mt-1 text-sm text-gray-500">
                                Report ID :
                                #{report.id}
                              </p>

                            </div>

                          </td>

                          {/* Type */}

                          <td className="px-6 py-5">

                            <span
                              className={`
                                rounded-full
                                px-4 py-2
                                text-sm font-medium

                                ${
                                  report.type ===
                                  "PDF"
                                    ? "bg-red-100 text-red-600"
                                    : "bg-green-100 text-green-600"
                                }
                              `}
                            >
                              {report.type}
                            </span>

                          </td>

                          {/* Created */}

                          <td className="px-6 py-5 text-gray-600">
                            {report.created}
                          </td>

                          {/* Status */}

                          <td className="px-6 py-5">

                            {report.status ===
                            "Completed" ? (
                              <span
                                className="
                                  rounded-full
                                  bg-green-100
                                  px-4 py-2
                                  text-sm font-medium
                                  text-green-600
                                "
                              >
                                Completed
                              </span>
                            ) : (
                              <span
                                className="
                                  rounded-full
                                  bg-yellow-100
                                  px-4 py-2
                                  text-sm font-medium
                                  text-yellow-600
                                "
                              >
                                Pending
                              </span>
                            )}

                          </td>

                          {/* Download */}

                          <td className="px-6 py-5">

                            <button
                              className="
                                flex items-center gap-2
                                rounded-xl
                                bg-indigo-100
                                px-4 py-2
                                text-sm font-medium
                                text-indigo-600 transition

                                hover:bg-indigo-200
                              "
                            >

                              <FaDownload />

                              Download

                            </button>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

          {/* ================= RIGHT ================= */}

          <div className="space-y-6">

            {/* Productivity Card */}

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

              <div className="flex items-center justify-between">

                <h2 className="text-2xl font-bold">
                  Productivity
                </h2>

                <FaTasks className="text-3xl" />

              </div>

              <div className="mt-8">

                <h1 className="text-6xl font-black">
                  86%
                </h1>

                <p className="mt-3 text-indigo-100">
                  Overall employee productivity this month.
                </p>

              </div>

            </div>

            {/* Report Summary */}

            <div
              className="
                rounded-3xl bg-white
                p-6 shadow-lg
              "
            >

              <h2
                className="
                  mb-6 text-2xl
                  font-bold text-gray-800
                "
              >
                Report Summary
              </h2>

              <div className="space-y-5">

                <SummaryCard
                  title="Completed Reports"
                  value="18"
                  icon={
                    <FaCheckCircle />
                  }
                  color="bg-green-100 text-green-600"
                />

                <SummaryCard
                  title="Pending Reports"
                  value="4"
                  icon={<FaClock />}
                  color="bg-yellow-100 text-yellow-600"
                />

                <SummaryCard
                  title="Downloaded Reports"
                  value="126"
                  icon={
                    <FaDownload />
                  }
                  color="bg-blue-100 text-blue-600"
                />

              </div>

            </div>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

/* ================= CHART BAR ================= */

function ChartBar({
  label,
  value,
  color,
}) {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <span className="font-medium text-gray-700">
          {label}
        </span>

        <span className="font-semibold text-gray-800">
          {value}%
        </span>

      </div>

      <div className="h-4 overflow-hidden rounded-full bg-gray-200">

        <div
          style={{
            width: `${value}%`,
          }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        ></div>

      </div>

    </div>
  );
}

/* ================= SUMMARY CARD ================= */

function SummaryCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div
      className="
        flex items-center justify-between
        rounded-2xl border border-gray-100
        p-5 transition

        hover:shadow-md
      "
    >

      <div>

        <p className="text-gray-500">
          {title}
        </p>

        <h3 className="mt-2 text-3xl font-bold text-gray-800">
          {value}
        </h3>

      </div>

      <div
        className={`rounded-2xl p-4 ${color}`}
      >
        {icon}
      </div>

    </div>
  );
}

export default Reports;