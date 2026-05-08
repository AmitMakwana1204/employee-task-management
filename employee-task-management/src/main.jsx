import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import AppRoutes from "./routes/AppRoutes";

import AuthProvider from "./context/AuthContext";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <AuthProvider>

      {/* Toast Container */}
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <AppRoutes />

    </AuthProvider>

  </React.StrictMode>
);