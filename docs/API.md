# CropCare API Documentation

Complete API reference for the CropCare backend service.

## Base URL

```
http://localhost:5000
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### Sign Up
**POST** `/api/auth/signup`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890"  // optional
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "farmer",
    "preferences": {
      "language": "EN",
      "region": ""
    }
  }
}
```

**Error Responses:**
- `400 Bad Request` - Validation error or user already exists
- `503 Service Unavailable` - MongoDB not available

---

#### Login
**POST** `/api/auth/login`

Authenticate and get JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "farmer"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Invalid credentials
- `503 Service Unavailable` - MongoDB not available

---

### Advisory

#### Get Advisory
**POST** `/api/advisory`

Get crop advisory recommendations based on crop and soil type.

**Request Body:**
```json
{
  "crop": "Rice",
  "soil": "Loam",
  "language": "EN"  // EN, HI, or MR
}
```

**Response (200 OK):**
```json
{
  "advice": "Loamy soils are generally suitable for many crops. Crop: Rice. Irrigation guidance: Regular schedule based on crop stage. Fertilizer: Standard NPK with organic amendments.",
  "result": {
    "crop": "Rice",
    "suitability": "High",
    "irrigation": ["Regular schedule based on crop stage"],
    "fertilizer": ["Standard NPK with organic amendments"],
    "precautions": ["Monitor pests regularly", "Avoid overwatering"],
    "explanation": "Rule-based advisory v1: simple soil-crop heuristics"
  }
}
```

**Error Responses:**
- `502 Bad Gateway` - AI service unavailable

---

#### Save Advisory
**POST** `/api/advisory/save` 🔒

Save advisory result to user's history.

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
    "language": "EN"
  },
  "result": {
    "advice": "...",
    "result": { ... }
  },
  "notes": "Optional notes"  // optional
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "advisory": {
    "_id": "507f1f77bcf86cd799439011",
    "user": "507f1f77bcf86cd799439012",
    "input": { ... },
    "result": { ... },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid or missing token
- `500 Internal Server Error` - Database error

---

#### Get Advisory History
**GET** `/api/advisory/history` 🔒

Get current user's advisory history.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "list": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "input": {
        "crop": "Rice",
        "soil": "Loam",
        "language": "EN"
      },
      "result": { ... },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid or missing token
- `500 Internal Server Error` - Database error

---

### Chat

#### Send Message
**POST** `/api/chat`

Chat with AI assistant.

**Request Body:**
```json
{
  "message": "How to water rice crops?",
  "language": "EN"  // EN, HI, or MR
}
```

**Response (200 OK):**
```json
{
  "reply": "Irrigation depends on your soil type and crop. Clay soils need less frequent watering, while sandy soils need more frequent, lighter watering. Use the Advisory page for specific recommendations based on your crop and soil type."
}
```

**Error Responses:**
- `400 Bad Request` - Invalid or empty message
- `500 Internal Server Error` - Server error

**Supported Query Types:**
- Greetings (hello, hi, namaste)
- Irrigation questions
- Fertilizer questions
- Pest/disease questions
- Crop selection questions
- Soil questions
- Weather/climate questions

---

### Pest Detection

#### Detect Pest/Disease
**POST** `/api/pest-detect`

Detect common pests and diseases for a crop.

**Request Body:**
```json
{
  "crop": "Rice"  // Rice, Cotton, Wheat, or Maize
}
```

**Response (200 OK):**
```json
{
  "disease": "Rice Leaf Blight",
  "solution": "Use recommended fungicide (e.g., Propiconazole) and avoid excess nitrogen fertilizer. Ensure proper spacing and good drainage."
}
```

**Supported Crops:**
- Rice → Rice Leaf Blight
- Cotton → Cotton Bollworm
- Wheat → Wheat Rust
- Maize → Maize Leaf Blight

**Error Responses:**
- `400 Bad Request` - Crop name not provided

---

## Error Response Format

All error responses follow this format:

```json
{
  "error": "Error message here",
  "details": "Additional error details"  // optional
}
```

For validation errors:

```json
{
  "errors": [
    {
      "msg": "Email must be valid",
      "param": "email",
      "location": "body"
    }
  ]
}
```

## Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid token |
| 500 | Internal Server Error |
| 502 | Bad Gateway - AI service unavailable |
| 503 | Service Unavailable - Database unavailable |

## Rate Limiting

Currently, there are no rate limits. In production, consider implementing rate limiting.

## CORS

The API allows requests from:
- `http://localhost:5173` (development)
- Configure production URLs in backend CORS settings

---

🔒 = Requires Authentication
