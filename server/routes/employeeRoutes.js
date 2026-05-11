const express = require("express");
const router = express.Router();

const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const { protect, authorize } = require("../middleware/auth");

// All routes require authentication
router.use(protect);

// ========================
// EMPLOYEE ROUTES
// ========================

// GET all employees + POST new employee
router
  .route("/")
  .get(getEmployees)                        // Admin + Employee can view list
  .post(authorize("admin"), createEmployee); // Admin only

// GET, PUT, DELETE single employee
router
  .route("/:id")
  .get(getEmployee)                         // Any logged-in user
  .put(authorize("admin"), updateEmployee)  // Admin only
  .delete(authorize("admin"), deleteEmployee); // Admin only

module.exports = router;
