var socket = io.connect('http://localhost:' + 3000);

const NUMBER_SPANS = 3;
var blagd
class ArduinoElement{
    constructor(elem){
        this.pin_number = 5;
        this.element_code = this.generate_element_code();
        this.element = elem
        this.run_command = "generic"
        this.block_type = "Base"
        this.show_spans();
        this.set_pin_ui()
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
        this.add_span_event_listeners();
        return;
    }
    set_pin_ui(){
        document.getElementById("pin_number").innerText = this.pin_number
    }
    add_span_event_listeners() {
        this.element.getElementsByClassName('edit-pin')[0].addEventListener("click", () => {
            var pn = prompt("Which pin number?");
            this.pin_number = pn;
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