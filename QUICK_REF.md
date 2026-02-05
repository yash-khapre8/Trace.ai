# Trace.ai - Quick Reference

## Start Servers
```bash
# Option 1: Auto-start both
./start.sh

# Option 2: Manual
cd server && PORT=5001 npm run dev  # Terminal 1
cd client && npm run dev             # Terminal 2
```

## URLs
- Frontend: http://localhost:5173
- Backend: http://localhost:5001
- Health: http://localhost:5001/health

## Configuration
Edit `server/.env`:
- `PORT=5001`
- `MONGODB_URI=` (your MongoDB Atlas URI)
- `JWT_SECRET=` (random secret key)
- `AI_API_KEY=` (OpenAI API key)

## Test Auth
```bash
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"Test123"}'
```

## Troubleshooting
- Port conflict? → macOS AirPlay uses 5000, we use 5001
- Can't connect? → Check both servers are running
- MongoDB error? → Verify URI and network access in Atlas
- AI fails? → Add valid API key to server/.env

## Files Modified (Authentication Fix)
1. `server/server.js` - Fixed dotenv path
2. `server/models/User.js` - Fixed Mongoose hook
3. `server/.env.example` - Changed port to 5001
4. `client/vite.config.js` - Proxy to 5001
5. `server/routes/authRoutes.js` - Removed rate limiting

Authentication is working! ✅
