var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();

router.get('/', function (req, res){
  res.sendFile(path.resolve('public/views/remote.html'));
});

router.get('/display', function(req, res){
  res.sendFile(path.resolve('public/views/index.html'));
});

router.get('/calendar', function(req, res){
  res.sendFile(path.resolve('public/views/calendar.html'));
});

router.get('/photos', function(req, res){
  res.sendFile(path.resolve('public/views/photos.html'));
});

router.get('/weather', function(req, res){
  res.sendFile(path.resolve('public/views/weather.html'));
});

router.get('/greeting', function(req, res){
  res.sendFile(path.resolve('public/views/greeting.html'));
});

module.exports = router;
