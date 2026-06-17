const Conflict = require("../models/Conflict");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");

/**
 * Search Controller — Keyword & Field-Based Search
 * All search endpoints use regex for case-insensitive matching
 */

/** @route GET /search?keyword=Japan */
const searchByKeyword = asyncHandler(async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return sendSuccess(res, 200, "Please provide a keyword to search", []);
  }

  const regex = new RegExp(keyword, "i");

  const data = await Conflict.find({
    $or: [
      { Conflict_Name: regex },
      { Conflict_Type: regex },
      { Primary_Country: regex },
      { Region: regex },
      { Most_Affected_Sector: regex },
      { Primary_Black_Market_Goods: regex },
      { Status: regex },
    ],
    isDeleted: { $ne: true },
  }).sort({ Start_Year: -1 });

  sendSuccess(res, 200, `Search results for "${keyword}"`, data);
});

/** @route GET /search/conflicts?country=Germany */
/** @route GET /search/conflicts?region=Africa */
/** @route GET /search/conflicts?type=Civil War */
/** @route GET /search/conflicts?status=Resolved */
const searchConflicts = asyncHandler(async (req, res) => {
  const { country, region, type, status } = req.query;
  const filter = { isDeleted: { $ne: true } };

  if (country) filter.Primary_Country = new RegExp(country, "i");
  if (region) filter.Region = new RegExp(region, "i");
  if (type) filter.Conflict_Type = new RegExp(type, "i");
  if (status) filter.Status = status;

  const data = await Conflict.find(filter).sort({ Start_Year: -1 });
  sendSuccess(res, 200, "Conflict search results", data);
});

/** @route GET /search/economic?inflation=100 */
/** @route GET /search/economic?poverty=30 */
/** @route GET /search/economic?gdp=-40 */
/** @route GET /search/economic?currency=50 */
const searchEconomic = asyncHandler(async (req, res) => {
  const { inflation, poverty, gdp, currency } = req.query;
  const filter = { isDeleted: { $ne: true } };

  if (inflation) {
    filter["Inflation_Rate_%"] = { $gte: parseFloat(inflation) };
  }
  if (poverty) {
    filter["During_War_Poverty_Rate_%"] = { $gte: parseFloat(poverty) };
  }
  if (gdp) {
    filter["GDP_Change_%"] = { $lte: parseFloat(gdp) };
  }
  if (currency) {
    filter["Currency_Devaluation_%"] = { $gte: parseFloat(currency) };
  }

  const data = await Conflict.find(filter).sort({ "Inflation_Rate_%": -1 });
  sendSuccess(res, 200, "Economic search results", data);
});

/** @route GET /search/sector?name=Agriculture */
const searchBySector = asyncHandler(async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return sendSuccess(res, 200, "Please provide a sector name", []);
  }

  const data = await Conflict.find({
    Most_Affected_Sector: new RegExp(name, "i"),
    isDeleted: { $ne: true },
  }).sort({ "GDP_Change_%": 1 });

  sendSuccess(res, 200, `Conflicts affecting ${name} sector`, data);
});

/** @route GET /search/black-market?goods=fuel */
/** @route GET /search/black-market?goods=weapons */
const searchBlackMarket = asyncHandler(async (req, res) => {
  const { goods } = req.query;

  if (!goods) {
    return sendSuccess(res, 200, "Please provide black market goods to search", []);
  }

  const data = await Conflict.find({
    Primary_Black_Market_Goods: new RegExp(goods, "i"),
    isDeleted: { $ne: true },
  }).sort({ "Currency_Black_Market_Rate_Gap_%": -1 });

  sendSuccess(res, 200, `Black market search results for "${goods}"`, data);
});

/** OPTIONS /search */
const optionsSearch = (req, res) => {
  res.set("Allow", "GET, OPTIONS");
  res.sendStatus(204);
};

module.exports = {
  searchByKeyword,
  searchConflicts,
  searchEconomic,
  searchBySector,
  searchBlackMarket,
  optionsSearch,
};
