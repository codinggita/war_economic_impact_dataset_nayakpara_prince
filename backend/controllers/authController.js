const authService = require("../services/authService");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const { AppError } = require("../utils/errorHandler");

/**
 * Auth Controller — Authentication & User Management
 * Handles register, login, logout, password reset, and profile
 */

/**
 * @desc    Register a new user
 * @route   POST /auth/register
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const result = await authService.registerUser({ name, email, password, role });

  sendSuccess(res, 201, "User registered successfully", {
    user: result.user,
    token: result.token,
  });
});

/**
 * @desc    Login user & return JWT
 * @route   POST /auth/login
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginUser({ email, password });

  sendSuccess(res, 200, "Login successful", {
    user: result.user,
    token: result.token,
    refreshToken: result.refreshToken,
  });
});

/**
 * @desc    Logout user (client-side token removal)
 * @route   POST /auth/logout
 */
const logout = asyncHandler(async (req, res) => {
  // JWT is stateless — logout is handled client-side by removing the token
  // In a production app you'd add the token to a blacklist
  sendSuccess(res, 200, "Logged out successfully. Please remove token from client.");
});

/**
 * @desc    Get current authenticated user
 * @route   GET /auth/me
 */
const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user.id);
  sendSuccess(res, 200, "User profile fetched", user);
});

/**
 * @desc    Forgot password — request reset
 * @route   POST /auth/forgot-password
 */
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new AppError("Email is required", 400);

  // In production, send a password reset email with a token
  // For this project, we'll simulate the flow
  sendSuccess(res, 200, "Password reset instructions sent to your email (simulated)");
});

/**
 * @desc    Reset password
 * @route   POST /auth/reset-password
 */
const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    throw new AppError("Email and new password are required", 400);
  }

  if (newPassword.length < 6) {
    throw new AppError("Password must be at least 6 characters", 400);
  }

  const User = require("../models/User");
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new AppError("User not found", 404);

  user.password = newPassword;
  await user.save();

  sendSuccess(res, 200, "Password reset successful");
});

/**
 * @desc    Refresh JWT token
 * @route   POST /auth/refresh-token
 */
const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken: token } = req.body;
  if (!token) throw new AppError("Refresh token is required", 400);

  const result = await authService.refreshToken(token);
  sendSuccess(res, 200, "Token refreshed successfully", result);
});

/**
 * @desc    Delete user account (soft delete)
 * @route   DELETE /auth/account
 */
const deleteAccount = asyncHandler(async (req, res) => {
  await authService.deleteAccount(req.user.id);
  sendSuccess(res, 200, "Account deleted successfully");
});

// ============================================================
// JWT-SPECIFIC ROUTES (for /jwt/* endpoints)
// ============================================================

/**
 * @desc    JWT protected profile
 * @route   GET /jwt/profile
 */
const jwtProfile = asyncHandler(async (req, res) => {
  sendSuccess(res, 200, "JWT protected profile", {
    user: req.user,
    message: "This route is protected by JWT authentication",
  });
});

/**
 * @desc    JWT protected dashboard
 * @route   GET /jwt/dashboard
 */
const jwtDashboard = asyncHandler(async (req, res) => {
  const Conflict = require("../models/Conflict");

  const [totalConflicts, ongoingCount, resolvedCount] = await Promise.all([
    Conflict.countDocuments({ isDeleted: { $ne: true } }),
    Conflict.countDocuments({ Status: "Ongoing", isDeleted: { $ne: true } }),
    Conflict.countDocuments({ Status: "Resolved", isDeleted: { $ne: true } }),
  ]);

  sendSuccess(res, 200, "JWT protected dashboard", {
    user: req.user,
    stats: {
      totalConflicts,
      ongoingCount,
      resolvedCount,
    },
  });
});

/**
 * @desc    Generate JWT token (manual)
 * @route   POST /jwt/generate-token
 */
const generateToken = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginUser({ email, password });
  sendSuccess(res, 200, "Token generated", { token: result.token });
});

/**
 * @desc    Verify JWT token
 * @route   POST /jwt/verify-token
 */
const verifyToken = asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (!token) throw new AppError("Token is required", 400);

  const result = authService.verifyToken(token);
  sendSuccess(res, 200, result.valid ? "Token is valid" : "Token is invalid", result);
});

/**
 * @desc    JWT refresh token
 * @route   POST /jwt/refresh-token
 */
const jwtRefreshToken = asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (!token) throw new AppError("Token is required", 400);

  const result = await authService.refreshToken(token);
  sendSuccess(res, 200, "Token refreshed", result);
});

/**
 * @desc    Admin-only JWT route
 * @route   GET /jwt/admin
 */
const jwtAdmin = asyncHandler(async (req, res) => {
  sendSuccess(res, 200, "Admin JWT route accessed", {
    user: req.user,
    access: "admin",
  });
});

/**
 * @desc    User-only JWT route
 * @route   GET /jwt/user
 */
const jwtUser = asyncHandler(async (req, res) => {
  sendSuccess(res, 200, "User JWT route accessed", {
    user: req.user,
    access: "user",
  });
});

/**
 * @desc    JWT logout
 * @route   DELETE /jwt/logout
 */
const jwtLogout = asyncHandler(async (req, res) => {
  sendSuccess(res, 200, "JWT logout successful. Remove token from client.");
});

/** HEAD /auth/me */
const headAuthMe = asyncHandler(async (req, res) => {
  res.set("X-User-Authenticated", "true");
  res.sendStatus(200);
});

/** OPTIONS /auth/login */
const optionsAuthLogin = (req, res) => {
  res.set("Allow", "POST, OPTIONS");
  res.sendStatus(204);
};

module.exports = {
  // Auth routes
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  refreshToken,
  deleteAccount,
  // JWT routes
  jwtProfile,
  jwtDashboard,
  generateToken,
  verifyToken,
  jwtRefreshToken,
  jwtAdmin,
  jwtUser,
  jwtLogout,
  // HEAD & OPTIONS
  headAuthMe,
  optionsAuthLogin,
};
