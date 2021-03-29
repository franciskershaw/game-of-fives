// game variables
const game = {
    userTurn: true,
    computerTurn: false,

    userInput: 0,
    userGuess: 0,

    inputArray: [],
    computerGuess: 0,

    correctScore: 0,
    userScore: 0,
    computerScore: 0,

    // Syntax for use of localStorage found on MDN: https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem & https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem
    soundsOn: localStorage.getItem("soundsOn"),

    winRecord: localStorage.getItem("winRecord"),
    loseRecord: localStorage.getItem("loseRecord"),

    computerPlayers: localStorage.getItem("computerPlayers"),
};

// DOM loads, assigns clck sounds to buttons, enables mute button and sets off the countDown and setGameHtml functions
$(document).ready(function () {
    setGameHtml();
    countDown();
    // credit: help assigning sound effects to variables and using the 'play' method found at https://www.youtube.com/watch?v=VlwSz2dXK_8&ab_channel=AdamKhoury
    let clickSound = new Audio();
    clickSound.src = "assets/sounds/clickeffect.mp3";
    // Sound from Zapsplat.com
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener('mousedown', function () {
            if (game.soundsOn === "true") {
                clickSound.play();
            }
        })
    }
    $('.mute-btn').click(function () {
        let onButton = document.getElementById('volume-on');
        let offButton = document.getElementById('volume-off');
        if (this === onButton) {
            game.soundsOn = "false";
            onButton.classList.add('hidden');
            offButton.classList.remove('hidden');
        } else {
            game.soundsOn = "true";
            offButton.classList.add('hidden');
            onButton.classList.remove('hidden');
        }
    localStorage.setItem('soundsOn', game.soundsOn);
    })
});

// Checks how many computer players there are, and sets HTML accordingly
function setGameHtml() {
    // Win vs loss record, top right of game page
    if (game.winRecord === null) {
        game.winRecord = 0;
    }
    if (game.loseRecord === null) {
        game.loseRecord = 0;
    }
    $('#win-record').text(`${game.winRecord}`);
    $('#lose-record').text(`${game.loseRecord}`);

    // Sounds on vs off, set depending on user's previous actions or defaulting to on if on a first time visit
    if (game.soundsOn === "true") {
        $('#volume-on').removeClass('hidden');
    } else if (game.soundsOn === "false") {
        $('#volume-off').removeClass('hidden');
    } else if (game.soundsOn === null) {
        $('#volume-on').removeClass('hidden');
        game.soundsOn = 'true';
    }
    localStorage.setItem('soundsOn', game.soundsOn);

    // Checks which amount of players the user chose and sets HTML
    if (game.computerPlayers == 1) {
    } else if (game.computerPlayers == 2) {
        $('#remove-two-player').remove();
        $('.add-col-two-player').removeClass('col-4').addClass('col-6');
        $('.extra-top-hand').removeClass('hidden');
        $('#fifteen').removeClass('hidden');
    } else {
        $('.extra-middle-hand').removeClass('hidden');
        $('#fifteen').removeClass('hidden');
        $('#twenty').removeClass('hidden');
        $('.number-icon').addClass('four-player-reduce');
    }
}

// 3,2,1 countdown to start the game off calls userInput for the first time
function countDown() {
    $('.game-info-quit').removeClass('hidden');
    setTimeout(function () {
        document.getElementById('round-total').innerHTML = "First to 3";
        let timeLeft = 3;
        let timer = setInterval(function () {
            if (timeLeft <= 0) {
                clearInterval(timer);
                userInput();
            } else {
                document.getElementById("round-total").innerHTML = timeLeft;
            }
            timeLeft -= 1;
        }, 1000);
    }, 1000);

}
// Source - https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown

// Enables the fist and palm icons
// Click events active on hand icons which update game.userInput
// Click will call userGuess if userTurn = true, else playComputerRound is called
function userInput() {
    game.inputArray = [];
    $('.game-info-quit').removeClass('hidden');
    if (game.userScore < 3 && game.computerScore < 3) {
        if (game.userScore === 2 && game.computerScore === 2) {
            document.getElementById('round-total').innerHTML = 'For the win!'    
        } else {
            document.getElementById("round-total").innerHTML = "Play!";
        }
        $('.hand-icon').removeAttr("disabled").off("click");
        $('.hand-icon').click(function () {
            if (this === document.getElementById("fist")) {
                game.userInput = 0;
            } else {
                game.userInput = 5;
            }
            if (game.userTurn === true) {
                userGuess();
            } else {
                playRound();
            }
        });
    } else {
        endGame();
    }
}

// Enables the number icons, disables hand icons
// Click event active on number icons which update game.userGuess
function userGuess() {
    $('.hand-icon').attr("disabled", true);
    $('.number-icon').removeAttr("disabled").off('click');
    $('.number-icon').click(function () {
        if (this === document.getElementById('zero')) {
            game.userGuess = 0;
        } else if (this === document.getElementById('five')) {
            game.userGuess = 5;
        } else if (this === document.getElementById('ten')) {
            game.userGuess = 10;
        } else if (this === document.getElementById('fifteen')) {
            game.userGuess = 15;
        } else {
            game.userGuess = 20;
        }
        playRound();
    });
}

