# 🌾 CropCare - AI-Powered Agricultural Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)

**CropCare** is a comprehensive AI-powered agricultural decision-support platform designed specifically for Indian farmers. It provides personalized, explainable, and farmer-friendly crop advisory services with multilingual support, weather intelligence, and three distinct advisory modes.

## 🌟 Key Features

### 🤖 **AI-Powered Advisory System**
- **Three Advisory Modes**: Economical, Environment-friendly, and Balanced approaches
- **Explainable AI**: Clear reasoning behind every recommendation
- **Weather Integration**: Real-time weather data influences advisory decisions
- **Crop-Specific Guidance**: Tailored advice for Rice, Cotton, Wheat, and Maize

### 🌍 **Multilingual Support**
- **9 Indian Languages**: English, Hindi, Marathi, Tamil, Telugu, Kannada, Gujarati, Punjabi, Bengali
- **Native Script Support**: Proper rendering of Devanagari, Tamil, Telugu, and other scripts
- **Voice Support**: Text-to-speech in multiple languages
- **Cultural Adaptation**: Language-appropriate content and formatting

### 📱 **Farmer-Friendly Design**
- **Mobile-First**: Optimized for smartphones with large touch targets
- **Responsive Design**: Works seamlessly across all device sizes
- **Professional UI**: Clean, modern interface suitable for agricultural use
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation

### 🔧 **Advanced Features**
- **Pest Detection**: AI-powered pest and disease identification
- **Interactive Chat**: 24/7 AI assistant for farming questions
- **Weather Intelligence**: Real-time weather integration
- **User History**: Track and save advisory recommendations
- **Voice Input/Output**: Hands-free interaction for field use

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   AI Service   │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (Python)      │
│                 │    │                 │    │                 │
│ • Responsive UI │    │ • REST API      │    │ • Advisory AI   │
│ • 9 Languages   │    │ • Authentication│    │ • Pest Detection│
│ • Voice Support │    │ • Data Storage  │    │ • Weather API   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack
- **Frontend**: React 18, Vite, i18next, CSS3
- **Backend**: Node.js, Express, JWT Authentication
- **AI Service**: Python, Flask, Rule-based Expert System
- **Database**: MongoDB (configurable)
- **Deployment**: Docker, Docker Compose

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.8+ and pip
- **Git** for version control

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/cropcare.git
cd cropcare
```

### 2. Install Dependencies

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
cd ..
```

#### Frontend Setup
```bash
cd frontend
npm install
cd ..
```

#### AI Service Setup
```bash
cd ai
pip install -r requirements.txt
cd ..
```

### 3. Start the Application

#### Option A: Using Startup Scripts (Recommended)
**Windows:**
```bash
start-cropcare.bat
```

**Linux/Mac:**
```bash
chmod +x start-cropcare.sh
./start-cropcare.sh
```

#### Option B: Manual Start
```bash
# Terminal 1 - AI Service
cd ai
python app.py

# Terminal 2 - Backend
cd backend
npm start

# Terminal 3 - Frontend
cd frontend
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **AI Service**: http://localhost:8000

## 📖 Documentation

### Core Documentation
- **[API Documentation](docs/API.md)** - Complete API reference
- **[Architecture Guide](docs/ARCHITECTURE.md)** - System design and architecture
- **[Setup Guide](docs/SETUP.md)** - Detailed installation instructions
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Production deployment guide
- **[Contributing Guide](docs/CONTRIBUTING.md)** - How to contribute to the project

### Design Documentation
- **[UI/UX Improvements](docs/UI_UX_IMPROVEMENTS.md)** - Design system and improvements
- **[Responsive Design Guide](docs/RESPONSIVE_DESIGN_GUIDE.md)** - Mobile-first design implementation

## 🎯 Advisory Modes

### 💰 Economical Mode
- **Focus**: Cost minimization and resource optimization
- **Benefits**: 25-30% cost reduction, optimized resource usage, quick ROI
- **Best For**: Budget-conscious farmers, marginal land cultivation

### 🌱 Environment-Friendly Mode
- **Focus**: Sustainable and organic farming practices
- **Benefits**: 100% organic inputs, soil health improvement, chemical-free farming
- **Best For**: Organic certification, long-term sustainability goals

### ⚖️ Balanced Mode
- **Focus**: Optimal balance of cost and sustainability
- **Benefits**: Best risk-reward ratio, 90-95% yield potential
- **Best For**: Most farmers seeking optimal results

## 🌐 Language Support

| Language | Code | Script | Status |
|----------|------|--------|--------|
| English | EN | Latin | ✅ Complete |
| Hindi | HI | Devanagari | ✅ Complete |
| Marathi | MR | Devanagari | ✅ Complete |
| Tamil | TA | Tamil | ✅ Complete |
| Telugu | TE | Telugu | ✅ Complete |
| Kannada | KN | Kannada | ✅ Complete |
| Gujarati | GU | Gujarati | ✅ Complete |
| Punjabi | PA | Gurmukhi | ✅ Complete |
| Bengali | BN | Bengali | ✅ Complete |

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-jwt-secret
MONGODB_URI=mongodb://localhost:27017/cropcare
AI_SERVICE_URL=http://localhost:8000
WEATHER_API_KEY=your-weather-api-key
```

