const Conflict = require("../models/Conflict");
const conflictService = require("../services/conflictService");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const { AppError } = require("../utils/errorHandler");

// ============================================================
// BASIC CRUD OPERATIONS
// ============================================================

/**
 * @desc    Get all conflicts (with filtering, sorting, pagination)
 * @route   GET /conflicts
 */
const getAllConflicts = asyncHandler(async (req, res) => {
  const result = await conflictService.getAllConflicts(req.query);
  sendSuccess(res, 200, "Conflicts fetched successfully", result.conflicts, result.pagination);
});

/**
 * @desc    Get a single conflict by ID
 * @route   GET /conflicts/:conflictId
 */
const getConflictById = asyncHandler(async (req, res) => {
  const conflict = await conflictService.getConflictById(req.params.conflictId);
  sendSuccess(res, 200, "Conflict fetched successfully", conflict);
});

/**
 * @desc    Create a new conflict
 * @route   POST /conflicts
 */
const createConflict = asyncHandler(async (req, res) => {
  const conflict = await conflictService.createConflict(req.body);
  sendSuccess(res, 201, "Conflict created successfully", conflict);
});

/**
 * @desc    Replace a conflict (full update)
 * @route   PUT /conflicts/:conflictId
 */
const replaceConflict = asyncHandler(async (req, res) => {
  const conflict = await conflictService.replaceConflict(req.params.conflictId, req.body);
  sendSuccess(res, 200, "Conflict replaced successfully", conflict);
});

/**
 * @desc    Partially update a conflict
 * @route   PATCH /conflicts/:conflictId
 */
const updateConflict = asyncHandler(async (req, res) => {
  const conflict = await conflictService.updateConflict(req.params.conflictId, req.body);
  sendSuccess(res, 200, "Conflict updated successfully", conflict);
});

/**
 * @desc    Delete a conflict (soft delete)
 * @route   DELETE /conflicts/:conflictId
 */
const deleteConflict = asyncHandler(async (req, res) => {
  await conflictService.deleteConflict(req.params.conflictId);
  sendSuccess(res, 200, "Conflict deleted successfully");
});

// ============================================================
// ROUTE PARAMETER ROUTES — By Field Value
// ============================================================

/** @route GET /conflicts/name/:name */
const getByName = asyncHandler(async (req, res) => {
  const result = await conflictService.findByField("Conflict_Name", req.params.name, req.query);
  sendSuccess(res, 200, "Conflicts fetched by name", result.data, result.pagination);
});

/** @route GET /conflicts/type/:type */
const getByType = asyncHandler(async (req, res) => {
  const result = await conflictService.findByField("Conflict_Type", req.params.type, req.query);
  sendSuccess(res, 200, "Conflicts fetched by type", result.data, result.pagination);
});

/** @route GET /conflicts/region/:region */
const getByRegion = asyncHandler(async (req, res) => {
  const result = await conflictService.findByField("Region", req.params.region, req.query);
  sendSuccess(res, 200, "Conflicts fetched by region", result.data, result.pagination);
});

/** @route GET /conflicts/status/:status */
const getByStatus = asyncHandler(async (req, res) => {
  const result = await conflictService.findByField("Status", req.params.status, req.query);
  sendSuccess(res, 200, "Conflicts fetched by status", result.data, result.pagination);
});

/** @route GET /conflicts/country/:country */
const getByCountry = asyncHandler(async (req, res) => {
  const result = await conflictService.findByField("Country", req.params.country, req.query);
  sendSuccess(res, 200, "Conflicts fetched by country", result.data, result.pagination);
});

/** @route GET /conflicts/start-year/:year */
const getByStartYear = asyncHandler(async (req, res) => {
  const result = await conflictService.findByField("Start_Year", req.params.year, req.query);
  sendSuccess(res, 200, "Conflicts fetched by start year", result.data, result.pagination);
});