// Each round, computerInput is updated to either 0 or 5;
function computerInput() {
    for (let i = 0; i < parseInt(game.computerPlayers); i++) {
        // credit: code generating 2 numbers, of which one is a zero, found on Peter Olsen's post at https://stackoverflow.com/questions/9730966/how-to-decide-between-two-numbers-randomly-using-javascript
        rand = Math.random() < 0.5 ? 0 : 5;
        game.inputArray.push(rand);
    }
}

// Each round, add computerInput and userInput together to update correctScore
function updateCorrectScore() {

    let arr = game.inputArray;
    // credit: code to sum the values of items in an arry found on Florian Maragaine's post at https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
    let sumOfComputer = arr.reduce(add,0);
    function add(accumulator, a) {
        return accumulator + a;
    }
    game.correctScore = game.userInput + sumOfComputer;
}

// On the computer's go, update computerGuess to either 0, 5 or 10
function computerGuess() {

    let arr = game.inputArray;
    let sumOfComputer = arr.reduce(add,0);
    function add(accumulator, a) {
        return accumulator + a;
    }
    if (sumOfComputer === 0) {
            // generate 0 or 5
            game.computerGuess = Math.random() < 0.5 ? 0 : 5;
    } else if (sumOfComputer === 5) {
            // generate 5 or 10 
            game.computerGuess = Math.floor(Math.random() * (2 - 1 + 1) + 1) * 5;
    } else if (sumOfComputer === 10) {
            // generate 10 or 15
            game.computerGuess = Math.floor(Math.random() * (2 - 1 + 1) + 2) * 5;
    } else {
            // generate 15 or 20
        game.computerGuess = Math.floor(Math.random() * (2 - 1 + 1) + 3) * 5;
    }
}

// Animation that occurs each round before displaying of guess and updating of scores
function roundAnimation() {
    const gameImages = document.querySelectorAll('.game-image');
    $('.game-image').removeClass("transparent");

    // credit: code to reset animation after one round found on Dev Ed's video around https://www.youtube.com/watch?v=qWPtKtYEsN4 at around 50 minutes
    gameImages.forEach(gameImage => {
        gameImage.addEventListener('animationend', function () {
            this.style.animation = "";
        })
    })

    let noiseOne = new Audio();
    let noiseTwo = new Audio();
    let noiseThree = new Audio();
    noiseOne.src = "assets/sounds/noise1.mp3";
    noiseTwo.src = "assets/sounds/noise2.mp3";
    noiseThree.src = "assets/sounds/noise3.mp3";

    let playerHand = document.getElementById('player-hand');
    let computerHand = document.getElementById('computer-hand');
    let topLeft = document.getElementById('top-left');
    let topRight = document.getElementById('top-right');
    let middleLeft = document.getElementById('middle-left');
    let middleRight = document.getElementById('middle-right');

    setTimeout(function () {
        // credit: applying custom css animations via JS learnt from https://www.youtube.com/watch?v=qWPtKtYEsN4&ab_channel=DevEd at around 49 minutes.
        playerHand.style.animation = "mainAnimation 1.2s";
        if (game.computerPlayers == 1) {
            computerHand.style.animation = "mainAnimation 1.2s";
        } else if (game.computerPlayers == 2) {
            topLeft.style.animation = "topLeft 1.2s";
            topRight.style.animation = "topRight 1.2s";
        } else if (game.computerPlayers == 3) {
            computerHand.style.animation = "mainAnimation 1.2s";
            middleLeft.style.animation = "middleLeft 1.2s";
            middleRight.style.animation = 'middleRight 1.2s';
        }
  
        $('#round-total').text(`1`);
        if (game.soundsOn === "true") {
            noiseOne.play();
        }
    }, 1000);
    setTimeout(function () {
        $('#round-total').text(`2`);
        if (game.soundsOn === "true") {
            noiseTwo.play();
        }
    }, 1400);
    setTimeout(function () {
        $('#round-total').text(`3`);
        if (game.soundsOn === "true") {
            noiseOne.play();
        }
    }, 1800);

    // This part of the function changes images and text at the end of the animation
    setTimeout(function () {
        // Image change from the user depending on whether they've chosen fist(0) or palm (5)
        if (game.userInput === 0) {
            $('#player-hand').attr("src", "assets/images/fistfaceup.png");
        } else {
            $('#player-hand').attr("src", "assets/images/palmfaceup.png");
        }
        // Checks amount of computer players present in the game and assigns correct images accordingly
        if (game.computerPlayers == 1) {
            if (game.inputArray[0] === 0) {
                $('#computer-hand').attr("src", "assets/images/fistfacedown.png");
            } else {
                $('#computer-hand').attr("src", "assets/images/palmfacedown.png");
            }
        } else if (game.computerPlayers == 2) {
            if (game.inputArray[0] === 0) {
                $('#top-left').attr("src", "assets/images/fistfacedown.png");
            } else {
                $('#top-left').attr("src", "assets/images/palmfacedown.png");
            }
            if (game.inputArray[1] === 0) {
                $('#top-right').attr("src", "assets/images/fistfacedown.png");
            } else {
                $('#top-right').attr("src", "assets/images/palmfacedown.png");
            }
        } else {
            if (game.inputArray[0] === 0) {
                $('#computer-hand').attr("src", "assets/images/fistfacedown.png");
            } else {
                $('#computer-hand').attr("src", "assets/images/palmfacedown.png");
            }
            if (game.inputArray[1] === 0) {
                $('#middle-left').attr("src", "assets/images/fistfacedown.png");
            } else {
                $('#middle-left').attr("src", "assets/images/palmfacedown.png");
            }
            if (game.inputArray[2] === 0) {
                $('#middle-right').attr("src", "assets/images/fistfacedown.png");
            } else {
                $('#middle-right').attr("src", "assets/images/palmfacedown.png");
            }
        }
        // Text change revealing guess depending on if it's the user or computer's turn
        if (game.userTurn === true) {
                $('#round-total').text(`${game.userGuess}!`);
                if (game.soundsOn === "true") {
                    noiseThree.play();
                }
            } else {
                $('#round-total').text(`C: ${game.computerGuess}!`);
                if (game.soundsOn === "true") {
                    noiseThree.play();
                }
            }
    }, 2200);
}

