const Notification = require('../models/notification');

const notificationController = {
    getNotifications: async (req, res) => {
        try {
            const notifications = await Notification.find({ userId: req.userId })
                .sort({ createdAt: -1 }).limit(50);
            return res.status(200).json({ notifications });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to get notifications', error: error.message });
        }
    },

    markAsRead: async (req, res) => {
        try {
            await Notification.findOneAndUpdate(
                { _id: req.params.id, userId: req.userId },
                { read: true }
            );
            return res.status(200).json({ message: 'Marked as read' });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to mark as read', error: error.message });
        }
    },

    clearAll: async (req, res) => {
        try {
            await Notification.deleteMany({ userId: req.userId });
            return res.status(200).json({ message: 'All notifications cleared' });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to clear notifications', error: error.message });
        }
    }
};

module.exports = notificationController;