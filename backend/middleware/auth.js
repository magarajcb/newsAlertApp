const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuthenticated = (req, res, next) => {
    try {
        let token;

        // ✅ 1. Check Authorization header (PRIMARY)
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        // ✅ 2. Fallback to cookies (OPTIONAL)
        if (!token && req.cookies?.token) {
            token = req.cookies.token;
        }

        // ❌ No token
        if (!token) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        // ✅ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;

        next();

    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = { isAuthenticated };