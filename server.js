'use strict';
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/images',express.static(path.join(__dirname, 'public/images')));
app.use('/js',express.static(path.join(__dirname, 'public/js')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/weather', function (req, res) {
  var l = req.param('location');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({"param" : 'location', "value" : l }));
});

app.post('/register', function (req, res) {
  var l = req.body.location;
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({"param" : 'location', "value" : l }));
});

app.listen(3000, function () {
  console.log("http server running on port 3000");
});