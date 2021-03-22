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
            game.twoPlayer = true;
            game.threePlayer = false;
            game.fourPlayer = false;
            console.log(`User wants to play two player, game.twoPlayer is ${game.twoPlayer}`);
        } else if (this === document.getElementById('3-player')) {
            game.twoPlayer = false;
            game.threePlayer = true;
            game.fourPlayer = false;
            console.log(`User wants to play three player, game.threePlayer is ${game.threePlayer}`);
        } else {
            game.twoPlayer = false;
            game.threePlayer = false;
            game.fourPlayer = true;
            console.log(`User wants to play four player, game.fourPlayer is ${game.fourPlayer}`);
        };
    });
};