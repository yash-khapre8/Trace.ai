#!/bin/bash

echo "🔧 Trace.ai - Quick Start Script"
echo "================================"
echo ""

# Kill any existing node processes
echo "📛 Stopping any running servers..."
pkill -f "node.*server" 2>/dev/null || true
sleep 1

# Check if .env exists
if [ ! -f "server/.env" ]; then
    echo "⚠️  No .env file found! Creating from example..."
    cp server/.env.example server/.env
    echo "❗ IMPORTANT: Edit server/.env and add your MongoDB URI and API keys!"
    echo ""
fi

# Start backend
echo "🚀 Starting backend server (port 5001)..."
cd server && PORT=5001 npm run dev &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Check if backend started
if lsof -i:5001 > /dev/null 2>&1; then
    echo "✅ Backend running on http://localhost:5001"
else
    echo "❌ Backend failed to start. Check server/.env configuration."
    exit 1
fi

# Start frontend
echo "🎨 Starting frontend (port 5173)..."
cd client && npm run dev &
FRONTEND_PID=$!
cd ..

sleep 2

echo ""
echo "================================"
echo "✅ Trace.ai is running!"
echo "================================"
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:5001"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for user to stop
wait
