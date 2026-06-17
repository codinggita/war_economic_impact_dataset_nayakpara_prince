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
    },
    Region: {
      type: String,
      required: [true, "Region is required"],
      trim: true,
    },
    Start_Year: {
      type: Number,
      required: [true, "Start year is required"],
    },
    End_Year: {
      type: Number,
      default: null,
    },
    Status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["Ongoing", "Resolved"],
    },
    Primary_Country: {
      type: String,
      required: [true, "Primary country is required"],
      trim: true,
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
    Unemployment_Spike_Percentage_Points: {
      type: Number,
      default: null,
    },
    Most_Affected_Sector: {
      type: String,
      trim: true,
      default: null,
    },
    "Youth_Unemployment_Change_%": {
      type: Number,
      default: null,
    },

    // Poverty Indicators
    "Pre_War_Poverty_Rate_%": {
      type: Number,
      default: null,
    },
    "During_War_Poverty_Rate_%": {
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
    Households_Fallen_Into_Poverty_Estimate: {
      type: Number,
      default: null,
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
    "Currency_Devaluation_%": {
      type: Number,
      default: null,
    },

    // Cost & Reconstruction
    Cost_of_War_USD: {
      type: Number,
      default: null,
    },
    Estimated_Reconstruction_Cost_USD: {
      type: Number,
      default: null,
    },

    // Informal Economy
    "Informal_Economy_Size_Pre_War_%": {
      type: Number,
      default: null,
    },
    "Informal_Economy_Size_During_War_%": {
      type: Number,
      default: null,
    },

    // Black Market
    Black_Market_Activity_Level: {
      type: String,
      enum: ["Low", "Moderate", "High", "Dominant", null],
      default: null,
    },
    Primary_Black_Market_Goods: {
      type: String,
      trim: true,
      default: null,
    },
    "Currency_Black_Market_Rate_Gap_%": {
      type: Number,
      default: null,
    },
    War_Profiteering_Documented: {
      type: String,
      enum: ["Yes", "No", null],
      default: null,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

// Indexes for frequent query fields
conflictSchema.index({ Conflict_Name: 1 });
conflictSchema.index({ Primary_Country: 1 });
conflictSchema.index({ Region: 1 });
conflictSchema.index({ Status: 1 });
conflictSchema.index({ Conflict_Type: 1 });
conflictSchema.index({ Start_Year: 1 });
conflictSchema.index({ End_Year: 1 });

const Conflict = mongoose.model("Conflict", conflictSchema);

module.exports = Conflict;