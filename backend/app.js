const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes');
const preferenceRouter = require('./routes/preferenceRoutes');
const newsRouter = require('./routes/newsRoutes');
const notificationRouter = require('./routes/notificationRoutes');

const app = express();


app.use(cors({
    origin: 'https://newsalertapp-frontend.netlify.app',
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





module.exports = app;