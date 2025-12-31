# 📁 CropCare Project Structure

## Overview
This document outlines the complete project structure of the CropCare AI-powered agricultural platform.

## Root Directory Structure

```
CropCare/
├── 📁 ai/                     # Python AI Service
├── 📁 backend/                # Node.js Backend API
├── 📁 docs/                   # Documentation
├── 📁 frontend/               # React Frontend
├── 📁 venv/                   # Python Virtual Environment
├── 📄 .gitignore             # Git ignore rules
├── 📄 docker-compose.yml     # Docker orchestration
├── 📄 LICENSE                # MIT License
├── 📄 PROJECT_STRUCTURE.md   # This file
├── 📄 README.md              # Main documentation
├── 🚀 start-cropcare.bat     # Windows startup script
└── 🚀 start-cropcare.sh      # Linux/Mac startup script
```

## 🤖 AI Service (`ai/`)

```
ai/
├── 📄 app.py                 # Main Flask application
├── 📄 advisory_logic.py      # Core advisory algorithms
├── 📄 pest_detection.py      # Pest detection logic
├── 📄 requirements.txt       # Python dependencies
├── 📄 Dockerfile            # Docker configuration
└── 📁 __pycache__/          # Python cache (auto-generated)
```

### Key Files
- **`app.py`**: Flask server with API endpoints
- **`advisory_logic.py`**: Three-mode advisory system
- **`pest_detection.py`**: Crop disease identification
- **`requirements.txt`**: Python package dependencies

## 🔧 Backend (`backend/`)

```
backend/
├── 📁 middleware/           # Authentication middleware
├── 📁 models/              # MongoDB data models
├── 📁 routes/              # API route handlers
├── 📄 .env                 # Environment variables (create from .env.example)
├── 📄 .env.example         # Environment template
├── 📄 .gitignore          # Backend-specific ignores
├── 📄 Dockerfile          # Docker configuration
├── 📄 index.js            # Main server file
├── 📄 package.json        # Node.js dependencies
└── 📄 package-lock.json   # Dependency lock file
```

### Key Directories
- **`routes/`**: API endpoint definitions
- **`models/`**: Database schema definitions
- **`middleware/`**: Authentication and validation

### Key Files
- **`index.js`**: Express server setup and configuration
- **`package.json`**: Dependencies and scripts
- **`.env.example`**: Environment variable template

## 🎨 Frontend (`frontend/`)

```
frontend/
├── 📁 public/              # Static assets
├── 📁 src/                 # Source code
│   ├── 📁 components/      # Reusable React components
│   ├── 📁 context/         # React Context providers
│   ├── 📁 locales/         # Translation files
│   └── 📁 pages/           # Page components
├── 📄 .gitignore          # Frontend-specific ignores
├── 📄 eslint.config.js    # ESLint configuration
├── 📄 index.html          # HTML template
├── 📄 package.json        # Frontend dependencies
├── 📄 package-lock.json   # Dependency lock file
└── 📄 vite.config.js      # Vite build configuration
```

### Frontend Source (`frontend/src/`)

```
src/
├── 📁 components/
│   ├── 📄 Navbar.jsx           # Navigation component
│   ├── 📄 LanguageToggle.jsx   # Language switcher
│   └── 📄 ProtectedRoute.jsx   # Route protection
├── 📁 context/
│   └── 📄 AppContext.jsx       # Global state management
├── 📁 locales/                 # Translation files
│   ├── 📁 en/
│   │   └── 📄 translation.json # English translations
│   ├── 📁 hi/
│   │   └── 📄 translation.json # Hindi translations
│   ├── 📁 mr/
│   │   └── 📄 translation.json # Marathi translations
│   ├── 📁 ta/
│   │   └── 📄 translation.json # Tamil translations
│   ├── 📁 te/
│   │   └── 📄 translation.json # Telugu translations
│   ├── 📁 kn/
│   │   └── 📄 translation.json # Kannada translations
│   ├── 📁 gu/
│   │   └── 📄 translation.json # Gujarati translations
│   ├── 📁 pa/
│   │   └── 📄 translation.json # Punjabi translations
│   └── 📁 bn/
│       └── 📄 translation.json # Bengali translations
├── 📁 pages/
│   ├── 📄 Home.jsx             # Landing page
│   ├── 📄 Advisory.jsx         # Crop advisory interface
│   ├── 📄 Chatbot.jsx          # AI chat interface
│   ├── 📄 PestDetect.jsx       # Pest detection page
│   ├── 📄 History.jsx          # User history
│   ├── 📄 Login.jsx            # User login
│   └── 📄 Signup.jsx           # User registration
├── 📄 App.jsx                  # Main app component
├── 📄 App.css                  # App-specific styles
├── 📄 api.js                   # API configuration
├── 📄 i18n.js                  # Internationalization setup
├── 📄 index.css                # Global styles
└── 📄 main.jsx                 # App entry point
```

## 📚 Documentation (`docs/`)

```
docs/
├── 📄 API.md                      # API documentation
├── 📄 ARCHITECTURE.md             # System architecture
├── 📄 CONTRIBUTING.md             # Contribution guidelines
├── 📄 DEPLOYMENT.md               # Deployment instructions
├── 📄 RESPONSIVE_DESIGN_GUIDE.md  # Responsive design guide
├── 📄 SETUP.md                    # Setup instructions
└── 📄 UI_UX_IMPROVEMENTS.md       # UI/UX documentation
```

