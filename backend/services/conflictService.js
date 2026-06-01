const Conflict = require("../models/Conflict");
const { AppError } = require("../utils/errorHandler");

/**
 * Conflict Service — Business Logic Layer
 * Handles all database operations for conflicts.
 * Controllers should call these methods instead of querying the DB directly.
 */

/**
 * Build a dynamic MongoDB filter object from query parameters
 */
const buildFilter = (query) => {
  const filter = {};

  // Exact match filters
  if (query.status) filter.Status = query.status;
  if (query.region) filter.Region = new RegExp(query.region, "i");
  if (query.country) filter.Country = new RegExp(query.country, "i");
  if (query.type) filter.Conflict_Type = new RegExp(query.type, "i");
  if (query.sector) filter.Affected_Sector = new RegExp(query.sector, "i");
  if (query.blackMarket) filter.Black_Market_Level = query.blackMarket;
  if (query.profiteering) filter.Profiteering = query.profiteering;

  // Year filters
  if (query.year) {
    const year = parseInt(query.year);
    filter.Start_Year = { $lte: year };
    filter.$or = [{ End_Year: { $gte: year } }, { End_Year: null }];
  }
  if (query.startYear) filter.Start_Year = parseInt(query.startYear);
  if (query.endYear) filter.End_Year = parseInt(query.endYear);

  // Range filters — Above/Below
  if (query.inflationAbove) {
    filter["Inflation_Rate_%"] = {
      ...filter["Inflation_Rate_%"],
      $gt: parseFloat(query.inflationAbove),
    };
  }
  if (query.inflationBelow) {
    filter["Inflation_Rate_%"] = {
      ...filter["Inflation_Rate_%"],
      $lt: parseFloat(query.inflationBelow),
    };
  }
  if (query.gdpLossAbove) {
    // GDP change is negative for losses, so "loss above 30" means GDP_Change < -30
    filter["GDP_Change_%"] = { $lt: -Math.abs(parseFloat(query.gdpLossAbove)) };
  }
  if (query.povertyAbove) {
    filter["Poverty_Rate_%"] = { $gt: parseFloat(query.povertyAbove) };
  }
  if (query.foodInsecurityAbove) {
    filter["Food_Insecurity_Rate_%"] = {
      $gt: parseFloat(query.foodInsecurityAbove),
    };
  }
  if (query.currencyGapAbove) {
    filter["Currency_Black_Market_Rate_Gap_%"] = {
      $gt: parseFloat(query.currencyGapAbove),
    };
  }
  if (query.warCostAbove) {
    filter.Cost_of_War_USD = { $gt: parseFloat(query.warCostAbove) };
  }
  if (query.reconstructionAbove) {
    filter.Estimated_Reconstruction_Cost_USD = {
      $gt: parseFloat(query.reconstructionAbove),
    };
  }

  // Min/Max range filters
  if (query.minInflation || query.maxInflation) {
    filter["Inflation_Rate_%"] = filter["Inflation_Rate_%"] || {};
    if (query.minInflation)
      filter["Inflation_Rate_%"].$gte = parseFloat(query.minInflation);
    if (query.maxInflation)
      filter["Inflation_Rate_%"].$lte = parseFloat(query.maxInflation);
  }
  if (query.minGDP || query.maxGDP) {
    filter["GDP_Change_%"] = filter["GDP_Change_%"] || {};
    if (query.minGDP)
      filter["GDP_Change_%"].$gte = parseFloat(query.minGDP);
    if (query.maxGDP)
      filter["GDP_Change_%"].$lte = parseFloat(query.maxGDP);
  }
  if (query.minPoverty || query.maxPoverty) {
    filter["Poverty_Rate_%"] = filter["Poverty_Rate_%"] || {};
    if (query.minPoverty)
      filter["Poverty_Rate_%"].$gte = parseFloat(query.minPoverty);
    if (query.maxPoverty)
      filter["Poverty_Rate_%"].$lte = parseFloat(query.maxPoverty);
  }
  if (query.minUnemployment || query.maxUnemployment) {
    filter["During_War_Unemployment_%"] =
      filter["During_War_Unemployment_%"] || {};
    if (query.minUnemployment)
      filter["During_War_Unemployment_%"].$gte = parseFloat(
        query.minUnemployment
      );
    if (query.maxUnemployment)
      filter["During_War_Unemployment_%"].$lte = parseFloat(
        query.maxUnemployment
      );
  }

  // Keyword search (across multiple text fields)
  if (query.keyword) {
    const keyword = query.keyword;
    const keywordRegex = new RegExp(keyword, "i");
    // Override any existing $or for keyword search
    filter.$or = [
      { Conflict_Name: keywordRegex },
      { Conflict_Type: keywordRegex },
      { Country: keywordRegex },
      { Region: keywordRegex },
      { Affected_Sector: keywordRegex },
      { Black_Market_Goods: keywordRegex },
    ];
  }

  // Soft delete: exclude deleted records
  filter.isDeleted = { $ne: true };

  return filter;
};

