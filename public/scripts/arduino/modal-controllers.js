class DOMAccessor{
    get(elem_code){
        // return document.get
    }
}

class ModalController{
    constructor(elem_code, type){
        this.element_code = elem_code
        this.type = type
        console.log("modal constructed");
    }
    show(){
        console.log("showing modal for: " + this.element_code)
        var modal_type = this.type;
        var md_type = document.getElementsByClassName(this.type)[0];
        console.log("modal type: " + modal_type)
        $(md_type).modal('show');
    }
}