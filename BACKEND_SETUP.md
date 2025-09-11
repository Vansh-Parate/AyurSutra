# AyurSutra Backend Setup Guide

This document outlines the complete backend setup required to make the AyurSutra authentication system fully functional.

## 🏗️ Backend Architecture Overview

The backend needs to support:
- **Authentication & Authorization** (JWT-based)
- **User Management** (Patient, Practitioner, Admin roles)
- **Google OAuth Integration**
- **API Endpoints** for all frontend functionality
- **Database** for user data and application state

## 📋 Required Backend Components

### 1. **Node.js/Express Server Setup**

#### Dependencies to Install:
```bash
npm install express cors helmet morgan
npm install jsonwebtoken bcryptjs
npm install passport passport-google-oauth20
npm install mongoose (for MongoDB) or pg (for PostgreSQL)
npm install dotenv
npm install express-rate-limit
npm install express-validator
npm install nodemailer (for email verification)
```

#### Basic Server Structure:
```
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── dashboardController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Appointment.js
│   │   └── Treatment.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── dashboard.js
│   ├── config/
│   │   ├── database.js
│   │   └── passport.js
│   └── utils/
│       ├── jwt.js
│       └── email.js
├── .env
└── server.js
```

### 2. **Database Schema (MongoDB Example)**

#### User Model:
```javascript
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['patient', 'practitioner', 'admin'], 
    default: 'patient' 
  },
  avatar: { type: String },
  isEmailVerified: { type: Boolean, default: false },
  googleId: { type: String },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
```

#### Additional Models Needed:
- **Appointment**: For scheduling system
- **Treatment**: For treatment plans and progress
- **Clinic**: For multi-clinic support
- **Session**: For tracking user sessions

### 3. **Required API Endpoints**

#### Authentication Endpoints:
```javascript
// POST /api/v1/auth/signup
// POST /api/v1/auth/signin
// POST /api/v1/auth/logout
// GET /api/v1/auth/me
// GET /api/v1/auth/google
// GET /api/v1/auth/google/callback
// POST /api/v1/auth/forgot-password
// POST /api/v1/auth/reset-password
// POST /api/v1/auth/verify-email
```

#### User Management Endpoints:
```javascript
// GET /api/v1/users/profile
// PUT /api/v1/users/profile
// GET /api/v1/users/appointments
// POST /api/v1/users/appointments
// GET /api/v1/users/treatments
// POST /api/v1/users/progress
```

#### Dashboard Endpoints:
```javascript
// GET /api/v1/dashboard/patient
// GET /api/v1/dashboard/practitioner
// GET /api/v1/dashboard/admin
// GET /api/v1/dashboard/analytics
```

### 4. **Environment Variables (.env)**

```env
# Server Configuration
PORT=6969
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ayursutra
# OR for PostgreSQL:
# DATABASE_URL=postgresql://username:password@localhost:5432/ayursutra

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRES_IN=30d

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:6969/api/v1/auth/google/callback

# Email Configuration (for verification/reset)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=AyurSutra <noreply@ayursutra.com>

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 5. **Authentication Middleware**

```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};
```

### 6. **Google OAuth Setup**

#### Google Cloud Console Configuration:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:6969/api/v1/auth/google/callback` (development)
   - `https://yourdomain.com/api/v1/auth/google/callback` (production)

#### Passport Configuration:
```javascript
// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user exists
    let user = await User.findOne({ googleId: profile.id });
    
    if (user) {
      return done(null, user);
    }
    
    // Check if user exists with same email
    user = await User.findOne({ email: profile.emails[0].value });
    
    if (user) {
      // Link Google account to existing user
      user.googleId = profile.id;
      await user.save();
      return done(null, user);
    }
    
    // Create new user
    user = await User.create({
      googleId: profile.id,
      fullName: profile.displayName,
      email: profile.emails[0].value,
      isEmailVerified: true,
      role: 'patient' // Default role
    });
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));
```

### 7. **Sample Controller Implementation**

#### Auth Controller:
```javascript
// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res) => {
  try {
    const { fullName, email, password, role = 'patient' } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: role || 'patient'
    });
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
```

### 8. **Security Considerations**

#### Essential Security Middleware:
```javascript
// server.js
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

// Security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
```

### 9. **Database Setup Commands**

#### MongoDB:
```bash
# Install MongoDB
# Windows: Download from https://www.mongodb.com/try/download/community
# macOS: brew install mongodb-community
# Ubuntu: sudo apt-get install mongodb

# Start MongoDB service
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Ubuntu: sudo systemctl start mongod

# Connect to MongoDB
mongosh
```

#### PostgreSQL:
```bash
# Install PostgreSQL
# Windows: Download from https://www.postgresql.org/download/windows/
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql postgresql-contrib

# Create database
createdb ayursutra

# Connect to database
psql ayursutra
```

### 10. **Deployment Considerations**

#### Production Environment Variables:
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ayursutra
JWT_SECRET=your-production-secret-key
GOOGLE_CLIENT_ID=your-production-google-client-id
GOOGLE_CLIENT_SECRET=your-production-google-client-secret
FRONTEND_URL=https://yourdomain.com
```

#### Docker Configuration (Optional):
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### 11. **Testing the Backend**

#### Test Endpoints:
```bash
# Test signup
curl -X POST http://localhost:6969/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","password":"password123"}'

# Test signin
curl -X POST http://localhost:6969/api/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test protected route
curl -X GET http://localhost:6969/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 12. **Frontend Integration**

The frontend is already configured to work with these endpoints. Make sure your backend server runs on:
- **Development**: `http://localhost:6969`
- **Production**: Update `VITE_API_URL` environment variable

## 🚀 Quick Start Commands

1. **Initialize Backend Project:**
```bash
mkdir ayursutra-backend
cd ayursutra-backend
npm init -y
npm install express cors helmet morgan jsonwebtoken bcryptjs passport passport-google-oauth20 mongoose dotenv express-rate-limit express-validator nodemailer
```

2. **Start Development Server:**
```bash
npm run dev
# or
node server.js
```

3. **Test Frontend Connection:**
```bash
# In frontend directory
npm run dev
# Navigate to http://localhost:5173
# Try signing up/signing in
```

## 📝 Additional Features to Implement

1. **Email Verification System**
2. **Password Reset Functionality**
3. **User Profile Management**
4. **Appointment Scheduling System**
5. **Treatment Progress Tracking**
6. **Admin Analytics Dashboard**
7. **File Upload for Documents/Images**
8. **Real-time Notifications (WebSocket)**
9. **API Documentation (Swagger)**
10. **Comprehensive Error Handling**

This setup provides a solid foundation for the AyurSutra authentication system and can be extended with additional features as needed.
