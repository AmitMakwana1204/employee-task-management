const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

// ========================
// Only register Google strategy if credentials are configured.
// This allows the server to start even before Google OAuth is set up.
// ========================
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${
          process.env.SERVER_URL || "http://localhost:5000"
        }/api/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value.toLowerCase();
          const name = profile.displayName;
          const googleId = profile.id;
          const profileImage =
            profile.photos && profile.photos[0]
              ? profile.photos[0].value
              : "";

          // Check if user already exists (by googleId or email)
          let user = await User.findOne({
            $or: [{ googleId }, { email }],
          });

          if (user) {
            // Link googleId if missing
            if (!user.googleId) {
              user.googleId = googleId;
              if (!user.profileImage && profileImage) {
                user.profileImage = profileImage;
              }
              await user.save({ validateBeforeSave: false });
            }
            return done(null, user);
          }

          // Create new Google user (no password needed)
          user = await User.create({
            name,
            email,
            googleId,
            profileImage,
            role: "employee",
            status: "Active",
          });

          return done(null, user);
        } catch (error) {
          console.error("Google Strategy Error:", error.message);
          return done(error, null);
        }
      }
    )
  );

  console.log("✅ Google OAuth strategy registered");
} else {
  console.warn(
    "⚠️  Google OAuth not configured — add GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET to .env to enable it"
  );
}

// Minimal serialization (passport requires these even in session-less mode)
passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
