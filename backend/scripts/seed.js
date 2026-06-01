const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const Conflict = require("../models/Conflict");
const User = require("../models/User");

// Configure dotenv (point to backend/.env)
dotenv.config({ path: path.join(__dirname, "../.env") });

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/war_economic_impact";
    console.log(`Connecting to database: ${mongoUri}`);
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for seeding.");

    // Clean existing data
    console.log("Cleaning existing conflicts and users data...");
    await Conflict.deleteMany({});
    await User.deleteMany({});
    console.log("Database cleaned.");

    // Load conflicts seed data
    const conflictsPath = path.join(__dirname, "../data/conflicts.json");
    if (!fs.existsSync(conflictsPath)) {
      throw new Error(`Seed data file not found at: ${conflictsPath}`);
    }
    const conflictsData = JSON.parse(fs.readFileSync(conflictsPath, "utf-8"));

    // Seed conflicts
    console.log(`Seeding ${conflictsData.length} conflicts...`);
    await Conflict.insertMany(conflictsData);
    console.log("Conflicts seeded successfully.");

    // Seed mock users (automatically hashed by schema pre-save hook)
    console.log("Seeding test users...");
    await User.create([
      {
        name: "Admin User",
        email: "admin@example.com",
        password: "password123",
        role: "admin",
      },
      {
        name: "Regular User",
        email: "user@example.com",
        password: "password123",
        role: "user",
      },
    ]);
    console.log("Test users seeded successfully.");
    console.log("--- Seeding complete! ---");
    console.log("Test Credentials:");
    console.log("  Admin User:   admin@example.com / password123 (role: admin)");
    console.log("  Regular User: user@example.com / password123 (role: user)");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
