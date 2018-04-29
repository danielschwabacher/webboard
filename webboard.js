var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const interact = require('interactjs');

const PORT = 3000

app.use(express.static('public/'));
server.listen(PORT)

app.get('/', (req, res) => res.sendfile(__dirname + '/public/index.html'));

io.on('connect', function (socket) {
    socket.on('clicked', () => {
        console.log("clicked button, on socket: " + socket.id);
    });

    socket.on('arduino-block-emit', () => {
        console.log("Recieved arduino block event");
        console.log()
    });
});

