$(document).ready(function () {
    if (window.innerWidth > window.innerHeight === true) {
        console.log("hello");
    }
})

window.addEventListener("orientationchange", function() {
    this.console.log('Changed orientation');
})


let difficultyButtons = document.querySelectorAll('.difficulty-button')
for (let difficultyButton of difficultyButtons) {
    difficultyButton.addEventListener('click', function() {
        if (this === document.getElementById('2-player')) {
            console.log("you clicked 2");
        } else if (this === document.getElementById('3-player')) {
            console.log("you clicked 3");
        } else {
            console.log("you clicked 4");
        };
    });
};