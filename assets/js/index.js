$(document).ready(function () {
    if (window.innerWidth > window.innerHeight && window.innerWidth < 768) {
        console.log("Started in landscape on a device less than 1000px");
    }
    entryAnimation();
})

window.addEventListener("orientationchange", function() {
    this.console.log('Changed orientation');
})

// Simple animation that introduces the 2 main images followed by the headings

function entryAnimation() {
        setTimeout(function() {
        $('.home-img').removeClass('opaque').addClass('home-entry-one');
    }, 1000);
    setTimeout(function() {
        $('.home-img').removeClass('home-entry-one').addClass('home-entry-two');
        
    },1500);
    setTimeout(function() {
        $('.home-img').removeClass('home-entry-two').addClass('home-entry-three');
    },2000);
    setTimeout(function() {
        $('.home-img').removeClass('home-entry-three');
        $('.heading-content').removeClass('opaque');
        $('.home-record').removeClass('opaque');
    },2500);
}

// Loops over the difficulty buttons in the modal launched once 'Play' button is clicked and uses local storage to assign how many computer players there will be in game object.

let difficultyButtons = document.querySelectorAll('.difficulty-button')
for (let difficultyButton of difficultyButtons) {
    difficultyButton.addEventListener('click', function() {
        if (this === document.getElementById('2-player')) {
            localStorage.setItem("computerPlayers", 1);
        } else if (this === document.getElementById('3-player')) {
            localStorage.setItem("computerPlayers", 2);
        } else {
            localStorage.setItem("computerPlayers", 3);
        };
    });
};