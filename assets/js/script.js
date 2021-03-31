// Game variables object
const game = {
	userTurn: true,
	
	userInput: 0,
	userGuess: 0,

	inputArray: [],
	computerGuess: 0,

	correctScore: 0,
	userScore: 0,
	computerScore: 0,

	soundsOn: localStorage.getItem('soundsOn'),

	winRecord: localStorage.getItem('winRecord'),
	loseRecord: localStorage.getItem('loseRecord'),

	computerPlayers: localStorage.getItem('computerPlayers'),
};

// DOM loads, assigns clck sounds to buttons, enables mute button and sets off the countDown and setGameHtml functions
$(document).ready(function () {
	setGameHtml();
	countDown();
	// Credit: help assigning sound effects to variables and using the 'play' method found on Adam Khoury's video https://www.youtube.com/watch?v=VlwSz2dXK_8&ab_channel=AdamKhoury
	let clickSound = new Audio();
	clickSound.src = 'assets/sounds/clickeffect.mp3';
	// Sound from Zapsplat.com
	let gameButtons = document.getElementsByClassName('game-input');
	for (let button of gameButtons) {
		button.addEventListener('mousedown', function () {
			if (game.soundsOn === 'true') {
				clickSound.play();
			}
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
});

// Checks how many computer players the user has chosen to play, and sets HTML
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
	// Sounds on vs off, set depending on user's previous actions or defaulting to on for first time visiters
	if (game.soundsOn === 'true') {
		$('#volume-on').removeClass('hidden');
	} else if (game.soundsOn === 'false') {
		$('#volume-off').removeClass('hidden');
	} else if (game.soundsOn === null) {
		$('#volume-on').removeClass('hidden');
		game.soundsOn = 'true';
	}
	localStorage.setItem('soundsOn', game.soundsOn);
	// Checks which amount of players the user chose and sets HTML
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

// 3,2,1 countdown to start the game off and calls userInput for the first time
function countDown() {
	$('.game-info-quit').removeClass('hidden');
	setTimeout(function () {
        document.getElementById('round-total').innerHTML = 'First to 3';
        // credit: help with countdown courtesy of James McDowell's post on stack overflow - https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown
		let timeLeft = 3;
		let timer = setInterval(function () {
			if (timeLeft <= 0) {
				clearInterval(timer);
				userInput();
			} else {
				document.getElementById('round-total').innerHTML = timeLeft;
			}
			timeLeft -= 1;
		}, 1000);
	}, 1000);

}

// Resets computer's input, takes user's input from the hand icons, checks whether it's the user's go (run userGuess) or computer's go (run playRound) and that the game isn't over (run endGame).
function userInput() {
	game.inputArray = [];
    $('.game-info-quit').removeClass('hidden');
	if (game.userScore < 3 && game.computerScore < 3) {
		if (game.userScore === 2 && game.computerScore === 2) {
			document.getElementById('round-total').innerHTML = 'For the win!';
		} else {
			document.getElementById('round-total').innerHTML = 'Play!';
		}
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
	} else {
		endGame();
	}
}

// On users turn, takes user's guess from number icons and runs playRound
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

// Each round pushes randomly generated 0s and 5s to game.inputArray - the amount of which is dictated by how many computer players there are;
function computerInput() {
	for (let i = 0; i < parseInt(game.computerPlayers); i++) {
		// credit: code generating 2 numbers, of which one is a zero, found on Peter Olsen's post at https://stackoverflow.com/questions/9730966/how-to-decide-between-two-numbers-randomly-using-javascript
		let rand = Math.random() < 0.5 ? 0 : 5;
		game.inputArray.push(rand);
	}
}

// Each round, add computerInput and userInput together to update correctScore
function updateCorrectScore() {
	let arr = game.inputArray;
	// credit: code to sum the values of items in an arry found on Florian Maragaine's post at https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
	let sumOfComputer = arr.reduce(add, 0);
	function add(accumulator, a) {
		return accumulator + a;
	}
	game.correctScore = game.userInput + sumOfComputer;
}

// On the computer's go, update computerGuess depending on amount of players and the sum of the computer's input
function computerGuess() {
	let arr = game.inputArray;
	let sumOfComputer = arr.reduce(add, 0);
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

// Animation that occurs each round before displaying guess, updating images and subsequent scores
function roundAnimation() {
	const gameImages = document.querySelectorAll('.game-image');
    $('.game-image').removeClass('transparent');
	// credit: code to reset animation after one round found on Dev Ed's video https://www.youtube.com/watch?v=qWPtKtYEsN4 at around 50 minutes
	gameImages.forEach(gameImage => {
		gameImage.addEventListener('animationend', function () {
			this.style.animation = '';
		});
    });
    let noiseOne = new Audio();
    noiseOne.src = 'assets/sounds/noise1.mp3';
    let noiseTwo = new Audio();
    noiseTwo.src = 'assets/sounds/noise2.mp3';
	setTimeout(function () {
        let playerHand = document.getElementById('player-hand');
        let computerHand = document.getElementById('computer-hand');
        // credit: help applying custom css animations via JS found on Dev Ed's video https://www.youtube.com/watch?v=qWPtKtYEsN4&ab_channel=DevEd at around 49 minutes.
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
		if (game.soundsOn === 'true') {
			noiseOne.play();
		}
	}, 1000);
	setTimeout(function () {
		$('#round-total').text('2');
		if (game.soundsOn === 'true') {
			noiseTwo.play();
		}
	}, 1400);
	setTimeout(function () {
		$('#round-total').text('3');
		if (game.soundsOn === 'true') {
			noiseOne.play();
		}
	}, 1800);
}

// Changes all hand images to palm or fist
function roundReveal() {
    setTimeout(function () {
        let noiseReveal = new Audio();
	    noiseReveal.src = 'assets/sounds/noise3.mp3';
        if (game.soundsOn === 'true') {
			noiseReveal.play();
			}
		// Image change from the user depending on whether they've chosen fist(0) or palm (5)
		if (game.userInput === 5) {
			$('#player-hand').attr('src', 'assets/images/palmfaceup.png');
		}
        // Checks amount of computer players present in the game and assigns correct images accordingly
        // 2 player
		if (game.computerPlayers == 1) {
			if (game.inputArray[0] === 5) {
				$('#computer-hand').attr('src', 'assets/images/palmfacedown.png');
            }
        // 3 player
		} else if (game.computerPlayers == 2) {
			if (game.inputArray[0] === 5) {
				$('#top-left').attr('src', 'assets/images/palmfacedown.png');
			}
			if (game.inputArray[1] === 5) {
				$('#top-right').attr('src', 'assets/images/palmfacedown.png');
            }
        // 4 player
		} else {
			if (game.inputArray[0] === 5) {
				$('#computer-hand').attr('src', 'assets/images/palmfacedown.png');
			}
			if (game.inputArray[1] === 5) {
				$('#middle-left').attr('src', 'assets/images/palmfacedown.png');
			}
			if (game.inputArray[2] === 5) {
				$('#middle-right').attr('src', 'assets/images/palmfacedown.png');
			}
        }
        // Text change revealing guess depending on if it's the user or computer's turn
		if (game.userTurn === true) {
			$('#round-total').text(`${game.userGuess}!`);
		} else {
			$('#round-total').text(`C: ${game.computerGuess}!`);
		}
    }, 2200);
    setTimeout(function () {
		let yay = new Audio();
		let meh = new Audio();
		yay.src = 'assets/sounds/success.mp3';
		meh.src = 'assets/sounds/meh.mp3';
		if (game.userTurn && game.userGuess === game.correctScore) {
			$('#round-total').text('Correct!');
			if (game.soundsOn === 'true') {
				yay.play();
			}
			incrementUserScore();
		} else if (!game.userTurn && game.computerGuess === game.correctScore) {
			$('#round-total').text('Correct!');
			if (game.soundsOn === 'true') {
				yay.play();
			}
			incrementComputerScore();
		} else {
			$('#round-total').text('No good!');
			if (game.soundsOn === 'true') {
				meh.play();
			}
		}
	}, 3000);
}

// Runs each round, provides feedback depending on whether the player/computer has guessed correctly, updates visible scores, resets variables/html, and calls userInput
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
	
	// Reverses the true/false of who's go it is, and calls userInput()
	setTimeout(function () {
		if (game.userTurn) {
			game.userTurn = false;
		} else {
			game.userTurn = true;
		}
		$('.game-image').addClass('transparent');
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
}

// Adds one to game.ComputerScore and updates display score on top left of page
function incrementComputerScore() {
	game.computerScore += 1;
	$('#computer-score').text(`${game.computerScore}`);
}

// Called once game is over, feeds back that the game was a win or a loss, adds one to the win record of either the user or the computer, asks whether to play again or quit, and resets the scores
function endGame() {
	updateWinRecord();
	if (game.userScore === 3) {
		$('#round-total').text(`You've won!`);
		let victory = new Audio();
		victory.src = 'assets/sounds/victory.mp3';
		if (game.soundsOn === 'true') {
			victory.play();
		}
	} else {
		$('#round-total').text('You lost!');
		let defeat = new Audio();
		defeat.src = 'assets/sounds/defeat.mp3';
		if (game.soundsOn === 'true') {
			defeat.play();
		}
	}
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

// Checks who won the game and updates wins vs loss record accordingly
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