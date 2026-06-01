const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");

router.route("/total-conflicts")
  .get(statsController.getTotalConflicts)
  .head(statsController.headTotalConflicts);

router.get("/ongoing-conflicts", statsController.getOngoingConflicts);
router.get("/resolved-conflicts", statsController.getResolvedConflicts);
router.get("/highest-inflation", statsController.getHighestInflation);
router.get("/lowest-gdp", statsController.getLowestGdp);
router.get("/highest-poverty", statsController.getHighestPoverty);
router.get("/highest-food-insecurity", statsController.getHighestFoodInsecurity);
router.get("/highest-currency-gap", statsController.getHighestCurrencyGap);
router.get("/highest-war-cost", statsController.getHighestWarCost);
router.get("/highest-reconstruction-cost", statsController.getHighestReconstructionCost);

// Advanced Aggregation Pipelines
router.get("/by-region", statsController.getStatsByRegion);
router.get("/by-type", statsController.getStatsByType);
router.get("/by-sector", statsController.getStatsBySector);
router.get("/by-decade", statsController.getStatsByDecade);
router.get("/overview", statsController.getOverview);

module.exports = router;
