import * as mongoose from 'mongoose';
import IBook from '../types/IBook';
const Schema = mongoose.Schema;

export interface IBookDocument extends mongoose.Document, IBook {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Creating a new mongoose schema for the book document.
 */
const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});

export let BookModel = mongoose.model<IBookDocument>('Book', BookSchema);
