const express = require("express");
const router = express.Router();
const conflictController = require("../controllers/conflictController");
const statsController = require("../controllers/statsController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");
const { validateConflict } = require("../middleware/validateMiddleware");

// All admin routes require authentication and admin role
router.use(protect);
router.use(adminOnly);

router.route("/conflicts")
  .get(conflictController.getAllConflicts)
  .post(validateConflict, conflictController.createConflict);

router.route("/conflicts/:conflictId")
  .delete(conflictController.deleteConflict)
  .patch(validateConflict, conflictController.updateConflict);

router.get("/dashboard", statsController.getOverview);

module.exports = router;