/** @route GET /conflicts/end-year/:year */
const getByEndYear = asyncHandler(async (req, res) => {
  const result = await conflictService.findByField("End_Year", req.params.year, req.query);
  sendSuccess(res, 200, "Conflicts fetched by end year", result.data, result.pagination);
});

/** @route GET /conflicts/inflation/:rate */
const getByInflation = asyncHandler(async (req, res) => {
  const result = await conflictService.findAboveThreshold("Inflation_Rate_%", req.params.rate, req.query);
  sendSuccess(res, 200, "Conflicts fetched by inflation rate", result.data, result.pagination);
});

/** @route GET /conflicts/gdp-loss/:percentage */
const getByGdpLoss = asyncHandler(async (req, res) => {
  const filter = {
    "GDP_Change_%": { $lt: -Math.abs(parseFloat(req.params.percentage)) },
    isDeleted: { $ne: true },
  };
  const data = await Conflict.find(filter).sort({ "GDP_Change_%": 1 });
  sendSuccess(res, 200, "Conflicts fetched by GDP loss", data);
});

/** @route GET /conflicts/poverty/:rate */
const getByPoverty = asyncHandler(async (req, res) => {
  const result = await conflictService.findAboveThreshold("Poverty_Rate_%", req.params.rate, req.query);
  sendSuccess(res, 200, "Conflicts fetched by poverty rate", result.data, result.pagination);
});

/** @route GET /conflicts/extreme-poverty/:rate */
const getByExtremePoverty = asyncHandler(async (req, res) => {
  const result = await conflictService.findAboveThreshold("Extreme_Poverty_Rate_%", req.params.rate, req.query);
  sendSuccess(res, 200, "Conflicts fetched by extreme poverty rate", result.data, result.pagination);
});

/** @route GET /conflicts/food-insecurity/:rate */
const getByFoodInsecurity = asyncHandler(async (req, res) => {
  const result = await conflictService.findAboveThreshold("Food_Insecurity_Rate_%", req.params.rate, req.query);
  sendSuccess(res, 200, "Conflicts fetched by food insecurity rate", result.data, result.pagination);
});

/** @route GET /conflicts/unemployment/:rate */
const getByUnemployment = asyncHandler(async (req, res) => {
  const result = await conflictService.findAboveThreshold("During_War_Unemployment_%", req.params.rate, req.query);
  sendSuccess(res, 200, "Conflicts fetched by unemployment rate", result.data, result.pagination);
});

/** @route GET /conflicts/youth-unemployment/:rate */
const getByYouthUnemployment = asyncHandler(async (req, res) => {
  const result = await conflictService.findAboveThreshold("Youth_Unemployment_%", req.params.rate, req.query);
  sendSuccess(res, 200, "Conflicts fetched by youth unemployment rate", result.data, result.pagination);
});

/** @route GET /conflicts/sector/:sector */
const getBySector = asyncHandler(async (req, res) => {
  const result = await conflictService.findByField("Affected_Sector", req.params.sector, req.query);
  sendSuccess(res, 200, "Conflicts fetched by sector", result.data, result.pagination);
});

/** @route GET /conflicts/black-market/:level */
const getByBlackMarketLevel = asyncHandler(async (req, res) => {
  const result = await conflictService.findByField("Black_Market_Level", req.params.level, req.query);
  sendSuccess(res, 200, "Conflicts fetched by black market level", result.data, result.pagination);
});

/** @route GET /conflicts/black-market-goods/:goods */
const getByBlackMarketGoods = asyncHandler(async (req, res) => {
  const data = await Conflict.find({
    Black_Market_Goods: new RegExp(req.params.goods, "i"),
    isDeleted: { $ne: true },
  });
  sendSuccess(res, 200, "Conflicts fetched by black market goods", data);
});

/** @route GET /conflicts/profiteering/:status */
const getByProfiteering = asyncHandler(async (req, res) => {
  const result = await conflictService.findByField("Profiteering", req.params.status, req.query);
  sendSuccess(res, 200, "Conflicts fetched by profiteering status", result.data, result.pagination);
});

