const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes');
const preferenceRouter = require('./routes/preferenceRoutes');
const newsRouter = require('./routes/newsRoutes');
const notificationRouter = require('./routes/notificationRoutes');

const app = express();


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => res.json({ message: 'Server is running ✅' }));
app.use('/auth', authRouter);
app.use('/preferences', preferenceRouter);
app.use('/api', newsRouter);
app.use('/api/notification', notificationRouter);


app.get('/test-email', async (req, res) => {
    try {
        const { sendNewsEmail } = require('./utils/emailService');
        await sendNewsEmail(
            'ariraentjoc@gmail.com',  // your email
            'Test User',
            [
                {
                    title: 'Test News Article',
                    description: 'This is a test news description',
                    url: 'https://google.com',
                    source: { name: 'Test Source' }
                }
            ],
            'technology'
        );
        res.json({ message: 'Email sent! Check your inbox ✅' });
    } catch (error) {
        res.status(500).json({ message: 'Email failed ❌', error: error.message });
    }
});
// TEMPORARY - test cron manually
app.get('/test-cron', async (req, res) => {
    try {
        const { processAlerts } = require('./utils/cronJobs');
        await processAlerts('immediate');
        res.json({ message: 'Cron triggered! Check your email ✅' });
    } catch (error) {
        res.status(500).json({ message: 'Cron failed ❌', error: error.message });
    }
});
module.exports = app;