import { BookModel as Book, IBookDocument } from '../models/book';
import IBook from '../types/IBook';

/**
 * Controller for books.
 */
export default class BooksController {
    /**
     * Class constructor.
     */
    constructor() {}

    /**
     * Get all books.
     */
    async index(): Promise<IBookDocument[]> {
        const books = await Book.find({}).sort({ author: 1 }).exec();

        if (!books) {
            throw new Error('No books found!');
        }

        return books;
    }

    /**
     * Create a new book in the database.
     *
     * @param {bject} book
     * @return {Promise<IBookDocument>}
     */
    async store(book: object): Promise<IBookDocument> {
        const newBook = new Book(book);
        await newBook.save();

        return newBook;
    }

    /**
     * Find and get one book by its id.
     *
     * @param {string} id
     * @return {Promise<object>}
     */
    async show(id: string): Promise<object | null > {
        const book = await Book.findOne({ _id: id }).lean().exec();

        if (!book) {
            throw new Error('Books not found!');
        }

        return book;
    }

    /**
     * Update the given book.
     *
     * @param {string} id
     * @param {object} book
     * @return {Promise<IBookDocument>}
     */
    async update(id: string, book: object): Promise<IBookDocument> {
        const updatedBook = await Book.findOneAndUpdate({ _id: id }, book, { new: true }).exec();

        return updatedBook;
    }

    /**
     * Remove the given book from the database.
     *
     * @param {string} id
     */
    async destroy(id: string): Promise<void> {
        await Book.findByIdAndRemove({ _id: id }).exec();
    }
}