/** @route GET /conflicts/currency-gap/:gap */
const getByCurrencyGap = asyncHandler(async (req, res) => {
  const result = await conflictService.findAboveThreshold("Currency_Black_Market_Rate_Gap_%", req.params.gap, req.query);
  sendSuccess(res, 200, "Conflicts fetched by currency gap", result.data, result.pagination);
});

/** @route GET /conflicts/reconstruction-cost/:amount */
const getByReconstructionCost = asyncHandler(async (req, res) => {
  const result = await conflictService.findAboveThreshold("Estimated_Reconstruction_Cost_USD", req.params.amount, req.query);
  sendSuccess(res, 200, "Conflicts fetched by reconstruction cost", result.data, result.pagination);
});

/** @route GET /conflicts/cost-of-war/:amount */
const getByCostOfWar = asyncHandler(async (req, res) => {
  const result = await conflictService.findAboveThreshold("Cost_of_War_USD", req.params.amount, req.query);
  sendSuccess(res, 200, "Conflicts fetched by cost of war", result.data, result.pagination);
});

/** @route GET /conflicts/informal-economy/pre/:value */
const getByPreWarInformalEconomy = asyncHandler(async (req, res) => {
  const result = await conflictService.findAboveThreshold("Pre_War_Informal_Economy_%", req.params.value, req.query);
  sendSuccess(res, 200, "Conflicts fetched by pre-war informal economy", result.data, result.pagination);
});

/** @route GET /conflicts/informal-economy/during/:value */
const getByDuringWarInformalEconomy = asyncHandler(async (req, res) => {
  const result = await conflictService.findAboveThreshold("During_War_Informal_Economy_%", req.params.value, req.query);
  sendSuccess(res, 200, "Conflicts fetched by wartime informal economy", result.data, result.pagination);
});

/** @route GET /conflicts/households/:count */
const getByHouseholds = asyncHandler(async (req, res) => {
  const result = await conflictService.findAboveThreshold("Households_Affected", req.params.count, req.query);
  sendSuccess(res, 200, "Conflicts fetched by affected households", result.data, result.pagination);
});

// ============================================================
// COMPOSITE ROUTE PARAMETER ROUTES
// ============================================================

/** @route GET /conflicts/region/:region/latest */
const getLatestInRegion = asyncHandler(async (req, res) => {
  const conflict = await Conflict.findOne({
    Region: new RegExp(req.params.region, "i"),
    isDeleted: { $ne: true },
  }).sort({ Start_Year: -1 });
  if (!conflict) throw new AppError("No conflicts found in this region", 404);
  sendSuccess(res, 200, "Latest conflict in region", conflict);
});

/** @route GET /conflicts/region/:region/oldest */
const getOldestInRegion = asyncHandler(async (req, res) => {
  const conflict = await Conflict.findOne({
    Region: new RegExp(req.params.region, "i"),
    isDeleted: { $ne: true },
  }).sort({ Start_Year: 1 });
  if (!conflict) throw new AppError("No conflicts found in this region", 404);
  sendSuccess(res, 200, "Oldest conflict in region", conflict);
});

/** @route GET /conflicts/country/:country/history */
const getCountryHistory = asyncHandler(async (req, res) => {
  const data = await Conflict.find({
    Country: new RegExp(req.params.country, "i"),
    isDeleted: { $ne: true },
  }).sort({ Start_Year: 1 });
  sendSuccess(res, 200, `Conflict history of ${req.params.country}`, data);
});

/** @route GET /conflicts/type/:type/count */
const getCountByType = asyncHandler(async (req, res) => {
  const count = await Conflict.countDocuments({
    Conflict_Type: new RegExp(req.params.type, "i"),
    isDeleted: { $ne: true },
  });
  sendSuccess(res, 200, `Count of ${req.params.type} conflicts`, { type: req.params.type, count });
});