#### AI Service
```env
FLASK_PORT=8000
FLASK_ENV=development
WEATHER_API_KEY=your-weather-api-key
```

## 🧪 Testing

### Run Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# AI service tests
cd ai
python -m pytest
```

### Manual Testing
1. **Language Switching**: Test all 9 languages
2. **Responsive Design**: Test on mobile, tablet, desktop
3. **Advisory Modes**: Test all three advisory approaches
4. **Voice Features**: Test voice input/output
5. **Offline Functionality**: Test basic offline capabilities

## 📱 Mobile Optimization

### Touch-Friendly Design
- **Minimum Touch Targets**: 48px × 48px
- **Large Buttons**: Easy-to-tap interface elements
- **Optimized Forms**: Mobile-friendly input fields
- **Gesture Support**: Swipe and touch interactions

### Performance
- **Fast Loading**: Optimized assets and efficient code
- **Offline Support**: Basic functionality without internet
- **Progressive Enhancement**: Works on all devices
- **Battery Efficient**: Minimal resource usage

## 🔒 Security Features

- **JWT Authentication**: Secure user authentication
- **Input Validation**: Comprehensive data validation
- **CORS Protection**: Cross-origin request security
- **Rate Limiting**: API abuse prevention
- **Data Encryption**: Sensitive data protection

## 🚀 Deployment

### Docker Deployment (Recommended)
```bash
# Build and start all services
docker-compose up --build

# Production deployment
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Deployment
See [Deployment Guide](docs/DEPLOYMENT.md) for detailed instructions.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Standards
- **ESLint**: JavaScript/React code linting
- **Prettier**: Code formatting
- **Conventional Commits**: Commit message format
- **Documentation**: Update docs for new features

## 📊 Performance Metrics

### Target Performance
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Achieved Results
- ✅ **Mobile-First**: Optimized for smartphone usage
- ✅ **Fast Loading**: Sub-2s load times
- ✅ **Accessible**: WCAG 2.1 AA compliant
- ✅ **Cross-Browser**: Works on all modern browsers
- ✅ **Multilingual**: 9 Indian languages supported

## 🐛 Troubleshooting

### Common Issues

#### Services Not Starting
```bash
# Check if ports are available
netstat -an | findstr :5000
netstat -an | findstr :5173
netstat -an | findstr :8000

# Kill processes if needed
taskkill /f /im node.exe
taskkill /f /im python.exe
```

#### Language Not Displaying
1. Check browser language settings
2. Clear browser cache
3. Verify font loading in DevTools
4. Check console for JavaScript errors

#### API Connection Issues
1. Verify backend is running on port 5000
2. Check CORS configuration
3. Verify API endpoints in network tab
4. Check backend logs for errors

## 📞 Support

### Getting Help
- **Documentation**: Check the docs/ folder
- **Issues**: Create a GitHub issue
- **Discussions**: Use GitHub Discussions
- **Email**: support@cropcare.com (if applicable)

### Reporting Bugs
Please include:
- Operating system and version
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Indian Farmers**: For inspiring this project
- **Agricultural Experts**: For domain knowledge
- **Open Source Community**: For tools and libraries
- **Contributors**: For making this project better

## 🔮 Future Roadmap

### Planned Features
- **Machine Learning Models**: Advanced AI predictions
- **Satellite Imagery**: Crop monitoring from space
- **Market Prices**: Real-time commodity pricing
- **Community Features**: Farmer-to-farmer knowledge sharing
- **IoT Integration**: Sensor data integration
- **Blockchain**: Supply chain transparency

### Version History
- **v1.0.0**: Initial release with core features
- **v1.1.0**: Added responsive design and 9 languages
- **v1.2.0**: Enhanced AI advisory system
- **Current**: Comprehensive farmer-friendly platform

---

**Built with ❤️ for Indian farmers** | **Available in 9 Indian languages** | **Mobile-first design**