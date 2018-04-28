var socket = io.connect('http://localhost:' + 3000);

window.addEventListener('load', function () {

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

function dragMoveListener(event) {
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

// enable draggables to be dropped into this
interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '.arudino-element',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active');
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget,
      dropzoneElement = event.target;
    
      // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target');
    draggableElement.classList.add('can-drop');
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target');
    event.relatedTarget.classList.remove('can-drop');
  },
  ondrop: function (event) {

  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
  }
});
