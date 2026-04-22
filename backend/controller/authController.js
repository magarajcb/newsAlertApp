const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authController = {
    registerUser: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password)
                return res.status(400).json({ message: 'All fields are required' });

            const existingUser = await User.findOne({ email });
            if (existingUser)
                return res.status(400).json({ message: 'Email already registered' });

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, password: hashedPassword });
            const savedUser = await newUser.save();

            const { password: pass, __v, ...userData } = savedUser.toObject();
            return res.status(201).json({ message: 'User registered successfully', user: userData });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Registration failed', error: error.message });
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                return res.status(400).json({ message: 'All fields are required' });

            const user = await User.findOne({ email });
            if (!user)
                return res.status(404).json({ message: 'User not registered' });

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid)
                return res.status(400).json({ message: 'Wrong password' });

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 7 * 24 * 60 * 60 * 1000 });

            const { password: pass, __v, ...userData } = user.toObject();
            return res.status(200).json({ message: 'Login successful', user: userData });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Login failed', error: error.message });
        }
    },

    logOut: async (req, res) => {
        try {
           res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});
            return res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to logout' });
        }
    },

    me: async (req, res) => {
        try {
            const user = await User.findById(req.userId).select('-password -__v');
            if (!user) return res.status(404).json({ message: 'User not found' });
            return res.status(200).json({ message: 'User found', user });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to get user' });
        }
    }
};

module.exports = authController;