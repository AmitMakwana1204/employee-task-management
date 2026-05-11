const mongoose = require("mongoose");

/**
 * Connect to MongoDB Atlas
 * URI is loaded from .env MONGODB_URI
 * Uses automatic reconnection — server will NOT crash on transient Atlas errors
 */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  // Guard: catch unconfigured placeholder URI
  if (
    !uri ||
    uri.includes("<username>") ||
    uri.includes("<password>") ||
    uri.includes("<cluster>")
  ) {
    console.error("❌ MongoDB URI not configured!");
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.error("👉 Open server/.env and replace MONGODB_URI with your");
    console.error("   MongoDB Atlas connection string.");
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    process.exit(1);
  }

  // Mongoose global settings for stability
  mongoose.set("strictQuery", false);

  // Auto-reconnect on disconnect
  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️  MongoDB disconnected — attempting to reconnect...");
    setTimeout(() => mongoose.connect(uri, mongoOptions), 5000);
  });

  mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

  mongoose.connection.on("connected", () => {
    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
  });

  const mongoOptions = {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    retryWrites: true,
  };

  try {
    await mongoose.connect(uri, mongoOptions);
  } catch (error) {
    console.error(`❌ MongoDB Initial Connection Failed: ${error.message}`);
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.error("Common fixes:");
    console.error("  1. Check your Atlas URI in server/.env");
    console.error("  2. Whitelist your IP in Atlas > Network Access (use 0.0.0.0/0)");
    console.error("  3. Verify your DB username & password are correct");
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    // Retry after 5 seconds instead of crashing
    console.log("🔄 Retrying connection in 5 seconds...");
    setTimeout(() => mongoose.connect(uri, mongoOptions), 5000);
  }
};

module.exports = connectDB;
