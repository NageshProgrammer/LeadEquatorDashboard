const LeadPipeline = require("../models/leadPipeline");

// GET all leads
exports.getLeadsPipeline = async (req, res) => {
  try {
    const leads = await LeadPipeline.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE lead (future automation / ingestion)
exports.createLead = async (req, res) => {
  try {
    const lead = await LeadPipeline.create(req.body);
    res.status(201).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
