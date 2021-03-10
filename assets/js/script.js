const game = {
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
	countDown();
}

function countDown() {
	console.log("countDown has been called")
	let timeLeft = 3;
	let timer = setInterval(function () {
		if (timeLeft <= 0) {
            clearInterval(timer);
            console.log("Initial countdown is over");
			document.getElementById("round-total").innerHTML = "Play!";
			userTurnUserInput();
		} else {
			document.getElementById("round-total").innerHTML = timeLeft;
		}
		timeLeft -= 1;
	}, 1000);
}
// Source - https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown

// Event handlers updating game variables

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

// Enables the user input buttons (fist and palm) and triggers userGuess through HTML 'onclick' attribute;
function userTurnUserInput() {
    console.log("---------------------------");
	console.log("userTurnUserInput has been called");
	$('.hand-icon').removeAttr('disabled');
}

// Disables fist and palm icons and triggers generateComputerInput through HTML 'onclick' attribute
function userGuess() {
	console.log("userGuess has been called via HTML onclick attribute");
	$('.hand-icon').attr('disabled', true).attr('onclick', 'computerTurnGenerateComputerInput()');
	$('.number-icon').removeAttr('disabled');
}

// Randomly generates 0 or 5, as the computer's input each round
function userTurnGenerateComputerInput() {
   console.log("userTurnGenerateComputerInput has been called via HTML onclick attribute");
	setTimeout(function () {
        console.log("setTimeOut has run its course");
		$('.number-icon').attr('disabled', true);
		game.computerInput = Math.random() < 0.5 ? 0 : 5;
		if (game.computerInput === 5) {
			$('#computer-hand').attr("src", "assets/images/palmfacedown.png");
		} else {
			$('#computer-hand').attr("src", "assets/images/fistfacedown.png");
		}
		userTurnCalculateScore();
	}, 1000);

};

// // Add userInput and computerInput togther
function userTurnCalculateScore() {
	console.log("userTurnCalculateScore has been called");
	game.correctScore = game.userInput + game.computerInput;
	userTurnDisplayScore();
};

// update the score in the middle of the game to what the user has guessed
function userTurnDisplayScore() {
	console.log("userTurnDisplayScore has been called");
	$('#round-total').text(`P: ${game.userGuess}!`);

	if (game.userGuess === game.correctScore) {
		incrementUserScore();
		
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
    console.log("---------------------------");
	console.log("computerTurnUserInput has been called");
	$('.hand-icon').removeAttr('disabled');
}

function computerTurnGenerateComputerInput() {
	// generate 0 or 5
	// trigger generateComputerGuess
	$('.hand-icon').attr('disabled', true).attr('onclick', 'userGuess()');
	console.log("computerTurnGenerateComputerInput has been called via HTML onlick attribute");
	setTimeout(function () {
        console.log("setTimeout has run its course");
		game.computerInput = Math.random() < 0.5 ? 0 : 5;
		if (game.computerInput === 5) {
			$('#computer-hand').attr("src", "assets/images/palmfacedown.png");
		} else {
			$('#computer-hand').attr("src", "assets/images/fistfacedown.png");
		}
		generateComputerGuess();
	}, 250);
}

function generateComputerGuess() {
	// generate 0, 5 or 10 (have logic in this loop based on computer input)
	// trigger displayerScore
	console.log("generateComputerGuess has been called");
	setTimeout(function () {
        console.log("setTimeout has run its course")
		if (game.computerInput === 0) {
			game.computerGuess = Math.random() < 0.5 ? 0 : 5;
			// Source - https://stackoverflow.com/questions/9730966/how-to-decide-between-two-numbers-randomly-using-javascript
		} else {
			game.computerGuess = Math.floor(Math.random() * (2 - 1 + 1) + 1) * 5;
		}
		computerTurnCalculateScore();
	}, 250);

}

function computerTurnCalculateScore() {
	console.log("computerTurnCalculateScore has been called");
	game.correctScore = game.userInput + game.computerInput;
	computerTurnDisplayScore();
}

function computerTurnDisplayScore() {
	console.log("computerTurnDisplayScore has been called");
	$('#round-total').text(`C: ${game.computerGuess}!`);

	if (game.computerGuess === game.correctScore) {
		incrementComputerScore();
	}
	userTurnUserInput();
}

// Adds 1 to the computer score top left of the game
function incrementComputerScore() {
	console.log("incrementComputerScore has been called");
	game.computerScore += 1;
	$('#computer-score').text(`${game.computerScore}`);
};