var express = require('express');
var app = express();
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.json());

//Static Page
app.use(express.static('public'));

// Route inclusion
var base = require('./routes/base');

app.use('/', base);

var tweet = {user: "nodesource", text: "Hello, world!"};

io.on('connection', function(socket){


  console.log('a user connected');
  socket.on("tweet", function(tweet){
    socket.emit("tweet", tweet);
    socket.broadcast.emit("tweet", tweet);
    console.log(tweet);
  });


  // send tweet every second

  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });


  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
