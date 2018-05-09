var socket = io.connect('http://localhost:' + 3000);


window.addEventListener('load', function(){
    containers = [document.getElementById('element-area'), document.getElementById('bp-area')]
    dragula(containers, {
        copy: true,
        copy: function (el, source) {
            return source === document.getElementById('element-area')
        },
        accepts: function (el, target) {
            return target == document.getElementById('bp-area')
        },
        moves: function (el, source, handle, sibling) {
            return source != document.getElementById('bp-area')
        },
    }).on('drop', function(el, container, source){
        var element_type = el.classList[1];
        if (element_type == "arduino-led-toggle"){
            new_toggle = new LedToggle(el);
        }
        if (element_type == "arduino-data-reader"){
            new_data_reader = new DataReader(el);
        }
    });
});

