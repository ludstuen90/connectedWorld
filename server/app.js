var express = require('express');
var app = express();
var socketio = require('socket.io');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));


app.use(bodyParser.json());

//Static Page
app.use(express.static('public'));

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
console.log('a user is connected');

socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


// Route inclusion
var base = require('./routes/base');

app.use('/', base);

var server = app.listen(process.env.PORT || 3000, function(){
  console.log('listening on server 3000');
});
