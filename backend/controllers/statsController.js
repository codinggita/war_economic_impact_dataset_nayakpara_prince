const Conflict = require("../models/Conflict");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");

/**
 * Stats Controller — Aggregation Pipeline Operations
 * All endpoints use MongoDB aggregation framework
 */

/** @route GET /stats/total-conflicts */
const getTotalConflicts = asyncHandler(async (req, res) => {
  const result = await Conflict.aggregate([
    { $match: { isDeleted: { $ne: true } } },
    { $count: "total" },
  ]);
  sendSuccess(res, 200, "Total conflicts count", {
    total: result[0] ? result[0].total : 0,
  });
});

/** @route GET /stats/ongoing-conflicts */
const getOngoingConflicts = asyncHandler(async (req, res) => {
  const result = await Conflict.aggregate([
    { $match: { Status: "Ongoing", isDeleted: { $ne: true } } },
    { $count: "total" },
  ]);
  sendSuccess(res, 200, "Ongoing conflicts count", {
    total: result[0] ? result[0].total : 0,
  });
});

/** @route GET /stats/resolved-conflicts */
const getResolvedConflicts = asyncHandler(async (req, res) => {
  const result = await Conflict.aggregate([
    { $match: { Status: "Resolved", isDeleted: { $ne: true } } },
    { $count: "total" },
  ]);
  sendSuccess(res, 200, "Resolved conflicts count", {
    total: result[0] ? result[0].total : 0,
  });
});

/** @route GET /stats/highest-inflation */
const getHighestInflation = asyncHandler(async (req, res) => {
  const result = await Conflict.aggregate([
    { $match: { "Inflation_Rate_%": { $ne: null }, isDeleted: { $ne: true } } },
    { $sort: { "Inflation_Rate_%": -1 } },
    { $limit: 1 },
    {
      $project: {
        Conflict_Name: 1,
        Primary_Country: 1,
        Region: 1,
        "Inflation_Rate_%": 1,
        Start_Year: 1,
        End_Year: 1,
        Status: 1,
      },
    },
  ]);
  sendSuccess(res, 200, "Conflict with highest inflation", result[0] || null);
});

/** @route GET /stats/lowest-gdp */
const getLowestGdp = asyncHandler(async (req, res) => {
  const result = await Conflict.aggregate([
    { $match: { "GDP_Change_%": { $ne: null }, isDeleted: { $ne: true } } },
    { $sort: { "GDP_Change_%": 1 } },
    { $limit: 1 },
    {
      $project: {
        Conflict_Name: 1,
        Primary_Country: 1,
        Region: 1,
        "GDP_Change_%": 1,
        Start_Year: 1,
        End_Year: 1,
        Status: 1,
      },
    },
  ]);
  sendSuccess(res, 200, "Conflict with lowest GDP change", result[0] || null);
});

/** @route GET /stats/highest-poverty */
const getHighestPoverty = asyncHandler(async (req, res) => {
  const result = await Conflict.aggregate([
    { $match: { "During_War_Poverty_Rate_%": { $ne: null }, isDeleted: { $ne: true } } },
    { $sort: { "During_War_Poverty_Rate_%": -1 } },
    { $limit: 1 },
    {
      $project: {
        Conflict_Name: 1,
        Primary_Country: 1,
        Region: 1,
        "During_War_Poverty_Rate_%": 1,
        "Extreme_Poverty_Rate_%": 1,
        Start_Year: 1,
        Status: 1,
      },
    },
  ]);
  sendSuccess(res, 200, "Conflict with highest poverty", result[0] || null);
});

/** @route GET /stats/highest-food-insecurity */
const getHighestFoodInsecurity = asyncHandler(async (req, res) => {
  const result = await Conflict.aggregate([
    { $match: { "Food_Insecurity_Rate_%": { $ne: null }, isDeleted: { $ne: true } } },
    { $sort: { "Food_Insecurity_Rate_%": -1 } },
    { $limit: 1 },
    {
      $project: {
        Conflict_Name: 1,
        Primary_Country: 1,
        Region: 1,
        "Food_Insecurity_Rate_%": 1,
        Start_Year: 1,
        Status: 1,
      },
    },
  ]);
  sendSuccess(res, 200, "Conflict with highest food insecurity", result[0] || null);
});

/** @route GET /stats/highest-currency-gap */
const getHighestCurrencyGap = asyncHandler(async (req, res) => {
  const result = await Conflict.aggregate([
    { $match: { "Currency_Black_Market_Rate_Gap_%": { $ne: null }, isDeleted: { $ne: true } } },
    { $sort: { "Currency_Black_Market_Rate_Gap_%": -1 } },
    { $limit: 1 },
    {
      $project: {
        Conflict_Name: 1,
        Primary_Country: 1,
        Region: 1,
        "Currency_Black_Market_Rate_Gap_%": 1,
        "Currency_Devaluation_%": 1,
        Start_Year: 1,
        Status: 1,
      },
    },
  ]);
  sendSuccess(res, 200, "Conflict with highest currency gap", result[0] || null);
});

