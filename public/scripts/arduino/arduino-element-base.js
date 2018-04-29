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
    if (!event.target.dragOrigin) {
        var clone = event.target.cloneNode(true);
        clone.dragOrigin = event.target;
        event.interaction.element = clone;
        event.interaction.dragging = false;
        dragTarget = clone;
        document.body.appendChild(clone);
        dragTarget.setAttribute('data-x', 300);
        dragTarget.setAttribute('data-y', -450);
        console.log("Clone x is: " + dragTarget.getAttribute('data-x'))
        console.log("Clone y is: " + dragTarget.getAttribute('data-y'))
    } 
    else {
        dragTarget = event.target;
    }

      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(dragTarget.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(dragTarget.getAttribute('data-y')) || 0) + event.dy;
  
    // translate the element
    dragTarget.style.webkitTransform =
    dragTarget.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';
  
    // update the posiion attributes
    dragTarget.setAttribute('data-x', x);
    dragTarget.setAttribute('data-y', y);
}