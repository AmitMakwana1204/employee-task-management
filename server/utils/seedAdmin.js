/**
 * Seed Admin Account
 * Run: npm run seed
 * Creates the initial admin user if none exists.
 */

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB for seeding...");

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      email: "admin@taskmanager.com",
    });

    if (existingAdmin) {
      console.log("ℹ️  Admin already exists — skipping seed.");
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: "Amit Makwana",
      email: "admin@taskmanager.com",
      password: "Admin@123",
      role: "admin",
      status: "Active",
      department: "Management",
      phone: "+91 9999999999",
      address: "Ahmedabad, Gujarat, India",
    });

    console.log("🌱 Admin user seeded successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`📧 Email   : admin@taskmanager.com`);
    console.log(`🔑 Password: Admin@123`);
    console.log(`👤 Role    : admin`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedAdmin();
