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
 * Enhanced endpoint supporting three parallel advisory modes
 * body: { crop, soil, location, season, mode, language }
 */
app.post("/api/advisory", async (req, res) => {
  console.log("Enhanced Advisory API hit:", req.body);
  const { crop, soil, location, season, mode, language } = req.body;

  try {
    const aiUrl = process.env.AI_URL || "http://localhost:8000";
    
    // Get weather context if location provided
    let weatherData = null;
    if (location) {
      try {
        const weatherResponse = await axios.post(`${aiUrl}/infer/weather`, { location }, { timeout: 5000 });
        weatherData = weatherResponse.data;
      } catch (weatherErr) {
        console.log("Weather service unavailable, continuing without weather data");
      }
    }
    
    // Get AI advisory with enhanced parameters
    const advisoryResponse = await axios.post(`${aiUrl}/infer/advisory`, { 
      crop, 
      soil, 
      location, 
      season,
      mode: mode || 'all'
    }, { timeout: 15000 });
    
    const data = advisoryResponse.data || {};
    
    // Add weather context to response
    if (weatherData) {
      data.weather = weatherData;
    }
    
    // Optional translation for each advisory mode
    if (language && language !== "EN") {
      if (data.economical) {
        data.economical.why_advice = await translateAdvice(data.economical.why_advice, language);
      }
      if (data.environment) {
        data.environment.why_advice = await translateAdvice(data.environment.why_advice, language);
      }
      if (data.balanced) {
        data.balanced.why_advice = await translateAdvice(data.balanced.why_advice, language);
      }
      // Legacy support
      if (data.advice) {
        data.advice = await translateAdvice(data.advice, language);
      }
    }

    return res.json(data);
  } catch (err) {
    console.error("AI service error:", err?.message || err);
    
    // Enhanced fallback with three modes
    const fallbackAdvisory = {
      economical: {
        mode: "Economical",
        icon: "💰",
        focus: "Cost minimization",
        what_to_do: [
          "Use 75% of recommended fertilizer to reduce costs",
          "Apply farmyard manure to supplement nutrients",
          "Practice water-saving irrigation techniques"
        ],
        why_advice: "This economical approach reduces input costs while maintaining reasonable yields.",
        cost_implication: "₹15,000-20,000 per hectare",
        yield_expectation: "85-90% of potential yield",
        risk_level: "Medium"
      },
      environment: {
        mode: "Environment-Friendly", 
        icon: "🌱",
        focus: "Sustainability and soil health",
        what_to_do: [
          "Use 100% organic fertilizers and compost",
          "Apply bio-fertilizers for natural nutrient cycling",
          "Practice crop rotation and intercropping"
        ],
        why_advice: "This organic approach builds long-term soil health and reduces environmental impact.",
        cost_implication: "₹18,000-25,000 per hectare",
        yield_expectation: "80-85% initially, improving over time",
        risk_level: "Low"
      },
      balanced: {
        mode: "Balanced",
        icon: "⚖️", 
        focus: "Optimal cost-benefit ratio",
        what_to_do: [
          "Use integrated nutrient management (50% organic + 50% chemical)",
          "Apply precision irrigation based on soil moisture",
          "Follow recommended fertilizer schedule"
        ],
        why_advice: "This balanced approach optimizes both economic returns and sustainability.",
        cost_implication: "₹20,000-28,000 per hectare",
        yield_expectation: "90-95% of potential yield",
        risk_level: "Low"
      },
      crop: crop || "Rice",
      soil: soil || "loam",
      suitability: "Moderate",
      error: "AI service unavailable - using fallback advisory"
    };
    
    return res.json(fallbackAdvisory);
  }
});

/**
 * POST /api/weather
 * Get weather information for location
 */
app.post("/api/weather", async (req, res) => {
  const { location } = req.body;
  
  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }
  
  try {
    const aiUrl = process.env.AI_URL || "http://localhost:8000";
    const response = await axios.post(`${aiUrl}/infer/weather`, { location }, { timeout: 10000 });
    return res.json(response.data);
  } catch (err) {
    console.error("Weather service error:", err?.message || err);
    
    // Fallback weather data
    return res.json({
      location: location,
      temperature: "25-30°C",
      humidity: "70-80%",
      rainfall_forecast: "Monitor local weather updates",
      advisory_impact: {
        irrigation: "Follow standard irrigation schedule",
        fertilizer: "Apply as per crop requirements",
        pest_risk: "Regular monitoring recommended"
      },
      error: "Weather service unavailable"
    });
  }
});

