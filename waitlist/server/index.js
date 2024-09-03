require('dotenv').config();
import 'regenerator-runtime/runtime';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import http from 'http';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import waitlistRoute from './waitlist.route';

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3031;
const WAITLIST_WEB_APP = path.join(__dirname, '../public/dist');

const corsOptions = {
    origin: [
        'https://www.payoor.shop',
        'https://waitlist.payoor.shop',
        'http://localhost:3000',
    ],
    optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Static file serving
app.use('/assets', express.static('assets'));
app.use(express.static('public/dist'));

// Routes
app.use('/api', waitlistRoute);

app.get('/', (req, res) => {
    const indexPath = path.join(WAITLIST_WEB_APP, 'index.html');
    res.sendFile(indexPath);
});

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).json({ error: 'Internal Server Error' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Database connection and server start
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

export default app;