const express = require('express');
const { getNews } = require('../controller/newsController');
const { isAuthenticated } = require('../middleware/auth');

const newsRouter = express.Router();
newsRouter.get('/news', isAuthenticated, getNews);

module.exports = newsRouter;