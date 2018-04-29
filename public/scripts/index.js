window.addEventListener('load', function () {
  socket.on('connect', () => {
    console.log("Connected to socket: " + socket.id);
  });
});