const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { AppError } = require("../utils/errorHandler");

/**
 * Auth Service — Business Logic Layer
 * Handles user registration, login, and JWT token operations.
 */

/**
 * Generate JWT token for a user
 */
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

/**
 * Generate refresh token
 */
const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
  });
};

/**
 * Register a new user
 */
const registerUser = async ({ name, email, password, role }) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User with this email already exists", 400);
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role: role || "user",
  });

  const token = generateToken(user._id, user.role);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

/**
 * Login user
 */
const loginUser = async ({ email, password }) => {
  // Find user with password field included
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  // Check password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
    refreshToken,
  };
};

/**
 * Get current user profile
 */
const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError("User not found", 404);
  return user;
};

/**
 * Delete user account (soft delete)
 */
const deleteAccount = async (userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { isDeleted: true },
    { new: true }
  );
  if (!user) throw new AppError("User not found", 404);
  return user;
};

/**
 * Verify a JWT token
 */
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};

/**
 * Refresh a JWT token
 */
const refreshToken = async (token) => {
  const { valid, decoded } = verifyToken(token);
  if (!valid) throw new AppError("Invalid or expired refresh token", 401);

  const user = await User.findById(decoded.id);
  if (!user) throw new AppError("User not found", 404);

  const newToken = generateToken(user._id, user.role);
  const newRefreshToken = generateRefreshToken(user._id);

  return { token: newToken, refreshToken: newRefreshToken };
};

module.exports = {
  generateToken,
  generateRefreshToken,
  registerUser,
  loginUser,
  getCurrentUser,
  deleteAccount,
  verifyToken,
  refreshToken,
};
