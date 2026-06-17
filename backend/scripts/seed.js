const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Conflict = require("../models/Conflict");
const User = require("../models/User");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedDB = async () => {
  try {
    console.log(`Connecting to database: ${MONGO_URI}`);
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for seeding.");

    // Clean existing data
    console.log("Cleaning existing conflicts and users data...");
    await Conflict.deleteMany({});
    await User.deleteMany({});
    console.log("Database cleaned.");

    // Load raw dataset (values are strings, need to convert to numbers)
    const rawData = require("../data/conflicts.json");

    // Convert string values to proper types
    const conflicts = rawData.map((item) => {
      const doc = {};
      for (const [key, value] of Object.entries(item)) {
        if (key === "Conflict_Name" || key === "Conflict_Type" || key === "Region" ||
            key === "Status" || key === "Primary_Country" || key === "Most_Affected_Sector" ||
            key === "Black_Market_Activity_Level" || key === "Primary_Black_Market_Goods" ||
            key === "War_Profiteering_Documented") {
          // Keep as string
          doc[key] = value;
        } else {
          // Convert to number
          const num = parseFloat(value);
          doc[key] = isNaN(num) ? null : num;
        }
      }
      return doc;
    });

    console.log(`Seeding ${conflicts.length} conflicts...`);
    await Conflict.insertMany(conflicts);
    console.log("Conflicts seeded successfully.");

    // Seed test users
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
