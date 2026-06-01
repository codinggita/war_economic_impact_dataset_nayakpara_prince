const mongoose = require("mongoose");

const conflictSchema = new mongoose.Schema(
  {
    Conflict_Name: {
      type: String,
      required: [true, "Conflict name is required"],
      trim: true,
    },
    Conflict_Type: {
      type: String,
      required: [true, "Conflict type is required"],
      trim: true,
      // e.g. Civil War, World War, Interstate, Proxy War, etc.
    },
    Country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    Region: {
      type: String,
      required: [true, "Region is required"],
      trim: true,
      // e.g. Europe, Middle East, Asia, Africa, Americas
    },
    Start_Year: {
      type: Number,
      required: [true, "Start year is required"],
    },
    End_Year: {
      type: Number,
      default: null, // null = Ongoing
    },
    Status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["Ongoing", "Resolved"],
    },

    // Economic Impact
    "GDP_Change_%": {
      type: Number,
      default: null,
    },
    "Inflation_Rate_%": {
      type: Number,
      default: null,
    },

    // Poverty Indicators
    "Poverty_Rate_%": {
      type: Number,
      default: null,
    },
    "Extreme_Poverty_Rate_%": {
      type: Number,
      default: null,
    },
    "Food_Insecurity_Rate_%": {
      type: Number,
      default: null,
    },

    // Unemployment
    "Pre_War_Unemployment_%": {
      type: Number,
      default: null,
    },
    "During_War_Unemployment_%": {
      type: Number,
      default: null,
    },
    "Youth_Unemployment_%": {
      type: Number,
      default: null,
    },

    // Sector
    Affected_Sector: {
      type: String,
      trim: true,
      default: null,
      // e.g. Agriculture, Manufacturing, Energy, Services
    },

    // Black Market
    Black_Market_Level: {
      type: String,
      enum: ["Low", "Medium", "High", null],
      default: null,
    },
    Black_Market_Goods: {
      type: String,
      trim: true,
      default: null,
      // e.g. fuel, weapons, food, medicine
    },
    Profiteering: {
      type: String,
      enum: ["Yes", "No", null],
      default: null,
    },

    // Currency
    "Currency_Devaluation_%": {
      type: Number,
      default: null,
    },
    "Currency_Black_Market_Rate_Gap_%": {
      type: Number,
      default: null,
    },

    // Cost & Reconstruction
    Estimated_Reconstruction_Cost_USD: {
      type: Number,
      default: null,
    },
    Cost_of_War_USD: {
      type: Number,
      default: null,
    },

    // Informal Economy
    "Pre_War_Informal_Economy_%": {
      type: Number,
      default: null,
    },
    "During_War_Informal_Economy_%": {
      type: Number,
      default: null,
    },

    // Households
    Households_Affected:{
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
    // Allow dot-notation field names with special chars
    strict: false,
  }
);

// Indexes for frequent query fields
conflictSchema.index({ Conflict_Name: 1 });
conflictSchema.index({ Country: 1 });
conflictSchema.index({ Region: 1 });
conflictSchema.index({ Status: 1 });
conflictSchema.index({ Conflict_Type: 1 });
conflictSchema.index({ Start_Year: 1 });
conflictSchema.index({ End_Year: 1 });

const Conflict = mongoose.model("Conflict", conflictSchema);

module.exports = Conflict;