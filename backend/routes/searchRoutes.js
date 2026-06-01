const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");

router.route("/")
  .get(searchController.searchByKeyword)
  .options(searchController.optionsSearch);

router.get("/conflicts", searchController.searchConflicts);
router.get("/economic", searchController.searchEconomic);
router.get("/sector", searchController.searchBySector);
router.get("/black-market", searchController.searchBlackMarket);

module.exports = router;