/** @route GET /conflicts/status/:status/count */
const getCountByStatus = asyncHandler(async (req, res) => {
  const count = await Conflict.countDocuments({
    Status: req.params.status,
    isDeleted: { $ne: true },
  });
  sendSuccess(res, 200, `Count of ${req.params.status} conflicts`, { status: req.params.status, count });
});

/** @route GET /conflicts/year/:year — conflicts active in a given year */
const getByActiveYear = asyncHandler(async (req, res) => {
  const year = parseInt(req.params.year);
  const data = await Conflict.find({
    Start_Year: { $lte: year },
    $or: [{ End_Year: { $gte: year } }, { End_Year: null }],
    isDeleted: { $ne: true },
  }).sort({ Start_Year: 1 });
  sendSuccess(res, 200, `Conflicts active in year ${year}`, data);
});

/** @route GET /conflicts/sector/:sector/highest-gdp-loss */
const getHighestGdpLossInSector = asyncHandler(async (req, res) => {
  const conflict = await Conflict.findOne({
    Affected_Sector: new RegExp(req.params.sector, "i"),
    isDeleted: { $ne: true },
  }).sort({ "GDP_Change_%": 1 }); // most negative = highest loss
  if (!conflict) throw new AppError("No conflicts found in this sector", 404);
  sendSuccess(res, 200, `Highest GDP loss in ${req.params.sector}`, conflict);
});

/** @route GET /conflicts/sector/:sector/highest-inflation */
const getHighestInflationInSector = asyncHandler(async (req, res) => {
  const conflict = await Conflict.findOne({
    Affected_Sector: new RegExp(req.params.sector, "i"),
    isDeleted: { $ne: true },
  }).sort({ "Inflation_Rate_%": -1 });
  if (!conflict) throw new AppError("No conflicts found in this sector", 404);
  sendSuccess(res, 200, `Highest inflation in ${req.params.sector}`, conflict);
});

// ============================================================
// WAR-SPECIFIC DETAIL ROUTES
// ============================================================

/** @route GET /conflicts/war/:name/summary */
const getWarSummary = asyncHandler(async (req, res) => {
  const conflict = await Conflict.findOne({
    Conflict_Name: new RegExp(req.params.name, "i"),
    isDeleted: { $ne: true },
  });
  if (!conflict) throw new AppError("Conflict not found", 404);

  const summary = {
    name: conflict.Conflict_Name,
    type: conflict.Conflict_Type,
    country: conflict.Country,
    region: conflict.Region,
    period: `${conflict.Start_Year} - ${conflict.End_Year || "Ongoing"}`,
    status: conflict.Status,
    gdpChange: conflict["GDP_Change_%"],
    inflationRate: conflict["Inflation_Rate_%"],
    costOfWar: conflict.Cost_of_War_USD,
    reconstructionCost: conflict.Estimated_Reconstruction_Cost_USD,
  };
  sendSuccess(res, 200, "War summary", summary);
});

/** @route GET /conflicts/war/:name/economic-impact */
const getWarEconomicImpact = asyncHandler(async (req, res) => {
  const conflict = await Conflict.findOne({
    Conflict_Name: new RegExp(req.params.name, "i"),
    isDeleted: { $ne: true },
  });
  if (!conflict) throw new AppError("Conflict not found", 404);

  const impact = {
    name: conflict.Conflict_Name,
    gdpChange: conflict["GDP_Change_%"],
    inflationRate: conflict["Inflation_Rate_%"],
    currencyDevaluation: conflict["Currency_Devaluation_%"],
    currencyBlackMarketGap: conflict["Currency_Black_Market_Rate_Gap_%"],
    preWarInformalEconomy: conflict["Pre_War_Informal_Economy_%"],
    duringWarInformalEconomy: conflict["During_War_Informal_Economy_%"],
    affectedSector: conflict.Affected_Sector,
    costOfWar: conflict.Cost_of_War_USD,
  };
  sendSuccess(res, 200, "Economic impact", impact);
});

