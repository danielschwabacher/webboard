var socket = io.connect('http://localhost:' + 3000);
window.addEventListener('load', function(){
    containers = [document.getElementById('element-area'), document.getElementById('bp-area')]
    dragula(containers, {
        copy: true,
        copy: function (el, source) {
            return source === document.getElementById('element-area')
        },
        accepts: function (el, target) {
            return target == document.getElementById('bp-area')
        }
    }); 
});
