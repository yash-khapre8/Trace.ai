# AI Code Mentor - Project Overview & File Index

## 📚 Documentation Files

This project includes comprehensive documentation to help you understand, run, deploy, and present the application.

### Getting Started
- **[README.md](file:///Users/yashkhapre/Desktop/AIcodeMentor/README.md)** - Main project overview with full feature list
- **[QUICKSTART.md](file:///Users/yashkhapre/Desktop/AIcodeMentor/QUICKSTART.md)** - 5-minute setup guide
- **[walkthrough.md](file:///Users/yashkhapre/.gemini/antigravity/brain/a15fd6e4-496c-4313-9dcd-c925ada40874/walkthrough.md)** - Complete project walkthrough for interviews

### Development Resources
- **[SAMPLE_CODES.md](file:///Users/yashkhapre/Desktop/AIcodeMentor/SAMPLE_CODES.md)** - Test code snippets for all languages
- **[CONTRIBUTING.md](file:///Users/yashkhapre/Desktop/AIcodeMentor/CONTRIBUTING.md)** - Guidelines for code contributions
- **[server/README.md](file:///Users/yashkhapre/Desktop/AIcodeMentor/server/README.md)** - Backend API documentation
- **[client/README.md](file:///Users/yashkhapre/Desktop/AIcodeMentor/client/README.md)** - Frontend component documentation

### Deployment & Interviews
- **[DEPLOYMENT.md](file:///Users/yashkhapre/Desktop/AIcodeMentor/DEPLOYMENT.md)** - Production deployment guide
- **[INTERVIEW_PREP.md](file:///Users/yashkhapre/Desktop/AIcodeMentor/INTERVIEW_PREP.md)** - Interview questions & answers

---

## 🗂️ Project Structure

```
AIcodeMentor/
│
├── 📄 README.md                    # Main documentation
├── 📄 QUICKSTART.md                # Quick setup guide
├── 📄 DEPLOYMENT.md                # Deployment instructions
├── 📄 INTERVIEW_PREP.md            # Interview preparation
├── 📄 CONTRIBUTING.md              # Contributing guidelines
├── 📄 SAMPLE_CODES.md              # Test code examples
│
├── 📁 server/                      # Backend (Node.js/Express)
│   ├── 📄 README.md                # Backend documentation
│   ├── 📄 package.json             # Dependencies
│   ├── 📄 .env.example             # Environment variables template
│   ├── 📄 .gitignore               # Git ignore rules
│   ├── 📄 server.js                # Entry point
│   ├── 📄 app.js                   # Express configuration
│   │
│   ├── 📁 config/
│   │   └── db.js                   # MongoDB connection
│   │
│   ├── 📁 models/
│   │   ├── User.js                 # User schema
│   │   └── CodeSubmission.js      # Submission schema
│   │
│   ├── 📁 controllers/
│   │   ├── authController.js      # Auth logic
│   │   └── reviewController.js    # Review logic
│   │
│   ├── 📁 routes/
│   │   ├── authRoutes.js          # Auth endpoints
│   │   └── reviewRoutes.js        # Review endpoints
│   │
│   ├── 📁 middleware/
│   │   ├── authMiddleware.js      # JWT verification
│   │   └── rateLimiter.js         # Rate limiting
│   │
│   ├── 📁 services/
│   │   ├── aiService.js           # AI integration
│   │   └── codeValidator.js       # Input validation
│   │
│   └── 📁 utils/
│       └── promptTemplates.js      # AI prompts
│
└── 📁 client/                      # Frontend (React/Vite)
    ├── 📄 README.md                # Frontend documentation
    ├── 📄 package.json             # Dependencies
    ├── 📄 vite.config.js           # Vite configuration
    ├── 📄 index.html               # HTML template
    │
    └── 📁 src/
        ├── 📄 App.jsx              # Main app with routing
        ├── 📄 main.jsx             # Entry point
        ├── 📄 index.css            # Global styles
        │
        ├── 📁 pages/
        │   ├── Login.jsx           # Login page
        │   ├── Signup.jsx          # Signup page
        │   ├── Dashboard.jsx       # Dashboard with history
        │   ├── SubmitCode.jsx      # Code submission page
        │   └── SubmissionDetail.jsx # View submission details
        │
        ├── 📁 components/
        │   ├── CodeEditor.jsx      # Monaco editor wrapper
        │   ├── ReviewResult.jsx    # AI feedback display
        │   ├── LearningMode.jsx    # Before/after comparison
        │   └── ProtectedRoute.jsx  # Auth guard
        │
        ├── 📁 services/
        │   └── api.js              # Axios instance & API calls
        │
        ├── 📁 context/
        │   └── AuthContext.jsx     # Global auth state
        │
        └── 📁 styles/
            ├── Auth.css            # Auth pages styling
            ├── Dashboard.css       # Dashboard styling
            ├── SubmitCode.css      # Submission page styling
            ├── ReviewResult.css    # Review results styling
            ├── LearningMode.css    # Learning mode styling
            └── SubmissionDetail.css # Detail page styling
```

---

## 🎯 Quick Reference

### Run the Application
```bash
# Backend (Terminal 1)
cd server && npm run dev

# Frontend (Terminal 2)
cd client && npm run dev
```

### Access Points
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health Check: http://localhost:5000/health

### Key Features
- ✅ User Authentication (JWT)
- ✅ Multi-language Code Submission
- ✅ AI-Powered Code Review
- ✅ Learning Mode (Before/After)
- ✅ Submission History Dashboard
- ✅ Rate Limiting
- ✅ Error Handling

---

## 📖 Reading Order (Recommended)

1. **[README.md](file:///Users/yashkhapre/Desktop/AIcodeMentor/README.md)** - Start here for project overview
2. **[QUICKSTART.md](file:///Users/yashkhapre/Desktop/AIcodeMentor/QUICKSTART.md)** - Set up and run the application
3. **[SAMPLE_CODES.md](file:///Users/yashkhapre/Desktop/AIcodeMentor/SAMPLE_CODES.md)** - Test with provided examples
4. **[walkthrough.md](file:///Users/yashkhapre/.gemini/antigravity/brain/a15fd6e4-496c-4313-9dcd-c925ada40874/walkthrough.md)** - Understand the architecture
5. **[INTERVIEW_PREP.md](file:///Users/yashkhapre/Desktop/AIcodeMentor/INTERVIEW_PREP.md)** - Prepare for presentations
6. **[DEPLOYMENT.md](file:///Users/yashkhapre/Desktop/AIcodeMentor/DEPLOYMENT.md)** - Deploy to production

---

## 🚀 Next Steps

1. **Setup**: Follow [QUICKSTART.md](file:///Users/yashkhapre/Desktop/AIcodeMentor/QUICKSTART.md)
2. **Test**: Use samples from [SAMPLE_CODES.md](file:///Users/yashkhapre/Desktop/AIcodeMentor/SAMPLE_CODES.md)
3. **Study**: Read [walkthrough.md](file:///Users/yashkhapre/.gemini/antigravity/brain/a15fd6e4-496c-4313-9dcd-c925ada40874/walkthrough.md)
4. **Prepare**: Review [INTERVIEW_PREP.md](file:///Users/yashkhapre/Desktop/AIcodeMentor/INTERVIEW_PREP.md)
5. **Deploy**: Follow [DEPLOYMENT.md](file:///Users/yashkhapre/Desktop/AIcodeMentor/DEPLOYMENT.md)

---

## 📊 Project Statistics

- **Total Files**: 40+ files
- **Backend Files**: 12 core files
- **Frontend Files**: 15+ components/pages
- **Documentation**: 7 comprehensive guides
- **Lines of Code**: ~3,000+ LOC
- **Languages Supported**: JavaScript, Python, Java
- **API Endpoints**: 5 endpoints
- **Database Models**: 2 models

---

**Built with ❤️ for learning and growth. Ready for internship presentations!** 🚀
