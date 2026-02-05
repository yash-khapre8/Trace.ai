# AI Code Mentor - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: MongoDB Setup

**Option A: Local MongoDB**
```bash
# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Verify it's running
mongosh
```

**Option B: MongoDB Atlas (Cloud)**
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get connection string
5. Update `.env` with the connection string

### Step 2: AI API Key

You need an OpenAI-compatible API key:

1. **OpenAI**: Get key from [platform.openai.com](https://platform.openai.com)
2. **Or use AntiGravity LLM** (if available)
3. Add to `server/.env`

### Step 3: Backend Setup

```bash
cd server
npm install

# Create .env file with these values:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/ai-code-mentor
# JWT_SECRET=your_secret_key_123456789
# CLIENT_URL=http://localhost:5173
# AI_API_KEY=sk-your-api-key-here
# AI_API_ENDPOINT=https://api.openai.com/v1/chat/completions
# AI_MODEL=gpt-4

npm run dev
```

Backend should now be running at `http://localhost:5000`

### Step 4: Frontend Setup

```bash
cd client
npm install

# Create .env file:
# VITE_API_URL=http://localhost:5000/api

npm run dev
```

Frontend should now be running at `http://localhost:5173`

### Step 5: Test the Application

1. Open browser: `http://localhost:5173`
2. Click "Sign up here"
3. Create account:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
4. You'll be automatically logged in
5. Click "+ New Submission"
6. Try this sample code:

```javascript
function findMax(arr) {
  var max = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}
```

7. Click "Submit for Review"
8. View AI feedback!

---

## 🔧 Troubleshooting

### "MongoDB Connection Error"
- **Solution**: Make sure MongoDB is running
- Check: `mongosh` in terminal should connect
- Or update `.env` with MongoDB Atlas connection string

### "AI Service Error"
- **Solution**: Check your AI_API_KEY in `server/.env`
- Verify the API endpoint is correct
- Check API key has credits/permissions

### "CORS Error"
- **Solution**: Ensure `CLIENT_URL` in server `.env` matches frontend URL
- Default should be `http://localhost:5173`

### Port Already in Use
```bash
# Backend (port 5000)
lsof -ti:5000 | xargs kill -9

# Frontend (port 5173)
lsof -ti:5173 | xargs kill -9
```

---

## 📁 Environment Variables Checklist

### Backend (`server/.env`)
```env
✅ PORT=5000
✅ MONGODB_URI=mongodb://localhost:27017/ai-code-mentor
✅ JWT_SECRET=your_secret_key_here
✅ CLIENT_URL=http://localhost:5173
✅ AI_API_KEY=your_api_key_here
✅ AI_API_ENDPOINT=https://api.openai.com/v1/chat/completions
✅ AI_MODEL=gpt-4
```

### Frontend (`client/.env`)
```env
✅ VITE_API_URL=http://localhost:5000/api
```

---

## 🎯 Next Steps

After successful setup:

1. **Explore the Dashboard** - View your submission history
2. **Try Different Languages** - Test Python and Java code
3. **Check Learning Mode** - Click "Show Learning Mode" after review
4. **Test Error Handling** - Try submitting empty code
5. **Review the Code** - Explore the project structure

---

## 🐛 Common Issues

### Issue: "Token expired"
**Fix**: Logout and login again. Tokens expire after 7 days.

### Issue: "Cannot read property 'issues' of undefined"
**Fix**: This means AI response failed. Check backend logs and AI API key.

### Issue: "Network Error"
**Fix**: Ensure backend is running on port 5000.

---

## 📖 Additional Resources

- [Main README](file:///Users/yashkhapre/Desktop/AIcodeMentor/README.md) - Complete project documentation
- [Backend README](file:///Users/yashkhapre/Desktop/AIcodeMentor/server/README.md) - Backend API details
- [Frontend README](file:///Users/yashkhapre/Desktop/AIcodeMentor/client/README.md) - Frontend details
- [Walkthrough](file:///Users/yashkhapre/.gemini/antigravity/brain/a15fd6e4-496c-4313-9dcd-c925ada40874/walkthrough.md) - Complete project walkthrough

---

## ✅ Verification Checklist

Before demonstrating to others:

- [ ] MongoDB is running
- [ ] Backend server starts without errors
- [ ] Frontend loads at localhost:5173
- [ ] Can create a new account
- [ ] Can login successfully
- [ ] Can submit code
- [ ] AI review works (or shows proper error)
- [ ] Dashboard shows submission history
- [ ] Learning mode displays correctly

---

**Need help? Check the logs in both terminal windows for error messages!**
