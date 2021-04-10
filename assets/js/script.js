// Game variables object
const game = {
	userTurn: true,
	
	userInput: 0,
	userGuess: 0,

	computerInput: [],
	computerGuess: 0,

	correctScore: 0,
	userScore: 0,
	computerScore: 0,

	soundsOn: localStorage.getItem('soundsOn'),

	winRecord: localStorage.getItem('winRecord'),
	loseRecord: localStorage.getItem('loseRecord'),

	computerPlayers: localStorage.getItem('computerPlayers'),
};

/*
This function checks whether device is using iOS, so that further down
sounds can be muted by default if so.
credit: https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
*/
function iOS() {
	return [
	  'iPad Simulator',
	  'iPhone Simulator',
	  'iPod Simulator',
	  'iPad',
	  'iPhone',
	  'iPod'
	].includes(navigator.platform)
	// iPad on iOS 13 detection
	|| (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }

// Once page loads, enables button sounds and mute icon, calls setGameHtml() and countDown()
$(document).ready(function () {
	let gameButtons = document.getElementsByClassName('game-input');
	for (let button of gameButtons) {
		button.addEventListener('mousedown', function () {
			let clickSound = setSound('assets/sounds/clickeffect.mp3')
            // Sound from Zapsplat.com
				playSound(clickSound);
		});
	}
	$('.mute-btn').click(function () {
		let onButton = document.getElementById('volume-on');
		let offButton = document.getElementById('volume-off');
		if (this === onButton) {
			game.soundsOn = 'false';
			onButton.classList.add('hidden');
			offButton.classList.remove('hidden');
		} else {
			game.soundsOn = 'true';
			offButton.classList.add('hidden');
			onButton.classList.remove('hidden');
		}
		localStorage.setItem('soundsOn', game.soundsOn);
    });
    setGameHtml();
	countDown();
});

/*
This function creates sound effects and sets their file location (src) 
@param source (src) - file location of the sound effects
@returns variable 
*/
function setSound(src) {
	let sound = new Audio();
	sound.src = src;
	return sound
}

/*
This function plays sound effects as long as sounds are
enabled by the user
@param sound variable (name) - variable name assigned to sound
*/
function playSound(name) {
	if (game.soundsOn == 'true') {
		name.play();
	}
}

/* 
This function sets HTML of win/loss record, mute button and game images
at the beginning of the game
*/
function setGameHtml() {
	// Win/loss record for first time visitors
	if (game.winRecord === null) {
		game.winRecord = 0;
	}
	if (game.loseRecord === null) {
		game.loseRecord = 0;
	}
	// Win/loss record for returning visitors
	$('#win-record').text(`${game.winRecord}`);
	$('#lose-record').text(`${game.loseRecord}`);
	// Sound settings and HTML
	if (game.soundsOn === 'true') {
		$('#volume-on').removeClass('hidden');
	} else if (game.soundsOn === 'false') {
		$('#volume-off').removeClass('hidden');
	} else if (game.soundsOn === null && iOS() === true) {
		$('#volume-off').removeClass('hidden');
		game.soundsOn = 'false';
	} else if (game.soundsOn === null) {
		$('#volume-on').removeClass('hidden');
		game.soundsOn = 'true';
	}
	localStorage.setItem('soundsOn', game.soundsOn);
	// Unhides the computer hands and user buttons depending on amount of players
	if (game.computerPlayers == 1) {} else if (game.computerPlayers == 2) {
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

/*
This function enables quit button, displays a 3,2,1 countdown and calls 
userInput() for the first time
*/
function countDown() {
	$('.game-info-quit').removeClass('hidden');
	setTimeout(function () {
        document.getElementById('round-total').innerHTML = 'First to 3';
        // Credit: https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown
		let timeLeft = 3;
		let timer = setInterval(function () {
			if (timeLeft <= 0) {
                clearInterval(timer);
                document.getElementById('round-total').innerHTML = 'Play!';
				userInput();
			} else {
				document.getElementById('round-total').innerHTML = timeLeft;
			}
			timeLeft -= 1;
		}, 1000);
	}, 1000);

}

/*
This function enables hand icons and assigns user's input depending on
which of the two buttons (fist or palm) is clicked. If it is the user's
turn, userGuess() is called, if not then playRound() is called
*/
function userInput() {
		$('.hand-icon').removeAttr('disabled').off('click');
		$('.hand-icon').click(function () {
			if (this === document.getElementById('fist')) {
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
}

/*
This function is called when it is the user's turn. It disables the hand
icons, enables the number icons, and assigns the user's guess depending
on which number has been clicked. Calls playRound()
*/
function userGuess() {
	$('.hand-icon').attr('disabled', true);
	$('.number-icon').removeAttr('disabled').off('click');
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

/*
This function generates two random numbers, one larger than the other
by five.
@param minimum (min) - the lowest of the two numbers
@returns integer
*/
function generateNums(min) {
	if (min === 0) {
		return Math.random() < 0.5 ? 0 : 5; // Credit: https://stackoverflow.com/questions/9730966/how-to-decide-between-two-numbers-randomly-using-javascript
	} else {
		return Math.floor(Math.random() * (2 - 1 + 1) + min / 5 ) * 5;
	}
}

/*
This function randomly assigns the computer's input(s) each round out of 
zero (fist) or five (palm) and pushes to the array in the game variables object
*/
function computerInput() {
	for (let i = 0; i < parseInt(game.computerPlayers); i++) {
		let computerInput = generateNums(0);
		game.computerInput.push(computerInput);
	}
}

/*
This function adds the total value of whatever input has been pushed
to the computerInput array in the game variables object
@returns integer
*/
function sumComputerInput() {
	let arr = game.computerInput;
	// Credit: https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
	let sum = arr.reduce(add, 0);
	function add(accumulator, a) {
		return accumulator + a;
	}
	return sum;
}

/*
This function randomly assigns a value to computerGuess in the game variables
when it is the computer's go, the possible values changing depending on the sum
of the computerInput array is.
*/
function computerGuess() {
	let sumOfComputer = sumComputerInput();
	if (sumOfComputer === 0) {
		// Generate 0 or 5
		game.computerGuess = generateNums(0);
	} else if (sumOfComputer === 5) {
		// Generate 5 or 10 
		game.computerGuess = generateNums(5);
	} else if (sumOfComputer === 10) {
		// Generate 10 or 15
		game.computerGuess = generateNums(10);
	} else {
		// Generate 15 or 20
		game.computerGuess = generateNums(15);
	}
}

/*
This function updates the correct score each round by adding
computerInput and userInput together
*/
function updateCorrectScore() {
	let sumOfComputer = sumComputerInput();
	game.correctScore = game.userInput + sumOfComputer;
}

/*
This function inititates the animation each round by adding CSS
animations to the hand images while also updating the central HTML
with a count upwards to three
*/
function roundAnimation() {
	const gameImages = document.querySelectorAll('.game-image');
    $('.game-image').removeClass('transparent');
	// Resets animation each round
	gameImages.forEach(gameImage => { // credit: https://www.youtube.com/watch?v=qWPtKtYEsN4 (50 minutes)
		gameImage.addEventListener('animationend', function () {
			this.style.animation = '';
		});
    });
    let noiseOne = setSound('assets/sounds/noise1.mp3');
    let noiseTwo = setSound('assets/sounds/noise2.mp3');
	// Inititates animations after small gap
	setTimeout(function () {
        let playerHand = document.getElementById('player-hand');
        let computerHand = document.getElementById('computer-hand');
        // Credit: https://www.youtube.com/watch?v=qWPtKtYEsN4&ab_channel=DevEd (49 minutes)
        playerHand.style.animation = 'mainAnimation 1.2s';
		if (game.computerPlayers == 1) {
			computerHand.style.animation = 'mainAnimation 1.2s';
		} else if (game.computerPlayers == 2) {
            let topLeft = document.getElementById('top-left');
	        let topRight = document.getElementById('top-right');
			topLeft.style.animation = 'topLeft 1.2s';
			topRight.style.animation = 'topRight 1.2s';
		} else if (game.computerPlayers == 3) {
            let middleLeft = document.getElementById('middle-left');
	        let middleRight = document.getElementById('middle-right');
			computerHand.style.animation = 'mainAnimation 1.2s';
			middleLeft.style.animation = 'middleLeft 1.2s';
			middleRight.style.animation = 'middleRight 1.2s';
		}
		$('#round-total').text('1');
		playSound(noiseOne);
	}, 1500);
	setTimeout(function () {
		$('#round-total').text('2');
		playSound(noiseTwo);
	}, 1900);
	setTimeout(function () {
		$('#round-total').text('3');
		playSound(noiseOne);
	}, 2300);
}

/*
This function plays final sound and changes all hand images to a palm or 
fist depending on what the values of userInput and computerInput are.
*/
function roundReveal() {
    setTimeout(function () {        
		let noiseReveal = setSound('assets/sounds/noise3.mp3');
		playSound(noiseReveal);
		// User hand image
		if (game.userInput === 5) {
			$('#player-hand').attr('src', 'assets/images/palmfaceup.png');
		}
        // Computer - 2 player
		if (game.computerPlayers == 1) {
			if (game.computerInput[0] === 5) {
				$('#computer-hand').attr('src', 'assets/images/palmfacedown.png');
            }
        // Computer - 3 player
		} else if (game.computerPlayers == 2) {
			if (game.computerInput[0] === 5) {
				$('#top-left').attr('src', 'assets/images/palmfacedown.png');
			}
			if (game.computerInput[1] === 5) {
				$('#top-right').attr('src', 'assets/images/palmfacedown.png');
            }
        // Computer - 4 player
		} else {
			if (game.computerInput[0] === 5) {
				$('#computer-hand').attr('src', 'assets/images/palmfacedown.png');
			}
			if (game.computerInput[1] === 5) {
				$('#middle-left').attr('src', 'assets/images/palmfacedown.png');
			}
			if (game.computerInput[2] === 5) {
				$('#middle-right').attr('src', 'assets/images/palmfacedown.png');
			}
        }
        // Text change revealing guess depending on if it's the user or computer's turn
		if (game.userTurn === true) {
			$('#round-total').text(`P: ${game.userGuess}!`);
		} else {
			$('#round-total').text(`C: ${game.computerGuess}!`);
		}
    }, 2700);
}

/*
This function resets computerInput, reverts hand images back to fists, and
sets the central HTML
*/
function resetGame() {
	// Changes who's go it is
    if (game.userTurn) {
        game.userTurn = false;
    } else {
        game.userTurn = true;
    }
	// Resets computer input
    game.computerInput = [];
	// Resets game images
    $('.game-image').addClass('transparent').attr('src', 'assets/images/fistfacedown.png');
    $('#player-hand').attr('src', 'assets/images/fistfaceup.png');
	// Resets HTML
    if (game.userScore === 2 && game.computerScore === 2) {
			document.getElementById('round-total').innerHTML = 'For the win!';
		} else {
			document.getElementById('round-total').innerHTML = 'Play!';
		}
}

/*
This function adds one to game.userScore and updates display score on top
left of the page
*/
function incrementUserScore() {
	game.userScore += 1;
	$('#player-score').text(`${game.userScore}`);
}

/*
This function adds one to game.computerScore and updates display score on top
left of the page
*/
function incrementComputerScore() {
	game.computerScore += 1;
	$('#computer-score').text(`${game.computerScore}`);
}

// This function checks who won the game and updates wins vs loss record accordingly
function updateWinRecord() {
	if (game.userScore === 3) {
		game.winRecord++;
		$('#win-record').text(`${game.winRecord}`);
	} else {
		game.loseRecord++;
		$('#lose-record').text(`${game.loseRecord}`);
	}
	localStorage.setItem('winRecord', game.winRecord);
	localStorage.setItem('loseRecord', game.loseRecord);
}

/*
This function is the primary function of the game. It calls all the functions
required to play a round, provides feedback depending on whether a round was
won or lost, and either continues or ends game depending on current scores
*/
function playRound() {
	computerInput();
	updateCorrectScore();
    roundAnimation();
    roundReveal();
	if (game.userTurn === true) {
		$('.number-icon').attr('disabled', true);
	} else {
		$('.hand-icon').attr('disabled', true);
		computerGuess();
    }
    setTimeout(function () {
		let yay = setSound('assets/sounds/success.mp3');
		let meh = setSound('assets/sounds/meh.mp3');
		if (game.userTurn && game.userGuess === game.correctScore) {
			$('#round-total').text('Correct!');
			playSound(yay);
			incrementUserScore();
		} else if (!game.userTurn && game.computerGuess === game.correctScore) {
			$('#round-total').text('Correct!');
			playSound(yay);
			incrementComputerScore();
		} else {
			$('#round-total').text('No good!');
			playSound(meh);
		}
	}, 3500);
	setTimeout(function () {
        resetGame();
		// Check if the game is still ongoing
        if (game.userScore < 3 && game.computerScore < 3) {
            userInput();
        } else {
            endGame();
        }
		
	}, 4500);
}

/*
This function is called once either the user or computer reaches 3 points,
gives feedback over whether the game was a win or a loss, calls updateWinRecord(),
offers option to play again or quit, and resets the game scores
*/
function endGame() {
	updateWinRecord();
	if (game.userScore === 3) {
		$('#round-total').text(`You've won!`);
		let victory = setSound('assets/sounds/victory.mp3');
		playSound(victory);
	} else {
		$('#round-total').text('You lost!');
		let defeat = setSound('assets/sounds/defeat.mp3');		
		playSound(defeat);
	}
	// Hide quit button and unhide the end of game CTAs
	$('.game-info-quit').addClass('hidden');
	$('.end-game-btns').removeClass('hidden');
	$('.game-btns').addClass('hidden');
	$('#play').click(function () {
		game.userTurn = true;
		game.userScore = 0;
		game.computerScore = 0;
		$('#computer-score').text('0');
		$('#player-score').text('0');
		$('.end-game-btns').addClass('hidden');
		$('.game-btns').removeClass('hidden');
		countDown();
	});
}