/**
 * POST /api/voice
 * Text-to-speech endpoint for voice advisory
 */
app.post("/api/voice", async (req, res) => {
  const { text, language } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: "Text is required for voice synthesis" });
  }
  
  // Mock voice response - in production, integrate with TTS service
  const voiceResponse = {
    text: text,
    language: language || "EN",
    audio_url: null, // Would contain actual audio URL in production
    duration: Math.ceil(text.length / 10), // Estimated duration in seconds
    status: "Voice synthesis would be implemented with TTS service",
    supported_languages: ["EN", "HI", "MR"]
  };
  
  return res.json(voiceResponse);
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
 * Enhanced chatbot with context awareness and farming expertise
 * body: { message, language, context }
 */
app.post("/api/chat", async (req, res) => {
  const { message, language, context } = req.body;

  // Validate input
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      reply: "Please provide a valid message.",
      error: "Message is required"
    });
  }

  try {
    console.log("Enhanced chat request:", { message: message.substring(0, 50), language, context });

    // Enhanced chatbot response logic with farming expertise
    const msg = message.toLowerCase().trim();
    let reply = "";
    let suggestions = [];
    let relatedAdvisory = null;

    // Context-aware responses
    const userContext = context || {};
    const contextStr = userContext.crop ? `for ${userContext.crop}` : '';
    const soilStr = userContext.soil ? `in ${userContext.soil} soil` : '';

    // Greetings and introductions
    if (msg.match(/\b(hello|hi|hey|greetings|namaste|namaskar|good morning|good afternoon|good evening)\b/)) {
      const greetings = [
        `Hello! I'm your AI farming assistant. How can I help you with your crops today? ${contextStr}`,
        `Namaste! I'm here to provide expert farming advice. What would you like to know about agriculture?`,
        `Hi there! I specialize in crop advisory, pest management, and sustainable farming practices. How can I assist you?`
      ];
      reply = greetings[Math.floor(Math.random() * greetings.length)];
      suggestions = ["Get crop advisory", "Pest detection help", "Weather information", "Fertilizer guidance"];
    }
    
    // Crop-specific questions
    else if (msg.match(/\b(rice|paddy|dhan)\b/)) {
      reply = `Rice cultivation requires careful water management and nutrient balance. ${soilStr ? `In ${userContext.soil} soil, ` : ''}rice needs specific irrigation patterns. Clay soils retain water well, while sandy soils need frequent watering. Key practices include: proper seedling spacing, timely fertilizer application, and pest monitoring especially for stem borers and leaf folders.`;
      suggestions = ["Rice fertilizer schedule", "Rice pest management", "Rice irrigation timing", "Rice variety selection"];
      relatedAdvisory = "Get detailed rice advisory based on your soil type";
    }
    
    else if (msg.match(/\b(cotton|kapas)\b/)) {
      reply = `Cotton is a cash crop that requires well-drained soil and careful pest management. ${soilStr ? `${userContext.soil} soil ` : ''}Cotton grows best in deep, well-drained soils with good organic matter. Major concerns include bollworm management, proper spacing, and balanced nutrition. Avoid waterlogging and ensure adequate potassium for fiber quality.`;
      suggestions = ["Cotton pest control", "Cotton fertilizer program", "Cotton irrigation schedule", "Cotton variety guide"];
      relatedAdvisory = "Get comprehensive cotton farming advisory";
    }
    
    else if (msg.match(/\b(wheat|gehun)\b/)) {
      reply = `Wheat is a rabi crop that thrives in cool, dry conditions. ${soilStr ? `In ${userContext.soil} soil, ` : ''}wheat requires proper seed bed preparation and timely sowing. Key factors include: optimal sowing time (November-December), balanced fertilization, and disease management especially for rust and blight.`;
      suggestions = ["Wheat sowing time", "Wheat disease management", "Wheat fertilizer application", "Wheat harvesting"];
      relatedAdvisory = "Get wheat cultivation advisory for your region";
    }
    
    else if (msg.match(/\b(maize|corn|makka)\b/)) {
      reply = `Maize is a versatile crop that can be grown in both kharif and rabi seasons. ${soilStr ? `${userContext.soil} soil ` : ''}Maize needs well-drained, fertile soil with good organic matter. Important aspects include: proper plant population, timely weeding, balanced nutrition with emphasis on nitrogen, and protection from stem borer and fall armyworm.`;
      suggestions = ["Maize pest management", "Maize fertilizer schedule", "Maize irrigation", "Maize harvesting"];
      relatedAdvisory = "Get detailed maize farming guidance";
    }
    
    // Irrigation and water management
    else if (msg.match(/\b(irrigation|water|watering|irrigate|moisture|drought|drip|sprinkler)\b/)) {
      reply = `Water management is crucial for successful farming. ${contextStr} ${soilStr}, irrigation needs vary significantly. Clay soils need less frequent but deeper watering, sandy soils need frequent light irrigation, and loamy soils need moderate, regular watering. Consider drip irrigation for water efficiency, especially in water-scarce areas. Monitor soil moisture and adjust based on crop growth stage.`;
      suggestions = ["Drip irrigation setup", "Irrigation scheduling", "Water conservation", "Soil moisture testing"];
      relatedAdvisory = "Get crop-specific irrigation recommendations";
    }
    
    // Fertilizer and nutrition
    else if (msg.match(/\b(fertilizer|fertiliser|fertilize|nutrient|npk|nitrogen|phosphorus|potassium|manure|compost|urea|dap)\b/)) {
      reply = `Proper nutrition is key to healthy crops and good yields. ${contextStr} ${soilStr}, nutrient requirements vary. Generally, NPK (Nitrogen-Phosphorus-Potassium) should be applied in split doses. Nitrogen promotes vegetative growth, phosphorus helps root development and flowering, potassium improves disease resistance and quality. Always combine chemical fertilizers with organic matter like FYM or compost for soil health.`;
      suggestions = ["NPK calculation", "Organic fertilizers", "Fertilizer timing", "Soil testing"];
      relatedAdvisory = "Get customized fertilizer recommendations";
    }
    
    // Pest and disease management
    else if (msg.match(/\b(pest|disease|insect|bug|worm|fungus|bacterial|virus|infected|damage|spray|pesticide|fungicide)\b/)) {
      reply = `Integrated Pest Management (IPM) is the best approach for sustainable farming. ${contextStr}, common issues include various insects, fungal diseases, and viral infections. Use a combination of: cultural practices (crop rotation, resistant varieties), biological control (beneficial insects, bio-pesticides), and chemical control as last resort. Regular monitoring and early detection are crucial for effective management.`;
      suggestions = ["Common crop pests", "Organic pest control", "Disease identification", "IPM practices"];
      relatedAdvisory = "Use our pest detection tool for specific problems";
    }
    
    // Soil management
    else if (msg.match(/\b(soil|clay|sandy|loam|fertile|ph|acidity|alkaline|organic matter|soil health)\b/)) {
      reply = `Soil health is the foundation of successful farming. ${userContext.soil ? `Your ${userContext.soil} soil ` : 'Different soil types '}have unique characteristics. Clay soils retain nutrients and water but may have drainage issues. Sandy soils drain well but need frequent irrigation and organic matter. Loamy soils are ideal with balanced properties. Regular soil testing, organic matter addition, and proper pH management are essential.`;
      suggestions = ["Soil testing", "Improving soil health", "Organic matter", "pH management"];
      relatedAdvisory = "Get soil-specific farming recommendations";
    }
    
    // Weather and climate
    else if (msg.match(/\b(weather|climate|rain|rainfall|temperature|season|monsoon|drought|flood)\b/)) {
      reply = `Weather plays a crucial role in farming decisions. Monitor local weather forecasts and adjust farming practices accordingly. During monsoon, focus on drainage and disease prevention. In dry periods, prioritize water conservation and drought-resistant practices. Temperature affects crop growth stages, pest activity, and disease development. Use weather information for timing of sowing, fertilizer application, and pest management.`;
      suggestions = ["Weather-based farming", "Monsoon preparation", "Drought management", "Climate-smart agriculture"];
      relatedAdvisory = "Get weather-integrated crop advisory";
    }
    
    // Organic farming
    else if (msg.match(/\b(organic|natural|bio|sustainable|chemical-free|eco-friendly)\b/)) {
      reply = `Organic farming focuses on sustainable practices without synthetic chemicals. Key principles include: soil health improvement through compost and bio-fertilizers, natural pest management using beneficial insects and organic sprays, crop rotation and intercropping, and maintaining biodiversity. While initial yields may be lower, organic farming builds long-term soil health and commands premium prices.`;
      suggestions = ["Organic certification", "Bio-fertilizers", "Natural pest control", "Composting methods"];
      relatedAdvisory = "Get environment-friendly farming advisory";
    }
    
    // Economics and profitability
    else if (msg.match(/\b(cost|profit|income|price|market|sell|economics|budget|investment)\b/)) {
      reply = `Farm economics involves balancing input costs with output value. Key factors include: input optimization (seeds, fertilizers, labor), yield maximization through good practices, cost reduction through efficient resource use, and market linkage for better prices. Consider value addition, direct marketing, and government schemes for better profitability.`;
      suggestions = ["Cost calculation", "Market prices", "Government schemes", "Value addition"];
      relatedAdvisory = "Get economical farming advisory to reduce costs";
    }
    
    // Technology and modern farming
    else if (msg.match(/\b(technology|modern|digital|app|sensor|drone|precision|smart)\b/)) {
      reply = `Modern farming technology can significantly improve efficiency and yields. Options include: precision agriculture using GPS and sensors, drone monitoring for large fields, mobile apps for weather and market information, soil sensors for irrigation management, and digital platforms for input procurement and output marketing. Start with simple, cost-effective technologies.`;
      suggestions = ["Farming apps", "Precision agriculture", "Digital marketing", "Smart irrigation"];
      relatedAdvisory = "Explore our AI-powered advisory system";
    }
    
    // Government schemes and support
    else if (msg.match(/\b(government|scheme|subsidy|loan|support|pm kisan|crop insurance|msp)\b/)) {
      reply = `Various government schemes support farmers: PM-KISAN provides income support, Crop Insurance protects against losses, MSP ensures minimum prices for major crops, KCC provides credit, and various subsidies are available for inputs and equipment. Contact your local agriculture extension officer or visit common service centers for scheme enrollment.`;
      suggestions = ["PM-KISAN enrollment", "Crop insurance", "Agricultural loans", "Input subsidies"];
      relatedAdvisory = "Learn about government support for your crops";
    }
    
    // Default comprehensive response
    else {
      reply = `I'm your AI farming assistant specializing in crop advisory, pest management, and sustainable agriculture. I can help you with:

🌾 **Crop Advisory**: Personalized recommendations for Rice, Cotton, Wheat, and Maize
🐛 **Pest & Disease Management**: Identification and treatment solutions
💧 **Irrigation Guidance**: Water management based on soil type and crop needs
🌱 **Fertilizer Recommendations**: Balanced nutrition for optimal yields
🌤️ **Weather-Smart Farming**: Climate-based farming decisions
💰 **Cost Optimization**: Economical farming practices
🌿 **Sustainable Practices**: Organic and environment-friendly methods

What specific farming challenge can I help you with today?`;
      
      suggestions = [
        "Get crop advisory",
        "Pest identification help", 
        "Irrigation guidance",
        "Fertilizer recommendations",
        "Weather information",
        "Organic farming tips"
      ];
    }

    // Optional translation
    if (language && language !== "EN") {
      try {
        reply = await translateAdvice(reply, language);
        // Translate suggestions too
        if (suggestions.length > 0) {
          const translatedSuggestions = await Promise.all(
            suggestions.map(s => translateAdvice(s, language))
          );
          suggestions = translatedSuggestions;
        }
      } catch (translationErr) {
        console.error("Translation error:", translationErr);
        // Continue with English if translation fails
      }
    }

    console.log("Enhanced chat response generated");
    return res.json({ 
      reply,
      suggestions,
      relatedAdvisory,
      context: userContext
    });
  } catch (err) {
    console.error("Chat error:", err);
    return res.status(500).json({
      reply: "I apologize, but I'm experiencing some technical difficulties. Please try asking your question again, or visit our Advisory page for detailed farming guidance.",
      error: err.message,
      suggestions: ["Try Advisory page", "Check connection", "Ask simpler question"]
    });
  }
});

// ---------------- SERVER ----------------
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
