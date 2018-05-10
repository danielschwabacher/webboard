var view = '<div style="height: 100px; background-color: gray; display: block;">DATA: <div>'
var interval_id = null
class DataReader extends ArduinoElement{
    constructor(elem){
        super(elem)
        this.run_command = "read-data"
        this.block_type = "Data Reader"
        this.attach_view();
    }
    attach_view(){
        $(this.element).append(view);        
    }
    setup_event_listeners(){
        var run_toggle = new CustomEvent("toggle_run", {});
        var running = false
        this.element.addEventListener("toggle_run", () => {
            if (running){
                this.element.getElementsByClassName("pin_number")[0].textContent = "stopped pin " + this.pin_number;                
                running = false
            }
            else{
                this.element.getElementsByClassName("pin_number")[0].textContent = "running pin " + this.pin_number;
                running = true
            }
        });
        this.element.getElementsByClassName('run-pin')[0].addEventListener("click", () => {
            this.element.dispatchEvent(run_toggle);
            if (running){
                this.read();     
            }
            else{
                clearInterval(interval_id)
            }
        });
    }
    read(){
        var timeout_duration = 1000;
        var call_read = () => {
            console.log("Reading from: " + this.pin_number);
            socket.emit(this.run_command, this.pin_number);
        }
        interval_id = setInterval(call_read, timeout_duration);
    }
}