/**
 * Build sort object from query string
 * Supports: ?sort=field (ascending) or ?sort=-field (descending)
 */
const buildSort = (sortStr) => {
  if (!sortStr) return { createdAt: -1 }; // default: newest first

  const sortObj = {};
  const fields = sortStr.split(",");

  fields.forEach((field) => {
    if (field.startsWith("-")) {
      sortObj[field.substring(1)] = -1;
    } else {
      sortObj[field] = 1;
    }
  });

  return sortObj;
};

/**
 * Get all conflicts with filtering, sorting, pagination
 */
const getAllConflicts = async (query) => {
  const filter = buildFilter(query);
  const sort = buildSort(query.sort);

  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
  const skip = (page - 1) * limit;

  const [conflicts, total] = await Promise.all([
    Conflict.find(filter).sort(sort).skip(skip).limit(limit),
    Conflict.countDocuments(filter),
  ]);

  return {
    conflicts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
};

/**
 * Get a single conflict by ID
 */
const getConflictById = async (id) => {
  const conflict = await Conflict.findOne({ _id: id, isDeleted: { $ne: true } });
  if (!conflict) throw new AppError("Conflict not found", 404);
  return conflict;
};

/**
 * Create a new conflict
 */
const createConflict = async (data) => {
  const conflict = await Conflict.create(data);
  return conflict;
};

/**
 * Replace (PUT) a conflict entirely
 */
const replaceConflict = async (id, data) => {
  const conflict = await Conflict.findOneAndReplace(
    { _id: id, isDeleted: { $ne: true } },
    data,
    { new: true, runValidators: true }
  );
  if (!conflict) throw new AppError("Conflict not found", 404);
  return conflict;
};

/**
 * Partially update (PATCH) a conflict
 */
const updateConflict = async (id, data) => {
  const conflict = await Conflict.findOneAndUpdate(
    { _id: id, isDeleted: { $ne: true } },
    data,
    { new: true, runValidators: true }
  );
  if (!conflict) throw new AppError("Conflict not found", 404);
  return conflict;
};

/**
 * Soft delete a conflict
 */
const deleteConflict = async (id) => {
  const conflict = await Conflict.findOneAndUpdate(
    { _id: id, isDeleted: { $ne: true } },
    { isDeleted: true },
    { new: true }
  );
  if (!conflict) throw new AppError("Conflict not found", 404);
  return conflict;
};

/**
 * Find conflicts by a field value (for route params)
 */
const findByField = async (fieldName, value, query = {}) => {
  const filter = { isDeleted: { $ne: true } };

  // Handle numeric comparisons
  const numericValue = parseFloat(value);
  if (!isNaN(numericValue) && typeof numericValue === "number") {
    filter[fieldName] = numericValue;
  } else {
    filter[fieldName] = new RegExp(value, "i");
  }

  const sort = buildSort(query.sort);
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Conflict.find(filter).sort(sort).skip(skip).limit(limit),
    Conflict.countDocuments(filter),
  ]);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
};

/**
 * Find conflicts above a numeric threshold
 */
const findAboveThreshold = async (fieldName, value, query = {}) => {
  const filter = {
    [fieldName]: { $gt: parseFloat(value) },
    isDeleted: { $ne: true },
  };

  const sort = buildSort(query.sort || `-${fieldName}`);
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Conflict.find(filter).sort(sort).skip(skip).limit(limit),
    Conflict.countDocuments(filter),
  ]);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
};

/**
 * Compare two conflicts
 */
const compareConflicts = async (name1, name2) => {
  const [conflict1, conflict2] = await Promise.all([
    Conflict.findOne({
      Conflict_Name: new RegExp(name1, "i"),
      isDeleted: { $ne: true },
    }),
    Conflict.findOne({
      Conflict_Name: new RegExp(name2, "i"),
      isDeleted: { $ne: true },
    }),
  ]);

  if (!conflict1) throw new AppError(`Conflict "${name1}" not found`, 404);
  if (!conflict2) throw new AppError(`Conflict "${name2}" not found`, 404);

  return { conflict1, conflict2 };
};

module.exports = {
  buildFilter,
  buildSort,
  getAllConflicts,
  getConflictById,
  createConflict,
  replaceConflict,
  updateConflict,
  deleteConflict,
  findByField,
  findAboveThreshold,
  compareConflicts,
};
