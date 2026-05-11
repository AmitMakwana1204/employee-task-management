const Task = require("../models/Task");
const User = require("../models/User");

// ========================
// @desc    Get all tasks
//          Admin: all tasks | Employee: only assigned tasks
// @route   GET /api/tasks
// @access  Private
// ========================
const getTasks = async (req, res) => {
  try {
    const { search, status, priority, assignedTo, page = 1, limit = 20 } = req.query;

    // Build query based on role
    const query = {};

    // Employee can only see their own tasks
    if (req.user.role === "employee") {
      query.assignedTo = req.user._id;
    }

    // Admin filters
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } },
      ];
    }

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (assignedTo && req.user.role === "admin") query.assignedTo = assignedTo;

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Task.countDocuments(query);

    const tasks = await Task.find(query)
      .populate("assignedTo", "name email profileImage department")
      .populate("assignedBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: tasks.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      tasks,
    });
  } catch (error) {
    console.error("getTasks Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error — failed to fetch tasks",
    });
  }
};

// ========================
// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Private
// ========================
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email profileImage department phone")
      .populate("assignedBy", "name email");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Employee can only view their own tasks
    if (
      req.user.role === "employee" &&
      task.assignedTo._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this task",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("getTask Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error — failed to fetch task",
    });
  }
};

// ========================
// @desc    Create new task
// @route   POST /api/tasks
// @access  Private (admin)
// ========================
const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, priority, status, dueDate, department } =
      req.body;

    if (!title || !assignedTo || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "Title, assignedTo, and dueDate are required",
      });
    }

    // Verify employee exists
    const employee = await User.findById(assignedTo);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Assigned employee not found",
      });
    }

    const task = await Task.create({
      title,
      description: description || "",
      assignedTo,
      assignedBy: req.user._id, // The logged-in admin
      priority: priority || "Medium",
      status: status || "Pending",
      dueDate,
      department: department || "",
    });

    // Populate for response
    const populatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email profileImage")
      .populate("assignedBy", "name email");

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: populatedTask,
    });
  } catch (error) {
    console.error("createTask Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error — failed to create task",
    });
  }
};

// ========================
// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
//          Admin: any field | Employee: only status
// ========================
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Employee can only update status of their own tasks
    if (req.user.role === "employee") {
      if (task.assignedTo.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to update this task",
        });
      }

      // Employee can only change status
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Employees can only update task status",
        });
      }

      task.status = status;
      await task.save();
    } else {
      // Admin can update all fields
      const allowedUpdates = [
        "title",
        "description",
        "assignedTo",
        "priority",
        "status",
        "dueDate",
        "department",
      ];
      allowedUpdates.forEach((field) => {
        if (req.body[field] !== undefined) {
          task[field] = req.body[field];
        }
      });
      await task.save();
    }

    const updatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email profileImage")
      .populate("assignedBy", "name email");

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("updateTask Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error — failed to update task",
    });
  }
};

// ========================
// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private (admin)
// ========================
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("deleteTask Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error — failed to delete task",
    });
  }
};

// ========================
// @desc    Get dashboard statistics
// @route   GET /api/tasks/dashboard/stats
// @access  Private
// ========================
const getDashboardStats = async (req, res) => {
  try {
    let taskQuery = {};

    // Employee sees only their stats
    if (req.user.role === "employee") {
      taskQuery.assignedTo = req.user._id;
    }

    const [
      totalEmployees,
      totalTasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
      recentTasks,
    ] = await Promise.all([
      // Only admin needs total employees count
      req.user.role === "admin"
        ? User.countDocuments({ role: "employee" })
        : 0,

      Task.countDocuments(taskQuery),
      Task.countDocuments({ ...taskQuery, status: "Pending" }),
      Task.countDocuments({ ...taskQuery, status: "In Progress" }),
      Task.countDocuments({ ...taskQuery, status: "Completed" }),

      // Recent 5 tasks
      Task.find(taskQuery)
        .populate("assignedTo", "name email profileImage")
        .populate("assignedBy", "name")
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalEmployees,
        totalTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
      },
      recentTasks,
    });
  } catch (error) {
    console.error("getDashboardStats Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error — failed to fetch dashboard stats",
    });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getDashboardStats,
};
