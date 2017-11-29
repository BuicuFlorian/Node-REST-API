'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');

require('dotenv').config();

var dbUrl = process.env.DATABASE_URL;

// If the connection is successfull.
mongoose.connection.on('connected', function() {
    console.log('Connected to ' + dbUrl + '.');

    var app = express();

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan('dev'));

    var booksRoutes = require('./api/routes/books.routes');
    var middleware = require('./api/middlewares/url-not-found');

    app.use('/api', booksRoutes);
    app.use(middleware.urlNotFound);

    var port = process.env.PORT || 8000;
    var ip = process.env.IP || 'localhost';

    app.listen(port, ip, function() {
        console.log('Magic happens at ' + ip + ':' + port);
    });
});

// If the connection throws an error.
mongoose.connection.on('error', function(err) {
    console.error('Failed to connect to ' + dbUrl + ' on startup.', err);
});

// When the connection is disconnected.
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection to ' + dbUrl + ' is disconnected.');
});

// If the Node process ends, close the Mongoose connection.
mongoose.connection.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection to ' + dbUrl + ' is disconnected due to app termination.');
        process.exit(0);
    });
});

try {
    mongoose.Promise = global.Promise;
    mongoose.connect(dbUrl);
    console.log('Trying to connect to ' + dbUrl + '.');
} catch (err) {
    console.log('Server initialization failed ' + err.message);
}