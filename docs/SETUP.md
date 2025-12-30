# CropCare Setup Guide

Complete setup guide for the CropCare project.

## Table of Contents

- [System Requirements](#system-requirements)
- [Installation Steps](#installation-steps)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Troubleshooting](#troubleshooting)

## System Requirements

### Minimum Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **Node.js**: v18.0.0 or higher
- **Python**: v3.10 or higher
- **MongoDB**: v6.0 or higher (or use Docker)
- **RAM**: 4GB minimum, 8GB recommended
- **Disk Space**: 2GB free space

### Recommended Requirements

- **Node.js**: v20.x LTS
- **Python**: v3.11+
- **MongoDB**: v7.0+
- **RAM**: 8GB+
- **Disk Space**: 5GB+

## Installation Steps

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/CropCare.git
cd CropCare
```

### Step 2: Install Node.js Dependencies

#### Frontend
```bash
cd frontend
npm install
cd ..
```

#### Backend
```bash
cd backend
npm install
cd ..
```

### Step 3: Install Python Dependencies

```bash
cd ai
pip install -r requirements.txt
# Or use virtual environment:
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### Step 4: Setup MongoDB

#### Option A: Local MongoDB Installation

**Windows:**
1. Download MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install and start MongoDB service
3. MongoDB will run on `mongodb://localhost:27017`

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

#### Option B: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create database user
4. Whitelist your IP address
5. Get connection string
6. Update `MONGO_URI` in `backend/.env`

#### Option C: Docker

```bash
docker run -d -p 27017:27017 --name mongodb mongo:6
```

### Step 5: Environment Configuration

Create environment files:

#### Backend Environment (`backend/.env`)

```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/cropcare

# JWT Secret (use a strong random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# AI Service URL
AI_URL=http://localhost:8000

# Python Path (optional, auto-detected)
PYTHON_PATH=python
```

#### AI Service Environment (`ai/.env`)

```env
# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=1
PORT=8000
HOST=127.0.0.1
```

## Configuration

### MongoDB Connection

**Local MongoDB:**
```env
MONGO_URI=mongodb://localhost:27017/cropcare
```

**MongoDB Atlas:**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/cropcare?retryWrites=true&w=majority
```

### JWT Secret

Generate a secure JWT secret:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32
```

### Python Path

**Windows:**
```env
PYTHON_PATH=python
```

**Linux/macOS:**
```env
PYTHON_PATH=python3
```

## Running the Application

### Development Mode

#### Terminal 1: AI Service
```bash
cd ai
python app.py
```
✅ AI Service running on `http://localhost:8000`

#### Terminal 2: Backend
```bash
cd backend
node index.js
```
✅ Backend running on `http://localhost:5000`

#### Terminal 3: Frontend
```bash
cd frontend
npm run dev
```
✅ Frontend running on `http://localhost:5173`

### Production Mode

#### Using Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Manual Production Build

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

**Backend:**
```bash
cd backend
NODE_ENV=production node index.js
```

**AI Service:**
```bash
cd ai
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

## Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find process using port
# Windows
netstat -ano | findstr :5000

# Linux/macOS
lsof -i :5000

# Kill process
# Windows
taskkill /PID <pid> /F

# Linux/macOS
kill -9 <pid>
```

#### 2. MongoDB Connection Failed

**Error:** `MongoDB connection error`

**Solutions:**
- Check if MongoDB is running: `mongosh` or `mongo`
- Verify connection string in `.env`
- Check firewall settings
- For MongoDB Atlas: verify IP whitelist

#### 3. Python Module Not Found

**Error:** `ModuleNotFoundError: No module named 'flask'`

**Solution:**
```bash
cd ai
pip install -r requirements.txt
```

#### 4. Node Modules Issues

**Error:** `Cannot find module`

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 5. CORS Errors

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Verify backend CORS is enabled
- Check frontend API base URL
- Ensure backend is running

#### 6. JWT Token Errors

**Error:** `Unauthorized` or `Invalid token`

**Solution:**
- Clear browser localStorage
- Login again to get new token
- Verify JWT_SECRET is set correctly

### Verification Checklist

- [ ] Node.js installed (`node --version`)
- [ ] Python installed (`python --version`)
- [ ] MongoDB running (`mongosh` or check service)
- [ ] All dependencies installed
- [ ] Environment files created
- [ ] All services can start without errors
- [ ] Frontend accessible at `http://localhost:5173`
- [ ] Backend accessible at `http://localhost:5000`
- [ ] AI service accessible at `http://localhost:8000`

## Next Steps

After setup is complete:

1. Open `http://localhost:5173` in your browser
2. Create a user account
3. Test the features:
   - Get crop advisory
   - Use chatbot
   - Detect pests
   - View history

## Getting Help

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review error logs in terminal
3. Check [GitHub Issues](https://github.com/yourusername/CropCare/issues)
4. Create a new issue with error details

---

Happy farming! 🌾

