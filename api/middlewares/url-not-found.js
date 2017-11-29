'use strict';

exports.urlNotFound = function(req, res) {
    res.status(404).send({ error: 'URL ' + req.originalUrl + ' not found!' });
};