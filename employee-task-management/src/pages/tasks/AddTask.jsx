import { useState } from "react";

import {
  FaTasks,
  FaUserTie,
  FaCalendarAlt,
  FaFlag,
  FaClipboardList,
  FaPlus,
  FaLayerGroup,
} from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";

function AddTask() {
  const [taskData, setTaskData] =
    useState({
      title: "",
      assignedTo: "",
      department: "",
      priority: "Medium",
      status: "Pending",
      deadline: "",
      description: "",
    });

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]:
        e.target.value,
    });
  };

  // ================= HANDLE SUBMIT =================

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(taskData);

    alert(
      "Task Created Successfully 🚀"
    );

    setTaskData({
      title: "",
      assignedTo: "",
      department: "",
      priority: "Medium",
      status: "Pending",
      deadline: "",
      description: "",
    });
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 p-6">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <h1 className="flex items-center gap-3 text-4xl font-bold text-gray-800">

            <FaTasks className="text-indigo-600" />

            Create New Task

          </h1>

          <p className="mt-2 text-gray-500">
            Create and assign tasks to employees with deadlines and priorities.
          </p>

        </div>

        {/* ================= FORM CARD ================= */}

        <div
          className="
            overflow-hidden rounded-3xl
            bg-white shadow-2xl
          "
        >

          {/* Top Banner */}

          <div
            className="
              bg-gradient-to-r
              from-blue-600 to-indigo-700
              px-8 py-8 text-white
            "
          >

            <h2 className="text-3xl font-bold">
              Task Information
            </h2>

            <p className="mt-2 text-blue-100">
              Fill all required task details below.
            </p>

          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="p-8"
          >

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              {/* Task Title */}

              <InputField
                icon={<FaClipboardList />}
                label="Task Title"
                name="title"
                placeholder="Enter task title"
                value={taskData.title}
                onChange={handleChange}
              />

              {/* Assigned To */}

              <InputField
                icon={<FaUserTie />}
                label="Assigned To"
                name="assignedTo"
                placeholder="Employee name"
                value={taskData.assignedTo}
                onChange={handleChange}
              />

              {/* Department */}

              <InputField
                icon={<FaLayerGroup />}
                label="Department"
                name="department"
                placeholder="Frontend Team"
                value={taskData.department}
                onChange={handleChange}
              />

              {/* Deadline */}

              <InputField
                icon={<FaCalendarAlt />}
                label="Deadline"
                name="deadline"
                type="date"
                value={taskData.deadline}
                onChange={handleChange}
              />

            </div>

            {/* Priority + Status */}

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

              {/* Priority */}

              <div>

                <label className="mb-3 block font-semibold text-gray-700">
                  Priority
                </label>

                <div className="relative">

                  <FaFlag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <select
                    name="priority"
                    value={
                      taskData.priority
                    }
                    onChange={
                      handleChange
                    }
                    className="
                      h-14 w-full rounded-2xl
                      border border-gray-200
                      bg-gray-100 pl-12 pr-4
                      outline-none transition

                      focus:border-blue-500
                      focus:bg-white
                    "
                  >

                    <option>
                      High
                    </option>

                    <option>
                      Medium
                    </option>

                    <option>
                      Low
                    </option>

                  </select>

                </div>

              </div>

              {/* Status */}

              <div>

                <label className="mb-3 block font-semibold text-gray-700">
                  Status
                </label>

                <div className="relative">

                  <FaTasks className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <select
                    name="status"
                    value={
                      taskData.status
                    }
                    onChange={
                      handleChange
                    }
                    className="
                      h-14 w-full rounded-2xl
                      border border-gray-200
                      bg-gray-100 pl-12 pr-4
                      outline-none transition

                      focus:border-blue-500
                      focus:bg-white
                    "
                  >

                    <option>
                      Pending
                    </option>

                    <option>
                      In Progress
                    </option>

                    <option>
                      Completed
                    </option>

                  </select>

                </div>

              </div>

            </div>

            {/* Description */}

            <div className="mt-6">

              <label className="mb-3 block font-semibold text-gray-700">
                Task Description
              </label>

              <textarea
                name="description"
                value={
                  taskData.description
                }
                onChange={handleChange}
                rows="6"
                placeholder="Write detailed task description..."
                className="
                  w-full rounded-2xl
                  border border-gray-200
                  bg-gray-100 p-5
                  outline-none transition

                  focus:border-blue-500
                  focus:bg-white
                "
              ></textarea>

            </div>

            {/* Buttons */}

            <div className="mt-8 flex flex-wrap gap-4">

              <button
                type="submit"
                className="
                  flex items-center gap-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600 to-indigo-600
                  px-8 py-4
                  font-semibold text-white
                  shadow-xl transition
                  hover:scale-105
                "
              >

                <FaPlus />

                Create Task

              </button>

              <button
                type="reset"
                className="
                  rounded-2xl border border-gray-300
                  px-8 py-4
                  font-semibold text-gray-700 transition
                  hover:bg-gray-100
                "
              >
                Reset
              </button>

            </div>

          </form>

        </div>

      </div>
    </MainLayout>
  );
}

/* ================= INPUT FIELD ================= */

function InputField({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>

      <label className="mb-3 block font-semibold text-gray-700">
        {label}
      </label>

      <div className="relative">

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
            h-14 w-full rounded-2xl
            border border-gray-200
            bg-gray-100 pl-12 pr-4
            outline-none transition

            focus:border-blue-500
            focus:bg-white
          "
        />

      </div>

    </div>
  );
}

export default AddTask;