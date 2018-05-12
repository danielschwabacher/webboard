class LedToggle extends ArduinoElement{
    constructor(elem){
        super(elem)
        this.run_command = "toggle-led"
        this.block_type = "led-toggle"
    }
}