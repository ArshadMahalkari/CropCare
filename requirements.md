# 🌱 CropCare – System Requirements & Dependencies

CropCare is an AI-powered agricultural decision-support platform designed with a modern, scalable full-stack architecture.
This document defines **all technical requirements, dependencies, environments, and deployment standards** required to build, run, and scale the application.

---

## 🖥️ 1. System Requirements

### 🔹 Minimum Hardware
- **CPU**: Dual-core (Intel i3 / AMD equivalent)
- **RAM**: 4 GB (8 GB recommended)
- **Storage**: 2 GB free space
- **Network**: Stable internet connection

### 🔹 Recommended Hardware
- **CPU**: Quad-core (Intel i5 / Ryzen 5)
- **RAM**: 8 GB+
- **Storage**: 5 GB SSD
- **Network**: Broadband connection

### 🔹 Supported Operating Systems
- Windows 10+
- macOS 10.15+
- Linux (Ubuntu 20.04+, Debian 11+, CentOS 8+)

---

## 🛠️ 2. Core Runtime Environment

### Node.js
- Node.js ≥ 18 (20 LTS recommended)
- npm ≥ 8
- Package manager: npm / yarn

### Python
- Python ≥ 3.10 (3.11 recommended)
- pip (latest)
- venv / conda (recommended)

### Database
- MongoDB ≥ 6.0 (Local or MongoDB Atlas)

---

## 🎨 3. Frontend Dependencies

```json
{
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "react-router-dom": "6.22.3",
  "axios": "^1.6.7",
  "i18next": "^23.0.1",
  "react-i18next": "^13.0.2",
  "@react-three/fiber": "^8.15.19",
  "@react-three/drei": "^9.88.13",
  "three": "^0.155.0"
}
```

### Development Tools
```json
{
  "vite": "^7.2.4",
  "@vitejs/plugin-react": "^5.1.1",
  "eslint": "^9.39.1",
  "@eslint/js": "^9.39.1",
  "eslint-plugin-react-hooks": "^7.0.1",
  "eslint-plugin-react-refresh": "^0.4.24"
}
```

## 🔧 4. Backend Dependencies

```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "dotenv": "^16.0.0",
  "mongoose": "^7.0.0",
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.3",
  "express-validator": "^6.15.0",
  "multer": "1.4.5-lts.1",
  "axios": "^1.6.0",
  "python-shell": "^5.0.0",
  "openai": "^6.15.0"
}
```

## 🤖 5. AI Service Dependencies

```
flask==3.0.0
flask-cors==4.0.0
numpy==1.24.3
pandas==2.0.3
requests==2.31.0
python-dotenv==1.0.0
```

## 🔐 6. Environment Configuration

### Backend .env
```
MONGO_URI=mongodb://localhost:27017/cropcare
JWT_SECRET=your-secret-key
AI_URL=http://localhost:8000
PYTHON_PATH=python
```

### AI Service .env
```
FLASK_ENV=development
FLASK_DEBUG=1
PORT=8000
HOST=127.0.0.1
```

## 🚀 7. Installation

```bash
git clone https://github.com/yourusername/CropCare.git
cd CropCare

# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

# AI Service
cd ../ai
pip install -r requirements.txt
```

## 🌐 8. Local Development Ports

| Service      | Port |
|--------------|------|
| Frontend     | 5173 |
| Backend API  | 5000 |
| AI Service   | 8000 |
| MongoDB      | 27017 |

## 🏗️ 9. Production Stack

- Nginx – Reverse proxy
- PM2 – Node.js process manager
- Gunicorn – Python WSGI server
- Let’s Encrypt – SSL
- MongoDB Atlas – Database

### Docker Services
```yaml
services:
  - mongo:6
  - python:3.11-slim
  - node:20-alpine
  - nginx:alpine
```

## ⚡ 10. Performance Targets

| Feature         | Target |
|-----------------|--------|
| Advisory Engine | < 3s  |
| Pest Detection  | < 2s  |
| Chat Response   | < 1s  |
| Page Load      | < 2s  |

## 🌍 11. Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Android Chrome 8+
- iOS Safari 14+

**Required:**
- ES6+
- WebGL
- LocalStorage
- Geolocation API

## 📈 12. Scalability

- Nginx load balancing
- PM2 cluster mode
- MongoDB replica sets
- Redis (optional caching)

## 🔍 13. Monitoring

- /api/health endpoint
- Error tracking (Sentry)
- Performance monitoring (New Relic / Datadog)
- Uptime monitoring

**Last Updated:** January 2026  
**Version:** 1.0.0

This is **single-block, GitHub-ready, professional, and judge-friendly**.  
You can paste this directly into `requirements.md` and push it to your repository.
