'use strict';

var mongoose = require('mongoose'),
validUrl = require("valid-url"),
    Url = mongoose.model('Urls');
//#region User
exports.create_a_url =async function (req, res) {
    //valid short_url
    var host_url="lockalhost:4000";
    var {url} = req.body;
    if (validUrl.isUri(url)) {
        req.body.url_code = makeSortUrl(6);
    req.body.short_url = host_url + "/" + req.body.url_code;
    var new_url = new Url(req.body);
    new_url.save(function (err, url) {
        if (err) { res.send(err); }
        
        res.json(url);
    });
    } 
    else {
      return res
        .status(404)
        .json(
          "Invalid Url"
        );
    };
    
};


exports.list_all_urls = function (req, res) {
    Url.find({}, function (err, url) {
        if (err) { res.send(err); }
        res.json(url);
    });
};

/*exports.redirect = function (req, res) {
    var url_code=req.body.url_code;
    Url.find({ url_code: url_code }, function (err, url) {
        if (err) { res.send(err); }
        res.json(url);
    });
};*/
//coding function url
function makeSortUrl(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