/** @route GET /conflicts/war/:name/poverty-impact */
const getWarPovertyImpact = asyncHandler(async (req, res) => {
  const conflict = await Conflict.findOne({
    Conflict_Name: new RegExp(req.params.name, "i"),
    isDeleted: { $ne: true },
  });
  if (!conflict) throw new AppError("Conflict not found", 404);

  const impact = {
    name: conflict.Conflict_Name,
    povertyRate: conflict["Poverty_Rate_%"],
    extremePovertyRate: conflict["Extreme_Poverty_Rate_%"],
    foodInsecurityRate: conflict["Food_Insecurity_Rate_%"],
    householdsAffected: conflict.Households_Affected,
  };
  sendSuccess(res, 200, "Poverty impact", impact);
});

/** @route GET /conflicts/war/:name/black-market */
const getWarBlackMarket = asyncHandler(async (req, res) => {
  const conflict = await Conflict.findOne({
    Conflict_Name: new RegExp(req.params.name, "i"),
    isDeleted: { $ne: true },
  });
  if (!conflict) throw new AppError("Conflict not found", 404);

  const data = {
    name: conflict.Conflict_Name,
    blackMarketLevel: conflict.Black_Market_Level,
    blackMarketGoods: conflict.Black_Market_Goods,
    profiteering: conflict.Profiteering,
    currencyBlackMarketGap: conflict["Currency_Black_Market_Rate_Gap_%"],
  };
  sendSuccess(res, 200, "Black market data", data);
});

/** @route GET /conflicts/war/:name/reconstruction */
const getWarReconstruction = asyncHandler(async (req, res) => {
  const conflict = await Conflict.findOne({
    Conflict_Name: new RegExp(req.params.name, "i"),
    isDeleted: { $ne: true },
  });
  if (!conflict) throw new AppError("Conflict not found", 404);

  const data = {
    name: conflict.Conflict_Name,
    status: conflict.Status,
    estimatedReconstructionCost: conflict.Estimated_Reconstruction_Cost_USD,
    costOfWar: conflict.Cost_of_War_USD,
    householdsAffected: conflict.Households_Affected,
  };
  sendSuccess(res, 200, "Reconstruction details", data);
});

/** @route GET /conflicts/war/:name/currency-crisis */
const getWarCurrencyCrisis = asyncHandler(async (req, res) => {
  const conflict = await Conflict.findOne({
    Conflict_Name: new RegExp(req.params.name, "i"),
    isDeleted: { $ne: true },
  });
  if (!conflict) throw new AppError("Conflict not found", 404);

  const data = {
    name: conflict.Conflict_Name,
    currencyDevaluation: conflict["Currency_Devaluation_%"],
    currencyBlackMarketGap: conflict["Currency_Black_Market_Rate_Gap_%"],
    inflationRate: conflict["Inflation_Rate_%"],
  };
  sendSuccess(res, 200, "Currency crisis data", data);
});

/** @route GET /conflicts/war/:name/unemployment */
const getWarUnemployment = asyncHandler(async (req, res) => {
  const conflict = await Conflict.findOne({
    Conflict_Name: new RegExp(req.params.name, "i"),
    isDeleted: { $ne: true },
  });
  if (!conflict) throw new AppError("Conflict not found", 404);

  const data = {
    name: conflict.Conflict_Name,
    preWarUnemployment: conflict["Pre_War_Unemployment_%"],
    duringWarUnemployment: conflict["During_War_Unemployment_%"],
    youthUnemployment: conflict["Youth_Unemployment_%"],
    unemploymentIncrease:
      conflict["During_War_Unemployment_%"] != null && conflict["Pre_War_Unemployment_%"] != null
        ? (conflict["During_War_Unemployment_%"] - conflict["Pre_War_Unemployment_%"]).toFixed(2)
        : null,
  };
  sendSuccess(res, 200, "Unemployment impact", data);
});

// ============================================================
// PARTIAL UPDATE (PATCH) ROUTES
// ============================================================

