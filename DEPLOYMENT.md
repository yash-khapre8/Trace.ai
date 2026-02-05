# Deployment Guide for AI Code Mentor

## Overview
This guide covers deploying the AI Code Mentor platform to production environments.

---

## 🚀 Production Deployment Options

### Option 1: Traditional Hosting (Recommended for Learning)

#### Backend Deployment (Render / Railway / Heroku)

**Using Render (Free Tier Available):**

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Create Render Account**
   - Visit [render.com](https://render.com)
   - Sign up with GitHub

3. **Deploy Backend**
   - New → Web Service
   - Connect your repository
   - Settings:
     - **Root Directory**: `server`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Environment**: Node
     - **Plan**: Free

4. **Add Environment Variables** in Render Dashboard:
   ```
   MONGODB_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=<strong-random-secret>
   CLIENT_URL=<your-frontend-url>
   AI_API_KEY=<your-ai-api-key>
   AI_API_ENDPOINT=https://api.openai.com/v1/chat/completions
   AI_MODEL=gpt-4
   PORT=5000
   ```

5. **Note the backend URL** (e.g., `https://ai-code-mentor.onrender.com`)

---

#### Frontend Deployment (Vercel / Netlify)

**Using Vercel (Recommended):**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Update Frontend API URL**
   - Create `.env.production` in `client/`:
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

3. **Deploy**
   ```bash
   cd client
   vercel
   ```
   - Follow prompts
   - Select `client` directory
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

4. **Set Environment Variables** in Vercel Dashboard:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

---

### Option 2: Cloud Platform (AWS / GCP / Azure)

#### AWS Deployment

**Backend (EC2 + MongoDB Atlas):**
1. Launch EC2 instance (Ubuntu)
2. Install Node.js and PM2
3. Clone repository
4. Configure environment variables
5. Start with PM2: `pm2 start server.js`
6. Set up Nginx reverse proxy
7. Configure SSL with Let's Encrypt

**Frontend (S3 + CloudFront):**
1. Build: `npm run build`
2. Upload `dist/` to S3 bucket
3. Enable static website hosting
4. Configure CloudFront CDN
5. Set up custom domain with Route 53

---

## 🗄️ Database Setup (MongoDB Atlas)

1. **Create Free Cluster**
   - Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create account → Build a Database
   - Choose FREE tier (M0)
   - Select region

2. **Configure Network Access**
   - Network Access → Add IP Address
   - Allow access from anywhere: `0.0.0.0/0`

3. **Create Database User**
   - Database Access → Add New User
   - Username/Password authentication
   - Save credentials

4. **Get Connection String**
   - Connect → Drivers → Node.js
   - Copy connection string
   - Replace `<password>` and `<dbname>`

5. **Update Environment Variables**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-code-mentor?retryWrites=true&w=majority
   ```

---

## 🔐 Production Security Checklist

- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Enable HTTPS (SSL/TLS)
- [ ] Set secure CORS origins
- [ ] Use environment variables (never commit .env)
- [ ] Enable MongoDB authentication
- [ ] Set up rate limiting
- [ ] Configure proper HTTP headers
- [ ] Use production-grade logging
- [ ] Set up error monitoring (Sentry)
- [ ] Regular security updates

---

## ⚙️ Production Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<strong-random-secret-min-32-chars>
CLIENT_URL=https://your-frontend-domain.com

AI_API_KEY=sk-...
AI_API_ENDPOINT=https://api.openai.com/v1/chat/completions
AI_MODEL=gpt-4
```

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-domain.com/api
```

---

## 📊 Monitoring & Logging

### Backend Logging
Add to `server.js`:
```javascript
const morgan = require('morgan');
app.use(morgan('combined'));
```

### Error Tracking
```bash
npm install @sentry/node
```

### Performance Monitoring
- Use New Relic or Datadog
- Monitor API response times
- Track AI service uptime
- Database query performance

---

## 🧪 Pre-Deployment Testing

```bash
# Test backend locally in production mode
cd server
NODE_ENV=production npm start

# Test frontend production build
cd client
npm run build
npm run preview
```

---

## 🔄 CI/CD Setup (GitHub Actions)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        # Add deployment commands
```

---

## 📱 Post-Deployment

1. **Test all features:**
   - User registration
   - Login/Logout
   - Code submission
   - AI review
   - Dashboard

2. **Monitor performance:**
   - API response times
   - Database queries
   - AI service latency

3. **Check logs:**
   - Error tracking
   - Request monitoring
   - User activity

---

## 🆘 Troubleshooting Production Issues

### CORS Errors
- Ensure `CLIENT_URL` matches frontend domain
- Check CORS middleware configuration

### Database Connection
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has permissions

### AI Service Failures
- Verify API key is valid
- Check API rate limits
- Monitor API usage and costs

---

## 💰 Cost Estimation

**Free Tier Setup:**
- MongoDB Atlas: Free (M0)
- Render Backend: Free (with sleep)
- Vercel Frontend: Free
- **Total: $0/month**

**Production Setup (Low Traffic):**
- MongoDB Atlas: $9/month (M2)
- Render/Railway: $7/month
- Vercel: Free
- AI API: Variable ($10-50/month)
- **Total: ~$26-66/month**

---

## 📚 Additional Resources

- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [PM2 Process Manager](https://pm2.keymetrics.io)

---

**Ready for production!** 🚀
