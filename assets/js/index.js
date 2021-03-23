$(document).ready(function () {
    if (window.innerWidth > window.innerHeight && window.innerWidth < 768) {
        console.log("Started in landscape on a device less than 1000px");
    }
})

window.addEventListener("orientationchange", function() {
    this.console.log('Changed orientation');
})

let difficultyButtons = document.querySelectorAll('.difficulty-button')
for (let difficultyButton of difficultyButtons) {
    difficultyButton.addEventListener('click', function() {
        if (this === document.getElementById('2-player')) {
            localStorage.setItem("computerPlayers", 1);
            console.log(game.computerPlayers);
        } else if (this === document.getElementById('3-player')) {
            localStorage.setItem("computerPlayers", 2);
            console.log(game.computerPlayers);
        } else {
            localStorage.setItem("computerPlayers", 3);
            console.log(game.computerPlayers);
        };
    });
};