'use strict';

const Book = require('../models/book');

/**
 * Controller for books.
 */
class BooksController {
    /**
     * Class constructor.
     */
    constructor() {}

    /**
     * Get all books.
     */
    index() {
        return Book.find({}).sort({ author: 1 }).lean().exec();
    }

    /**
     * Create a new book in the database.
     * 
     * @param {Object} book 
     */
    store(book) {
        const newBook = new Book(book);

        return newBook.save();
    }

    /**
     * Find and get one book by its id.
     * 
     * @param {String} id 
     */
    show(id) {
        return Book.findOne({ _id: id }).lean().exec();
    }

    /**
     * Update the given book.
     * 
     * @param {String} id 
     * @param {Object} book 
     */
    update(id, book) {
        return Book.findOneAndUpdate({ _id: id }, book, { new: true }).exec();
    }

    /**
     * Remove the given book from the database.
     * 
     * @param {String} id 
     */
    destroy(id) {
        return Book.findByIdAndRemove({ _id: id }).exec();
    }
}

/**
 * Exporting a new instance of the books controller.
 */
module.exports = new BooksController();