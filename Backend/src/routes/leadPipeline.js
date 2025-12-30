const express = require("express");
const router = express.Router();

const {
  getLeadsPipeline,
  createLead,
} = require("../controllers/leadPipeline");

// GET pipeline
router.get("/", getLeadsPipeline);

// POST new lead (optional)
router.post("/", createLead);

module.exports = router;
