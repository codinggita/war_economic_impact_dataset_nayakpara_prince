const express = require("express");
const router = express.Router();
const conflictController = require("../controllers/conflictController");
const { protect } = require("../middleware/authMiddleware");
const { validateConflict } = require("../middleware/validateMiddleware");

// All protected routes require JWT authentication
router.use(protect);

router.route("/conflicts")
  .get(conflictController.getAllConflicts)
  .post(validateConflict, conflictController.createConflict);

router.delete("/conflicts/:conflictId", conflictController.deleteConflict);

module.exports = router;
