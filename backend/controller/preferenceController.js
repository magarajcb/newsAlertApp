const Preference = require('../models/preference');

const preferenceController = {
    getPreferences: async (req, res) => {
        try {
            let preference = await Preference.findOne({ userId: req.userId });
            if (!preference) preference = await Preference.create({ userId: req.userId });
            return res.status(200).json({ preference });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to get preferences', error: error.message });
        }
    },

    updatePreferences: async (req, res) => {
        try {
            const { categories, frequency, emailNotifications } = req.body;
            const preference = await Preference.findOneAndUpdate(
                { userId: req.userId },
                { categories, frequency, emailNotifications },
                { new: true, upsert: true }
            );
            return res.status(200).json({ message: 'Preferences updated', preference });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to update preferences', error: error.message });
        }
    }
};

module.exports = preferenceController;