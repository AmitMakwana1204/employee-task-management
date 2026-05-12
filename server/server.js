/**
 * Employee Task Management System — Express Server
 * Author: Amit Makwana
 * Stack: Node.js + Express + MongoDB (Mongoose) + JWT
 */

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const passport = require("./config/passport");

// Load environment variables
dotenv.config();

// Database connection
const connectDB = require("./config/db");

// Route files
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const taskRoutes = require("./routes/taskRoutes");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ========================
// CONNECT DATABASE
// ========================
connectDB();

// ========================
// MIDDLEWARE
// ========================

// CORS — allow frontend origin
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// HTTP request logger (dev only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Initialize Passport (for Google OAuth)
app.use(passport.initialize());

// Serve static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ========================
// ROUTES
// ========================
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/tasks", taskRoutes);

// ========================
// FAVICON (prevents 404 / CORB warning on API domain)
// ========================
app.get("/favicon.ico", (req, res) => res.status(204).end());

// ========================
// HEALTH CHECK
// ========================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Employee Task Management API is running 🚀",
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ========================
// ROOT
// ========================
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Employee Task Management API",
    version: "1.0.0",
    docs: "/api/health",
  });
});

// ========================
// 404 HANDLER
// ========================
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ========================
// GLOBAL ERROR HANDLER
// ========================
app.use((err, req, res, next) => {
  console.error("💥 Server Error:", err.stack);

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: messages.join(", "),
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired — please login again",
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ========================
// START SERVER
// ========================
app.listen(PORT, () => {
  console.log("");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 Client URL : ${process.env.CLIENT_URL}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("");
});

module.exports = app;
