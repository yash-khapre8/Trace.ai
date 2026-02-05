const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Generate JWT Token
 * @param {string} id - User ID
 * @returns {string} - JWT token
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d', // Token valid for 7 days
    });
};

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide username, email, and password',
            });
        }

        // Check if user already exists
        const userExists = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email or username',
            });
        }

        // Create user
        const user = await User.create({
            username,
            email,
            password, // Will be hashed by pre-save middleware
        });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    stats: user.stats,
                },
                token,
            },
        });
    } catch (error) {
        console.error('Signup Error:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', '),
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error during registration',
        });
    }
};

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password',
            });
        }

        // Find user (include password for comparison)
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // Check password
        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // Generate token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    stats: user.stats,
                },
                token,
            },
        });
    } catch (error) {
        console.error('Login Error:', error);

        res.status(500).json({
            success: false,
            message: 'Server error during login',
        });
    }
};

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged in user
 * @access  Private
 */
const getMe = async (req, res) => {
    try {
        // req.user is set by authMiddleware
        const user = await User.findById(req.user._id);

        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    stats: user.stats,
                    createdAt: user.createdAt,
                },
            },
        });
    } catch (error) {
        console.error('GetMe Error:', error);

        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

module.exports = {
    signup,
    login,
    getMe,
};
