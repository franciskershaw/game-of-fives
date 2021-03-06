var game = {
    userInput: 0,
    userGuess: 0,

    computerInput: 0,
    computerGuess: 0,

    correctScore: 0,
    userScore: 0,
    computerScore: 0
}

onload = function () {
    console.log("DOM has laoded");
    userTurnUserInput();
}

// Event handlers updating variables userInput and userGuess

$('#fist').click(function () {
    game.userInput = 0;
    $('#player-hand').attr("src", "assets/images/fistfaceup.png");
})
$('#palm').click(function () {
    game.userInput = 5;
    $('#player-hand').attr("src", "assets/images/palmfaceup.png");
})
$('#zero').click(function () {
    game.userGuess = 0;
})
$('#five').click(function () {
    game.userGuess = 5;
})

$('#ten').click(function () {
    game.userGuess = 10;
})


// Event listener waiting for the DOM to load
function userTurnUserInput() {
    // User inputs fist/palm (0/5)
    // Fist/ palm colorful, 0, 5, 10 greyed out
    // Then triggers userGuess ()
    console.log("userTurnUserInput has been called");
    $('.hand-icon').removeAttr('disabled');
}

function userTurnUserGuess() {
    // user guesses 0, 5, 10
    // fist and palm are greyed out
    // Once user has guessed, trigger generateComputerInput
    console.log("userTurnUserGuess has been called");

    $('.hand-icon').attr('disabled', true).attr('onclick', 'computerTurnGenerateComputerInput()');
    $('.number-icon').removeAttr('disabled');
}

// Randomly generates 0 or 5, as the computer's input each round
function userTurnGenerateComputerInput() {

    setTimeout(function () {
        console.log("userTurnGenerateComputerInput has been called");
        $('.number-icon').attr('disabled', true);
        game.computerInput = Math.random() < 0.5 ? 0 : 5;
        if (game.computerInput === 5) {
             $('#computer-hand').attr("src", "assets/images/palmfacedown.png");
        } else {
             $('#computer-hand').attr("src", "assets/images/fistfacedown.png");
        }
        userTurnCalculateScore();
    }, 250);

};

// // Add userInput and computerInput togther
function userTurnCalculateScore() {
    console.log("userTurnCalculateScore has been called");
    game.correctScore = game.userInput + game.computerInput;
    console.log(`User input was ${game.userInput}`);
    console.log(`Computer input is ${game.computerInput}`)
    console.log(`Correct score is ${game.correctScore}`);
    console.log(`User guess was ${game.userGuess}`);
    userTurnDisplayScore();
};

// update the score in the middle of the game to what the user has guessed
function userTurnDisplayScore() {
    console.log("userTurnDisplayScore has been called");
    $('#round-total').text(`P: ${game.userGuess}!`);

    if (game.userGuess === game.correctScore) {
        incrementUserScore();
        console.log(`User correctly guessed ${game.correctScore}`);
    } else {
        console.log(`User was incorrect`);
    }
    computerTurnUserInput();
}

// // Adds 1 to the player score top left of the game
function incrementUserScore() {
    console.log("incrementUserScore has been called");
    game.userScore += 1;
    $('#player-score').text(`${game.userScore}`);
};

function computerTurnUserInput() {
    console.log("computerTurnUserInput has been called");
     $('.hand-icon').removeAttr('disabled');
    // computerTurnGenerateComputerInput();
}

function computerTurnGenerateComputerInput() {
    // generate 0 or 5
    // trigger computerTurnGenerateComputerGuess
    $('.hand-icon').attr('disabled', true).attr('onclick', 'userTurnUserGuess()');
    console.log("computerTurnGenerateComputerInput has been called");
    setTimeout(function () {
        game.computerInput = Math.random() < 0.5 ? 0 : 5;
        if (game.computerInput === 5) {
             $('#computer-hand').attr("src", "assets/images/palmfacedown.png");
        } else {
             $('#computer-hand').attr("src", "assets/images/fistfacedown.png");
        }
         computerTurnGenerateComputerGuess();
    }, 250);
}

function computerTurnGenerateComputerGuess() {
    // generate 0, 5 or 10 (have logic in this loop based on computer input)
    // trigger displayerScore
    console.log("computerTurnGenerateComputerGuess has been called");
    setTimeout(function () {
        if (game.computerInput === 0) {
            game.computerGuess = Math.random() < 0.5 ? 0 : 5;
        } else {
            game.computerGuess = Math.floor(Math.random() * (2 - 1 + 1) + 1) * 5;
        }
        console.log(`computer guess is ${game.computerInput}`)
        computerTurnCalculateScore ();
    }, 250);

}

function computerTurnCalculateScore() {
    console.log("computerTurnCalculateScore has been called");
    game.correctScore = game.userInput + game.computerInput;
    console.log(`Correct score is ${game.correctScore}`);
    computerTurnDisplayScore();
}

function computerTurnDisplayScore() {
    console.log("computerTurnDisplayScore has been called");
    $('#round-total').text(`C: ${game.computerGuess}!`);

    if (game.computerGuess === game.correctScore) {
        incrementComputerScore();
    }
    userTurnUserInput();}

// Adds 1 to the computer score top left of the game
function incrementComputerScore() {
    console.log("incrementComputerScore has been called");
    game.userScore += 1;
    $('#computer-score').text(`${game.userScore}`);
};


