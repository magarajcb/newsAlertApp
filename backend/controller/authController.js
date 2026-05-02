const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authController = {

    // ✅ REGISTER
    registerUser: async (req, res) => {
        try {
            let { name, email, password } = req.body;

            // 🔹 Trim inputs
            name = name?.trim();
            email = email?.trim().toLowerCase();
            password = password?.trim();

            // 🔹 Validation
            if (!name || !email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            // Email format
            const emailRegex = /^\S+@\S+\.\S+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }

            // Password strength
            if (password.length < 6) {
                return res.status(400).json({ message: 'Password must be at least 6 characters' });
            }

            // 🔹 Check existing user
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already registered' });
            }

            // 🔹 Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name,
                email,
                password: hashedPassword
            });

            const savedUser = await newUser.save();

            const { password: pass, __v, ...userData } = savedUser.toObject();

            return res.status(201).json({
                message: 'User registered successfully',
                user: userData
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Registration failed',
                error: error.message
            });
        }
    },

    // ✅ LOGIN
    loginUser: async (req, res) => {
        try {
            let { email, password } = req.body;

            email = email?.trim().toLowerCase();
            password = password?.trim();

            if (!email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not registered' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // 🔹 JWT token
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            // 🔹 Cookie settings (important fix)
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // ✅ fix
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            const { password: pass, __v, ...userData } = user.toObject();

            return res.status(200).json({
    message: 'Login successful',
    user: userData,
    token // 
});

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Login failed',
                error: error.message
            });
        }
    },

    // ✅ LOGOUT
    logOut: async (req, res) => {
        try {
            res.clearCookie("token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            });

            return res.status(200).json({
                message: 'Logged out successfully'
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Failed to logout'
            });
        }
    },

    // ✅ GET CURRENT USER
    me: async (req, res) => {
        try {
            const user = await User.findById(req.userId).select('-password -__v');

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json({
                message: 'User found',
                user
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Failed to get user'
            });
        }
    }
};

module.exports = authController;