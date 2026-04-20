const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    categories: {
        type: [String],
        enum: ['technology', 'sports', 'politics', 'business', 'health', 'entertainment', 'science'],
        default: ['technology']
    },
    frequency: { type: String, enum: ['immediate', 'hourly', 'daily'], default: 'daily' },
    emailNotifications: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Preference', preferenceSchema,'test1');