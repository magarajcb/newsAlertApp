const express = require('express');
const { getPreferences, updatePreferences } = require('../controller/preferenceController');
const { isAuthenticated } = require('../middleware/auth');

const preferenceRouter = express.Router();
preferenceRouter.get('/', isAuthenticated, getPreferences);
preferenceRouter.put('/', isAuthenticated, updatePreferences);

module.exports = preferenceRouter;