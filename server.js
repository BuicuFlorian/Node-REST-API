'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

require('dotenv').config();

const dbUrl = process.env.DATABASE_URL;

// If the connection is successfull.
mongoose.connection.on('connected', () => {
    console.log(`Connected to ${dbUrl}.`);

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan('dev'));

    const booksRoutes = require('./api/routes/books.routes');
    const middleware = require('./api/middlewares/url-not-found');

    app.use('/api', booksRoutes);
    app.use(middleware.urlNotFound);

    const port = process.env.PORT || 8000;
    const ip = process.env.IP || 'localhost';

    app.listen(port, ip, () => {
        console.log(`Magic happens at ${ip}:${port}`);
    });
});

// If the connection throws an error.
mongoose.connection.on('error', (err) => {
    console.error(`Failed to connect to ${dbUrl} on startup.`, err);
});

// When the connection is disconnected.
mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose default connection to ${dbUrl} is disconnected.`);
});

// If the Node process ends, close the Mongoose connection.
mongoose.connection.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log(`Mongoose default connection to ${dbUrl} is disconnected due to app termination.`);
        process.exit(0);
    });
});

(async() => {
    try {
        mongoose.Promise = global.Promise;
        await mongoose.connect(dbUrl);
        console.log(`Trying to connect to ${dbUrl}.`);
    } catch (err) {
        console.log(`Server initialization failed ${err.message}`);
    }
})();
