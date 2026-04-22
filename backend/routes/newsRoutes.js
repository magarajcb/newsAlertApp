const express = require('express');
const { getNews } = require('../controller/newsController');

const newsRouter = express.Router();

newsRouter.get('/news', getNews);

module.exports = newsRouter;