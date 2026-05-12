const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Route imports
const conflictRoutes = require("./routes/conflictRoutes");
const statsRoutes = require("./routes/statsRoutes");
const searchRoutes = require("./routes/searchRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const jwtRoutes = require("./routes/jwtRoutes");

// Middleware imports
const { globalErrorHandler, notFound } = require("./utils/errorHandler");
const { globalLimiter } = require("./middleware/rateLimiter");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply global rate limiter
app.use(globalLimiter);

// Health & Version routes
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "War Economic Impact API is running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/version", (req, res) => {
  res.status(200).json({
    success: true,
    version: "1.0.0",
    dataset: "War Economic Impact",
    datasetNo: 18,
  });
});

// HEAD & OPTIONS for health
app.head("/health", (req, res) => res.sendStatus(200));
app.options("/health", (req, res) => {
  res.set("Allow", "GET, HEAD, OPTIONS");
  res.sendStatus(204);
});

// Mount routes
app.use("/conflicts", conflictRoutes);
app.use("/stats", statsRoutes);
app.use("/search", searchRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/jwt", jwtRoutes);

// 404 handler
app.use(notFound);

// Global error handler
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

module.exports = app;