# AI Code Mentor - Backend

## Overview
Node.js/Express backend for the AI Code Mentor platform. Handles authentication, code submission, and AI review orchestration.

## Tech Stack
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Project Structure
```
server/
├── config/          # Database configuration
├── controllers/     # Route handlers (business logic)
├── models/          # Mongoose schemas
├── routes/          # API route definitions
├── middleware/      # Auth, rate limiting
├── services/        # AI service, validation
├── utils/           # Prompt templates
├── app.js           # Express app configuration
└── server.js        # Entry point
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the server directory:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-code-mentor
JWT_SECRET=your_super_secret_jwt_key_here
CLIENT_URL=http://localhost:5173

# AI Service Configuration
AI_API_KEY=your_api_key_here
AI_API_ENDPOINT=https://api.openai.com/v1/chat/completions
AI_MODEL=gpt-4
```

### 3. Start MongoDB
Ensure MongoDB is running locally or use MongoDB Atlas.

### 4. Run the Server
```bash
# Development mode (auto-reload)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Code Review
- `POST /api/review/submit` - Submit code for review (protected)
- `GET /api/review/history` - Get submission history (protected)
- `GET /api/review/:id` - Get specific submission (protected)

### Health Check
- `GET /health` - Server health status

## Key Features

### Authentication
- JWT-based authentication
- Secure password hashing with bcrypt
- Protected routes with middleware

### Rate Limiting
- AI endpoints: 10 requests per 15 minutes
- Auth endpoints: 5 requests per 15 minutes

### AI Service Integration
- Structured prompt engineering
- JSON validation and parsing
- Graceful error handling
- Treats AI as unreliable external service

### Code Validation
- Input sanitization
- Length limits
- Language validation
- Basic security checks

## Interview Talking Points

1. **Clean Architecture**: Separation of concerns with models, controllers, services
2. **AI as a Service**: AI is isolated and treated as external dependency
3. **Error Handling**: Comprehensive try-catch blocks and validation
4. **Security**: JWT auth, rate limiting, input validation
5. **Scalability**: MongoDB indexing, pagination support

## Development Notes
- All passwords are hashed before storage
- JWT tokens expire after 7 days
- AI responses are validated and have fallback handling
- Database queries are optimized with indexes
