if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}
import "regenerator-runtime";
const express = require('express');
const app = express();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
const server = require('http').createServer(app);
const mongoose = require('mongoose');
import path from 'path';
import cors from 'cors';

const PORT = process.env.PORT || 3031;

const WAITLIST_WEB_APP = path.join(__dirname, '../public/dist');

import waitlistroute from './waitlist.route';

//const assetsDirectory = path.join(__dirname, 'assets');

app.use('/assets', express.static('assets'));
app.use(express.static('public/dist'))

app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(waitlistroute);

app.get('/', (req, res) => {
    const indexPath = path.join(WAITLIST_WEB_APP, 'index.html');

    res.sendFile(indexPath);
});

const corsOptions = {
    origin: [
        'https://www.payoor.shop',
        'https://waitlist.payoor.shop',
        'http://localhost:3000',
    ],
    optionsSuccessStatus: 200,
};

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        server.listen(PORT, (error) => {
            if (error) {
                return console.error('Error starting server:', error);
            }
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });