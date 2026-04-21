const cron = require('node-cron');
const User = require('../models/user');
const Preference = require('../models/preference');
const Notification = require('../models/notification');
const { fetchNewsByCategory } = require('./newsService');
const { sendNewsEmail } = require('./emailService');

const processAlerts = async (frequency) => {
    try {
        const preferences = await Preference.find({ frequency });
        for (const pref of preferences) {
            const user = await User.findById(pref.userId);
            if (!user) continue;
            for (const category of pref.categories) {
                const articles = await fetchNewsByCategory(category);
                if (articles.length === 0) continue;
                for (const article of articles.slice(0, 3)) {
                    await Notification.create({
                        userId: user._id,
                        title: article.title,
                        description: article.description,
                        url: article.url,
                        source: article.source?.name,
                        category,
                        sentVia: 'email'
                    });
                }
                if (pref.emailNotifications) {
                    await sendNewsEmail(user.email, user.name, articles, category);
                }
            }
        }
    } catch (error) {
        console.log('❌ Cron error:', error.message);
    }
};

const startNewsAlerts = () => {
    cron.schedule('* * * * *', () => { console.log(' Immediate alerts...'); processAlerts('immediate'); });
    cron.schedule('0 * * * *', () => { console.log('Hourly alerts...'); processAlerts('hourly'); });
    cron.schedule('0 8 * * *', () => { console.log('Daily alerts...'); processAlerts('daily'); });
    console.log('✅ Cron jobs started');
};

module.exports = { startNewsAlerts };    