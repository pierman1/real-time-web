var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ejs = require('ejs');
var path 	 = require('path');

// express static
app.use(express.static('public')); // to add CSS

// Ejs
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs'); // set up ejs for templating

app.get('/', function(req, res){
    res.render('index');
});

app.get('/chat', function (req, res) {
    res.render('chat');
});

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

});

http.listen(3002, function () {
// http.listen(process.env.PORT || 5000, function () {
    console.log('listening on *:3002');
});