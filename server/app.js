var express = require('express');
var app = express();
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.json());

//Static Page
app.use(express.static('public'));




// Route inclusion
var base = require('./routes/base');

app.use('/', base);


io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
