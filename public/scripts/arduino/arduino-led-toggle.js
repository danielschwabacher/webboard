var socket = io.connect('http://localhost:' + 3000);

const OVERRIDE_SET_PIN = true;
const LED_TOGGLE_SPANS = 2;


LedToggle = function(elem){
    console.log("Creating a new LED Toggle element");
    this.pin_number = this.set_pin_id()
    this.element_code = this.generate_element_code()
    this.element = elem
    this.show_spans();
}

LedToggle.prototype.set_pin_id = function(){
    var pn = prompt("Which pin number?")
    return pn;
}

LedToggle.prototype.generate_element_code = function(){
    var element_code = Math.floor(Math.random() * Math.floor(100000));
    return element_code;
}


LedToggle.prototype.show_spans = function(){
    var spans = this.element.getElementsByTagName('span')
    i = 0;
    while (i < LED_TOGGLE_SPANS){
        if (spans[i].id == 'not-dropped'){
            spans[i].removeAttribute('not-dropped');
        }
        spans[i].id = 'was-dropped'
        this.add_span_event_listeners(spans[i]);
        i++
    }
    return;
}

LedToggle.prototype.add_span_event_listeners = function(span_element){
    var innerText = span_element.innerHTML;
    span_element.addEventListener('click', () =>{
        if (innerText == "Delete"){
            console.log("Deleting LED toggle with code: " + this.element_code);
            this.delete();
        }
        if (innerText == "Edit Pin"){
            this.pin_number = this.set_pin_id();
        }
    });
    return
}

LedToggle.prototype.delete = function(){
    console.log("Deleting element with code: " + this.element_code);
    console.log("Element controls pin number: " + this.pin_number);
    this.element.parentNode.removeChild(this.element);
    return;
}


LedToggle.prototype.info = function(){
    console.log("Element code: " + this.element_code);
    console.log("Pin number: " + this.pin_number);
    return;
}


/*
    function led_toggle(evt){
        var pin_num = evt.target.led_param;
        socket.emit("toggle-led", pin_num);
    }
*/