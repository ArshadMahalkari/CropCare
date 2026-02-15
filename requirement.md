# CropCare - System Requirements & Dependencies

## 📋 Overview

CropCare is an AI-powered agricultural decision-support platform built with a modern full-stack architecture. This document outlines all system requirements, dependencies, and technical specifications needed to run the application.

## 🖥️ System Requirements

### Minimum Hardware Requirements
- **CPU**: 2-core processor (Intel i3 or AMD equivalent)
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free disk space
- **Network**: Stable internet connection for weather data and translations

### Recommended Hardware Requirements
- **CPU**: 4-core processor (Intel i5 or AMD Ryzen 5)
- **RAM**: 8GB or higher
- **Storage**: 5GB free disk space (SSD preferred)
- **Network**: Broadband internet connection

### Operating System Support
- **Windows**: Windows 10 or later
- **macOS**: macOS 10.15 (Catalina) or later
- **Linux**: Ubuntu 20.04+, CentOS 8+, Debian 11+

## 🛠️ Software Dependencies

### Core Runtime Requirements

#### Node.js Environment
- **Node.js**: v18.0.0 or higher (v20.x LTS recommended)
- **npm**: v8.0.0 or higher (comes with Node.js)
- **Package Manager**: npm or yarn

#### Python Environment
- **Python**: v3.10 or higher (v3.11+ recommended)
- **pip**: Latest version
- **Virtual Environment**: venv or conda (recommended)

#### Database
- **MongoDB**: v6.0 or higher (v7.0+ recommended)
- **Connection**: Local installation or MongoDB Atlas cloud

### Development Tools (Optional)
- **Git**: v2.30 or higher
- **Docker**: v20.10 or higher (for containerized deployment)
- **Docker Compose**: v2.0 or higher
- **Code Editor**: VS Code, WebStorm, or similar

## 📦 Frontend Dependencies

### Core Framework & Libraries
```json
{
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "react-router-dom": "6.22.3"
}
```

### UI & Visualization
```json
{
  "@react-three/drei": "^9.88.13",
  "@react-three/fiber": "^8.15.19",
  "three": "^0.155.0"
}
```

### Internationalization
```json
{
  "i18next": "^23.0.1",
  "react-i18next": "^13.0.2"
}
```

### HTTP Client
```json
{
  "axios": "^1.6.7"
}
```

### Development Dependencies
```json
{
  "@vitejs/plugin-react": "^5.1.1",
  "vite": "^7.2.4",
  "eslint": "^9.39.1",
  "@eslint/js": "^9.39.1",
  "eslint-plugin-react-hooks": "^7.0.1",
  "eslint-plugin-react-refresh": "^0.4.24"
}
```

**Total Frontend Dependencies**: 15 packages

## 🔧 Backend Dependencies

### Core Framework
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "dotenv": "^16.0.0"
}
```

### Database & Authentication
```json
{
  "mongoose": "^7.0.0",
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.3"
}
```

### Validation & File Handling
```json
{
  "express-validator": "^6.15.0",
  "multer": "1.4.5-lts.1"
}
```

### External Services
```json
{
  "axios": "^1.6.0",
  "python-shell": "^5.0.0",
  "openai": "^6.15.0"
}
```

**Total Backend Dependencies**: 11 packages

## 🤖 AI Service Dependencies

### Core Framework
```txt
flask==3.0.0
flask-cors==4.0.0
```

### Data Processing
```txt
numpy==1.24.3
pandas==2.0.3
```

### HTTP & Configuration
```txt
requests==2.31.0
python-dotenv==1.0.0
```

**Total AI Service Dependencies**: 6 packages

## 🌐 External Services & APIs

### Required External Services
- **MongoDB**: Database storage (local or MongoDB Atlas)
- **Weather API**: Real-time weather data integration
- **Translation Service**: Argos Open Tech translation API (optional)

### Optional External Services
- **OpenAI API**: For enhanced AI capabilities (future feature)
- **SMS/Email Service**: For notifications (future feature)
- **Cloud Storage**: For image uploads (future feature)

## 🔒 Security Requirements

### Authentication & Authorization
- **JWT Tokens**: For stateless authentication
- **Password Hashing**: bcryptjs with salt rounds
- **CORS Protection**: Configured for specific origins
- **Input Validation**: express-validator for all inputs

### Environment Variables
```env
# Backend (.env)
MONGO_URI=mongodb://localhost:27017/cropcare
JWT_SECRET=your-super-secret-jwt-key
AI_URL=http://localhost:8000
PYTHON_PATH=python

# AI Service (.env)
FLASK_ENV=development
FLASK_DEBUG=1
PORT=8000
HOST=127.0.0.1
```

## 🚀 Deployment Requirements

### Development Environment
- **Frontend**: Vite dev server (http://localhost:5173)
- **Backend**: Node.js Express server (http://localhost:5000)
- **AI Service**: Flask development server (http://localhost:8000)
- **Database**: Local MongoDB (mongodb://localhost:27017)

### Production Environment
- **Web Server**: Nginx (reverse proxy)
- **Process Manager**: PM2 for Node.js processes
- **WSGI Server**: Gunicorn for Python Flask app
- **SSL Certificate**: Let's Encrypt or commercial SSL
- **Domain**: Registered domain name with DNS configuration

### Docker Requirements (Alternative)
```yaml
services:
  - mongo:6 (MongoDB database)
  - python:3.11-slim (AI service)
  - node:20-alpine (Backend service)
  - nginx:alpine (Frontend service)
