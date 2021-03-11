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
    computerScore: 0
    }

// Waiting for dom to load before setting off countdown
$(document).ready(function () {
    console.log("dom has loaded");
    countDown();
});

// 3,2,1 countdown to start the game off calls userInput for the first time
function countDown() {
    console.log("countDown has been called");
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
}
// Source - https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown

// Enables the fist and palm icons
// Click events active on hand icons which update game.userInput
// Click will call userGuess if userTurn = true, else playComputerRound is called
function userInput() {
    console.log("------------------");
    console.log("userInput has been called");
    document.getElementById("round-total").innerHTML = "Play!";
    $('.hand-icon').removeAttr("disabled").off("click");
    $('.hand-icon').click(function() {
        if (this === document.getElementById("fist")) {
            game.userInput = 0;
        } else {
            game.userInput = 5;
        }
        if (game.userTurn === true) {
            console.log("It is the user's turn, proceed to userGuess");
            userGuess();
        } else {
            console.log("It is the computer's turn, proceed to playRound");
            playRound();
        }
    });
}

// Enables the number icons, disables hand icons
// Click event active on number icons which update game.userGuess
function userGuess() {
    console.log("userGuess has been called");
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
        console.log(`User guess is ${game.userGuess}`);
        playRound();
    });
}

// Each round, computerInput is updated to either 0 or 5;
function computerInput() {
    console.log("computerInput has been called");
    game.computerInput = Math.random() < 0.5 ? 0 : 5;
    // Source - https://stackoverflow.com/questions/9730966/how-to-decide-between-two-numbers-randomly-using-javascript
}

// Each round, add computerInput and userInput together to update correctScore
function updateCorrectScore() {
    console.log("updateCorrectScore has been called");
    game.correctScore = game.userInput + game.computerInput;
}

// On the computer's go, update computerGuess to either 0, 5 or 10
function computerGuess() {
    console.log("computerGuess has been called");
	if (game.computerInput === 0) {
        game.computerGuess = Math.random() < 0.5 ? 0 : 5;
    } else {
        game.computerGuess = Math.floor(Math.random() * (2 - 1 + 1) + 1) * 5;
    }
}

// Animation that occurs each round before displaying of guess and updating of scores
function roundAnimation() {
    console.log("roundAnimation has been called");
    $('.game-image').removeClass("transparent");
    
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
            $('#round-total').text(`P: ${game.userGuess}!`);
        } else {
            $('#round-total').text(`C: ${game.computerGuess}!`);
        }
    }, 3000);
}

// Runs each round, with different actions depending on whether it's the user or computer's go
function playRound() {
    console.log("playRound has been called");
    console.log(`User input is ${game.userInput}`);
    computerInput();
    console.log(`Computer's input is ${game.computerInput}`);
    updateCorrectScore();
    console.log(`Correct score is ${game.correctScore}`);
    roundAnimation(); 
    if (game.userTurn === true) {
        $('.number-icon').attr("disabled", true);
    } else {
        $('.hand-icon').attr("disabled", true);
        computerGuess();
        console.log(`Computer guess is ${game.computerGuess}`);
    }
    // Timed to occur after the animation has finished
    setTimeout(function() {
        if (game.userTurn && game.userGuess === game.correctScore) {
            $('#round-total').text(`Yes!`);
            incrementUserScore();
        } else if (game.computerTurn && game.computerGuess === game.correctScore) {
            $('#round-total').text(`Yes!`);
            incrementComputerScore();
        } else {
            $('#round-total').text(`Boo!`);
        }
    },4500);
    // Reverses the true/false of who's go it is, and calls userInput()
    setTimeout(function() {
        if(game.userTurn === true && game.computerTurn === false) {
            game.computerTurn = true;
            game.userTurn = false;
        } else {
            game.userTurn = true;
            game.computerTurn = false;
        };
        console.log(`game.userTurn is now ${game.userTurn}, computerTurn is ${game.computerTurn}`);
        $('.game-image').addClass("transparent");
        userInput();
    }, 6500);
}

// Adds one to game.userScore and updates display score on top left of page
function incrementUserScore() {
    console.log("incrementUserScore has been called");
	game.userScore += 1;
	$('#player-score').text(`${game.userScore}`);
}

// Adds one to game.ComputerScore and updates display score on top left of page
function incrementComputerScore() {
    console.log("incrementComputerScore has been called");
    game.computerScore += 1;
	$('#computer-score').text(`${game.computerScore}`);
}