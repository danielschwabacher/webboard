var socket = io.connect('http://localhost:' + 3000);
class ArduinoElement{
    constructor(elem){
        this.pin_number = 0;
        this.element_code = this.generate_element_code();
        this.element = elem
        this.run_command = "generic-run"
        this.block_type = "Base"
        this.grid_blocks = 2;
        this.modal_controller = new ModalController(this.element_code, this.block_type);
        this.add_spans();
        this.add_span_event_listeners();
    }
    generate_element_code(){
        var element_code = Math.floor(Math.random() * Math.floor(100000));
        return element_code;
    }
    add_spans() {
        var spans = this.element.getElementsByTagName('span')
        var i = 0;
        while (i < this.grid_blocks){
            if (spans[i].classList.contains('not-dropped')){
                spans[i].removeAttribute('not-dropped');
            }
            spans[i].classList += ' was-dropped'
            i++
        }
        return;
    }
    add_span_event_listeners() {
        this.element.getElementsByClassName('pin-settings')[0].addEventListener("click", () => {
           this.modal_controller.show();
        });
        this.element.getElementsByClassName('run-pin')[0].addEventListener("click", () => {
            console.log("running");
            this.run_action();
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