/** @route PATCH /conflicts/:conflictId/status */
const updateStatus = asyncHandler(async (req, res) => {
  const conflict = await conflictService.updateConflict(req.params.conflictId, {
    Status: req.body.Status,
  });
  sendSuccess(res, 200, "Status updated successfully", conflict);
});

/** @route PATCH /conflicts/:conflictId/inflation */
const updateInflation = asyncHandler(async (req, res) => {
  const conflict = await conflictService.updateConflict(req.params.conflictId, {
    "Inflation_Rate_%": req.body["Inflation_Rate_%"],
  });
  sendSuccess(res, 200, "Inflation rate updated successfully", conflict);
});

/** @route PATCH /conflicts/:conflictId/gdp */
const updateGdp = asyncHandler(async (req, res) => {
  const conflict = await conflictService.updateConflict(req.params.conflictId, {
    "GDP_Change_%": req.body["GDP_Change_%"],
  });
  sendSuccess(res, 200, "GDP change updated successfully", conflict);
});

/** @route PATCH /conflicts/:conflictId/poverty */
const updatePoverty = asyncHandler(async (req, res) => {
  const conflict = await conflictService.updateConflict(req.params.conflictId, {
    "Poverty_Rate_%": req.body["Poverty_Rate_%"],
    "Extreme_Poverty_Rate_%": req.body["Extreme_Poverty_Rate_%"],
    "Food_Insecurity_Rate_%": req.body["Food_Insecurity_Rate_%"],
  });
  sendSuccess(res, 200, "Poverty data updated successfully", conflict);
});

/** @route PATCH /conflicts/:conflictId/unemployment */
const updateUnemployment = asyncHandler(async (req, res) => {
  const conflict = await conflictService.updateConflict(req.params.conflictId, {
    "Pre_War_Unemployment_%": req.body["Pre_War_Unemployment_%"],
    "During_War_Unemployment_%": req.body["During_War_Unemployment_%"],
    "Youth_Unemployment_%": req.body["Youth_Unemployment_%"],
  });
  sendSuccess(res, 200, "Unemployment data updated successfully", conflict);
});

/** @route PATCH /conflicts/:conflictId/sector */
const updateSector = asyncHandler(async (req, res) => {
  const conflict = await conflictService.updateConflict(req.params.conflictId, {
    Affected_Sector: req.body.Affected_Sector,
  });
  sendSuccess(res, 200, "Sector updated successfully", conflict);
});

// ============================================================
// ADVANCED ROUTES
// ============================================================

/** @route GET /conflicts/top/highest-inflation */
const getTopHighestInflation = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const data = await Conflict.find({ isDeleted: { $ne: true } })
    .sort({ "Inflation_Rate_%": -1 })
    .limit(limit);
  sendSuccess(res, 200, "Top conflicts by inflation", data);
});

/** @route GET /conflicts/top/highest-poverty */
const getTopHighestPoverty = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const data = await Conflict.find({ isDeleted: { $ne: true } })
    .sort({ "Poverty_Rate_%": -1 })
    .limit(limit);
  sendSuccess(res, 200, "Top conflicts by poverty", data);
});

/** @route GET /conflicts/recent */
const getRecent = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const data = await Conflict.find({ isDeleted: { $ne: true } })
    .sort({ createdAt: -1 })
    .limit(limit);
  sendSuccess(res, 200, "Recently added conflicts", data);
});

/** @route GET /conflicts/latest */
const getLatest = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const data = await Conflict.find({ isDeleted: { $ne: true } })
    .sort({ Start_Year: -1 })
    .limit(limit);
  sendSuccess(res, 200, "Latest conflicts by start year", data);
});

/** @route GET /conflicts/random */
const getRandom = asyncHandler(async (req, res) => {
  const count = await Conflict.countDocuments({ isDeleted: { $ne: true } });
  if (count === 0) throw new AppError("No conflicts found", 404);
  const random = Math.floor(Math.random() * count);
  const conflict = await Conflict.findOne({ isDeleted: { $ne: true } }).skip(random);
  sendSuccess(res, 200, "Random conflict", conflict);
});

