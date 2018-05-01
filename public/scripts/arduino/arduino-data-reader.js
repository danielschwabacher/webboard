var socket = io.connect('http://localhost:' + 3000);
function toggle_read(evt){
    var pin_num = evt.target.data_read_pin;
    while (true){
        setTimeout(function(){
            console.log("Reading...")
            socket.emit("read", pin_num);
        }, 1000);
    }
}