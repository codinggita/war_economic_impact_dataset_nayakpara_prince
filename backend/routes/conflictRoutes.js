const express = require("express");
const router = express.Router();
const conflictController = require("../controllers/conflictController");
const { validateConflict } = require("../middleware/validateMiddleware");

// ============================================================
// ADVANCED / STATIC ROUTES (Must be before dynamic /:conflictId)
// ============================================================
router.get("/compare", conflictController.compareConflicts);
router.get("/summary/ai", conflictController.getAiSummary);
router.get("/top/highest-inflation", conflictController.getTopHighestInflation);
router.get("/top/highest-poverty", conflictController.getTopHighestPoverty);
router.get("/recent", conflictController.getRecent);
router.get("/latest", conflictController.getLatest);
router.get("/random", conflictController.getRandom);
router.get("/trending", conflictController.getTrending);
router.get("/ongoing", conflictController.getOngoing);
router.get("/resolved", conflictController.getResolved);
router.get("/high-risk", conflictController.getHighRisk);
router.get("/economic-collapse", conflictController.getEconomicCollapse);

// ============================================================
// ROUTE PARAMETER ROUTES — By Field Value
// ============================================================
router.get("/name/:name", conflictController.getByName);
router.get("/type/:type", conflictController.getByType);
router.get("/region/:region", conflictController.getByRegion);
router.get("/status/:status", conflictController.getByStatus);
router.get("/country/:country", conflictController.getByCountry);
router.get("/start-year/:year", conflictController.getByStartYear);
router.get("/end-year/:year", conflictController.getByEndYear);
router.get("/inflation/:rate", conflictController.getByInflation);
router.get("/gdp-loss/:percentage", conflictController.getByGdpLoss);
router.get("/poverty/:rate", conflictController.getByPoverty);
router.get("/extreme-poverty/:rate", conflictController.getByExtremePoverty);
router.get("/food-insecurity/:rate", conflictController.getByFoodInsecurity);
router.get("/unemployment/:rate", conflictController.getByUnemployment);
router.get("/youth-unemployment/:rate", conflictController.getByYouthUnemployment);
router.get("/sector/:sector", conflictController.getBySector);
router.get("/black-market/:level", conflictController.getByBlackMarketLevel);
router.get("/black-market-goods/:goods", conflictController.getByBlackMarketGoods);
router.get("/profiteering/:status", conflictController.getByProfiteering);
router.get("/currency-gap/:gap", conflictController.getByCurrencyGap);
router.get("/reconstruction-cost/:amount", conflictController.getByReconstructionCost);
router.get("/cost-of-war/:amount", conflictController.getByCostOfWar);
router.get("/informal-economy/pre/:value", conflictController.getByPreWarInformalEconomy);
router.get("/informal-economy/during/:value", conflictController.getByDuringWarInformalEconomy);
router.get("/households/:count", conflictController.getByHouseholds);

// ============================================================
// COMPOSITE ROUTE PARAMETER ROUTES
// ============================================================
router.get("/region/:region/latest", conflictController.getLatestInRegion);
router.get("/region/:region/oldest", conflictController.getOldestInRegion);
router.get("/country/:country/history", conflictController.getCountryHistory);
router.get("/type/:type/count", conflictController.getCountByType);
router.get("/status/:status/count", conflictController.getCountByStatus);
router.get("/year/:year", conflictController.getByActiveYear);
router.get("/sector/:sector/highest-gdp-loss", conflictController.getHighestGdpLossInSector);
router.get("/sector/:sector/highest-inflation", conflictController.getHighestInflationInSector);

// ============================================================
// WAR-SPECIFIC DETAIL ROUTES
// ============================================================
router.get("/war/:name/summary", conflictController.getWarSummary);
router.get("/war/:name/economic-impact", conflictController.getWarEconomicImpact);
router.get("/war/:name/poverty-impact", conflictController.getWarPovertyImpact);
router.get("/war/:name/black-market", conflictController.getWarBlackMarket);
router.get("/war/:name/reconstruction", conflictController.getWarReconstruction);
router.get("/war/:name/currency-crisis", conflictController.getWarCurrencyCrisis);
router.get("/war/:name/unemployment", conflictController.getWarUnemployment);

// ============================================================
// BASIC CRUD BASE
// ============================================================
router.route("/")
  .get(conflictController.getAllConflicts)
  .post(validateConflict, conflictController.createConflict)
  .head(conflictController.headConflicts)
  .options(conflictController.optionsConflicts);

// ============================================================
// PARTIAL UPDATE (PATCH) ROUTES
// ============================================================
router.patch("/:conflictId/status", validateConflict, conflictController.updateStatus);
router.patch("/:conflictId/inflation", validateConflict, conflictController.updateInflation);
router.patch("/:conflictId/gdp", validateConflict, conflictController.updateGdp);
router.patch("/:conflictId/poverty", validateConflict, conflictController.updatePoverty);
router.patch("/:conflictId/unemployment", validateConflict, conflictController.updateUnemployment);
router.patch("/:conflictId/sector", validateConflict, conflictController.updateSector);

// ============================================================
// SINGLE ITEM CRUD
// ============================================================
router.route("/:conflictId")
  .get(conflictController.getConflictById)
  .put(validateConflict, conflictController.replaceConflict)
  .patch(validateConflict, conflictController.updateConflict)
  .delete(conflictController.deleteConflict)
  .head(conflictController.headConflictById)
  .options(conflictController.optionsConflictById);

module.exports = router;