## 🐳 Docker Configuration

### `docker-compose.yml`
Orchestrates all services:
- MongoDB database
- Python AI service
- Node.js backend
- React frontend (in production)

### Individual Dockerfiles
- `ai/Dockerfile`: Python Flask service
- `backend/Dockerfile`: Node.js Express service

## 🚀 Startup Scripts

### `start-cropcare.bat` (Windows)
```batch
@echo off
echo 🌾 Starting CropCare - AI-Powered Agricultural Platform
echo.

echo Starting MongoDB (if not running)...
start "MongoDB" cmd /k "mongod --dbpath data\db"
timeout /t 3 /nobreak >nul

echo Starting AI Service (Python Flask)...
start "AI Service" cmd /k "cd ai && python app.py"
timeout /t 3 /nobreak >nul

echo Starting Backend (Node.js Express)...
start "Backend" cmd /k "cd backend && node index.js"
timeout /t 3 /nobreak >nul

echo Starting Frontend (React Vite)...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ✅ CropCare is starting up!
echo.
echo 🌐 Frontend: http://localhost:5173
echo 🔧 Backend: http://localhost:5000  
echo 🤖 AI Service: http://localhost:8000
echo 🗄️ MongoDB: mongodb://localhost:27017
echo.
echo Press any key to close this window...
pause >nul
```

### `start-cropcare.sh` (Linux/Mac)
```bash
#!/bin/bash
echo "🌾 Starting CropCare - AI-Powered Agricultural Platform"
echo ""

echo "Starting AI Service (Python Flask)..."
cd ai && python3 app.py &
AI_PID=$!
cd ..

echo "Starting Backend (Node.js Express)..."
cd backend && npm start &
BACKEND_PID=$!
cd ..

echo "Starting Frontend (React Vite)..."
cd frontend && npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ CropCare is starting up!"
echo ""
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend: http://localhost:5000"
echo "🤖 AI Service: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for interrupt
trap 'kill $AI_PID $BACKEND_PID $FRONTEND_PID' INT
wait
```

## 📦 Dependencies

### Backend Dependencies (`backend/package.json`)
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "axios": "^1.5.0"
  }
}
```

### Frontend Dependencies (`frontend/package.json`)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.15.0",
    "react-i18next": "^13.2.2",
    "i18next": "^23.5.1",
    "axios": "^1.5.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.3",
    "vite": "^4.4.5",
    "eslint": "^8.45.0"
  }
}
```

### AI Service Dependencies (`ai/requirements.txt`)
```txt
Flask==2.3.3
Flask-CORS==4.0.0
requests==2.31.0
python-dotenv==1.0.0
numpy==1.24.3
pandas==2.0.3
```

## 🔧 Configuration Files

### Environment Variables
- **Backend**: `backend/.env` (create from `.env.example`)
- **AI Service**: `ai/.env` (optional)

### Build Configuration
- **Frontend**: `frontend/vite.config.js`
- **Linting**: `frontend/eslint.config.js`

### Docker
- **Orchestration**: `docker-compose.yml`
- **Individual services**: `*/Dockerfile`

## 🗂️ File Types and Purposes

### Source Code Files
- **`.jsx`**: React components and pages
- **`.js`**: JavaScript utilities and configuration
- **`.py`**: Python AI service and algorithms
- **`.css`**: Styling and responsive design

### Configuration Files
- **`.json`**: Package dependencies and translations
- **`.yml`**: Docker orchestration
- **`.env`**: Environment variables
- **`.config.js`**: Build and tool configuration

### Documentation Files
- **`.md`**: Markdown documentation
- **`README.md`**: Main project documentation

### Build and Deployment
- **`Dockerfile`**: Container definitions
- **`package-lock.json`**: Dependency locks
- **`requirements.txt`**: Python dependencies

## 🚫 Ignored Files (`.gitignore`)

### Root `.gitignore`
```
node_modules/
__pycache__/
*.pyc
.env
.DS_Store
*.log
dist/
build/
venv/
```

### Frontend-specific ignores
```
# Logs
logs
*.log
npm-debug.log*

# Dependencies
node_modules/

# Build outputs
dist/
build/

# Environment
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
```

### Backend-specific ignores
```
node_modules/
.env
*.log
uploads/
temp/
```

## 📊 Project Statistics

- **Total Languages**: 9 (EN, HI, MR, TA, TE, KN, GU, PA, BN)
- **Frontend Components**: 15+ React components
- **API Endpoints**: 20+ REST endpoints
- **AI Models**: 3 advisory modes + pest detection
- **Documentation Files**: 8 comprehensive guides
- **Configuration Files**: 10+ config files
- **Total Lines of Code**: 5000+ lines

## 🔄 Development Workflow

1. **Setup**: Clone repo and install dependencies
2. **Development**: Use startup scripts for local development
3. **Testing**: Manual testing across devices and languages
4. **Documentation**: Update relevant docs for changes
5. **Deployment**: Use Docker for production deployment

This structure ensures a clean, maintainable, and scalable codebase that supports the comprehensive CropCare agricultural platform.