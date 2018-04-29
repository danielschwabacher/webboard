// var socket = io.connect('http://localhost:' + 3000);

window.addEventListener('load', function () {
  var hello_button = document.getElementById("helloButton");
  socket.on('connect', () => {
    console.log("Connected to socket: " + socket.id);
  });
  hello_button.addEventListener("click", () => {
    socket.emit("clicked");
  });
});