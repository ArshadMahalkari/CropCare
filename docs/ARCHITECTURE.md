# CropCare Architecture Documentation

Overview of the CropCare system architecture and design decisions.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│                    http://localhost:5173                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Home   │  │ Advisory │  │   Chat   │  │   Pest   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST API
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                    Backend (Node.js/Express)                 │
│                    http://localhost:5000                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Auth Routes │  │ Advisory API │  │  Chat API    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │   MongoDB    │  │  AI Service  │                        │
│  │  (Database)  │  │   (Flask)    │                        │
│  └──────────────┘  └──────────────┘                        │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                    AI Service (Flask)                       │
│                    http://localhost:8000                   │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │  Advisory    │  │   Pest       │                        │
│  │   Logic      │  │  Detection   │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

## Component Overview

### Frontend Layer

**Technology:** React 18 + Vite

**Key Components:**
- **Pages**: Home, Advisory, Chatbot, PestDetect, Login, Signup, History
- **Components**: Navbar, LanguageToggle, ProtectedRoute
- **Context**: AppContext (global state management)
- **API Client**: Axios with interceptors

**Features:**
- Client-side routing with React Router
- Internationalization (i18next)
- Responsive design
- JWT token management

### Backend Layer

**Technology:** Node.js + Express.js

**Structure:**
```
backend/
├── index.js           # Main server file
├── routes/            # API route handlers
│   ├── auth.js       # Authentication routes
│   └── advisory.js   # Advisory routes
├── models/            # MongoDB models
│   ├── User.js       # User schema
│   └── Advisory.js  # Advisory schema
└── middleware/        # Custom middleware
    └── auth.js       # JWT authentication
```

**Key Features:**
- RESTful API design
- JWT-based authentication
- MongoDB integration
- CORS enabled
- Error handling middleware

### AI Service Layer

**Technology:** Python + Flask

**Structure:**
```
ai/
├── app.py              # Flask application
├── advisory_logic.py   # Advisory algorithms
└── pest_detection.py   # Pest detection logic
```

**Key Features:**
- Rule-based advisory system
- Pest/disease detection
- Extensible for ML models

### Database Layer

**Technology:** MongoDB

**Collections:**
- **users**: User accounts and preferences
- **advisories**: Saved advisory history

**Schema:**
```javascript
User {
  name: String,
  email: String (unique),
  passwordHash: String,
  role: String (default: 'farmer'),
  preferences: {
    language: String,
    region: String
  }
}

Advisory {
  user: ObjectId (ref: User),
  input: {
    crop: String,
    soil: String,
    language: String
  },
  result: Object,
  notes: String,
  createdAt: Date
}
```

## Data Flow

### Advisory Request Flow

```
User → Frontend → Backend → AI Service → Backend → Frontend → User
 1. User selects crop/soil
 2. Frontend sends POST /api/advisory
 3. Backend forwards to AI service
 4. AI service processes and returns advice
 5. Backend optionally translates
 6. Frontend displays result
```

### Authentication Flow

```
User → Frontend → Backend → MongoDB → Backend → Frontend → User
 1. User submits credentials
 2. Frontend sends POST /api/auth/login
 3. Backend validates with MongoDB
 4. Backend generates JWT token
 5. Frontend stores token
 6. Token used for protected routes
```

### Chat Flow

```
User → Frontend → Backend → Frontend → User
 1. User sends message
 2. Frontend POST /api/chat
 3. Backend processes with pattern matching
 4. Backend optionally translates
 5. Frontend displays reply
```

## Security Architecture

### Authentication

- **JWT Tokens**: Stateless authentication
- **Password Hashing**: bcryptjs with salt rounds
- **Token Expiry**: 7 days
- **Protected Routes**: Middleware validation

### Data Protection

- **Environment Variables**: Sensitive data in .env files
- **CORS**: Configured for specific origins
- **Input Validation**: express-validator
- **Error Handling**: No sensitive data in errors

## API Design Patterns

### RESTful Conventions

- **GET**: Retrieve resources
- **POST**: Create resources
- **PUT/PATCH**: Update resources (future)
- **DELETE**: Remove resources (future)

### Response Format

**Success:**
```json
{
  "data": { ... }
}
```

**Error:**
```json
{
  "error": "Error message",
  "details": "Additional info"
}
```

## Scalability Considerations

### Current Architecture

- Monolithic backend
- Single MongoDB instance
- Direct Python script execution

### Future Improvements

1. **Microservices**: Split backend into services
2. **Caching**: Redis for frequently accessed data
3. **Load Balancing**: Multiple backend instances
4. **Database Sharding**: For large datasets
5. **Message Queue**: For async processing
6. **CDN**: For static assets

## Technology Choices

### Why React?

- Component-based architecture
- Large ecosystem
- Good performance
- Easy to learn

### Why Node.js/Express?

- JavaScript across stack
- Fast development
- Large package ecosystem
- Good for REST APIs

### Why MongoDB?

- Flexible schema
- Easy to scale
- Good for JSON data
- Free tier available

### Why Flask?

- Lightweight
- Easy Python integration
- Good for AI/ML
- Simple deployment

## Deployment Architecture

### Development

```
Local Machine
├── Frontend (Vite dev server)
├── Backend (Node.js)
├── AI Service (Flask)
└── MongoDB (Local or Atlas)
```

### Production (Docker)

```
Docker Compose
├── Frontend Container
├── Backend Container
├── AI Service Container
└── MongoDB Container
```

## Monitoring & Logging

### Current Implementation

- Console logging
- Error tracking in catch blocks
- MongoDB connection status

### Future Enhancements

- Structured logging (Winston)
- Error tracking (Sentry)
- Performance monitoring
- Health check endpoints

## Development Workflow

1. **Feature Development**: Create feature branch
2. **Testing**: Manual testing (automated tests future)
3. **Code Review**: Pull request review
4. **Deployment**: Docker compose or manual

## Future Architecture Plans

1. **API Gateway**: Centralized API management
2. **Service Mesh**: For microservices communication
3. **Event-Driven**: For real-time updates
4. **ML Pipeline**: For advanced AI features
5. **Mobile App**: React Native version

---

This architecture is designed to be simple, maintainable, and scalable.
