'use strict';

const express = require('express');
const booksCtrl = require('../controllers/books.controller');
const router = express.Router();

/**
 * A route to retrieve all books from the database.
 */
router.get('/books', (req, res) => {
    booksCtrl.index()
        .then(book => {
            res.json(book);
        })
        .catch(err => {
            res.status(500).end();
        });
});

/**
 *  A route to add a new book document to the database.
 */
router.post('/books', (req, res) => {
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        price: req.body.price
    };

    booksCtrl.store(newBook)
        .then(book => {
            res.json({
                success: 'Book successfully saved.',
                book
            });
        })
        .catch(err => {
            res.status(500).end();
        });
});

/**
 * A route to retrieve one book from the database, using its id.
 */
router.get('/books/:id', (req, res) => {
    const bookId = req.params.id;

    booksCtrl.show(bookId)
        .then(book => {
            if (!book) {
                res.status(404).json({ error: 'Book not found.' });
            } else {
                res.json(book);
            }
        })
        .catch(err => {
            res.status(500).end();
        });
});

/**
 * A route to update an existing book document from the database.
 */
router.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const updatedBook = {
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        price: req.body.price
    };

    booksCtrl.update(bookId, updatedBook)
        .then(book => {
            res.json({
                success: 'Book successfully updated.',
                book
            });
        })
        .catch(err => {
            res.status(500).end();
        });
});

/**
 * A route to remove an existing book document from the database.
 */
router.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;

    booksCtrl.destroy(bookId)
        .then(() => {
            res.json({ success: 'Book successfully deleted.' });
        })
        .catch(err => {
            res.status(500).end();
        });
});

/**
 * Exporting the router object.
 */
module.exports = router;