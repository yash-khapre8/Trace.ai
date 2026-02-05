# AI Code Mentor - Frontend

## Overview
React-based frontend for the AI Code Mentor platform. Provides an intuitive interface for code submission, AI review viewing, and learning-focused improvements.

## Tech Stack
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **Monaco Editor** - Code editor

## Project Structure
```
client/src/
├── components/       # Reusable UI components
│   ├── CodeEditor.jsx
│   ├── ReviewResult.jsx
│   ├── LearningMode.jsx
│   └── ProtectedRoute.jsx
├── pages/            # Page components
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   ├── SubmitCode.jsx
│   └── SubmissionDetail.jsx
├── services/         # API service layer
│   └── api.js
├── context/          # React Context for state
│   └── AuthContext.jsx
├── styles/           # Component-specific CSS
└── App.jsx           # Main app with routing
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in the client directory:
```bash
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Persistent login state

### Code Submission
- Monaco code editor integration
- Multi-language support (JavaScript, Python, Java)
- Real-time code editing
- Syntax highlighting

### AI Review Display
- Structured feedback presentation
- Issue categorization (Logic, Performance, Style, Best Practice)
- Complexity analysis display
- Key learning takeaways

### Learning Mode
- Before/After code comparison
- Detailed explanations for each change
- Beginner-friendly guidance

### Dashboard
- Submission history
- Pagination
- Quick access to past reviews
- Status tracking

## Key Design Decisions

1. **Component Organization**: Separated pages from reusable components
2. **State Management**: Used Context API for global auth state
3. **API Layer**: Centralized axios instance with interceptors
4. **Protected Routes**: Wrapper component for authentication checks
5. **Error Handling**: Comprehensive error states and user feedback

## Interview Talking Points

1. **Clean Architecture**: Separation of concerns (components, pages, services)
2. **User Experience**: Intuitive navigation, clear feedback, responsive design
3. **Code Quality**: Reusable components, proper state management
4. **Security**: Protected routes, token management, input validation
5. **Scalability**: Modular structure, easy to extend with new features

## Development Tips
- All API calls go through the centralized `api.js` service
- Authentication state is managed globally via `AuthContext`
- Protected routes automatically redirect to login
- Monaco Editor is lazy-loaded for performance
