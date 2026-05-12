const crypto = require("crypto");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

// ========================
// @desc    Register new user (admin creating accounts / public register)
// @route   POST /api/auth/register
// @access  Public
// ========================
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    // Create user (default role = employee unless specified)
    const user = await User.create({
      name,
      email,
      password,
      role: role || "employee",
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error — registration failed",
    });
  }
};

// ========================
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
// ========================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find user (include password for comparison)
    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // If Google-only account
    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: "This account uses Google Sign-In. Please continue with Google.",
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if account is active
    if (user.status === "Inactive") {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated. Contact admin.",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        status: user.status,
        department: user.department,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error — login failed",
    });
  }
};

// ========================
// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
// ========================
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("GetMe Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ========================
// @desc    Update current user profile
// @route   PUT /api/auth/me
// @access  Private
// ========================
const updateMe = async (req, res) => {
  try {
    const allowedUpdates = [
      "name",
      "phone",
      "address",
      "department",
      "profileImage",
      "settings",
    ];

    const updates = {};
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("UpdateMe Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error — profile update failed",
    });
  }
};

// ========================
// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
// ========================
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide current and new password",
      });
    }

    // Get user with password
    const user = await User.findById(req.user._id).select("+password");

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("ChangePassword Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ========================
// @desc    Forgot Password — send reset email
// @route   POST /api/auth/forgot-password
// @access  Public
// ========================
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide your email address",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Return success even if not found (security)
      return res.status(200).json({
        success: true,
        message: "If this email is registered, a reset link has been sent.",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save({ validateBeforeSave: false });

    // Build reset URL
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #f8fafc;">
        <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #3b82f6, #6366f1); border-radius: 16px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
              <span style="font-size: 32px;">🔐</span>
            </div>
            <h1 style="margin: 0; font-size: 24px; color: #1e293b;">Reset Your Password</h1>
          </div>
          <p style="color: #64748b; font-size: 15px; line-height: 1.6;">
            Hello <strong>${user.name}</strong>,<br/><br/>
            We received a request to reset your password for your <strong>Employee Task Manager</strong> account.
            Click the button below to set a new password. This link expires in <strong>15 minutes</strong>.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetUrl}"
               style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #3b82f6, #6366f1); color: white; text-decoration: none; border-radius: 10px; font-size: 16px; font-weight: 600;">
              Reset Password
            </a>
          </div>
          <p style="color: #94a3b8; font-size: 13px; text-align: center;">
            If you didn't request this, you can safely ignore this email.<br/>
            This link will expire in 15 minutes.
          </p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #cbd5e1; font-size: 12px; text-align: center;">
            Employee Task Management System &copy; ${new Date().getFullYear()}
          </p>
        </div>
      </div>
    `;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request — Employee Task Manager",
      html,
    });

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email.",
    });
  } catch (error) {
    console.error("ForgotPassword Error:", error.message);
    // Clean up token on error
    if (error.user) {
      error.user.resetPasswordToken = undefined;
      error.user.resetPasswordExpire = undefined;
      await error.user.save({ validateBeforeSave: false });
    }
    res.status(500).json({
      success: false,
      message: "Could not send reset email. Please try again.",
    });
  }
};

// ========================
// @desc    Reset Password using token
// @route   POST /api/auth/reset-password/:token
// @access  Public
// ========================
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Hash the incoming token to compare with stored hash
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    }).select("+resetPasswordToken +resetPasswordExpire");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token. Please request a new one.",
      });
    }

    // Update password and clear reset fields
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully. You can now log in.",
    });
  } catch (error) {
    console.error("ResetPassword Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error — password reset failed",
    });
  }
};

// ========================
// @desc    Google OAuth callback — issue JWT and redirect to frontend
// @route   GET /api/auth/google/callback
// @access  Public (called by passport)
// ========================
const googleCallback = async (req, res) => {
  try {
    const user = req.user; // populated by passport

    const token = generateToken(user._id);

    // Redirect to frontend with token
    const redirectUrl = `${process.env.CLIENT_URL}/oauth-success?token=${token}&userId=${user._id}`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("GoogleCallback Error:", error.message);
    res.redirect(`${process.env.CLIENT_URL}/login?error=google_failed`);
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateMe,
  changePassword,
  forgotPassword,
  resetPassword,
  googleCallback,
};
