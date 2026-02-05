const { SYSTEM_PROMPT, createUserPrompt } = require('../utils/promptTemplates');

/**
 * AI Service - MOCK MODE for Testing
 * 
 * Returns realistic AI responses without calling external API
 * Perfect for testing UI features and demonstrations
 */

const USE_MOCK = process.env.USE_MOCK_AI === 'true';

/**
 * Generate a realistic mock AI response
 */
function generateMockResponse(code, language) {
    return {
        summary: `This ${language} code implements a function but has several areas for improvement. While functionally correct, it uses outdated syntax and could be more efficient.`,
        issues: [
            {
                type: 'best-practice',
                description: 'Using var instead of let/const',
                impact: 'var has function scope which can lead to unexpected bugs',
                suggestion: 'Replace var with const for values that don\'t change, or let for values that do'
            },
            {
                type: 'performance',
                description: 'Inefficient loop iteration',
                impact: 'Unnecessary iterations reduce performance',
                suggestion: 'Consider using built-in array methods like reduce() or Math.max()'
            },
            {
                type: 'logic',
                description: 'No null/undefined check for input',
                impact: 'Function will throw error if arr is null or undefined',
                suggestion: 'Add input validation at the start of the function'
            }
        ],
        timeComplexity: 'O(n) - linear time',
        spaceComplexity: 'O(1) - constant space',
        optimizedCode: `function findMax(arr) {
  // Input validation
  if (!arr || arr.length === 0) {
    return null;
  }
  
  // Modern approach using Math.max with spread operator
  return Math.max(...arr);
}`,
        learningNotes: [
            'Modern JavaScript  prefers const/let over var for better scoping',
            'Built-in methods like Math.max() are optimized for performance',
            'Always validate inputs to prevent runtime errors',
            'The spread operator (...) is a clean way to pass array elements as arguments'
        ]
    };
}

/**
 * Call the AI API to review code
 */
async function reviewCode(code, language) {
    // If mock mode is enabled, return mock response immediately
    if (USE_MOCK) {
        console.log('🎭 Using Mock AI Response (for testing)');
        return {
            success: true,
            data: generateMockResponse(code, language),
        };
    }

    try {
        const userPrompt = createUserPrompt(code, language);
        const isGemini = process.env.AI_API_ENDPOINT?.includes('generativelanguage.googleapis.com');

        let response, data, aiContent;

        if (isGemini) {
            // Google Gemini API format
            const fullPrompt = `${SYSTEM_PROMPT}\n\n${userPrompt}`;

            response = await fetch(`${process.env.AI_API_ENDPOINT}?key=${process.env.AI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: fullPrompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.3,
                        maxOutputTokens: 2000,
                    }
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    `AI API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`
                );
            }

            data = await response.json();
            aiContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

        } else {
            // OpenAI API format
            response = await fetch(process.env.AI_API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.AI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: process.env.AI_MODEL,
                    messages: [
                        {
                            role: 'system',
                            content: SYSTEM_PROMPT,
                        },
                        {
                            role: 'user',
                            content: userPrompt,
                        },
                    ],
                    temperature: 0.3,
                    max_tokens: 2000,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    `AI API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`
                );
            }

            data = await response.json();
            aiContent = data.choices?.[0]?.message?.content;
        }

        if (!aiContent) {
            throw new Error('No content in AI response');
        }

        // Parse JSON response
        const parsedResponse = parseAIResponse(aiContent);

        return {
            success: true,
            data: parsedResponse,
        };
    } catch (error) {
        console.error('AI Service Error:', error.message);

        return {
            success: false,
            error: error.message,
        };
    }
}

/**
 * Parse and validate AI response
 */
function parseAIResponse(content) {
    try {
        // Remove markdown code blocks if present
        let cleanedContent = content.trim();

        if (cleanedContent.startsWith('```json')) {
            cleanedContent = cleanedContent.replace(/^```json\n/, '').replace(/\n```$/, '');
        } else if (cleanedContent.startsWith('```')) {
            cleanedContent = cleanedContent.replace(/^```\n/, '').replace(/\n```$/, '');
        }

        const parsed = JSON.parse(cleanedContent);

        // Validate required fields
        const validated = {
            summary: parsed.summary || 'No summary provided',
            issues: Array.isArray(parsed.issues) ? parsed.issues : [],
            timeComplexity: parsed.timeComplexity || 'Not analyzed',
            spaceComplexity: parsed.spaceComplexity || 'Not analyzed',
            optimizedCode: parsed.optimizedCode || '',
            learningNotes: Array.isArray(parsed.learningNotes) ? parsed.learningNotes : [],
        };

        return validated;
    } catch (error) {
        console.error('Failed to parse AI response:', error.message);

        // Return a safe fallback
        return {
            summary: 'AI response could not be parsed',
            issues: [
                {
                    type: 'best-practice',
                    description: 'The AI service returned an invalid response',
                    impact: 'Unable to analyze code at this time',
                    suggestion: 'Please try again later',
                },
            ],
            timeComplexity: 'Unknown',
            spaceComplexity: 'Unknown',
            optimizedCode: '',
            learningNotes: ['Please try submitting your code again'],
        };
    }
}

/**
 * Chat with the AI Consultant about a specific review
 */
async function consultantChat(code, reviewSummary, issues, question) {
    if (USE_MOCK) {
        return {
            success: true,
            data: "This is a mock consultant response. In production, I would analyze your specific code and the review feedback to answer your question deeply."
        };
    }

    try {
        const { CONSULTANT_SYSTEM_PROMPT, createConsultantPrompt } = require('../utils/promptTemplates');
        const userPrompt = createConsultantPrompt(code, reviewSummary, issues, question);
        const isGemini = process.env.AI_API_ENDPOINT?.includes('generativelanguage.googleapis.com');

        let response, data, aiContent;

        if (isGemini) {
            const fullPrompt = `${CONSULTANT_SYSTEM_PROMPT}\n\n${userPrompt}`;
            response = await fetch(`${process.env.AI_API_ENDPOINT}?key=${process.env.AI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: fullPrompt }] }],
                    generationConfig: { temperature: 0.7, maxOutputTokens: 1000 }
                }),
            });
            data = await response.json();
            aiContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
        } else {
            response = await fetch(process.env.AI_API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.AI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: process.env.AI_MODEL,
                    messages: [
                        { role: 'system', content: CONSULTANT_SYSTEM_PROMPT },
                        { role: 'user', content: userPrompt }
                    ],
                    temperature: 0.7,
                    max_tokens: 1000
                }),
            });
            data = await response.json();
            aiContent = data.choices?.[0]?.message?.content;
        }

        return { success: true, data: aiContent };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

module.exports = {
    reviewCode,
    consultantChat,
};