/** @route GET /conflicts/trending — ongoing conflicts with highest economic impact */
const getTrending = asyncHandler(async (req, res) => {
  const data = await Conflict.find({
    Status: "Ongoing",
    isDeleted: { $ne: true },
  })
    .sort({ "Inflation_Rate_%": -1 })
    .limit(10);
  sendSuccess(res, 200, "Trending conflicts", data);
});

/** @route GET /conflicts/ongoing */
const getOngoing = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
  const skip = (page - 1) * limit;
  const filter = { Status: "Ongoing", isDeleted: { $ne: true } };

  const [data, total] = await Promise.all([
    Conflict.find(filter).sort({ Start_Year: -1 }).skip(skip).limit(limit),
    Conflict.countDocuments(filter),
  ]);

  sendSuccess(res, 200, "Ongoing conflicts", data, {
    page, limit, total,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page < Math.ceil(total / limit),
    hasPrevPage: page > 1,
  });
});

/** @route GET /conflicts/resolved */
const getResolved = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
  const skip = (page - 1) * limit;
  const filter = { Status: "Resolved", isDeleted: { $ne: true } };

  const [data, total] = await Promise.all([
    Conflict.find(filter).sort({ Start_Year: -1 }).skip(skip).limit(limit),
    Conflict.countDocuments(filter),
  ]);

  sendSuccess(res, 200, "Resolved conflicts", data, {
    page, limit, total,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page < Math.ceil(total / limit),
    hasPrevPage: page > 1,
  });
});

/** @route GET /conflicts/high-risk — high inflation + high poverty */
const getHighRisk = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
  const skip = (page - 1) * limit;
  const filter = {
    $or: [
      { "Inflation_Rate_%": { $gt: 50 } },
      { "Poverty_Rate_%": { $gt: 40 } },
    ],
    isDeleted: { $ne: true },
  };

  const [data, total] = await Promise.all([
    Conflict.find(filter).sort({ "Inflation_Rate_%": -1 }).skip(skip).limit(limit),
    Conflict.countDocuments(filter),
  ]);

  sendSuccess(res, 200, "High risk conflicts", data, {
    page, limit, total,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page < Math.ceil(total / limit),
    hasPrevPage: page > 1,
  });
});

/** @route GET /conflicts/economic-collapse — GDP loss > 30% */
const getEconomicCollapse = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
  const skip = (page - 1) * limit;
  const filter = { "GDP_Change_%": { $lt: -30 }, isDeleted: { $ne: true } };

  const [data, total] = await Promise.all([
    Conflict.find(filter).sort({ "GDP_Change_%": 1 }).skip(skip).limit(limit),
    Conflict.countDocuments(filter),
  ]);

  sendSuccess(res, 200, "Economic collapse conflicts", data, {
    page, limit, total,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page < Math.ceil(total / limit),
    hasPrevPage: page > 1,
  });
});

/** @route GET /compare?conflict1=X&conflict2=Y */
const compareConflicts = asyncHandler(async (req, res) => {
  const { conflict1, conflict2 } = req.query;
  if (!conflict1 || !conflict2) {
    throw new AppError("Both conflict1 and conflict2 query params are required", 400);
  }
  const result = await conflictService.compareConflicts(conflict1, conflict2);
  sendSuccess(res, 200, "Conflict comparison", result);
});

