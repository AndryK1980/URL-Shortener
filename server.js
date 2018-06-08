var express = require('express'),//импортировал модуль 
app = express(),//инициализировал объект
port = process.env.PORT || 3000,//подключаемый порт
mongoose = require('mongoose'),
Url = require('./api/models/urlModel'), //created model loading here

bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/url_shotener'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/apiservRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('My api RESTful API server started on: ' + port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });