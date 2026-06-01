const rateLimit = require("express-rate-limit");

/**
 * Global Rate Limiter
 * Applies to all routes — limits requests per IP within a time window
 */
const globalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60000, // 1 minute
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  message: {
    success: false,
    message: "Too many requests from this IP. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Auth Rate Limiter
 * Stricter limits for authentication routes to prevent brute force attacks
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 attempts per 15 minutes
  message: {
    success: false,
    message:
      "Too many authentication attempts from this IP. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { globalLimiter, authLimiter };
