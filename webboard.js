var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


const PORT = 3000


app.use(express.static('public/'));
server.listen(PORT)

app.get('/', (req, res) => res.sendfile(__dirname + '/public/index.html'));

var USING_BOARD = false;

if (USING_BOARD){
    var five = require('johnny-five');
    var PRIMARY_BOARD = new five.Board();
    PRIMARY_BOARD.on('ready', function(){
        console.log("Board is ready.")
        var led = new five.Led(1);
        io.on('connect', function (socket) {
            console.log("Connected to client.")
            socket.on('toggle-led', (pin_num) => {
                led.pin = pin_num
                console.log("Pin num is: " + pin_num);
                led.toggle();
            });
        });
    });
}
else{
    console.log("Not using a board.")
    io.on('connect', function (socket) {
        console.log("Connected to client.")
        socket.on('toggle-led', (pin_num) => {
            console.log("Toggling arduino led: " + pin_num);
        });
        socket.on('read', (pin_num) => {
            console.log("Reading info from pin: " + pin_num);
        });
    });
}


