var socket = io.connect('http://localhost:' + 3000);

window.addEventListener('load', function(){
    
    var hello_button = document.getElementById("helloButton");
    
    socket.on('connect', () => {
        console.log("Connected to socket: " + socket.id); 
    });

    hello_button.addEventListener("click", () => {
        socket.emit("clicked");
    });

});


// target elements with the "draggable" class
interact('.draggable')
.draggable({
  // enable inertial throwing
  inertia: true,
  // call this function on every dragmove event
  onmove: dragMoveListener,
  
  // call this function on every dragend event
  onend: function (event) {}
});

function dragMoveListener (event) {
  var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}