/** @route GET /stats/highest-war-cost */
const getHighestWarCost = asyncHandler(async (req, res) => {
  const result = await Conflict.aggregate([
    { $match: { Cost_of_War_USD: { $ne: null }, isDeleted: { $ne: true } } },
    { $sort: { Cost_of_War_USD: -1 } },
    { $limit: 1 },
    {
      $project: {
        Conflict_Name: 1,
        Primary_Country: 1,
        Region: 1,
        Cost_of_War_USD: 1,
        Start_Year: 1,
        End_Year: 1,
        Status: 1,
      },
    },
  ]);
  sendSuccess(res, 200, "Most expensive war", result[0] || null);
});

/** @route GET /stats/highest-reconstruction-cost */
const getHighestReconstructionCost = asyncHandler(async (req, res) => {
  const result = await Conflict.aggregate([
    { $match: { Estimated_Reconstruction_Cost_USD: { $ne: null }, isDeleted: { $ne: true } } },
    { $sort: { Estimated_Reconstruction_Cost_USD: -1 } },
    { $limit: 1 },
    {
      $project: {
        Conflict_Name: 1,
        Primary_Country: 1,
        Region: 1,
        Estimated_Reconstruction_Cost_USD: 1,
        Start_Year: 1,
        End_Year: 1,
        Status: 1,
      },
    },
  ]);
  sendSuccess(res, 200, "Costliest reconstruction", result[0] || null);
});

// ============================================================
// ADVANCED AGGREGATION PIPELINES
// ============================================================

/** @route GET /stats/by-region */
const getStatsByRegion = asyncHandler(async (req, res) => {
  const result = await Conflict.aggregate([
    { $match: { isDeleted: { $ne: true } } },
    {
      $group: {
        _id: "$Region",
        totalConflicts: { $sum: 1 },
        avgGdpChange: { $avg: "$GDP_Change_%" },
        avgInflation: { $avg: "$Inflation_Rate_%" },
        avgPoverty: { $avg: "$During_War_Poverty_Rate_%" },
        totalWarCost: { $sum: "$Cost_of_War_USD" },
        totalReconstructionCost: { $sum: "$Estimated_Reconstruction_Cost_USD" },
      },
    },
    {
      $project: {
        region: "$_id",
        _id: 0,
        totalConflicts: 1,
        avgGdpChange: { $round: ["$avgGdpChange", 2] },
        avgInflation: { $round: ["$avgInflation", 2] },
        avgPoverty: { $round: ["$avgPoverty", 2] },
        totalWarCost: 1,
        totalReconstructionCost: 1,
      },
    },
    { $sort: { totalConflicts: -1 } },
  ]);
  sendSuccess(res, 200, "Stats by region", result);
});

/** @route GET /stats/by-type */
const getStatsByType = asyncHandler(async (req, res) => {
  const result = await Conflict.aggregate([
    { $match: { isDeleted: { $ne: true } } },
    {
      $group: {
        _id: "$Conflict_Type",
        totalConflicts: { $sum: 1 },
        avgGdpChange: { $avg: "$GDP_Change_%" },
        avgInflation: { $avg: "$Inflation_Rate_%" },
        avgPoverty: { $avg: "$During_War_Poverty_Rate_%" },
        ongoingCount: {
          $sum: { $cond: [{ $eq: ["$Status", "Ongoing"] }, 1, 0] },
        },
        resolvedCount: {
          $sum: { $cond: [{ $eq: ["$Status", "Resolved"] }, 1, 0] },
        },
      },
    },
    {
      $project: {
        type: "$_id",
        _id: 0,
        totalConflicts: 1,
        avgGdpChange: { $round: ["$avgGdpChange", 2] },
        avgInflation: { $round: ["$avgInflation", 2] },
        avgPoverty: { $round: ["$avgPoverty", 2] },
        ongoingCount: 1,
        resolvedCount: 1,
      },
    },
    { $sort: { totalConflicts: -1 } },
  ]);
  sendSuccess(res, 200, "Stats by conflict type", result);
});

