/**
 * Code Validator Service
 * 
 * Validates user-submitted code before sending to AI
 */

/**
 * Validate code submission
 * @param {string} code - Code to validate
 * @param {string} language - Programming language
 * @returns {Object} - Validation result
 */
function validateCodeSubmission(code, language) {
    const errors = [];

    // Check if code exists
    if (!code || typeof code !== 'string') {
        errors.push('Code is required');
    }

    // Check code length
    if (code && code.trim().length === 0) {
        errors.push('Code cannot be empty');
    }

    if (code && code.length > 10000) {
        errors.push('Code exceeds maximum length of 10,000 characters');
    }

    // Check if language is valid
    const validLanguages = ['javascript', 'python', 'java'];
    if (!validLanguages.includes(language)) {
        errors.push('Invalid language. Must be javascript, python, or java');
    }

    // Check for suspicious patterns (basic security)
    const suspiciousPatterns = [
        /rm\s+-rf/i,
        /eval\s*\(/i,
        /<script>/i,
    ];

    if (code) {
        for (const pattern of suspiciousPatterns) {
            if (pattern.test(code)) {
                errors.push('Code contains potentially dangerous patterns');
                break;
            }
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

module.exports = {
    validateCodeSubmission,
};
