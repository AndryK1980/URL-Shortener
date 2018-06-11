'use strict';
require('../models/urlModel');
var mongoose = require('mongoose'),
    validUrl = require("valid-url"),
    Url = mongoose.model('Urls');
//create url
exports.create_a_url = async function (req, res) {
    //valid short_url
    var host_url = "localhost:4000";
    var url = req.body.url;
    var userUrl=req.body.userShortUrl;
    var record = await Url.findOne({'url_code':userUrl});
    if (userUrl) {
        if (record!=null) {
            res.status(404).json({message: "Invalid short Url"});
        } else {
            if (validUrl.isUri(url)) {
                req.body.url_code = userUrl;
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
                        {message: "Invalid Url"}
                    );
            }; 
        }
    }
    else{
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
                    {message: "Invalid Url"}
                );
        };
    }
};
//list all users
exports.list_all_urls = function (req, res) {
    Url.find({}, function (err, url) {
        if (err) { res.send(err); }
        res.json(url);
    });
};
//redirect this shot url
exports.redirect =async function (req, res) {
    var url_code = req.params.url_code;
    Url.findOne({'url_code': url_code }, await function (err, url) {
        if (err) { res.send(err); }
        if (url != null) {            
            return res.redirect(url.url);
        } else {
            res.send("Short url not found");
        }        
    });
};
//coding function url
function makeSortUrl(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
