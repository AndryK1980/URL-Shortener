'use strict';

var mongoose = require('mongoose'),
    Url = mongoose.model('Urls');
//#region User
exports.create_a_url = function (req, res) {
    req.body.short_url = makeSortUrl(6);
    var new_url = new Url(req.body);
    new_url.save(function (err, url) {
        if (err) { res.send(err); }
        res.json(url);
    });
};


exports.list_all_urls = function (req, res) {
    Url.find({}, function (err, url) {
        if (err) { res.send(err); }
        res.json(url);
    });
};

exports.redirect = function (req, res) {
    Url.find({ short_url: req.body.short_url }, function (err, url) {
        if (err) { res.send(err); }
        res.json(url);
    });
};

function makeSortUrl(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
