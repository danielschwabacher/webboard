var socket = io.connect('http://localhost:' + 3000);

const NUMBER_SPANS = 3;

class ArduinoElement{
    constructor(elem){
        this.pin_number = 0;
        this.element_code = this.generate_element_code();
        this.element = elem
        this.run_command = "generic"
        this.block_type = "Base"
        this.show_spans();
        this.add_span_event_listeners();
        this.element.addEventListener("pin_changed", () => {
            this.element.getElementsByClassName("pin_number")[0].innerText = this.pin_number
        });

    }
    generate_element_code(){
        var element_code = Math.floor(Math.random() * Math.floor(100000));
        return element_code;
    }
    show_spans() {
        var spans = this.element.getElementsByTagName('span')
        var i = 0;
        while (i < NUMBER_SPANS){
            if (spans[i].classList.contains('not-dropped')){
                spans[i].removeAttribute('not-dropped');
            }
            spans[i].classList += ' was-dropped'
            i++
        }
        return;
    }
    set_pin_id(){
        var pn = prompt("Which pin number?");
        if (pn != null && pn != undefined){
            this.pin_number = pn;
            // create and dispatch the event
            var pin_changed_event = new CustomEvent("pin_changed", {});
            this.element.dispatchEvent(pin_changed_event);
        }
        else{
            console.log("Invalid pin number")
        }
    }
    add_span_event_listeners() {
        this.element.getElementsByClassName('edit-pin')[0].addEventListener("click", () => {
            this.set_pin_id();
        });
        this.element.getElementsByClassName('run-pin')[0].addEventListener("click", () => {
            this.run_action();
        });
        this.element.getElementsByClassName('delete-block')[0].addEventListener("click", () => {
            this.delete();
        });
    }
    delete(){
        console.log("Deleting the following block type: ");
        console.log(this.block_type)
        console.log("Element controls pin number: " + this.pin_number);
        this.element.parentNode.removeChild(this.element);
        return;
    }
    run_action(){
        socket.emit(this.run_command, this.pin_number);
        return 0;
    }
}