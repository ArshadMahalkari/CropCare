#!/bin/bash

echo "🌾 Starting CropCare - AI-Powered Agricultural Platform"
echo ""

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $1 is already in use"
        return 1
    else
        return 0
    fi
}

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "Starting MongoDB..."
    mongod --fork --logpath /var/log/mongodb.log --dbpath /var/lib/mongodb
    sleep 2
else
    echo "✅ MongoDB is already running"
fi

# Start AI Service
if check_port 8000; then
    echo "Starting AI Service (Python Flask)..."
    cd ai
    python3 app.py &
    AI_PID=$!
    cd ..
    sleep 2
fi

# Start Backend
if check_port 5000; then
    echo "Starting Backend (Node.js Express)..."
    cd backend
    node index.js &
    BACKEND_PID=$!
    cd ..
    sleep 2
fi

# Start Frontend
if check_port 5173; then
    echo "Starting Frontend (React Vite)..."
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..
fi

echo ""
echo "✅ CropCare is running!"
echo ""
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend: http://localhost:5000"
echo "🤖 AI Service: http://localhost:8000"
echo "🗄️ MongoDB: mongodb://localhost:27017"
echo ""
echo "Press Ctrl+C to stop all services"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping CropCare services..."
    
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
        echo "✅ Frontend stopped"
    fi
    
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        echo "✅ Backend stopped"
    fi
    
    if [ ! -z "$AI_PID" ]; then
        kill $AI_PID 2>/dev/null
        echo "✅ AI Service stopped"
    fi
    
    echo "👋 CropCare stopped successfully"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for user to stop
wait