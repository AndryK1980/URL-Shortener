'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UrlSchema = new Schema({//create UrlShema
    url: {
        type: String,
        required: 'Url is empty'
    },
    url_code: String,
    
    short_url: String
    
});

module.exports = mongoose.model('Urls', UrlSchema);