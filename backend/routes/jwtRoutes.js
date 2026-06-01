const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly, authorize } = require("../middleware/adminMiddleware");

router.get("/profile", protect, authController.jwtProfile);
router.get("/dashboard", protect, authController.jwtDashboard);

router.post("/generate-token", authController.generateToken);
router.post("/verify-token", authController.verifyToken);
router.post("/refresh-token", authController.jwtRefreshToken);

router.get("/admin", protect, adminOnly, authController.jwtAdmin);
router.get("/user", protect, authorize("user"), authController.jwtUser);
router.delete("/logout", authController.jwtLogout);

module.exports = router;
