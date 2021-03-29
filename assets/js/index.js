$(document).ready(function () {
    if (window.innerWidth > window.innerHeight && window.innerWidth < 768) {
        console.log("Started in landscape on a device less than 1000px");
    }
    entryAnimation();
    // Sets win vs loss record and amends tagline depending on user's play history
    let winRecord = localStorage.getItem("winRecord");
    let loseRecord = localStorage.getItem("loseRecord");
    if (winRecord === null) {
        $("#win").text('0');
    } else {
        $('#win').text(`${winRecord}`);
    }
    if (loseRecord === null) {
        $('#lose').text('0')
    } else {
        $('#loss').text(`${loseRecord}`);
    }
    // Amends h2 tagline depending on the overall scores
    let winDifference = winRecord - loseRecord;
    console.log(`win difference is ${winDifference}`);
    if (winRecord && loseRecord == 0) {
        $('#tagline').text('Get stuck into your first game!');
    } else if (winDifference < 0) {
        $('#tagline').text("You're not great at this.");
    } else if (winDifference > 0) {
        $("#tagline").text("You're not half bad at this!");
    } else if (winDifference === 0) {
        $('#tagline').text("It's neck and neck!");
    }
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