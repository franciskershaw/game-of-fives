// game variables, updated at various stages
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
			document.getElementById("round-total").innerHTML = "Play!";
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
    $('.hand-icon').removeAttr("disabled");
    $('#fist').off("click");
    $('#fist').click(function() {
        game.userInput = 0;
        console.log(`User input is ${game.userInput}`)
        if (game.userTurn === true) {
            console.log("It is the user's turn, proceed to userGuess");
            userGuess();
        } else {
            console.log("It is the computer's turn, proceed to playComputerRound");
            playComputerRound();
        }
    });
    $('#palm').off("click");
    $('#palm').click(function() {
        game.userInput = 5;
        console.log(`User input is ${game.userInput}`);
        if (game.userTurn === true) {
            console.log("It is the user's turn, proceed to userGuess");
            userGuess();
        } else {
            console.log("It is the computer's turn, proceed to playComputerRound");
            playComputerRound();
        }
    })
}

// Enables the number icons, disables hand icons
// Click event active on number icons which update game.userGuess
// Call playUserRound() once clicked
function userGuess() {
    console.log("userGuess has been called");
    $('.hand-icon').attr("disabled", true);
    $('.number-icon').removeAttr("disabled");

    $('#zero').off('click');
    $('#zero').click(function() {
        game.userGuess = 0;
        console.log(`User guess is ${game.userGuess}`);
        playUserRound();
    });
    $('#five').off('click');
    $('#five').click(function() {
        game.userGuess = 5;
        console.log(`user guess is ${game.userGuess}`);
        playUserRound();
    });
    $('#ten').off('click');
    $('#ten').click(function() {
        game.userGuess = 10;
        console.log(`user guess is ${game.userGuess}`);
        playUserRound();
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
}

// Called after userGuess 
function playUserRound() {
    console.log("playUserRound has been called");
    $('.number-icon').attr("disabled", true);
    // Update computerInput
    computerInput();
    console.log(`Computer's input is ${game.computerInput}`);
    // Update correctScore
    updateCorrectScore();
    console.log(`Correct score is ${game.correctScore}`);
    // Initiate animation
    roundAnimation();
    // use setTimeout so that animation can take place first
    // Then display userGuess in middle of game
    // Update the images of both user and computer to their 'input' from that round
    setTimeout(function() {
        $('#round-total').text(`P: ${game.userGuess}!`);
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
    }, 3000);
    // use setTimeout so that previous code loads, then display if user was correct or not
    // Increment player score if applicable
    setTimeout(function() {
        if (game.userGuess === game.correctScore) {
            $('#round-total').text(`Yes!`);
            incrementUserScore();
        } else {
            $('#round-total').text(`Boo!`);
        }
    }, 4500);
    // Update userTurn to false and computerTurn to true
    // Call userInput
    setTimeout(function() {
        game.userTurn = false;
        game.computerTurn = true;
        console.log(`game.userTurn is now ${game.userTurn}, computerTurn is ${game.computerTurn}`);
        userInput();
    }, 6500);
}

// Called after userInput if computerTurn = true
function playComputerRound() {
    console.log("playComputerRound has been called");
    // Disable hand buttons
    $('.hand-icon').attr("disabled", true);
    // Update computerInput
    computerInput();
    console.log(`Computer's input is ${game.computerInput}`);
    // Update computerGuess
    computerGuess();
    console.log(`Computer's guess is ${game.computerGuess}`);
    // Update correctScore
    updateCorrectScore();
    console.log(`Correct score is ${game.correctScore}`);
    // Initiate animation
    roundAnimation();
    // use setTimeout so that animation can take place first
    // Then display userGuess in middle of game
    // Update the images of both user and computer to their 'input' from that round
    setTimeout(function() {
        $('#round-total').text(`C: ${game.computerGuess}!`);
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
    }, 3000);
    // use setTimeout so that previous code loads, then display if computer was correct or not
    // Increment computer score if applicable
    setTimeout(function() {
        if (game.computerGuess === game.correctScore) {
            $('#round-total').text(`Yes!`);
            incrementComputerScore();
        } else {
            $('#round-total').text(`Boo!`);
        }
    }, 4500);
    // Update userTurn to true and copmuterTurn to false
    // Call userInput
    setTimeout(function() {
        game.userTurn = true;
        game.computerTurn = false;
        console.log(`game.userTurn is now ${game.userTurn}, computerTurn is ${game.computerTurn}`);
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