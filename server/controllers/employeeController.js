const User = require("../models/User");
const Task = require("../models/Task");

// ========================
// @desc    Get all employees (users with role=employee)
// @route   GET /api/employees
// @access  Private (admin)
// ========================
const getEmployees = async (req, res) => {
  try {
    const { search, status, department, page = 1, limit = 20 } = req.query;

    // Build filter query
    const query = { role: "employee" };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } },
      ];
    }

    if (status) query.status = status;
    if (department) query.department = { $regex: department, $options: "i" };

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    const total = await User.countDocuments(query);

    const employees = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: employees.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      employees,
    });
  } catch (error) {
    console.error("getEmployees Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error — failed to fetch employees",
    });
  }
};

// ========================
// @desc    Get single employee by ID
// @route   GET /api/employees/:id
// @access  Private
// ========================
const getEmployee = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id).select("-password");

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Get task stats for this employee
    const totalTasks = await Task.countDocuments({ assignedTo: employee._id });
    const completedTasks = await Task.countDocuments({
      assignedTo: employee._id,
      status: "Completed",
    });
    const pendingTasks = await Task.countDocuments({
      assignedTo: employee._id,
      status: "Pending",
    });
    const inProgressTasks = await Task.countDocuments({
      assignedTo: employee._id,
      status: "In Progress",
    });

    res.status(200).json({
      success: true,
      employee,
      taskStats: {
        total: totalTasks,
        completed: completedTasks,
        pending: pendingTasks,
        inProgress: inProgressTasks,
      },
    });
  } catch (error) {
    console.error("getEmployee Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error — failed to fetch employee",
    });
  }
};

// ========================
// @desc    Create new employee (admin only)
// @route   POST /api/employees
// @access  Private (admin)
// ========================
const createEmployee = async (req, res) => {
  try {
    const { name, email, phone, address, department, status } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    // Check if email already exists
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    // Create employee with default password
    const employee = await User.create({
      name,
      email,
      password: "Employee@123", // Default password — employee should change it
      role: "employee",
      phone: phone || "",
      address: address || "",
      department: department || "",
      status: status || "Active",
    });

    res.status(201).json({
      success: true,
      message: "Employee created successfully. Default password: Employee@123",
      employee: {
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        phone: employee.phone,
        address: employee.address,
        department: employee.department,
        status: employee.status,
        createdAt: employee.createdAt,
      },
    });
  } catch (error) {
    console.error("createEmployee Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error — failed to create employee",
    });
  }
};

// ========================
// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Private (admin)
// ========================
const updateEmployee = async (req, res) => {
  try {
    const allowedUpdates = [
      "name",
      "email",
      "phone",
      "address",
      "department",
      "status",
      "profileImage",
    ];

    const updates = {};
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const employee = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    console.error("updateEmployee Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error — failed to update employee",
    });
  }
};

// ========================
// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Private (admin)
// ========================
const deleteEmployee = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Prevent deleting admin accounts via this route
    if (employee.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin accounts cannot be deleted via this route",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("deleteEmployee Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error — failed to delete employee",
    });
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
