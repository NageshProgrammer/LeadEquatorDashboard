const mongoose = require("mongoose");

const leadPipelineSchema = new mongoose.Schema(
  {
    leadId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    intent: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "Qualified",
        "Demo Scheduled",
        "Negotiating",
        "Closed Won",
        "Closed Lost",
      ],
      default: "New",
    },
    value: {
      type: Number, // store as number (USD)
      required: true,
    },
    source: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "LeadPipeline",
  leadPipelineSchema,
  "lead_pipeline" // 👈 collection name
);
