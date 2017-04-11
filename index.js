var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

var people = [];

var index;
fs.readFile('./index.html', function (err, data) {
    if (err) {
        throw err;
    }
    index = data;

    console.log(data);
    console.log(data);
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on("join", function(name){

        // people[io.id] = name;
        // io.emit("update", "You have connected to the server.");
        // io.emit("update", name + " has joined the server.")
        // io.emit("update-people", people);
        //
        // // console.log(name);
        // // // console.log(people);
        // // people.push(name);
        // console.log(people);

        console.log(name);
        people.push(name);
        console.log(people);


        io.emit('join', people);
    });

    socket.on('chat message', function(msg, userName) {
        // console.log('message: ' + msg);


            io.emit('chat message', msg, userName);

    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

});

http.listen(3002, function () {
// http.listen(process.env.PORT || 5000, function () {
    console.log('listening on *:3002');
});