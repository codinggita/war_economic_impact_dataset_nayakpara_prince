const { AppError } = require("../utils/errorHandler");

/**
 * Validate Conflict Request Body
 * Validates required fields and data types for creating/updating a conflict
 * matching the google drive dataset fields.
 */
const validateConflict = (req, res, next) => {
  const errors = [];
  const body = req.body;

  // Required fields for POST (create)
  if (req.method === "POST") {
    if (!body.Conflict_Name || typeof body.Conflict_Name !== "string" || !body.Conflict_Name.trim()) {
      errors.push("Conflict_Name is required and must be a non-empty string");
    }
    if (!body.Conflict_Type || typeof body.Conflict_Type !== "string" || !body.Conflict_Type.trim()) {
      errors.push("Conflict_Type is required and must be a non-empty string");
    }
    if (!body.Primary_Country || typeof body.Primary_Country !== "string" || !body.Primary_Country.trim()) {
      errors.push("Primary_Country is required and must be a non-empty string");
    }
    if (!body.Region || typeof body.Region !== "string" || !body.Region.trim()) {
      errors.push("Region is required and must be a non-empty string");
    }
    if (body.Start_Year === undefined || body.Start_Year === null) {
      errors.push("Start_Year is required");
    }
    if (!body.Status) {
      errors.push("Status is required");
    }
  }

  // Type validations (for both POST and PATCH)
  if (body.Start_Year !== undefined && body.Start_Year !== null) {
    const year = Number(body.Start_Year);
    if (isNaN(year) || year < 1000 || year > new Date().getFullYear() + 1) {
      errors.push("Start_Year must be a valid 4-digit year");
    }
  }

  if (body.End_Year !== undefined && body.End_Year !== null) {
    const endYear = Number(body.End_Year);
    if (isNaN(endYear) || endYear < 1000) {
      errors.push("End_Year must be a valid 4-digit year");
    }
    if (body.Start_Year && endYear < Number(body.Start_Year)) {
      errors.push("End_Year must be greater than or equal to Start_Year");
    }
  }

  if (body.Status !== undefined && body.Status !== null) {
    if (!["Ongoing", "Resolved"].includes(body.Status)) {
      errors.push('Status must be either "Ongoing" or "Resolved"');
    }
  }

  // Numeric field validations
  const numericFields = [
    "GDP_Change_%",
    "Inflation_Rate_%",
    "Pre_War_Poverty_Rate_%",
    "During_War_Poverty_Rate_%",
    "Extreme_Poverty_Rate_%",
    "Food_Insecurity_Rate_%",
    "Pre_War_Unemployment_%",
    "During_War_Unemployment_%",
    "Unemployment_Spike_Percentage_Points",
    "Youth_Unemployment_Change_%",
    "Currency_Devaluation_%",
    "Currency_Black_Market_Rate_Gap_%",
    "Estimated_Reconstruction_Cost_USD",
    "Cost_of_War_USD",
    "Informal_Economy_Size_Pre_War_%",
    "Informal_Economy_Size_During_War_%",
    "Households_Fallen_Into_Poverty_Estimate",
  ];

  numericFields.forEach((field) => {
    if (body[field] !== undefined && body[field] !== null) {
      if (typeof body[field] !== "number" && isNaN(Number(body[field]))) {
        errors.push(`${field} must be a valid number`);
      }
    }
  });

  // Percentage fields should be 0-100 (except GDP_Change which can be negative)
  const percentageFields = [
    "Pre_War_Poverty_Rate_%",
    "During_War_Poverty_Rate_%",
    "Extreme_Poverty_Rate_%",
    "Food_Insecurity_Rate_%",
    "Pre_War_Unemployment_%",
    "During_War_Unemployment_%",
    "Youth_Unemployment_Change_%",
    "Currency_Devaluation_%",
    "Currency_Black_Market_Rate_Gap_%",
    "Informal_Economy_Size_Pre_War_%",
    "Informal_Economy_Size_During_War_%",
  ];

  percentageFields.forEach((field) => {
    if (body[field] !== undefined && body[field] !== null) {
      const val = Number(body[field]);
      if (!isNaN(val) && (val < 0 || val > 100)) {
        errors.push(`${field} must be between 0 and 100`);
      }
    }
  });

  // Inflation rate should be >= 0
  if (body["Inflation_Rate_%"] !== undefined && body["Inflation_Rate_%"] !== null) {
    const val = Number(body["Inflation_Rate_%"]);
    if (!isNaN(val) && val < 0) {
      errors.push("Inflation_Rate_% must be >= 0");
    }
  }

  // Enum validations for Black Market Activity Level
  if (body.Black_Market_Activity_Level !== undefined && body.Black_Market_Activity_Level !== null) {
    if (!["Low", "Moderate", "High", "Dominant"].includes(body.Black_Market_Activity_Level)) {
      errors.push('Black_Market_Activity_Level must be "Low", "Moderate", "High", or "Dominant"');
    }
  }

  // Enum validations for War Profiteering Documented
  if (body.War_Profiteering_Documented !== undefined && body.War_Profiteering_Documented !== null) {
    if (!["Yes", "No"].includes(body.War_Profiteering_Documented)) {
      errors.push('War_Profiteering_Documented must be "Yes" or "No"');
    }
  }

  if (errors.length > 0) {
    return next(new AppError(`Validation Error: ${errors.join(". ")}`, 400));
  }

  next();
};

/**
 * Validate User Registration Body
 */
const validateRegister = (req, res, next) => {
  const errors = [];
  const { name, email, password } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    errors.push("Name is required");
  } else if (name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (!email || typeof email !== "string") {
    errors.push("Email is required");
  } else {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      errors.push("Please provide a valid email");
    }
  }

  if (!password || typeof password !== "string") {
    errors.push("Password is required");
  } else if (password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }

  if (errors.length > 0) {
    return next(new AppError(`Validation Error: ${errors.join(". ")}`, 400));
  }

  next();
};

/**
 * Validate User Login Body
 */
const validateLogin = (req, res, next) => {
  const errors = [];
  const { email, password } = req.body;

  if (!email || typeof email !== "string") {
    errors.push("Email is required");
  }

  if (!password || typeof password !== "string") {
    errors.push("Password is required");
  }

  if (errors.length > 0) {
    return next(new AppError(`Validation Error: ${errors.join(". ")}`, 400));
  }

  next();
};

module.exports = { validateConflict, validateRegister, validateLogin };
