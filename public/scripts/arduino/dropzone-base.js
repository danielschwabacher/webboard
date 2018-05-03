const LEDPIN = 8
function create_hook(target){
    var block_type = target.classList[target.classList.length - 2]
    console.log(block_type);
    switch (block_type){
        case "arduino-led-toggle":
            // target.led_param = prompt("Which pin controls this LED")
            target.addEventListener('click', led_toggle)
        case "arduino-data-reader":
            // target.data_read_pin = prompt("Which pin to read data from");
            target.addEventListener('click', toggle_read)
    }
}

function remove_hook(target){
    var block_type = target.classList[3]
    switch (block_type){
        case "arduino-led-toggle":
            target.removeEventListener('click', led_toggle)
        case "arduino-data-reader":
            target.removeEventListener('click', read_toggle)
    }
}
