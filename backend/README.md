# AyurSutra Backend

A comprehensive backend API for the AyurSutra healthcare management system built with Prisma and PostgreSQL.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database (NeonDB recommended)
- Google Cloud Console account (for OAuth)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   # Database (NeonDB PostgreSQL)
   DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/ayursutra?sslmode=require
   
   # JWT Secrets (generate strong secrets)
   JWT_SECRET=your-super-secret-jwt-key
   JWT_REFRESH_SECRET=your-refresh-secret-key
   
   # Google OAuth (get from Google Cloud Console)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

3. **Set up the database:**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database (for development)
   npm run db:push
   
   # Or run migrations (for production)
   npm run db:migrate
   ```

4. **Run the server:**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📊 API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/signin` - User login
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/logout` - Logout
- `GET /api/v1/auth/google` - Google OAuth
- `GET /api/v1/auth/google/callback` - Google OAuth callback
- `POST /api/v1/auth/refresh-token` - Refresh JWT token

### User Management
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update user profile
- `PUT /api/v1/users/change-password` - Change password
- `GET /api/v1/users` - Get all users (admin)
- `GET /api/v1/users/:id` - Get user by ID (admin)
- `PUT /api/v1/users/:id/status` - Update user status (admin)

### Dashboard
- `GET /api/v1/dashboard/patient` - Patient dashboard data
- `GET /api/v1/dashboard/practitioner` - Practitioner dashboard data
- `GET /api/v1/dashboard/admin` - Admin dashboard data
- `GET /api/v1/dashboard/analytics` - Analytics data (admin)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 6969 |
| `NODE_ENV` | Environment | development |
| `DATABASE_URL` | PostgreSQL connection string | postgresql://user:pass@host:port/db |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_REFRESH_SECRET` | JWT refresh secret | - |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | - |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | - |
| `FRONTEND_URL` | Frontend URL | http://localhost:5173 |

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:6969/api/v1/auth/google/callback` (development)
   - `https://yourdomain.com/api/v1/auth/google/callback` (production)

## 🗄️ Database Schema

### User Model (Prisma)
```prisma
model User {
  id        String   @id @default(uuid())
  fullName  String   @db.VarChar(100)
  email     String   @unique
  password  String
  role      Role     @default(PATIENT)
  avatar    String?
  isEmailVerified Boolean @default(false)
  googleId String? @unique
  profile   Json
  preferences Json
  isActive  Boolean  @default(true)
  lastLogin DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  PATIENT
  PRACTITIONER
  ADMIN
}
```

## 🔒 Security Features

- **JWT Authentication** with refresh tokens
- **Password hashing** with bcrypt
- **Rate limiting** to prevent abuse
- **CORS** configuration
- **Helmet** security headers
- **Input validation** with express-validator
- **Role-based access control**

## 🧪 Testing

Test the API endpoints:

```bash
# Health check
curl http://localhost:6969/health

# Signup
curl -X POST http://localhost:6969/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","password":"password123","role":"patient"}'

# Signin
curl -X POST http://localhost:6969/api/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 📝 Development

### Project Structure
```
backend/
├── prisma/
│   └── schema.prisma   # Database schema
├── src/
│   ├── controllers/    # Route handlers
│   ├── middleware/     # Custom middleware
│   ├── services/       # Business logic services
│   ├── routes/         # API routes
│   ├── config/         # Configuration files
│   └── utils/          # Utility functions
├── server.js           # Main server file
├── .env               # Environment variables
└── package.json       # Dependencies
```

### Adding New Features

1. **Update schema** in `prisma/schema.prisma`
2. **Create service** in `src/services/`
3. **Add controller** in `src/controllers/`
4. **Define routes** in `src/routes/`
5. **Add validation** in `src/middleware/validation.js`
6. **Run migration** with `npm run db:migrate`

## 🚀 Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT secrets
- [ ] Configure PostgreSQL production database (NeonDB)
- [ ] Run `npm run db:migrate` for production migrations
- [ ] Set up HTTPS
- [ ] Configure production Google OAuth
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 6969
CMD ["npm", "start"]
```

## 📞 Support

For issues and questions:
- Check the logs: `npm run dev`
- Verify environment variables
- Ensure MongoDB is running
- Check Google OAuth configuration

## 🔄 Integration with Frontend

The backend is designed to work seamlessly with the AyurSutra React frontend. Make sure:

1. Frontend `VITE_API_URL` points to backend URL
2. CORS is configured for frontend domain
3. JWT tokens are properly handled
4. Google OAuth redirects to correct frontend URL
