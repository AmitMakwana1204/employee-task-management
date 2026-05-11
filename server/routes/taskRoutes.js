const express = require("express");
const router = express.Router();

const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getDashboardStats,
} = require("../controllers/taskController");

const { protect, authorize } = require("../middleware/auth");

// All routes require authentication
router.use(protect);

// ========================
// SPECIAL ROUTES (must come before /:id)
// ========================
router.get("/dashboard/stats", getDashboardStats);

// ========================
// TASK ROUTES
// ========================

router
  .route("/")
  .get(getTasks)                            // Admin sees all, employee sees own
  .post(authorize("admin"), createTask);    // Admin only

router
  .route("/:id")
  .get(getTask)                             // Any authenticated user (with ownership check)
  .put(updateTask)                          // Admin: all fields | Employee: status only
  .delete(authorize("admin"), deleteTask);  // Admin only

module.exports = router;
