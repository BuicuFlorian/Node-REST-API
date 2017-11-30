'use stric';

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
    async index() {
        const books = await Book.find({}).sort({ author: 1 }).lean().exec();

        return books;
    }

    /**
     * Create a new book in the database.
     * 
     * @param {Object} book 
     */
    async store(book) {
        const newBook = new Book(book);
        const theBook = await newBook.save();

        return theBook;
    }

    /**
     * Find and get one book by its id.
     * 
     * @param {String} id 
     */
    async show(id) {
        const book = await Book.findOne({ _id: id }).lean().exec();

        if (!book) {
            throw new Error('Books not found!');
        }

        return book;
    }

    /**
     * Update the given book.
     * 
     * @param {String} id 
     * @param {Object} book 
     */
    async update(id, book) {
        const updatedBook = await Book.findOneAndUpdate({ _id: id }, book, { new: true }).exec();
        
        return updatedBook;
    }

    /**
     * Remove the given book from the database.
     * 
     * @param {String} id 
     */
    async destroy(id) {
        await Book.findByIdAndRemove({ _id: id }).exec();
    }
}

/**
 * Exporting a new instance of the books controller.
 */
module.exports = new BooksController();