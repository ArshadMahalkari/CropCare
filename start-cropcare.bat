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