const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    // ========================
    // TASK INFO
    // ========================
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },

    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },

    // ========================
    // ASSIGNMENT
    // ========================
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Task must be assigned to an employee"],
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ========================
    // PRIORITY
    // ========================
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    // ========================
    // STATUS
    // ========================
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },

    // ========================
    // DUE DATE
    // ========================
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },

    // ========================
    // DEPARTMENT (optional tag)
    // ========================
    department: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true, // createdAt + updatedAt
  }
);

// ========================
// INDEXES for faster queries
// ========================
TaskSchema.index({ assignedTo: 1 });
TaskSchema.index({ status: 1 });
TaskSchema.index({ priority: 1 });

module.exports = mongoose.model("Task", TaskSchema);
