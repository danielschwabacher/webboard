var socket = io.connect('http://localhost:' + 3000);

function show_element_spans(el){
    var spans = el.getElementsByTagName('span')
    i = 0;
    var num_spans = 2
    while (i < num_spans){
        if (spans[i].id == 'not-dropped'){
            spans[i].removeAttribute('not-dropped');
        }
        spans[i].id = 'was-dropped'
        add_span_event_listeners(spans[i])
        i++
    }
}


function add_span_event_listeners(el){
    el.addEventListener('click', function(){
       console.log("clicked: " + JSON.stringify(el.innerHTML))
    });
}

window.addEventListener('load', function(){
    containers = [document.getElementById('element-area'), document.getElementById('bp-area')]
    dragula(containers, {
        copy: true,
        copy: function (el, source) {
            return source === document.getElementById('element-area')
        },
        accepts: function (el, target) {
            return target == document.getElementById('bp-area')
        }
    }).on('drop', function(el, container, source){
        show_element_spans(el);
    });
});

