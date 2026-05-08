import MainLayout from "../../layouts/MainLayout";

import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";

function Employees() {

  const employees = [
    {
      id: 1,
      name: "Amit",
      role: "Frontend Developer",
      email: "amit@gmail.com",
      status: "Active",
      image:
        "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 2,
      name: "Rahul",
      role: "Backend Developer",
      email: "rahul@gmail.com",
      status: "Pending",
      image:
        "https://i.pravatar.cc/150?img=15",
    },
    {
      id: 3,
      name: "Neha",
      role: "UI/UX Designer",
      email: "neha@gmail.com",
      status: "Active",
      image:
        "https://i.pravatar.cc/150?img=20",
    },
  ];

  return (
    <MainLayout>

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 mb-8">

        <div>

          <h1 className="text-4xl font-bold text-gray-800">
            Employees
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all employees and their details.
          </p>

        </div>

        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white px-5 py-3 rounded-2xl flex items-center gap-2 shadow-lg transition">

          <FaPlus />

          Add Employee

        </button>

      </div>

      {/* Top Actions */}
      <div className="bg-white rounded-3xl shadow p-5 mb-6">

        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">

          {/* Search */}
          <div className="relative w-full lg:max-w-md">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search employee..."
              className="w-full h-12 border border-gray-200 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 w-full lg:w-auto">

            <select className="h-12 px-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500">

              <option>
                All Roles
              </option>

              <option>
                Frontend
              </option>

              <option>
                Backend
              </option>

              <option>
                Designer
              </option>

            </select>

            <select className="h-12 px-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500">

              <option>
                All Status
              </option>

              <option>
                Active
              </option>

              <option>
                Pending
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50 border-b border-gray-200">

              <tr>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Employee
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Role
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Email
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {employees.map((employee) => (

                <tr
                  key={employee.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >

                  {/* Employee */}
                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <img
                        src={employee.image}
                        alt={employee.name}
                        className="w-14 h-14 rounded-2xl object-cover"
                      />

                      <div>

                        <h3 className="font-semibold text-gray-800">
                          {employee.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Employee ID:
                          #{employee.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Role */}
                  <td className="px-6 py-5 text-gray-700 font-medium">

                    {employee.role}

                  </td>

                  {/* Email */}
                  <td className="px-6 py-5 text-gray-500">

                    {employee.email}

                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium
                      ${
                        employee.status ===
                        "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >

                      {employee.status}

                    </span>

                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">

                    <div className="flex items-center justify-center gap-3">

                      <button className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition flex items-center justify-center">

                        <FaEye />

                      </button>

                      <button className="w-10 h-10 rounded-xl bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition flex items-center justify-center">

                        <FaEdit />

                      </button>

                      <button className="w-10 h-10 rounded-xl bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition flex items-center justify-center">

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

    </MainLayout>
  );
}

export default Employees;