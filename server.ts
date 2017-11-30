import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import booksRoutes from './api/routes/books.routes';

dotenv.config();

const dbUrl = process.env.DATABASE_URL;

// If the connection is successfull.
mongoose.connection.on('connected', () => {
    console.log(`Connected to ${dbUrl}.`);

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan('dev'));

    app.use('/api', booksRoutes);

    const port = process.env.PORT || 8000;

    app.listen(port, () => {
        console.log(`Magic happens at http://localhost:${port}`);
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

try {
    (mongoose as any).Promise = global.Promise;
    mongoose.connect(dbUrl);
    console.log(`Trying to connect to ${dbUrl}.`);
} catch (err) {
    console.log(`Server initialization failed ${err.message}`);
}
