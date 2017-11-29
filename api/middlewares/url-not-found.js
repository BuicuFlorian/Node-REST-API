'use strict';

exports.urlNotFound = (req, res) => {
    res.status(404).send({ error: `URL ${req.originalUrl} not found!` });
};