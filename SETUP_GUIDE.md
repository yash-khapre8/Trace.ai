# Trace.ai - Complete Setup Guide

## 🚀 Quick Start (5 Minutes)

Follow these steps to get Trace.ai running locally.

---

## Step 1: MongoDB Atlas Setup

### Create Free MongoDB Cluster

1. **Go to MongoDB Atlas**
   - Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account (or login)

2. **Create a New Cluster**
   - Click "Build a Database"
   - Choose **FREE** (M0) tier
   - Select a cloud provider and region (closest to you)
   - Name your cluster (e.g., "TraceAI-Cluster")
   - Click "Create"

3. **Create Database User**
   - Go to **Database Access** (left sidebar)
   - Click "Add New Database User"
   - Choose **Password** authentication
   - Username: `traceai-admin` (or any username)
   - Password: Click "Autogenerate Secure Password" (SAVE THIS!)
   - User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to **Network Access** (left sidebar)
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to **Database** (left sidebar)
   - Click "Connect" on your cluster
   - Choose "Drivers"
   - Copy the connection string:
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```

6. **Update Connection String**
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Add database name `/trace-ai` before the `?`:
     ```
     mongodb+srv://traceai-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/trace-ai?retryWrites=true&w=majority
     ```

---

## Step 2: AI API Key Setup

### Option A: OpenAI (Recommended)

1. **Get API Key**
   - Go to [platform.openai.com](https://platform.openai.com)
   - Sign up or login
   - Go to **API Keys** section
   - Click "Create new secret key"
   - Copy the key (starts with `sk-...`)

2. **Recommended Settings**
   - API Endpoint: `https://api.openai.com/v1/chat/completions`
   - Model: `gpt-4` or `gpt-3.5-turbo` (cheaper)

### Option B: Other AI Providers

Any OpenAI-compatible API works:
- **Google Gemini API**
- **Anthropic Claude**
- **Azure OpenAI**
- **Local LLMs** (Ollama, etc.)

---

## Step 3: Configure Environment Variables

### Backend (server/.env)

Open `server/.env` and update:

```env
# Server Configuration
PORT=5000

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/trace-ai?retryWrites=true&w=majority

# JWT Secret (make it long and random)
JWT_SECRET=trace-ai-super-secret-jwt-key-2024-production-change-this

# Frontend URL
CLIENT_URL=http://localhost:5173

# AI Service Configuration
AI_API_KEY=sk-your-openai-api-key-here
AI_API_ENDPOINT=https://api.openai.com/v1/chat/completions
AI_MODEL=gpt-4
```

### Frontend (client/.env)

Already configured:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Step 4: Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend (new terminal)
cd client
npm install
```

---

## Step 5: Start the Application

### Terminal 1 - Backend
```bash
cd server
npm run dev
```

**Expected output:**
```
✅ MongoDB Connected: cluster0-xxxxx.mongodb.net
Server running on port 5000
```

### Terminal 2 - Frontend
```bash
cd client
npm run dev
```

**Expected output:**
```
  VITE ready in XXX ms
  ➜  Local:   http://localhost:5173/
```

---

## Step 6: Test the Application

1. **Open Browser**
   - Go to `http://localhost:5173`
   - You should see the animated landing page

2. **Create Account**
   - Click "Get Started"
   - Fill in signup form
   - Click "Create Account"

3. **Submit Code**
   - Go to Dashboard
   - Click "+ New Submission"
   - Paste sample code:
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
   - Click "Submit for Review"
   - Wait for AI feedback

4. **View Results**
   - See structured feedback
   - Click "Show Learning Mode"
   - Check before/after comparison

---

## ✅ Verification Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] Network access configured (0.0.0.0/0 for development)
- [ ] Connection string copied and updated
- [ ] AI API key obtained
- [ ] `server/.env` configured with all values
- [ ] Backend starts successfully
- [ ] Frontend starts successfully
- [ ] Can sign up a new user
- [ ] Can login
- [ ] Can submit code
- [ ] Receives AI review

---

## 🔧 Troubleshooting

### Backend won't start - MongoDB connection error

**Error:** `MongoNetworkError` or `Authentication failed`

**Solutions:**
1. Check username/password in connection string
2. Verify network access allows your IP (0.0.0.0/0)
3. Ensure database user has "Read and write" permissions
4. Check if password has special characters - URL encode them:
   - `@` → `%40`
   - `#` → `%23`
   - `%` → `%25`

### AI Review fails

**Error:** `AI Service Error` or `400/401 from API`

**Solutions:**
1. Check AI_API_KEY is correct
2. Verify you have credits/billing set up
3. Try using `gpt-3.5-turbo` instead of `gpt-4` (cheaper)
4. Check API endpoint matches your provider

### Frontend can't reach backend

**Error:** `Network Error` or CORS error

**Solutions:**
1. Ensure backend is running on port 5000
2. Check `CLIENT_URL` in server `.env` is `http://localhost:5173`
3. Verify `VITE_API_URL` in client `.env` is `http://localhost:5000/api`

### "Rate limit exceeded"

**Solutions:**
- AI endpoints limited to 10 requests per 15 minutes
- Wait 15 minutes or restart backend to reset

---

## 🎯 Next Steps

After successful setup:

1. **Customize**
   - Change JWT_SECRET to a unique value
   - Adjust rate limits in `server/middleware/rateLimiter.js`

2. **Deploy** (Optional)
   - See [DEPLOYMENT.md](file:///Users/yashkhapre/Desktop/AIcodeMentor/DEPLOYMENT.md)
   - Deploy backend to Render/Railway
   - Deploy frontend to Vercel/Netlify

3. **Extend**
   - Add more programming languages
   - Implement code execution
   - Add user profiles
   - Create leaderboards

---

## 📚 Important Files

- **Backend Config**: `server/.env`
- **Database Setup**: `server/config/db.js`
- **API Endpoints**: `server/routes/`
- **Frontend Config**: `client/.env`
- **Landing Page**: `client/src/pages/LandingPage.jsx`

---

## 🆘 Still Having Issues?

1. Check both terminal outputs for errors
2. Verify all dependencies installed (`npm install`)
3. Ensure MongoDB Atlas cluster is running (not paused)
4. Check API key has not expired
5. Review `.env` files for typos

---

**You're all set! Enjoy building with Trace.ai** 🚀
