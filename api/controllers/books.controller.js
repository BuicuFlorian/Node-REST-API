'use strict';

var mongoose = require('mongoose');
var Book = require('../models/book');

exports.index = function(req, res) {
    Book.find({}, function(err, books) {
        if (err) {
            res.send(err);
        } else {
            res.json(books);
        }
    });
};

exports.store = function(req, res) {
    var book = new Book(req.body);

    book.save(function(err, book) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                message: 'Book successfully saved.',
                book: book
            });
        }
    });
};

exports.show = function(req, res) {
    Book.findById(req.params.id, function(err, book) {
        if (err) {
            res.send(err);
        } else {
            res.json(book);
        }
    });
};

exports.update = function(req, res) {
    Book.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function(err, book) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                message: 'Book successfully updated.',
                book: book
            });
        }
    });
};

exports.destroy = function(req, res) {
    Book.findOneAndRemove({ _id: req.params.id }, function(err, book) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Book successfully deleted.' });
        }
    });
};