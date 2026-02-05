const rateLimit = require('express-rate-limit');

/**
 * Rate limiter for AI review endpoints
 * Prevents abuse of the AI service
 */
const aiReviewLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each user to 10 requests per window
    message: {
        success: false,
        message: 'Too many review requests. Please try again in 15 minutes.',
    },
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false,
});

/**
 * Rate limiter for authentication endpoints
 * Prevents brute force attacks
 */
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window (relaxed for dev)
    message: {
        success: false,
        message: 'Too many login attempts. Please try again in 15 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    aiReviewLimiter,
    authLimiter,
};
