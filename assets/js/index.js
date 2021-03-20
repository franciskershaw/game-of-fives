$(document).ready(function () {
    if (window.innerWidth > window.innerHeight === true) {
        console.log("hello");
    }
})

window.addEventListener("orientationchange", function() {
    this.console.log('Changed orientation');
})