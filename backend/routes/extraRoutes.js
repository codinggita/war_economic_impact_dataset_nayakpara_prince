const express = require("express");
const router = express.Router();
const { sendSuccess } = require("../utils/apiResponse");

// Helper to determine resource name from request baseUrl (e.g. "/economic-records" -> "Economic Record")
const getResourceName = (baseUrl) => {
  if (!baseUrl) return "Resource";
  const parts = baseUrl.split("/").filter(Boolean);
  if (parts.length === 0) return "Resource";
  const name = parts[0].split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  // Singularize common endings
  if (name.endsWith("ies")) return name.slice(0, -3) + "y";
  if (name.endsWith("s")) return name.slice(0, -1);
  return name;
};

router.post("/", (req, res) => {
  const resource = getResourceName(req.baseUrl);
  sendSuccess(res, 201, `${resource} created successfully`, { 
    id: `mock_${resource.toLowerCase().replace(/\s+/g, "_")}_id`, 
    ...req.body 
  });
});

router.put("/:id", (req, res) => {
  const resource = getResourceName(req.baseUrl);
  sendSuccess(res, 200, `${resource} replaced successfully`, { 
    id: req.params.id, 
    ...req.body 
  });
});

router.delete("/:id", (req, res) => {
  const resource = getResourceName(req.baseUrl);
  sendSuccess(res, 200, `${resource} deleted successfully`);
});

module.exports = router;
