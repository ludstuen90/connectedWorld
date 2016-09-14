var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();


router.get('/', function (req, res){
  res.sendFile(path.resolve('public/views/index.html'));
});


router.get('/test', function(req, res){
  res.sendFile(path.resolve('public/views/test.html'));
});


module.exports = router;
