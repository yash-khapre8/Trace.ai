const CodeSubmission = require('../models/CodeSubmission');
const { validateCodeSubmission } = require('../services/codeValidator');
const { reviewCode } = require('../services/aiService');

/**
 * @route   POST /api/review/submit
 * @desc    Submit code for AI review
 * @access  Private
 */
const submitCode = async (req, res) => {
    try {
        const { code, language } = req.body;

        // Validate input
        const validation = validateCodeSubmission(code, language);

        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validation.errors,
            });
        }

        // Create initial submission record
        const submission = await CodeSubmission.create({
            userId: req.user._id,
            language,
            originalCode: code,
            status: 'pending',
        });

        // Call AI service
        const aiResult = await reviewCode(code, language);

        if (!aiResult.success) {
            // Update submission with error
            submission.status = 'failed';
            submission.errorMessage = aiResult.error;
            await submission.save();

            return res.status(500).json({
                success: false,
                message: 'AI service temporarily unavailable',
                submissionId: submission._id,
            });
        }

        // Update submission with AI response
        submission.aiResponse = aiResult.data;
        submission.status = 'completed';
        await submission.save();

        // Update User Analytics
        const User = require('../models/User');
        const user = await User.findById(req.user._id);

        if (user) {
            const issuesCount = aiResult.data.issues?.length || 0;
            const newSubmissionsCount = user.stats.totalSubmissions + 1;

            // Calculate a score (100 base, -10 per issue, min 0)
            const currentScore = Math.max(0, 100 - (issuesCount * 10));

            // Running average of score
            user.stats.averageScore = Math.round(
                ((user.stats.averageScore * user.stats.totalSubmissions) + currentScore) / newSubmissionsCount
            );

            user.stats.totalSubmissions = newSubmissionsCount;
            user.stats.totalIssuesFound += issuesCount;

            // Determine Rank
            if (user.stats.averageScore >= 95) user.stats.rank = 'S';
            else if (user.stats.averageScore >= 85) user.stats.rank = 'A';
            else if (user.stats.averageScore >= 70) user.stats.rank = 'B';
            else if (user.stats.averageScore >= 50) user.stats.rank = 'C';
            else user.stats.rank = 'D';

            await user.save();
        }

        res.status(200).json({
            success: true,
            message: 'Code reviewed successfully',
            data: {
                submissionId: submission._id,
                language: submission.language,
                aiResponse: submission.aiResponse,
                createdAt: submission.createdAt,
                userStats: user ? user.stats : null
            },
        });
    } catch (error) {
        console.error('Submit Code Error:', error);
        console.error('Stack:', error.stack); // Log full stack trace

        // Return actual error message in development for debugging
        res.status(500).json({
            success: false,
            message: process.env.NODE_ENV === 'development'
                ? `Server error: ${error.message}`
                : 'Server error during code submission',
            error: error.message
        });
    }
};

/**
 * @route   GET /api/review/history
 * @desc    Get user's submission history
 * @access  Private
 */
const getHistory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const submissions = await CodeSubmission.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select('-originalCode'); // Don't return full code in list

        const total = await CodeSubmission.countDocuments({ userId: req.user._id });

        res.status(200).json({
            success: true,
            data: {
                submissions,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit),
                },
            },
        });
    } catch (error) {
        console.error('Get History Error:', error);

        res.status(500).json({
            success: false,
            message: 'Server error fetching history',
        });
    }
};

/**
 * @route   GET /api/review/:id
 * @desc    Get a specific submission by ID
 * @access  Private
 */
const getSubmission = async (req, res) => {
    try {
        const submission = await CodeSubmission.findOne({
            _id: req.params.id,
            userId: req.user._id, // Ensure user owns this submission
        });

        if (!submission) {
            return res.status(404).json({
                success: false,
                message: 'Submission not found',
            });
        }

        res.status(200).json({
            success: true,
            data: {
                submission,
            },
        });
    } catch (error) {
        console.error('Get Submission Error:', error);

        res.status(500).json({
            success: false,
            message: 'Server error fetching submission',
        });
    }
};


/**
 * @route   POST /api/review/:id/chat
 * @desc    Chat with AI consultant about a specific submission
 * @access  Private
 */
const chatWithConsultant = async (req, res) => {
    try {
        const { question } = req.body;
        const submissionId = req.params.id;

        if (!question) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a question',
            });
        }

        // Find the submission context
        const submission = await CodeSubmission.findOne({
            _id: submissionId,
            userId: req.user._id,
        });

        if (!submission) {
            return res.status(404).json({
                success: false,
                message: 'Submission not found',
            });
        }

        if (submission.status !== 'completed') {
            return res.status(400).json({
                success: false,
                message: 'Can only chat about completed reviews',
            });
        }

        // Call AI service for chat
        const { consultantChat } = require('../services/aiService');
        const chatResult = await consultantChat(
            submission.originalCode,
            submission.aiResponse.summary,
            submission.aiResponse.issues,
            question
        );

        if (!chatResult.success) {
            return res.status(500).json({
                success: false,
                message: 'Chat service temporarily unavailable',
                error: chatResult.error,
            });
        }

        res.status(200).json({
            success: true,
            data: {
                answer: chatResult.data,
            },
        });
    } catch (error) {
        console.error('Chat With Consultant Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during chat',
        });
    }
};

module.exports = {
    submitCode,
    getHistory,
    getSubmission,
    chatWithConsultant,
};
