var socket = io.connect('http://localhost:' + 3000);

const NUMBER_SPANS = 3;

class ArduinoElement{
    constructor(elem){
        this.pin_number = 0;
        this.element_code = this.generate_element_code();
        this.element = elem
        this.run_command = "generic"
        this.show_spans();
    }
    set set_pin_id(pn){
        this.pin_number = pn;
    }
    prompt_pin_id(){
        var pn = prompt("Which pin number?");
        return pn
    }
    generate_element_code(){
        var element_code = Math.floor(Math.random() * Math.floor(100000));
        return element_code;
    }
    show_spans() {
        var spans = this.element.getElementsByTagName('span')
        var i = 0;
        while (i < NUMBER_SPANS){
            if (spans[i].id == 'not-dropped'){
                spans[i].removeAttribute('not-dropped');
            }
            spans[i].id = 'was-dropped'
            this.add_span_event_listeners(spans[i]);
            i++
        }
        return;
    }
    add_span_event_listeners(span_element) {
        var innerText = span_element.innerHTML;
        span_element.addEventListener('click', () =>{
            if (innerText == "Delete"){
                console.log("Deleting LED toggle with code: " + this.element_code);
                this.delete();
            }
            if (innerText == "Edit Pin"){
                var new_pin_num = this.prompt_pin_id()
                this.pin_number = new_pin_num;
            }
            if (innerText == "Toggle Pin"){
                this.run_action();
            }
        });
        return
    }
    delete(){
        console.log("Deleting element with code: " + this.element_code);
        console.log("Element controls pin number: " + this.pin_number);
        this.element.parentNode.removeChild(this.element);
        return;
    }
    run_action(){
        socket.emit(this.run_command, this.pin_number);
        return 0;
    }
}