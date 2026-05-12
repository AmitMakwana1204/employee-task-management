const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    // ========================
    // BASIC INFO
    // ========================
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },

    password: {
      type: String,
      required: false, // Not required for Google OAuth users
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't return password by default
    },

    // ========================
    // GOOGLE OAUTH
    // ========================
    googleId: {
      type: String,
      default: "",
    },

    // ========================
    // PASSWORD RESET
    // ========================
    resetPasswordToken: {
      type: String,
      select: false,
    },

    resetPasswordExpire: {
      type: Date,
      select: false,
    },

    // ========================
    // ROLE
    // ========================
    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee",
    },

    // ========================
    // PROFILE
    // ========================
    profileImage: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    department: {
      type: String,
      default: "",
      trim: true,
    },

    // ========================
    // STATUS
    // ========================
    status: {
      type: String,
      enum: ["Active", "Inactive", "Pending"],
      default: "Active",
    },

    // ========================
    // SETTINGS
    // ========================
    settings: {
      darkMode: {
        type: Boolean,
        default: false,
      },
      language: {
        type: String,
        default: "English",
      },
      emailNotifications: {
        type: Boolean,
        default: true,
      },
      profileVisibility: {
        type: String,
        enum: ["public", "private"],
        default: "public",
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// ========================
// HASH PASSWORD BEFORE SAVE
// ========================
UserSchema.pre("save", async function (next) {
  // Only hash if password was modified and exists
  if (!this.isModified("password") || !this.password) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ========================
// COMPARE PASSWORD METHOD
// ========================
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
