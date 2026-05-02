const express = require('express');
const { registerUser, loginUser, me, logOut } = require('../controller/authController');
const { isAuthenticated } = require('../middleware/auth');

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);

// ✅ FIXED: use GET
authRouter.get('/me', isAuthenticated, me);

// ✅ logout stays POST
authRouter.post('/logout', isAuthenticated, logOut);

module.exports = authRouter;