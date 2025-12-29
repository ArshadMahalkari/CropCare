require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { spawnSync } = require("child_process");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// Python launcher (Windows-safe)
const PYTHON_PATH = process.env.PYTHON_PATH;

// ---------------- HELPER FUNCTION ----------------
// Translation is OPTIONAL, fallback-safe
async function translateAdvice(text, language) {
  if (!language || language === "EN") return text;

  const targetLang = language === "MR" ? "mr" : "hi";

  try {
    const response = await axios.post(
      "https://translate.argosopentech.com/translate",
      {
        q: text,
        source: "en",
        target: targetLang,
        format: "text",
      },
      { timeout: 2000 }
    );

    if (
      response.data &&
      response.data.translatedText &&
      response.data.translatedText !== text
    ) {
      return response.data.translatedText;
    }

    return text;
  } catch {
    return text;
  }
}

// ---------------- ROUTES ----------------

app.get("/", (req, res) => {
  res.send("Smart Crop Advisory Backend Running");
});

/**
 * POST /api/advisory
 * body: { crop, soil, language }
 */
app.post("/api/advisory", (req, res) => {
  console.log("Advisory API hit:", req.body);

  const { crop, soil } = req.body;

  try {
    const result = spawnSync(
      "../venv/Scripts/python.exe",
      ["../ai/advisory_logic.py", crop, soil],
      {
        encoding: "utf-8",
      }
    );

    if (result.error) {
      console.error("Spawn error:", result.error);
      return res.json({
        advice:
          "Fallback advisory: Follow standard agricultural practices for your crop.",
      });
    }

    const output = result.stdout?.trim();

    if (!output) {
      console.error("No Python output");
      return res.json({
        advice:
          "Fallback advisory: Follow standard agricultural practices for your crop.",
      });
    }

    return res.json({ advice: output });
  } catch (err) {
    console.error("Execution error:", err);
    return res.json({
      advice:
        "Fallback advisory: Follow standard agricultural practices for your crop.",
    });
  }
});



/**
 * POST /api/pest-detect
 * body: { crop }
 */
app.post("/api/pest-detect", (req, res) => {
  const { crop } = req.body;

  PythonShell.run(
    "pest_detection.py",
    {
      pythonPath: PYTHON_PATH,
      pythonOptions: ["-3.10"],
      scriptPath: path.join(__dirname, "../ai"),
      args: [crop],
    },
    (err, results) => {
      if (err || !results) {
        return res.json({
          disease: "Unknown",
          solution: "Consult agricultural expert.",
        });
      }

      return res.json(JSON.parse(results[0]));
    }
  );
});

// ---------------- SERVER ----------------
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
