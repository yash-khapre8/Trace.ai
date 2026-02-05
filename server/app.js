const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

/**
 * Middleware
 */

// Detailed request logging
app.use((req, res, next) => {
    console.log('\n========== INCOMING REQUEST ==========');
    console.log('Time:', new Date().toISOString());
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Body:', JSON.stringify(req.body, null, 2));
    console.log('IP:', req.ip);
    console.log('======================================\n');
    next();
});

// CORS - Allow frontend to communicate with backend
app.use(cors());
// For stricter production CORS, uncomment below:
/*
app.use(
    cors({
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173', process.env.CLIENT_URL],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);
*/

// Body parser
app.use(express.json({ limit: '10mb' })); // Limit for code submissions
app.use(express.urlencoded({ extended: true }));

/**
 * Routes
 */

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/review', reviewRoutes);

/**
 * Error Handling
 */

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err.stack);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
    });
});

module.exports = app;
