var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var five = require('johnny-five');
const interact = require('interactjs');

const PORT = 3000
var PRIMARY_BOARD = new five.Board();

app.use(express.static('public/'));
server.listen(PORT)

app.get('/', (req, res) => res.sendfile(__dirname + '/public/index.html'));

PRIMARY_BOARD.on('ready', function(){
    console.log("Board is ready.")
    var led = new five.Led(1);
    io.on('connect', function (socket) {
        console.log("Connected to client.")
        socket.on('toggle-led', (pin_num) => {
            console.log("Toggling arduino led: " + pin_num);
            led.pin = pin_num
            led.toggle();
        });
    });
});