// Runs each round, with different actions depending on whether it's the user or computer's go
function playRound() {
    computerInput();
    updateCorrectScore();
    roundAnimation();
    if (game.userTurn === true) {
        $('.number-icon').attr("disabled", true);
    } else {
        $('.hand-icon').attr("disabled", true);
        computerGuess();
    }
    // Timed to occur after the animation has finished and makes clear that the round is over
    setTimeout(function () {
        let yay = new Audio();
        let meh = new Audio();
        yay.src = "assets/sounds/success.mp3";
        meh.src = "assets/sounds/meh.mp3";
        if (game.userTurn && game.userGuess === game.correctScore) {
            $('#round-total').text(`Correct!`);
            if (game.soundsOn === "true") {
                yay.play();
            }
            incrementUserScore();
        } else if (game.computerTurn && game.computerGuess === game.correctScore) {
            $('#round-total').text(`Correct!`);
            if (game.soundsOn === "true") {
                yay.play();
            }
            incrementComputerScore();
        } else {
            $('#round-total').text(`No good!`);
            if (game.soundsOn === "true") {
                meh.play();
            }
        }
    }, 3000);
    // Reverses the true/false of who's go it is, and calls userInput()
    setTimeout(function () {
        if (game.userTurn) {
            game.computerTurn = true;
            game.userTurn = false;
        } else {
            game.userTurn = true;
            game.computerTurn = false;
        };
        $('.game-image').addClass("transparent");
        $('#computer-hand').attr('src', 'assets/images/fistfacedown.png');
        $('.extra-top-hand').attr('src', 'assets/images/fistfacedown.png');
        $('.extra-middle-hand').attr('src', 'assets/images/fistfacedown.png');
        $('#player-hand').attr('src', 'assets/images/fistfaceup.png');
        userInput();
    }, 4000);
}

// Adds one to game.userScore and updates display score on top left of page
function incrementUserScore() {
    game.userScore += 1;
    $('#player-score').text(`${game.userScore}`);
    if (game.userScore === 2) {
        
    }
}

// Adds one to game.ComputerScore and updates display score on top left of page
function incrementComputerScore() {
    game.computerScore += 1;
    $('#computer-score').text(`${game.computerScore}`);
}

// Called once either the computer or the user reaches 3 points
// Gives user feedback that the game is over, either as a win or a loss
// Sound effects for victory or defeat
// Offers opportunity to play again or quit
// Adds one to the win record of either the user or the computer
// Resets the scores

function endGame() {
    updateWinRecord();
    if (game.userScore === 3) {
        $('#round-total').text(`You've won!`);
        let victory = new Audio();
        victory.src = "assets/sounds/victory.mp3";
        if (game.soundsOn === "true") {
            victory.play();
        }
    } else {
        $('#round-total').text(`You lost!`);
        let defeat = new Audio();
        defeat.src = "assets/sounds/defeat.mp3";
        if (game.soundsOn === 'true') {
            defeat.play();
        }
    }
    $('.game-info-quit').addClass('hidden');
    $('.end-game-btns').removeClass('hidden');
    $('.game-btns').addClass('hidden');
    $('#play').click(function () {
        game.userTurn = true;
        game.computerTurn = false;
        game.userScore = 0;
        game.computerScore = 0;
        $('#computer-score').text("0");
        $('#player-score').text("0");
        $('.end-game-btns').addClass('hidden');
        $('.game-btns').removeClass('hidden');
        countDown();
    });
}

function updateWinRecord() {
    if (game.userScore === 3) {
        game.winRecord++;
        $('#win-record').text(`${game.winRecord}`);
    } else {
        game.loseRecord++;
        $('#lose-record').text(`${game.loseRecord}`);
    }

    localStorage.setItem("winRecord", game.winRecord);
    localStorage.setItem("loseRecord", game.loseRecord);

};