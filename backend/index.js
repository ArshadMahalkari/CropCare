require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { spawnSync } = require("child_process");
const axios = require("axios");
const { PythonShell } = require("python-shell");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
let mongoConnected = false;
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/cropcare", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    mongoConnected = true;
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    console.error("⚠️  Authentication features will not work without MongoDB");
    console.error("💡 To fix: Start MongoDB or set MONGO_URI environment variable");
    mongoConnected = false;
  });

// Export connection status helper
app.locals.mongoConnected = () => mongoConnected;

// Register auth routes (see ./routes/auth.js)
const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

// Advisory routes (save/history)
const advisoryRouter = require("./routes/advisory");
app.use("/api/advisory", advisoryRouter);

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
app.post("/api/advisory", async (req, res) => {
  console.log("Advisory API hit:", req.body);
  const { crop, soil, language } = req.body;

  try {
    const aiUrl = process.env.AI_URL || "http://localhost:8000";
    const response = await axios.post(`${aiUrl}/infer/advisory`, { crop, soil, language }, { timeout: 10000 });
    const data = response.data || {};

    // optional translation (preserve original if translation fails)
    if (language && language !== "EN" && data?.advice) {
      data.advice = await translateAdvice(data.advice, language);
    }

    return res.json(data);
  } catch (err) {
    console.error("AI service error:", err?.message || err);
    return res.status(502).json({
      advice: "Fallback advisory: Follow standard agricultural practices for your crop.",
      error: "AI service unavailable",
    });
  }
});



/**
 * POST /api/pest-detect
 * body: { crop }
 */
app.post("/api/pest-detect", (req, res) => {
  const { crop } = req.body;

  if (!crop) {
    return res.status(400).json({
      disease: "Unknown",
      solution: "Please provide a crop name.",
    });
  }

  console.log("Pest detection request for crop:", crop);

  // Helper function for fallback pest detection
  const getFallbackPestDetection = (cropName) => {
    const cropLower = (cropName || "Rice").toLowerCase();

    const pestData = {
      rice: {
        disease: "Rice Leaf Blight",
        solution: "Use recommended fungicide (e.g., Propiconazole) and avoid excess nitrogen fertilizer. Ensure proper spacing and good drainage."
      },
      cotton: {
        disease: "Cotton Bollworm",
        solution: "Install pheromone traps or spray recommended pesticide (e.g., Spinosad) at early stage. Practice crop rotation."
      },
      wheat: {
        disease: "Wheat Rust",
        solution: "Use resistant varieties and apply fungicides like Tebuconazole. Remove infected plant debris."
      },
      maize: {
        disease: "Maize Leaf Blight",
        solution: "Apply fungicides containing Mancozeb. Ensure proper crop spacing and avoid waterlogging."
      }
    };

    const detection = pestData[cropLower] || {
      disease: "Unknown Disease",
      solution: "Consult local agricultural extension officer for proper diagnosis and treatment."
    };

    console.log("Using fallback detection for", cropName, ":", detection);
    return detection;
  };

  // Use fallback immediately for faster, reliable response
  // The Python script works but PythonShell can be slow/unreliable
  // Using direct fallback ensures fast response times
  const detection = getFallbackPestDetection(crop);
  console.log("Returning pest detection result for", crop, ":", detection);
  return res.json(detection);

  /* Optional: Uncomment to use Python script (can be slower)
  const pythonPath = PYTHON_PATH || (process.platform === 'win32' ? 'python' : 'python3');
  const scriptPath = path.join(__dirname, "../ai");

  PythonShell.run(
    "pest_detection.py",
    {
      pythonPath: pythonPath,
      scriptPath: scriptPath,
      args: [crop || "Rice"],
      pythonOptions: ['-u'],
    },
    (err, results) => {
      if (err || !results || results.length === 0) {
        const fallback = getFallbackPestDetection(crop);
        return res.json(fallback);
      }
      try {
        const output = results.join('').trim();
        const parsed = JSON.parse(output);
        return res.json(parsed);
      } catch (parseErr) {
        const fallback = getFallbackPestDetection(crop);
        return res.json(fallback);
      }
    }
  );
  */
});

