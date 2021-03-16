// game variables
const game = {
    userTurn: true,
    computerTurn: false,
    
    userInput: 0,
    userGuess: 0,
    
    computerInput: 0,
    computerGuess: 0,
    
    correctScore: 0,
    userScore: 0,
    computerScore: 0,

    winRecord: localStorage.getItem("winRecord"),
    loseRecord: localStorage.getItem("loseRecord"),

    // winRecord: 0,
    // loseRecord: 0,

    };

// DOM loads, assigns clck sounds to buttons and sets off the countdown
$(document).ready(function () {
    if (game.winRecord === null) {
            game.winRecord = 0;
        }
    if (game.loseRecord === null) {
        game.loseRecord = 0;
    }
    $('#win-record').text(`${game.winRecord}`);
    $('#lose-record').text(`${game.loseRecord}`);
    countDown();
    let clickSound = new Audio();
    clickSound.src = "assets/sounds/clickeffect.mp3";
    // Sound from Zapsplat.com
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener('mousedown', function() {
            clickSound.play();
        })
    }
});

// 3,2,1 countdown to start the game off calls userInput for the first time
function countDown() {
    setTimeout(function() {
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
    },1000);
   
}
// Source - https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown


// Enables the fist and palm icons
// Click events active on hand icons which update game.userInput
// Click will call userGuess if userTurn = true, else playComputerRound is called
function userInput() {
    if(game.userScore < 3 && game.computerScore < 3) {
        document.getElementById("round-total").innerHTML = "Play!";
        $('.hand-icon').removeAttr("disabled").off("click");
        $('.hand-icon').click(function() {
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
    $('.number-icon').click(function() {
        if (this === document.getElementById('zero')) {
            game.userGuess = 0;
        } else if (this === document.getElementById('five')) {
            game.userGuess = 5;
        } else {
            game.userGuess = 10;
        }
        playRound();
    });
}

// Each round, computerInput is updated to either 0 or 5;
function computerInput() {
    game.computerInput = Math.random() < 0.5 ? 0 : 5;
    // Source - https://stackoverflow.com/questions/9730966/how-to-decide-between-two-numbers-randomly-using-javascript
}

// Each round, add computerInput and userInput together to update correctScore
function updateCorrectScore() {
    game.correctScore = game.userInput + game.computerInput;
}

// On the computer's go, update computerGuess to either 0, 5 or 10
function computerGuess() {
	if (game.computerInput === 0) {
        game.computerGuess = Math.random() < 0.5 ? 0 : 5;
    } else {
        game.computerGuess = Math.floor(Math.random() * (2 - 1 + 1) + 1) * 5;
    }
}

// Animation that occurs each round before displaying of guess and updating of scores
function roundAnimation() {
    $('#player-hand').attr("src", "assets/images/fistfaceup.png");
    $('#computer-hand').attr("src", "assets/images/fistfacedown.png");
    let noiseOne = new Audio();
    noiseOne.src = "assets/sounds/noise1.mp3";
    let noiseTwo = new Audio();
    noiseTwo.src = "assets/sounds/noise2.mp3";
    let noiseThree = new Audio();
    noiseThree.src = "assets/sounds/noise3.mp3";
    $('.game-image').removeClass("transparent");
    setTimeout(function() {
        $('.game-image').addClass('game-image-animation');
        $('#round-total').text(`1`);
        noiseOne.play();
    },1000);
    setTimeout(function() {
        $('.game-image').removeClass('game-image-animation');
    },1200);
    setTimeout(function() {
        $('.game-image').addClass('game-image-animation');
        $('#round-total').text(`2`);
        noiseTwo.play();
    },1400);
    setTimeout(function() {
        $('.game-image').removeClass('game-image-animation');
    },1600);
    setTimeout(function() {
        $('.game-image').addClass('game-image-animation');
        $('#round-total').text(`3`);
        noiseOne.play();
    },1800);
    setTimeout(function() {
        $('.game-image').removeClass('game-image-animation');
    },2000);
    
    setTimeout(function() {
        if(game.userInput === 0) {
            $('#player-hand').attr("src", "assets/images/fistfaceup.png");
        } else {
            $('#player-hand').attr("src", "assets/images/palmfaceup.png");
        }
        if(game.computerInput === 0) {
            $('#computer-hand').attr("src", "assets/images/fistfacedown.png");
        } else {
            $('#computer-hand').attr("src", "assets/images/palmfacedown.png");
        }
        if (game.userTurn === true) {
            $('#round-total').text(`${game.userGuess}!`);
            noiseThree.play();
        } else {
            $('#round-total').text(`C: ${game.computerGuess}!`);
            noiseThree.play();
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
    // Timed to occur after the animation has finished
    setTimeout(function() {
        let yay = new Audio();
        yay.src = "assets/sounds/success.mp3";
        let meh = new Audio();
        meh.src = "assets/sounds/meh.mp3";
        if (game.userTurn && game.userGuess === game.correctScore) {
            $('#round-total').text(`Correct!`);
            yay.play();
            incrementUserScore();
        } else if (game.computerTurn && game.computerGuess === game.correctScore) {
            $('#round-total').text(`Correct!`);
            yay.play();
            incrementComputerScore();
        } else {
            $('#round-total').text(`No good!`);
            meh.play();
        }
    },3000);
    // Reverses the true/false of who's go it is, and calls userInput()
    setTimeout(function() {
        if(game.userTurn) {
            game.computerTurn = true;
            game.userTurn = false;
        } else {
            game.userTurn = true;
            game.computerTurn = false;
        };
        $('.game-image').addClass("transparent");
        $('#computer-hand').attr('src', 'assets/images/fistfacedown.png');
        $('#player-hand').attr('src', 'assets/images/fistfaceup.png');
        userInput();
    }, 4000);
}

// Adds one to game.userScore and updates display score on top left of page
function incrementUserScore() {
	game.userScore += 1;
	$('#player-score').text(`${game.userScore}`);
}

// Adds one to game.ComputerScore and updates display score on top left of page
function incrementComputerScore() {
    game.computerScore += 1;
	$('#computer-score').text(`${game.computerScore}`);
}

// Called once either the computer or the user reaches 5 points
// Gives user feedback that the game is over, either as a win or a loss
// Sound effects for victory or defeat
// Offers opportunity to play again or quit
// Adds one to the win record of either the user or the computer
// Resets the scores

function endGame() {
    console.log("Game over");
    updateWinRecord();
    if (game.userScore === 3) {
        $('#round-total').text(`You've won!`);
    } else {
        $('#round-total').text(`You lost!`);
    }
    $('.end-game-btns').removeClass('hidden');
    $('.game-btns').addClass('hidden');
    $('.change-end-game').removeClass('col-1').addClass('col-2');
    $('#play').click(function() {
            console.log("User want's to play again");
            game.userTurn = true;
            game.computerTurn = false;
            game.userScore = 0;
            game.computerScore = 0;
            $('#computer-score').text("0");
            $('#player-score').text("0");
            $('.end-game-btns').addClass('hidden');
            $('.game-btns').removeClass('hidden');
            $('.change-end-game').removeClass('col-2').addClass('col-1');
            countDown();
    });
}

function updateWinRecord() {
    console.log("updateWinRecord has been called");
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