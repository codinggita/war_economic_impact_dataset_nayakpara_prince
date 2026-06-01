const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { AppError } = require("../utils/errorHandler");
const asyncHandler = require("../utils/asyncHandler");

/**
 * Authentication Middleware
 * Verifies JWT token from Authorization header
 * Attaches decoded user to req.user
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for Bearer token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new AppError("Not authorized. No token provided.", 401);
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded id and attach to request
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new AppError("User belonging to this token no longer exists.", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new AppError("Token has expired. Please log in again.", 401);
    }
    if (error.name === "JsonWebTokenError") {
      throw new AppError("Invalid token. Please log in again.", 401);
    }
    throw error;
  }
});

module.exports = { protect };
