var path = require('path');
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

//Static Page
app.use(express.static('public'));

// Route inclusion
var base = require('./routes/base');

app.use('/', base);

app.listen(process.env.PORT || 3000, function(){
  console.log('listening on server 3000');
});
