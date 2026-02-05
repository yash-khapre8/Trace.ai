# Trace.ai - MERN + AI Code Review Platform

> A complete internship-level project demonstrating clean architecture, AI integration, and modern web development practices.

## 🎯 Project Overview

Trace.ai is a learning platform where students and interns can submit code and receive:
- **Code Quality Review** - Comprehensive analysis of code issues
- **Logical Issue Detection** - Identification of bugs and problems
- **Time & Space Complexity Analysis** - Performance metrics
- **Optimization Suggestions** - Actionable improvement recommendations
- **Learning-Focused Explanations** - Beginner-friendly guidance
- **Before vs After Comparisons** - Visual learning with code examples

## 🚀 Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Monaco Editor** - Professional code editor

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### AI Integration
- **OpenAI-compatible API** (AntiGravity LLM)
- Structured prompt engineering
- JSON-validated responses

## 📁 Project Structure

```
AIcodeMentor/
├── server/                 # Backend API
│   ├── config/            # Database configuration
│   ├── controllers/       # Business logic
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth & rate limiting
│   ├── services/          # AI service & validation
│   ├── utils/             # Prompt templates
│   ├── app.js            # Express app
│   └── server.js         # Entry point
│
└── client/                # Frontend React App
    ├── src/
    │   ├── components/   # Reusable UI components
    │   ├── pages/        # Route pages
    │   ├── services/     # API client
    │   ├── context/      # Global state
    │   └── styles/       # CSS files
    └── public/
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- AI API key (OpenAI or compatible)

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ai-code-mentor
   JWT_SECRET=your_secret_key_here
   CLIENT_URL=http://localhost:5173
   
   AI_API_KEY=your_api_key_here
   AI_API_ENDPOINT=https://api.openai.com/v1/chat/completions
   AI_MODEL=gpt-4
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

   Server runs at `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   App runs at `http://localhost:5173`

## 🎨 Features

### ✅ Authentication
- User signup with validation
- Secure login with JWT
- Password hashing with bcrypt
- Protected routes
- Persistent sessions

### ✅ Code Submission
- Multi-language support (JavaScript, Python, Java)
- Professional code editor (Monaco)
- Syntax highlighting
- Real-time editing

### ✅ AI Code Review
- Structured feedback format
- Issue categorization:
  - 🔴 Logic errors
  - 🟡 Performance issues
  - 🔵 Style problems
  - 🟢 Best practice violations
- Complexity analysis (Big-O notation)
- Actionable suggestions

### ✅ Learning Mode
- Before/After code comparison
- Detailed explanations for each change
- Beginner-friendly language
- Visual learning experience

### ✅ Dashboard
- Submission history
- Pagination
- Quick access to past reviews
- Status tracking (pending, completed, failed)

## 🏗️ Architecture Highlights

### Clean Separation of Concerns
- **Backend**: Models → Controllers → Routes → Services
- **Frontend**: Pages → Components → Services → Context

### AI as a Service
- Isolated AI logic in dedicated service
- Structured prompts with JSON validation
- Graceful error handling
- No business logic in prompts

### Security & Best Practices
- JWT-based authentication
- Rate limiting on AI endpoints (10 req/15min)
- Input validation and sanitization
- Password hashing
- Protected routes
- CORS configuration

### Error Handling
- Comprehensive try-catch blocks
- User-friendly error messages
- Fallback responses for AI failures
- Validation at multiple layers

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Code Review
- `POST /api/review/submit` - Submit code for review (protected)
- `GET /api/review/history` - Get submission history (protected)
- `GET /api/review/:id` - Get specific submission (protected)

## 💡 Interview Talking Points

### 1. **Clean Architecture**
- Separation of concerns across frontend and backend
- Modular folder structure
- Reusable components and services

### 2. **AI Integration Strategy**
- AI treated as external, potentially unreliable service
- Structured prompt engineering for consistent output
- JSON validation and parsing
- Fallback handling when AI fails

### 3. **Security Measures**
- JWT authentication
- Rate limiting to prevent abuse
- Input validation
- Password hashing
- Protected routes

### 4. **User Experience**
- Intuitive navigation
- Clear feedback on all actions
- Responsive design
- Loading states and error handling

### 5. **Scalability**
- MongoDB indexing for performance
- Pagination support
- Stateless JWT authentication
- Modular code structure

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Full-stack development with MERN
- ✅ RESTful API design
- ✅ Authentication & authorization
- ✅ Database modeling
- ✅ External API integration
- ✅ Error handling
- ✅ Frontend state management
- ✅ Modern React patterns
- ✅ Professional UI/UX

## 🚦 Testing the Application

1. **Start MongoDB** (if running locally)
2. **Start backend**: `cd server && npm run dev`
3. **Start frontend**: `cd client && npm run dev`
4. **Visit**: `http://localhost:5173`
5. **Sign up** for a new account
6. **Login** with your credentials
7. **Submit code** for AI review
8. **View results** with detailed feedback
9. **Explore learning mode** for before/after comparison

## 📚 Future Enhancements
- Support for more programming languages
- Code snippet library
- User progress tracking
- Community features (share reviews)
- Integration with GitHub
- Automated test generation
- Code playground with execution

## 🤝 Contributing
This is an educational project. Feel free to fork and extend it!

## 📄 License
MIT License - Free to use for learning and portfolio purposes.

---

**Built with ❤️ for learning and growth**
