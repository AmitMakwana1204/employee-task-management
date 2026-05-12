import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ================= AUTH =================

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import OAuthSuccess from "../pages/auth/OAuthSuccess";

// ================= DASHBOARD =================

import Dashboard from "../pages/dashboard/Dashboard";

// ================= EMPLOYEES =================

import Employees from "../pages/employees/Employees";
import AddEmployee from "../pages/employees/AddEmployee";
import EditEmployee from "../pages/employees/EditEmployee";
import EmployeeDetails from "../pages/employees/EmployeeDetails";

// ================= TASKS =================

import Tasks from "../pages/tasks/Tasks";
import AddTask from "../pages/tasks/AddTask";
import TaskDetails from "../pages/tasks/TaskDetails";
import EditTask from "../pages/tasks/EditTask";

// ================= ATTENDANCE =================

import Attendance from "../pages/attendance/Attendance";

// ================= LEAVES =================

import Leaves from "../pages/leaves/Leaves";

// ================= PROFILE =================

import Profile from "../pages/profile/Profile";

// ================= SETTINGS =================

import Settings from "../pages/settings/Settings";

// ================= PROJECTS =================

import Projects from "../pages/projects/Projects";

// ================= REPORTS =================

import Reports from "../pages/reports/Reports";

// ================= PROTECTED ROUTE =================

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ================================================= */}
        {/* DEFAULT ROUTE */}
        {/* ================================================= */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        {/* ================================================= */}
        {/* AUTH ROUTES */}
        {/* ================================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        <Route
          path="/oauth-success"
          element={<OAuthSuccess />}
        />

        {/* ================================================= */}
        {/* DASHBOARD */}
        {/* ================================================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ================================================= */}
        {/* EMPLOYEES */}
        {/* ================================================= */}

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees/add"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees/edit/:id"
          element={
            <ProtectedRoute>
              <EditEmployee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees/:id"
          element={
            <ProtectedRoute>
              <EmployeeDetails />
            </ProtectedRoute>
          }
        />

        {/* ================================================= */}
        {/* TASKS */}
        {/* ================================================= */}

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/add"
          element={
            <ProtectedRoute>
              <AddTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/details/:id"
          element={
            <ProtectedRoute>
              <TaskDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/edit/:id"
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          }
        />

        {/* ================================================= */}
        {/* ATTENDANCE */}
        {/* ================================================= */}

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />

        {/* ================================================= */}
        {/* LEAVES */}
        {/* ================================================= */}

        <Route
          path="/leaves"
          element={
            <ProtectedRoute>
              <Leaves />
            </ProtectedRoute>
          }
        />

        {/* ================================================= */}
        {/* PROFILE */}
        {/* ================================================= */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ================================================= */}
        {/* SETTINGS */}
        {/* ================================================= */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* ================================================= */}
        {/* PROJECTS */}
        {/* ================================================= */}

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        {/* ================================================= */}
        {/* REPORTS */}
        {/* ================================================= */}

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* ================================================= */}
        {/* 404 PAGE */}
        {/* ================================================= */}

        <Route
          path="*"
          element={
            <div
              className="
                flex h-screen items-center
                justify-center
                bg-gradient-to-br
                from-gray-100 to-gray-200
              "
            >

              <div
                className="
                  rounded-3xl bg-white
                  p-10 text-center
                  shadow-2xl
                "
              >

                <h1
                  className="
                    text-8xl font-black
                    text-indigo-600
                  "
                >
                  404
                </h1>

                <p
                  className="
                    mt-4 text-3xl
                    font-bold text-gray-800
                  "
                >
                  Page Not Found
                </p>

                <p
                  className="
                    mt-3 text-gray-500
                  "
                >
                  The page you are
                  looking for does
                  not exist.
                </p>

                <button
                  onClick={() =>
                    window.location.href =
                      "/dashboard"
                  }
                  className="
                    mt-8 rounded-2xl
                    bg-indigo-600
                    px-6 py-3
                    font-semibold text-white
                    shadow-lg transition
                    hover:scale-105
                    hover:bg-indigo-700
                  "
                >
                  Back To Dashboard
                </button>

              </div>

            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;