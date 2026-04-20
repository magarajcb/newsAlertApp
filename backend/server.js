const mongoose = require('mongoose');
const app = require('./app');
// const { startNewsAlerts } = require('./utils/cronJobs');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log(' Connected to MongoDB Atlas');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            // startNewsAlerts();
        });
    })
    .catch((error) => {
        console.log('MongoDB connection failed:', error.message);
    });