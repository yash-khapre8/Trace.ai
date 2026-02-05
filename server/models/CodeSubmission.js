const mongoose = require('mongoose');

const codeSubmissionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true, // For faster queries
        },
        language: {
            type: String,
            required: [true, 'Programming language is required'],
            enum: ['javascript', 'python', 'java'],
        },
        originalCode: {
            type: String,
            required: [true, 'Code is required'],
            maxlength: [10000, 'Code exceeds maximum length'],
        },
        // AI Response - Structured JSON
        aiResponse: {
            summary: String,
            issues: [
                {
                    type: {
                        type: String,
                        enum: ['logic', 'performance', 'style', 'best-practice'],
                    },
                    description: String,
                    impact: String,
                    suggestion: String,
                },
            ],
            timeComplexity: String,
            spaceComplexity: String,
            optimizedCode: String,
            learningNotes: [String],
        },
        // Status tracking
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending',
        },
        errorMessage: String, // If AI service fails
    },
    {
        timestamps: true,
    }
);

// Index for user-specific queries
codeSubmissionSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('CodeSubmission', codeSubmissionSchema);
