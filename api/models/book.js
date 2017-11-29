'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Creating a new mongoose schema for the book document.
 */
const BookSchema = Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', BookSchema);