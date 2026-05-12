const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

const {
  register,
  login,
  getMe,
  updateMe,
  changePassword,
  forgotPassword,
  resetPassword,
  googleCallback,
} = require("../controllers/authController");

const { protect } = require("../middleware/auth");

// ========================
// PUBLIC ROUTES
// ========================
router.post("/register", register);
router.post("/login", login);

// ========================
// FORGOT / RESET PASSWORD
// ========================
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// ========================
// GOOGLE OAUTH
// ========================
const googleNotConfigured = (req, res) =>
  res.status(503).json({
    success: false,
    message: "Google OAuth is not configured on the server yet.",
  });

const googleConfigured =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET;

// Step 1: redirect user to Google consent screen
router.get(
  "/google",
  googleConfigured
    ? passport.authenticate("google", { scope: ["profile", "email"] })
    : googleNotConfigured
);

// Step 2: Google redirects back here with code
router.get(
  "/google/callback",
  googleConfigured
    ? [
        passport.authenticate("google", {
          failureRedirect: `${
            process.env.CLIENT_URL || "http://localhost:5173"
          }/login?error=google_failed`,
          session: false,
        }),
        googleCallback,
      ]
    : googleNotConfigured
);

// ========================
// PROTECTED ROUTES
// ========================
router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);
router.put("/change-password", protect, changePassword);

module.exports = router;
