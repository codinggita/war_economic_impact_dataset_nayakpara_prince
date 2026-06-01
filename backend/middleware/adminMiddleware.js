const { AppError } = require("../utils/errorHandler");

/**
 * Admin Authorization Middleware
 * Must be used AFTER the protect (auth) middleware.
 * Checks if the authenticated user has 'admin' role.
 */
const adminOnly = (req, res, next) => {
  if (!req.user) {
    return next(
      new AppError("Not authorized. Authentication required first.", 401)
    );
  }

  if (req.user.role !== "admin") {
    return next(
      new AppError("Access denied. Admin privileges required.", 403)
    );
  }

  next();
};

/**
 * Role-Based Access Control (RBAC) Middleware
 * Accepts one or more roles and checks if user has any of them.
 *
 * Usage: router.get("/route", protect, authorize("admin", "editor"), handler)
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(
        new AppError("Not authorized. Authentication required first.", 401)
      );
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          `Access denied. Required role(s): ${roles.join(", ")}`,
          403
        )
      );
    }

    next();
  };
};

module.exports = { adminOnly, authorize };
