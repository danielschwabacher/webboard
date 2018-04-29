const LEDPIN = 8
function create_hook(target){
    var block_type = target.classList[3]
    switch (block_type){
        case "arduino-led-toggle":
            console.log("Dealing with LED toggle")
            target.led_param = LEDPIN
            target.addEventListener('click', led_toggle)
    }
}

function remove_hook(target){
    var block_type = target.classList[3]
    switch (block_type){
        case "arduino-led-toggle":
            target.removeEventListener('click', led_toggle)
    }
}

// enable draggables to be dropped into this
interact('.bp-area').dropzone({
    // only accept elements matching this CSS selector
    accept: '.arduino-element-block',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.80,
    ondragenter: function (event) {
        event.relatedTarget.classList.add('can-drop');
        event.relatedTarget.classList.remove('was-dropped');
    },
    ondragleave: function (event) {
      event.relatedTarget.classList.remove('was-dropped');
      event.relatedTarget.classList.remove('can-drop');
      remove_hook(event.relatedTarget)
    },
    ondrop: function(event){
      event.relatedTarget.classList.remove('can-drop');
      event.relatedTarget.classList.add('was-dropped');
      create_hook(event.relatedTarget)
    }
  });
  