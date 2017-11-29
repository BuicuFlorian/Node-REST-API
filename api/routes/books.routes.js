'use strict';

var express = require('express');
var BooksCtrl = require('../controllers/books.controller');
var router = express.Router();

router.route('/books')
    .get(BooksCtrl.index)
    .post(BooksCtrl.store);


router.route('/books/:id')
    .get(BooksCtrl.show)
    .put(BooksCtrl.update)
    .delete(BooksCtrl.destroy);

module.exports = router;