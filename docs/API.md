# 📚 CropCare API Documentation

## Base URL
```
Development: http://localhost:5000
Production: https://your-domain.com
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 🌾 Advisory Endpoints

### POST `/api/advisory`
Get comprehensive crop advisory with three parallel modes.

**Request Body:**
```json
{
  "crop": "Rice",
  "soil": "Loam", 
  "location": "Mumbai, Maharashtra",
  "season": "Kharif",
  "mode": "all",
  "language": "EN"
}
```

**Parameters:**
- `crop` (required): Rice, Cotton, Wheat, Maize
- `soil` (required): Loam, Clay, Sandy
- `location` (optional): Location for weather integration
- `season` (optional): Kharif, Rabi, Zaid
- `mode` (optional): "all" (default), "economical", "environment", "balanced"
- `language` (optional): EN, HI, MR

**Response (Three-Mode Advisory):**
```json
{
  "economical": {
    "mode": "Economical",
    "icon": "💰",
    "focus": "Cost minimization and short-term profit",
    "what_to_do": [
      "Use 75% of recommended fertilizer: NPK 90:45:30 kg/ha",
      "Apply farmyard manure (5-7 tons/ha) to reduce chemical fertilizer needs",
      "Use drip irrigation or alternate wetting-drying to save water costs"
    ],
    "when_to_do": [
      "Apply base fertilizer 2 weeks before sowing",
      "First top-dressing at 30 days after sowing",
      "Irrigate only when soil moisture drops below 70%"
    ],
    "why_advice": "This recommendation is based on Rice cultivation in Loam soil. This economical approach reduces input costs by 25-30% while maintaining 85-90% yield potential.",
    "cost_implication": "₹15,000-20,000 per hectare (25% cost reduction)",
    "yield_expectation": "85-90% of maximum potential yield",
    "risk_level": "Medium - Lower inputs may affect yield in adverse conditions"
  },
  "environment": {
    "mode": "Environment-Friendly",
    "icon": "🌱",
    "focus": "Sustainability and soil health",
    "what_to_do": [
      "Use 100% organic fertilizers: Compost (8-10 tons/ha) + Vermicompost (2 tons/ha)",
      "Apply bio-fertilizers: Azotobacter, PSB, and KSB",
      "Practice crop rotation with legumes to fix nitrogen naturally"
    ],
    "when_to_do": [
      "Apply organic manure 3-4 weeks before sowing",
      "Bio-fertilizer application at sowing time",
      "Mulching after 20 days of sowing"
    ],
    "why_advice": "This organic approach builds long-term soil health, reduces chemical residues, and supports sustainable farming practices.",
    "cost_implication": "₹18,000-25,000 per hectare (Higher initial cost, lower long-term expenses)",
    "yield_expectation": "80-85% of conventional yield initially, improving over 2-3 seasons",
    "risk_level": "Low - Builds soil resilience and reduces dependency on external inputs"
  },
  "balanced": {
    "mode": "Balanced",
    "icon": "⚖️",
    "focus": "Optimal cost-benefit with sustainability",
    "what_to_do": [
      "Use integrated approach: 50% chemical + 50% organic fertilizers",
      "Chemical component: NPK 120:60:40 kg/ha (reduced by 50%)",
      "Precision irrigation based on soil moisture sensors"
    ],
    "when_to_do": [
      "Apply organic manure 2-3 weeks before sowing",
      "Chemical fertilizer in 3 split doses: basal, 30 DAS, flowering",
      "Monitor and irrigate based on crop growth stage"
    ],
    "why_advice": "This balanced approach optimizes both economic returns and environmental sustainability, recommended for most farmers.",
    "cost_implication": "₹20,000-28,000 per hectare (Moderate investment with good returns)",
    "yield_expectation": "90-95% of maximum potential yield",
    "risk_level": "Low - Best risk-reward ratio with sustainable practices"
  },
  "crop": "Rice",
  "soil": "Loam",
  "suitability": "High",
  "weather": {
    "location": "Mumbai, Maharashtra",
    "temperature": "28°C",
    "humidity": "75%",
    "rainfall_forecast": "Light rain expected in next 48 hours",
    "advisory_impact": {
      "irrigation": "Reduce watering frequency due to expected rainfall",
      "fertilizer": "Delay nitrogen application until after rain",
      "pest_risk": "Moderate - humid conditions may increase fungal diseases"
    }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### POST `/api/advisory/save` 🔒
Save advisory to user's history (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "input": {
    "crop": "Rice",
    "soil": "Loam",
    "location": "Mumbai",
    "mode": "balanced",
    "language": "EN"
  },
  "result": {
    "mode": "Balanced",
    "what_to_do": ["..."],
    "cost_implication": "₹20,000-28,000 per hectare"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Advisory saved successfully",
  "id": "advisory_id_here"
}
```

### GET `/api/advisory/history` 🔒
Get user's advisory history (requires authentication).

**Response:**
```json
{
  "advisories": [
    {
      "id": "advisory_id",
      "input": {
        "crop": "Rice",
        "soil": "Loam",
        "mode": "balanced"
      },
      "result": {
        "mode": "Balanced",
        "cost_implication": "₹20,000-28,000 per hectare"
      },
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 1
}
```

---

## 🌤️ Weather Endpoints

### POST `/api/weather`
Get weather information for location.

**Request Body:**
```json
{
  "location": "Mumbai, Maharashtra"
}
```

**Response:**
```json
{
  "location": "Mumbai, Maharashtra",
  "temperature": "28°C",
  "humidity": "75%",
  "rainfall_forecast": "Light rain expected in next 48 hours",
  "wind_speed": "12 km/h",
  "advisory_impact": {
    "irrigation": "Reduce watering frequency due to expected rainfall",
    "fertilizer": "Delay nitrogen application until after rain",
    "pest_risk": "Moderate - humid conditions may increase fungal diseases"
  }
}
```

---

## 🔊 Voice Endpoints

### POST `/api/voice`
Text-to-speech conversion for voice advisory.

**Request Body:**
```json
{
  "text": "This recommendation is based on Rice cultivation in Loam soil...",
  "language": "EN"
}
```

**Response:**
```json
{
  "text": "This recommendation is based on Rice cultivation...",
  "language": "EN",
  "audio_url": "https://your-domain.com/audio/advisory_123.mp3",
  "duration": 45,
  "status": "success",
  "supported_languages": ["EN", "HI", "MR"]
}
```

---

## 🔐 Authentication Endpoints

### POST `/api/auth/signup`
Register a new user.

**Request Body:**
```json
{
  "name": "Farmer Name",
  "email": "farmer@example.com",
  "password": "securepassword123",
  "phone": "9876543210",
  "location": "Maharashtra, India"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "Farmer Name",
    "email": "farmer@example.com",
    "role": "farmer",
    "location": "Maharashtra, India"
  }
}
```

### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "farmer@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "Farmer Name",
    "email": "farmer@example.com",
    "role": "farmer"
  }
}
```

---

## 🐛 Pest Detection Endpoints

### POST `/api/pest-detect`
Detect pest/disease for a crop.

**Request Body:**
```json
{
  "crop": "Rice",
  "symptoms": "Yellow spots on leaves",
  "image_url": "optional_image_url"
}
```

**Response:**
```json
{
  "disease": "Rice Leaf Blight",
  "confidence": 0.85,
  "solution": "Use recommended fungicide (e.g., Propiconazole) and avoid excess nitrogen fertilizer. Ensure proper spacing and good drainage.",
  "prevention": [
    "Use resistant varieties",
    "Maintain proper plant spacing",
    "Avoid waterlogging"
  ],
  "treatment_cost": "₹500-800 per acre"
}
```

---

## 💬 Chat Endpoints

### POST `/api/chat`
Chat with AI assistant.

**Request Body:**
```json
{
  "message": "How should I water my rice crops during monsoon?",
  "language": "EN",
  "context": {
    "crop": "Rice",
    "soil": "Clay",
    "location": "Maharashtra"
  }
}
```

**Response:**
```json
{
  "reply": "During monsoon, rice crops in clay soil need careful water management. Since clay retains water well and you're expecting rainfall, reduce irrigation frequency to prevent waterlogging. Monitor field drainage and ensure excess water can flow out.",
  "suggestions": [
    "Check drainage systems",
    "Monitor soil moisture",
    "Watch for fungal diseases"
  ],
  "related_advisory": "Consider getting a detailed advisory for monsoon rice management"
}
```

---

## 🚨 Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message here",
  "code": "ERROR_CODE",
  "details": "Additional error details if available"
}
```

**Common Error Codes:**
- `VALIDATION_ERROR` - Invalid input parameters
- `AUTH_REQUIRED` - Authentication token required
- `AUTH_INVALID` - Invalid or expired token
- `NOT_FOUND` - Resource not found
- `RATE_LIMIT` - Too many requests
- `SERVICE_UNAVAILABLE` - External service (AI/Weather) unavailable

---

## 🔄 Rate Limiting

- **Advisory API**: 10 requests per minute per user
- **Chat API**: 20 requests per minute per user
- **Authentication**: 5 requests per minute per IP
- **General APIs**: 100 requests per minute per user

---

## 🧪 Testing

Use these sample requests for testing:

```bash
# Get three-mode advisory
curl -X POST http://localhost:5000/api/advisory \
  -H "Content-Type: application/json" \
  -d '{"crop":"Rice","soil":"Loam","location":"Mumbai","language":"EN"}'

# Chat with AI
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"How to grow rice in clay soil?","language":"EN"}'

# Get weather data
curl -X POST http://localhost:5000/api/weather \
  -H "Content-Type: application/json" \
  -d '{"location":"Mumbai, Maharashtra"}'
```