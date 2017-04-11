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
    res.render('login');
});

app.get('/login', function (req, res) {
    res.render('login');
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

    socket.on('login', function(userName) {
        console.log('user: ' + userName);
        io.emit('login', userName);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.emit('entrance', {message: 'Welcome to the chat room!'});
    socket.emit('entrance', {message: 'Your ID is #' + socket.id});

    socket.on('adduser', function (name) {
        users.push(name);

        // attempt to clean up
        socket.once('disconnect', function () {
            var pos = users.indexOf(name);

            if (pos >= 0)
                users.splice(pos, 1);
        });
    });

});

http.listen(3002, function () {
// http.listen(process.env.PORT || 5000, function () {
    console.log('listening on *:3002');
});

var users = [];
