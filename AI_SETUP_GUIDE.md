# 🤖 AI Code Review Setup Guide

## Current Status
✅ Authentication working  
✅ Database connected  
⏳ AI Review - **Needs configuration**

---

## Quick Start: Get AI Working

### Option 1: OpenAI (Recommended)

1. **Get API Key:**
   - Go to: https://platform.openai.com/api-keys
   - Sign up or log in
   - Click "Create new secret key"
   - Copy the key (starts with `sk-...`)

2. **Add to `.env`:**
   Edit `server/.env` and add:
   ```env
   AI_API_KEY=sk-your-actual-key-here
   AI_API_ENDPOINT=https://api.openai.com/v1/chat/completions
   AI_MODEL=gpt-3.5-turbo
   ```
   
   **Note:** Use `gpt-3.5-turbo` (cheaper, $0.002/1K tokens) instead of `gpt-4` ($0.03/1K tokens).

3. **Restart Backend:**
   ```bash
   # The server will auto-restart with nodemon
   # Or manually: Ctrl+C then: cd server && PORT=5001 npm run dev
   ```

### Option 2: Free Alternative (Google Gemini)

1. **Get API Key:**
   - Go to: https://makersuite.google.com/app/apikey
   - Create a new API key (FREE)

2. **Update `.env`:**
   ```env
   AI_API_KEY=your-gemini-key
   AI_API_ENDPOINT=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
   AI_MODEL=gemini-pro
   ```

3. **Update Code:** (You'll need to modify `server/services/aiService.js` for Gemini format)

---

## Test AI Review

### 1. Check Current Configuration:
```bash
cd server
grep "AI_API_KEY" .env
```

### 2. Test with Sample Code:

**Visit:** http://localhost:5173/submit

**Paste this code:**
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

**Click:** Submit for Review

**Expected:** AI feedback with:
- Summary
- Issues found (using `var`, inefficient loop)
- Time/Space complexity
- Optimized version
- Learning notes

---

## If AI Review Fails

### Error: "AI Service Error"

**Check:**
1. Is `AI_API_KEY` set in `server/.env`?
2. Is the key valid? (Test at OpenAI playground)
3. Do you have credits? (Check billing at platform.openai.com)

**Fix:**
```bash
# Verify env is loaded
cd server
node -e "require('dotenv').config({path:'.env'}); console.log('AI Key:', process.env.AI_API_KEY?.substring(0,10)+'...')"
```

### Error: "Rate limit exceeded"

The app has rate limiting:
- **AI Review:** 10 requests per 15 minutes
- **Auth:** 100 requests per 15 minutes (we increased this)

**Fix:** Wait 15 minutes or temporarily disable in `server/routes/reviewRoutes.js`

---

## What You Can Do Right Now

✅ **Without AI Key:**
- Sign up / Login
- View dashboard
- Submit code (will be saved)
- View submission history

🔑 **With AI Key:**
- Get AI code reviews
- See complexity analysis
- Use Learning mode
- View before/after comparisons

---

## Cost Estimates (OpenAI)

**Using `gpt-3.5-turbo`:**
- Average code review: ~800 tokens
- Cost per review: ~$0.0016 (less than 1¢)
- $5 credit = ~3,000 reviews

**Using `gpt-4`:**
- Average code review: ~800 tokens  
- Cost per review: ~$0.024 (2¢)
- $5 credit = ~200 reviews

💡 **Tip:** Start with `gpt-3.5-turbo`!

---

## Next Steps

1. **Get OpenAI API Key** (5 minutes)
2. **Add to `server/.env`**
3. **Test code submission**
4. **Try Learning Mode**
5. **Check dashboard history**

---

## Complete `.env` Example

```env
PORT=5001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/trace-ai?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
CLIENT_URL=http://localhost:5173

# AI Configuration
AI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
AI_API_ENDPOINT=https://api.openai.com/v1/chat/completions
AI_MODEL=gpt-3.5-turbo
```

---

**Ready to get your OpenAI key?** Visit: https://platform.openai.com/api-keys 🚀
