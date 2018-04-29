var socket = io.connect('http://localhost:' + 3000);

// target elements with the "draggable" class
interact('.arduino-element-block')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // call this function on every dragmove event
    onmove: dragMoveListener,

    // call this function on every dragend event
    onend: function (event) {

    }
});

function create_hook(bt){
}


function add_blueprint(target){
    console.log('block added');
    console.log(target);
    var block_type = target.classList[3]
    //create_hook(block_type);
    target.addEventListener('click', function(){
        socket.emit("clicked");
    });
}

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
interact('.bp-area').dropzone({
  // only accept elements matching this CSS selector
  accept: '.arduino-element-block',
  
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.80,

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.relatedTarget.classList.remove('was-dropped');
  },

  ondragenter: function (event) {
    var draggableElement = event.relatedTarget
    var dropzoneElement = event.target;
    // feedback the possibility of a drop
    draggableElement.classList.add('can-drop');
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.relatedTarget.classList.remove('can-drop');
  },
  ondrop: function(event){
    event.relatedTarget.classList.remove('can-drop');
    event.relatedTarget.classList.add('was-dropped');
    add_blueprint(event.relatedTarget)
  },
  ondropdeactivate: function (event) {
      event.relatedTarget.classList.remove('can-drop');
      event.relatedTarget.classList.add('was-dropped');
  }
});
