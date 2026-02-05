const express = require('express');
const router = express.Router();
const {
    submitCode,
    getHistory,
    getSubmission,
    chatWithConsultant,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const { aiReviewLimiter } = require('../middleware/rateLimiter');

/**
 * Review Routes
 * All routes are protected and require authentication
 */

// Submit code for review (with AI rate limiting)
router.post('/submit', protect, aiReviewLimiter, submitCode);

// Get submission history
router.get('/history', protect, getHistory);

// Get specific submission
router.get('/:id', protect, getSubmission);

// Chat with AI consultant about specific submission
router.post('/:id/chat', protect, chatWithConsultant);

module.exports = router;