/** @route GET /stats/by-sector */
const getStatsBySector = asyncHandler(async (req, res) => {
  const result = await Conflict.aggregate([
    { $match: { Most_Affected_Sector: { $ne: null }, isDeleted: { $ne: true } } },
    {
      $group: {
        _id: "$Most_Affected_Sector",
        totalConflicts: { $sum: 1 },
        avgGdpChange: { $avg: "$GDP_Change_%" },
        avgInflation: { $avg: "$Inflation_Rate_%" },
        avgUnemployment: { $avg: "$During_War_Unemployment_%" },
      },
    },
    {
      $project: {
        sector: "$_id",
        _id: 0,
        totalConflicts: 1,
        avgGdpChange: { $round: ["$avgGdpChange", 2] },
        avgInflation: { $round: ["$avgInflation", 2] },
        avgUnemployment: { $round: ["$avgUnemployment", 2] },
      },
    },
    { $sort: { totalConflicts: -1 } },
  ]);
  sendSuccess(res, 200, "Stats by sector", result);
});

/** @route GET /stats/by-decade */
const getStatsByDecade = asyncHandler(async (req, res) => {
  const result = await Conflict.aggregate([
    { $match: { isDeleted: { $ne: true } } },
    {
      $addFields: {
        decade: {
          $multiply: [{ $floor: { $divide: ["$Start_Year", 10] } }, 10],
        },
      },
    },
    {
      $group: {
        _id: "$decade",
        totalConflicts: { $sum: 1 },
        avgGdpChange: { $avg: "$GDP_Change_%" },
        avgInflation: { $avg: "$Inflation_Rate_%" },
        totalWarCost: { $sum: "$Cost_of_War_USD" },
      },
    },
    {
      $project: {
        decade: "$_id",
        _id: 0,
        totalConflicts: 1,
        avgGdpChange: { $round: ["$avgGdpChange", 2] },
        avgInflation: { $round: ["$avgInflation", 2] },
        totalWarCost: 1,
      },
    },
    { $sort: { decade: 1 } },
  ]);
  sendSuccess(res, 200, "Stats by decade", result);
});

/** @route GET /stats/overview */
const getOverview = asyncHandler(async (req, res) => {
  const [overview, statusBreakdown, topCostlyWars] = await Promise.all([
    Conflict.aggregate([
      { $match: { isDeleted: { $ne: true } } },
      {
        $group: {
          _id: null,
          totalConflicts: { $sum: 1 },
          avgGdpChange: { $avg: "$GDP_Change_%" },
          avgInflation: { $avg: "$Inflation_Rate_%" },
          avgPoverty: { $avg: "$During_War_Poverty_Rate_%" },
          totalWarCost: { $sum: "$Cost_of_War_USD" },
          totalReconstructionCost: { $sum: "$Estimated_Reconstruction_Cost_USD" },
          totalHouseholdsAffected: { $sum: "$Households_Fallen_Into_Poverty_Estimate" },
          uniqueCountries: { $addToSet: "$Primary_Country" },
          uniqueRegions: { $addToSet: "$Region" },
        },
      },
      {
        $project: {
          _id: 0,
          totalConflicts: 1,
          avgGdpChange: { $round: ["$avgGdpChange", 2] },
          avgInflation: { $round: ["$avgInflation", 2] },
          avgPoverty: { $round: ["$avgPoverty", 2] },
          totalWarCost: 1,
          totalReconstructionCost: 1,
          totalHouseholdsAffected: 1,
          countriesAffected: { $size: "$uniqueCountries" },
          regionsAffected: { $size: "$uniqueRegions" },
        },
      },
    ]),
    Conflict.aggregate([
      { $match: { isDeleted: { $ne: true } } },
      { $group: { _id: "$Status", count: { $sum: 1 } } },
    ]),
    Conflict.aggregate([
      { $match: { Cost_of_War_USD: { $ne: null }, isDeleted: { $ne: true } } },
      { $sort: { Cost_of_War_USD: -1 } },
      { $limit: 5 },
      {
        $project: {
          Conflict_Name: 1,
          Primary_Country: 1,
          Cost_of_War_USD: 1,
          _id: 0,
        },
      },
    ]),
  ]);

  sendSuccess(res, 200, "Dashboard overview", {
    overview: overview[0] || {},
    statusBreakdown,
    topCostlyWars,
  });
});

/** HEAD /stats/total-conflicts */
const headTotalConflicts = asyncHandler(async (req, res) => {
  const count = await Conflict.countDocuments({ isDeleted: { $ne: true } });
  res.set("X-Total-Count", count.toString());
  res.sendStatus(200);
});

module.exports = {
  getTotalConflicts,
  getOngoingConflicts,
  getResolvedConflicts,
  getHighestInflation,
  getLowestGdp,
  getHighestPoverty,
  getHighestFoodInsecurity,
  getHighestCurrencyGap,
  getHighestWarCost,
  getHighestReconstructionCost,
  getStatsByRegion,
  getStatsByType,
  getStatsBySector,
  getStatsByDecade,
  getOverview,
  headTotalConflicts,
};
