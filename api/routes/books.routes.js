'use strict';

const express = require('express');
const booksCtrl = require('../controllers/books.controller');
const router = express.Router();

/**
 * A route to retrieve all books from the database.
 */
router.get('/books', async(req, res) => {
    try {
        const books = await booksCtrl.index();
        
        res.json(books);
    } catch (err) {
        return res.status(500).end();
    }
});

/**
 *  A route to add a new book document to the database.
 */
router.post('/books', async(req, res) => {
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        price: req.body.price
    };

    try {
        const book = await booksCtrl.store(newBook);

        res.json({
            success: 'Book successfully saved.',
            book
        });
    } catch (err) {
        return res.status(500).end();
    }
});

/**
 * A route to retrieve one book from the database, using its id.
 */
router.get('/books/:id', async(req, res) => {
    const bookId = req.params.id;

    try {
        const book = await booksCtrl.show(bookId);

        res.json({ book });
    } catch (err) {
        return res.status(500).end();
    }
});

/**
 * A route to update an existing book document from the database.
 */
router.put('/books/:id', async(req, res) => {
    const bookId = req.params.id;
    const updatedBook = {
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        price: req.body.price
    };

    try {
        const book = await booksCtrl.update(bookId, updatedBook);

        res.json({
            success: 'Book successfully updated.',
            book
        });

    } catch (err) {
        return res.status(500).end();
    }
});

/**
 * A route to remove an existing book document from the database.
 */
router.delete('/books/:id', async(req, res) => {
    const bookId = req.params.id;

    try {
        await booksCtrl.destroy(bookId);

        res.json({ success: 'Book successfully deleted.' });
    } catch (err) {
        return res.status(500).end();
    }
});

/**
 * Exporting the router object.
 */
module.exports = router;