```

## 📊 Performance Requirements

### Response Time Targets
- **Advisory Generation**: < 3 seconds
- **Pest Detection**: < 2 seconds
- **Chat Response**: < 1 second
- **Page Load**: < 2 seconds

### Concurrent Users
- **Development**: 10-50 concurrent users
- **Production**: 100-1000 concurrent users (scalable)

### Data Storage
- **User Data**: ~1KB per user
- **Advisory History**: ~5KB per advisory
- **Expected Growth**: 10,000 users, 100,000 advisories

## 🌍 Browser Compatibility

### Supported Browsers
- **Chrome**: v90+ (recommended)
- **Firefox**: v88+
- **Safari**: v14+
- **Edge**: v90+
- **Mobile Safari**: iOS 14+
- **Chrome Mobile**: Android 8+

### Required Browser Features
- **ES6+ Support**: Modern JavaScript features
- **WebGL**: For 3D visualizations
- **Local Storage**: For user preferences
- **Geolocation API**: For location-based features
- **Speech Synthesis**: For voice features

## 📱 Mobile Requirements

### Supported Devices
- **iOS**: iPhone 8+ (iOS 14+)
- **Android**: Android 8+ (API level 26+)
- **Screen Sizes**: 320px - 1920px width
- **Touch Support**: Optimized for touch interfaces

### Mobile-Specific Features
- **Responsive Design**: Mobile-first approach
- **Touch Targets**: Minimum 44px touch targets
- **Offline Support**: Basic offline functionality
- **PWA Ready**: Progressive Web App capabilities

## 🔧 Installation Prerequisites

### Before Installation
1. **Check Node.js**: `node --version` (should be v18+)
2. **Check Python**: `python --version` (should be v3.10+)
3. **Check MongoDB**: `mongosh` or `mongo` (should connect)
4. **Check Git**: `git --version` (for cloning repository)

### Installation Commands
```bash
# Clone repository
git clone https://github.com/yourusername/CropCare.git
cd CropCare

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install

# Install AI service dependencies
cd ../ai && pip install -r requirements.txt
```

## 🚨 Common Issues & Solutions

### Port Conflicts
- **Frontend**: Default port 5173 (configurable in vite.config.js)
- **Backend**: Default port 5000 (configurable in .env)
- **AI Service**: Default port 8000 (configurable in .env)
- **MongoDB**: Default port 27017

### Memory Requirements
- **Development**: 2GB RAM minimum
- **Production**: 4GB RAM minimum
- **Heavy Load**: 8GB+ RAM recommended

### Network Requirements
- **Outbound HTTP/HTTPS**: For weather API and translations
- **MongoDB Connection**: Local or remote database access
- **CDN Access**: For external libraries and fonts

## 📈 Scalability Considerations

### Horizontal Scaling
- **Load Balancer**: Nginx or HAProxy
- **Multiple Backend Instances**: PM2 cluster mode
- **Database Replication**: MongoDB replica sets
- **Caching Layer**: Redis for session storage

### Vertical Scaling
- **CPU**: Multi-core processors for concurrent requests
- **RAM**: Additional memory for caching and processing
- **Storage**: SSD for faster database operations
- **Network**: High-bandwidth connection for API calls

## 🔍 Monitoring Requirements

### Application Monitoring
- **Health Checks**: /api/health endpoint
- **Error Tracking**: Sentry or similar service
- **Performance Monitoring**: New Relic or Datadog
- **Uptime Monitoring**: UptimeRobot or Pingdom

### System Monitoring
- **CPU Usage**: < 80% average
- **Memory Usage**: < 85% average
- **Disk Usage**: < 90% capacity
- **Network Latency**: < 100ms average

## 📋 Compliance & Standards

### Web Standards
- **HTML5**: Semantic markup
- **CSS3**: Modern styling features
- **ES6+**: Modern JavaScript
- **WCAG 2.1 AA**: Accessibility compliance

### Security Standards
- **HTTPS**: SSL/TLS encryption
- **JWT**: Secure token-based authentication
- **Input Validation**: Prevent injection attacks
- **CORS**: Cross-origin resource sharing

### Code Quality
- **ESLint**: JavaScript linting
- **Prettier**: Code formatting
- **Git Hooks**: Pre-commit validation
- **Documentation**: Comprehensive code comments

---

## 📞 Support & Resources

For technical support or questions about requirements:
- **Documentation**: Check docs/ folder
- **Issues**: GitHub Issues tracker
- **Community**: Developer community forums
- **Email**: support@cropcare.com

---

*Last Updated: January 2026*
*Version: 1.0.0*