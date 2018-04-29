var socket = io.connect('http://localhost:' + 3000);

// target elements with the "draggable" class
interact('.arduino-element-block')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // call this function on every dragmove event
    onmove: onmove_translater
});

function onmove_translater(event) {
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
