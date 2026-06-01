const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { validateRegister, validateLogin } = require("../middleware/validateMiddleware");
const { authLimiter } = require("../middleware/rateLimiter");

router.post("/register", authLimiter, validateRegister, authController.register);

router.route("/login")
  .post(authLimiter, validateLogin, authController.login)
  .options(authController.optionsAuthLogin);

router.post("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/refresh-token", authController.refreshToken);

router.route("/me")
  .get(protect, authController.getMe)
  .head(protect, authController.headAuthMe);

router.delete("/account", protect, authController.deleteAccount);

module.exports = router;
