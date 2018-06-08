'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UrlSchema = new Schema({//create UrlShema
    url: {
        type: String,
        required: 'Url is empty'
    },
    short_url:{
        type: String
    },
});

module.exports = mongoose.model('Urls', UrlSchema);