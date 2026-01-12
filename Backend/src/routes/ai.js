import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/predict", async (req, res) => {
  try {
    const response = await axios.post(
      process.env.AI_ENGINE_URL,
      req.body
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "AI service error" });
  }
});

export default router;