/** @route GET /conflicts/summary/ai — aggregated summary of all conflicts */
const getAiSummary = asyncHandler(async (req, res) => {
  const stats = await Conflict.aggregate([
    { $match: { isDeleted: { $ne: true } } },
    {
      $group: {
        _id: null,
        totalConflicts: { $sum: 1 },
        avgGdpChange: { $avg: "$GDP_Change_%" },
        avgInflation: { $avg: "$Inflation_Rate_%" },
        avgPoverty: { $avg: "$Poverty_Rate_%" },
        totalWarCost: { $sum: "$Cost_of_War_USD" },
        totalReconstructionCost: { $sum: "$Estimated_Reconstruction_Cost_USD" },
        totalHouseholdsAffected: { $sum: "$Households_Affected" },
        maxInflation: { $max: "$Inflation_Rate_%" },
        minGdp: { $min: "$GDP_Change_%" },
        maxPoverty: { $max: "$Poverty_Rate_%" },
      },
    },
  ]);

  const regionBreakdown = await Conflict.aggregate([
    { $match: { isDeleted: { $ne: true } } },
    {
      $group: {
        _id: "$Region",
        count: { $sum: 1 },
        avgGdpChange: { $avg: "$GDP_Change_%" },
        avgInflation: { $avg: "$Inflation_Rate_%" },
      },
    },
    { $sort: { count: -1 } },
  ]);

  sendSuccess(res, 200, "AI-generated conflict summary", {
    overview: stats[0] || {},
    regionBreakdown,
  });
});

// ============================================================
// HEAD & OPTIONS HANDLERS
// ============================================================

/** @route HEAD /conflicts */
const headConflicts = asyncHandler(async (req, res) => {
  const count = await Conflict.countDocuments({ isDeleted: { $ne: true } });
  res.set("X-Total-Count", count.toString());
  res.set("X-Resource", "conflicts");
  res.sendStatus(200);
});

/** @route HEAD /conflicts/:conflictId */
const headConflictById = asyncHandler(async (req, res) => {
  const exists = await Conflict.exists({
    _id: req.params.conflictId,
    isDeleted: { $ne: true },
  });
  res.sendStatus(exists ? 200 : 404);
});

/** @route OPTIONS /conflicts */
const optionsConflicts = (req, res) => {
  res.set("Allow", "GET, POST, HEAD, OPTIONS");
  res.sendStatus(204);
};

/** @route OPTIONS /conflicts/:conflictId */
const optionsConflictById = (req, res) => {
  res.set("Allow", "GET, PUT, PATCH, DELETE, HEAD, OPTIONS");
  res.sendStatus(204);
};

module.exports = {
  // CRUD
  getAllConflicts,
  getConflictById,
  createConflict,
  replaceConflict,
  updateConflict,
  deleteConflict,
  // Route Params
  getByName,
  getByType,
  getByRegion,
  getByStatus,
  getByCountry,
  getByStartYear,
  getByEndYear,
  getByInflation,
  getByGdpLoss,
  getByPoverty,
  getByExtremePoverty,
  getByFoodInsecurity,
  getByUnemployment,
  getByYouthUnemployment,
  getBySector,
  getByBlackMarketLevel,
  getByBlackMarketGoods,
  getByProfiteering,
  getByCurrencyGap,
  getByReconstructionCost,
  getByCostOfWar,
  getByPreWarInformalEconomy,
  getByDuringWarInformalEconomy,
  getByHouseholds,
  // Composite
  getLatestInRegion,
  getOldestInRegion,
  getCountryHistory,
  getCountByType,
  getCountByStatus,
  getByActiveYear,
  getHighestGdpLossInSector,
  getHighestInflationInSector,
  // War-specific
  getWarSummary,
  getWarEconomicImpact,
  getWarPovertyImpact,
  getWarBlackMarket,
  getWarReconstruction,
  getWarCurrencyCrisis,
  getWarUnemployment,
  // Partial updates
  updateStatus,
  updateInflation,
  updateGdp,
  updatePoverty,
  updateUnemployment,
  updateSector,
  // Advanced
  getTopHighestInflation,
  getTopHighestPoverty,
  getRecent,
  getLatest,
  getRandom,
  getTrending,
  getOngoing,
  getResolved,
  getHighRisk,
  getEconomicCollapse,
  compareConflicts,
  getAiSummary,
  // HEAD & OPTIONS
  headConflicts,
  headConflictById,
  optionsConflicts,
  optionsConflictById,
};
