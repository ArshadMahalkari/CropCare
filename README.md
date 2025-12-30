# 🌾 CropCare - AI-Powered Crop Advisory System

An intelligent agricultural advisory platform designed for small farmers in Maharashtra, providing crop guidance, pest detection, and multilingual chat support using MERN stack and AI technologies.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-ISC-green)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![Python](https://img.shields.io/badge/python-3.10%2B-blue)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [API Documentation](#-api-documentation)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Features
- 🤖 **AI-Powered Crop Advisory**: Get personalized crop recommendations based on soil type and crop selection
- 🐛 **Pest & Disease Detection**: Upload images to detect common crop diseases and get treatment solutions
- 💬 **Multilingual Chatbot**: Interactive AI assistant supporting English, Hindi, and Marathi
- 👤 **User Authentication**: Secure signup/login system with JWT tokens
- 📊 **Advisory History**: Save and view your crop advisory history
- 🌐 **Multi-language Support**: Full interface support for English, Hindi, and Marathi

### Technical Features
- Responsive design for mobile and desktop
- Real-time API integration
- Secure authentication with MongoDB
- RESTful API architecture
- Docker support for easy deployment

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **i18next** - Internationalization
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### AI Service
- **Flask** - Python web framework
- **Python 3.10+** - AI logic implementation

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📁 Project Structure

```
CropCare/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React context
│   │   ├── locales/      # Translation files
│   │   └── api.js        # API configuration
│   └── package.json
├── backend/           # Node.js backend API
│   ├── routes/       # API routes
│   ├── models/       # MongoDB models
│   ├── middleware/   # Auth middleware
│   └── index.js     # Main server file
├── ai/               # Python AI service
│   ├── app.py        # Flask application
│   ├── pest_detection.py
│   └── requirements.txt
├── docs/             # Documentation
├── docker-compose.yml
└── README.md
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **Python** (v3.10 or higher)
- **MongoDB** (v6.0 or higher) - Optional if using Docker
- **npm** or **yarn**
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/CropCare.git
cd CropCare
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 4. Install AI Service Dependencies

```bash
cd ai
pip install -r requirements.txt
cd ..
```

### 5. Environment Configuration

Create environment files (optional, defaults are provided):

**Backend** (`backend/.env`):
```env
MONGO_URI=mongodb://localhost:27017/cropcare
JWT_SECRET=your-secret-key-here
AI_URL=http://localhost:8000
PYTHON_PATH=python
```

**AI Service** (`ai/.env`):
```env
FLASK_ENV=development
PORT=8000
```

## 🏃 Running the Project

### Option 1: Manual Start (Development)

#### Terminal 1 - AI Service
```bash
cd ai
python app.py
```
AI Service will run on `http://localhost:8000`

#### Terminal 2 - Backend
```bash
cd backend
node index.js
```
Backend will run on `http://localhost:5000`

#### Terminal 3 - Frontend
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### Option 2: Docker Compose (Recommended)

```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- AI Service on port 8000
- Backend on port 5000
- Frontend on port 5173 (if configured)

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890" // optional
}
```

**Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "farmer"
  }
}
```

#### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Advisory Endpoints

#### POST `/api/advisory`
Get crop advisory recommendations.

**Request Body:**
```json
{
  "crop": "Rice",
  "soil": "Loam",
  "language": "EN"
}
```

**Response:**
```json
{
  "advice": "Loamy soils are generally suitable...",
  "result": {
    "crop": "Rice",
    "suitability": "High",
    "irrigation": ["Regular schedule..."],
    "fertilizer": ["Standard NPK..."],
    "precautions": ["Monitor pests regularly"]
  }
}
```

#### POST `/api/advisory/save` (Protected)
Save advisory to history.

**Headers:**
```
Authorization: Bearer <token>
```

#### GET `/api/advisory/history` (Protected)
Get user's advisory history.

### Chat Endpoints

#### POST `/api/chat`
Chat with AI assistant.

**Request Body:**
```json
{
  "message": "How to water rice crops?",
  "language": "EN"
}
```

**Response:**
```json
{
  "reply": "Irrigation depends on your soil type..."
}
```

### Pest Detection Endpoints

#### POST `/api/pest-detect`
Detect pest/disease for a crop.

**Request Body:**
```json
{
  "crop": "Rice"
}
```

**Response:**
```json
{
  "disease": "Rice Leaf Blight",
  "solution": "Use recommended fungicide..."
}
```

For detailed API documentation, see [docs/API.md](docs/API.md)

## ⚙️ Configuration

### MongoDB Setup

**Local MongoDB:**
1. Install MongoDB locally
2. Start MongoDB service
3. Update `MONGO_URI` in `backend/.env`

**MongoDB Atlas (Cloud):**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster and database
3. Get connection string
4. Update `MONGO_URI` in `backend/.env`

### Environment Variables

Key environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/cropcare` |
| `JWT_SECRET` | Secret key for JWT tokens | `devsecret` |
| `AI_URL` | AI service URL | `http://localhost:8000` |
| `PYTHON_PATH` | Python executable path | `python` (Windows) / `python3` (Linux/Mac) |

## 🐳 Deployment

### Docker Deployment

1. Build and start all services:
```bash
docker-compose up -d
```

2. View logs:
```bash
docker-compose logs -f
```

3. Stop services:
```bash
docker-compose down
```

### Production Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for detailed guidelines.

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- Your Name - [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Farmers and agricultural experts for domain knowledge
- Open source community for amazing tools and libraries
- Maharashtra farmers for inspiration and feedback

## 📞 Support

For support, email support@cropcare.com or open an issue in the repository.

## 🔗 Links

- [Documentation](docs/)
- [API Reference](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Contributing Guide](docs/CONTRIBUTING.md)

---

Made with ❤️ for farmers in Maharashtra
