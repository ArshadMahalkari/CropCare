const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Smart Crop Advisory Backend Running");
});

/**
 * POST /api/advisory
 * body: { crop, soil, language }
 */
app.post("/api/advisory", (req, res) => {
  const { crop, soil, language } = req.body;

  return res.json({
    crop,
    soil,
    language,
    advice: "Dummy advisory: Apply fertilizer after 15 days",
  });
});

/**
 * POST /api/chat
 * body: { message, language }
 */
app.post("/api/chat", (req, res) => {
  const { message, language } = req.body;

  return res.json({
    reply: "Dummy reply from AI advisor",
    language,
  });
});

/**
 * POST /api/pest-detect
 * form-data: image
 */
app.post("/api/pest-detect", (req, res) => {
  return res.json({
    disease: "Dummy disease",
    solution: "Dummy solution",
  });
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