/**
 * POST /api/chat
 * body: { message, language }
 */
app.post("/api/chat", async (req, res) => {
  const { message, language } = req.body;

  // Validate input
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      reply: "Please provide a valid message.",
      error: "Message is required"
    });
  }

  try {
    console.log("Chat request received:", { message: message.substring(0, 50), language });

    // Enhanced chatbot response logic
    const msg = message.toLowerCase().trim();
    let reply = "";

    // Greetings
    if (msg.match(/\b(hello|hi|hey|greetings|namaste|namaskar)\b/)) {
      const greetings = [
        "Hello! How can I help with your crops today?",
        "Hi there! What would you like to know about farming?",
        "Namaste! I'm here to assist with your agricultural needs."
      ];
      reply = greetings[Math.floor(Math.random() * greetings.length)];
    }
    // Irrigation questions
    else if (msg.match(/\b(irrigation|water|watering|irrigate|moisture|drought)\b/)) {
      reply = "Irrigation depends on your soil type and crop. Clay soils need less frequent watering, while sandy soils need more frequent, lighter watering. Use the Advisory page for specific recommendations based on your crop and soil type.";
    }
    // Fertilizer questions
    else if (msg.match(/\b(fertilizer|fertiliser|fertilize|nutrient|npk|manure|compost)\b/)) {
      reply = "Fertilizer requirements vary by crop and soil. Generally, balanced NPK (Nitrogen, Phosphorus, Potassium) with organic matter works well. Check the Advisory page for crop-specific fertilizer recommendations.";
    }
    // Pest and disease questions
    else if (msg.match(/\b(pest|disease|insect|bug|worm|fungus|bacterial|virus|infected|damage)\b/)) {
      reply = "For pest and disease detection, please use the Pest Detection page to upload an image. Common issues include: Rice Leaf Blight, Cotton Bollworm, and various fungal infections. I can help identify these through image analysis.";
    }
    // Crop selection questions
    else if (msg.match(/\b(crop|crops|planting|sowing|harvest|yield)\b/)) {
      reply = "For crop-specific advice, use the Advisory page where you can select your crop type and soil type. I can provide recommendations for Rice, Cotton, Wheat, and Maize.";
    }
    // Soil questions
    else if (msg.match(/\b(soil|clay|sandy|loam|fertile|ph|acidity)\b/)) {
      reply = "Soil type greatly affects crop growth. Clay soils retain water but need good drainage. Sandy soils drain quickly and need frequent irrigation. Loamy soils are ideal for most crops. Use the Advisory page to get soil-specific recommendations.";
    }
    // Weather/climate questions
    else if (msg.match(/\b(weather|climate|rain|rainfall|temperature|season|monsoon)\b/)) {
      reply = "Weather and climate are crucial for farming. Monitor local weather forecasts and adjust irrigation accordingly. During monsoon, reduce irrigation. In dry seasons, increase watering frequency.";
    }
    // Default response
    else {
      reply = "I'm here to help with crop advisory. You can ask me about:\n• Irrigation and watering\n• Fertilizers and nutrients\n• Pest and disease detection\n• Crop selection\n• Soil management\n\nFor detailed advice, please use the Advisory page or Pest Detection page.";
    }

    // Optional translation
    if (language && language !== "EN") {
      try {
        reply = await translateAdvice(reply, language);
      } catch (translationErr) {
        console.error("Translation error:", translationErr);
        // Continue with English if translation fails
      }
    }

    console.log("Chat response:", reply.substring(0, 50));
    return res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    return res.status(500).json({
      reply: "Sorry, I encountered an error. Please try again.",
      error: err.message
    });
  }
});

// ---------------- SERVER ----------------
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
