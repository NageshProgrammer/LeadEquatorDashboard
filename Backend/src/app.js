const express = require("express");
const cors = require("cors");

const contactRoutes = require("./routes/contact");
const leadPipelineRoutes = require("./routes/leadPipeline");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contact", contactRoutes);
app.use("/api/lead-pipeline", leadPipelineRoutes);

module.exports = app;
