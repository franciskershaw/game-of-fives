let userInput;
let userGuess;

// Event handlers listening for the clicking of both possible user inputs. Also changes the image on your side of the game depending on which icon you click
$('.hand-icon').click(function() {
    let palm = document.getElementById('palm');
    if (this === palm) {
        userInput = 5;
        $('#player-hand').attr("src", "assets/images/palmfaceup.png");
    } else {
        userInput = 0;
        $('#player-hand').attr("src", "assets/images/fistfaceup.png");
    }
    console.log(`User input is ${userInput}`);
});

$('.number-icon').click(function() {
    let zero = document.getElementById('guess-zero');
    let five = document.getElementById('guess-five');
    if (this === zero) {
        userGuess = 0;
    } else if (this === five) {
        userGuess = 5;
    } else {
        userGuess = 10;
    }
    console.log(`User has guessed ${userGuess}`);

    userTurn () 
});

// Plays users turn, called once both user inputs have been clicked on.
function userTurn () {
    console.log("UserTurn has been called");
    // Generate computer's input (either 0 or 5)
    let computerInput = Math.random() < 0.5 ? 0 : 5;
    console.log(`Computer has input ${computerInput}`);
    if (computerInput === 5) {
        $('#computer-hand').attr("src", "assets/images/palmfacedown.png");
    } else {
        $('#computer-hand').attr("src", "assets/images/fistfacedown.png");
    }
    // Add computer input and user input together to calculate the winning score
    let correctScore = computerInput + userInput;
    // Update score in the middle
    $('#round-total').text(`${correctScore}`);
    console.log(`The correct total is ${correctScore}`);
    // Check if computer's input + user input = userGuess.
    if (correctScore === userGuess) {
        console.log('Well done, you. guessed correctly');
    } else {
        console.log('Sorry, better luck next time');
    }
}

// Code to have computer randomly return input (0 or 5)
function generateComputerInput() {
    let computerInput = Math.random() < 0.5 ? 0 : 5;
    return computerInput;
}
// Help on using the Math.random found from stack overflow post by Peter Olsen at https://stackoverflow.com/questions/9730966/how-to-decide-between-two-numbers-randomly-using-javascript

// Code to have computer randomly return guess (0, 5, or 10)
function generateComputerGo () {
   let computerGo = Math.floor(Math.random() * (2 - 0 + 1) + 0) * 5;
   return computerGo;
}

function updateCorrectScore () {
    $('#round-total').text("Hello");
}

// Update the score if the user or computer score matches with the total score
function updatePlayerScores () {

}