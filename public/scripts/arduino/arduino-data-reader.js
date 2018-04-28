class DataReader extends ArduinoElement{
    constructor(elem){
        super(elem)
        this.run_command = "read-data"
        this.block_type = "Data Reader"
    }
}