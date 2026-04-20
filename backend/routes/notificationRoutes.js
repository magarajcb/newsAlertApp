const express = require('express');
const { getNotifications, markAsRead, clearAll } = require('../controller/notificationController');
const { isAuthenticated } = require('../middleware/auth');

const notificationRouter = express.Router();
notificationRouter.get('/', isAuthenticated, getNotifications);
notificationRouter.put('/:id/read', isAuthenticated, markAsRead);
notificationRouter.delete('/', isAuthenticated, clearAll);

module.exports = notificationRouter;