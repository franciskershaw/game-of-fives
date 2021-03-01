

// Event handlers listening for the clicking of both possible user inputs. Also changes the image on your side of the game depending on which icon you click
$('.hand-icon').click(function() {
    let palm = document.getElementById('palm');
    let userInput;
    if (this === palm) {
        userInput = 5;
        console.log(`User input is ${userInput}`);
        $('#player-hand').attr("src", "assets/images/palmfaceup.png");
    } else {
        userInput = 0;
        console.log(`User input is ${userInput}`);
        $('#player-hand').attr("src", "assets/images/fistfaceup.png");
    }
});

$('.number-icon').click(function() {
    let zero = document.getElementById('guess-zero');
    let five = document.getElementById('guess-five');
    let userGuess;
    if (this === zero) {
        userGuess = 0;
    } else if (this === five) {
        userGuess = 5;
    } else {
        userGuess = 10;
    }
    console.log(`User has guessed ${userGuess}`);
});

// Plays users turn, called once both user inputs have been clicked on.
function playUserRound () {
    
}

function playComputerRound () {

}

// Computer randomly selects 0 or 5 each round as its input
function calculateComputerInput() {
    let computerInput = Math.random() < 0.5 ? 0 : 5;
    return computerInput;
}
// Help on using the Math.random found from stack overflow post by Peter Olsen at https://stackoverflow.com/questions/9730966/how-to-decide-between-two-numbers-randomly-using-javascript

// Every other round on the computer's go, the computer randomly picks either 0, 5, or 10 as their chosen total score
function calculateComputerGo () {
   let computerGo = Math.floor(Math.random() * (2 - 0 + 1) + 0) * 5;
   return computerGo;
}

// 
function calculateTotalScore () {

}

// Update the score if the user or computer score matches with the total score
function updatePlayerScores () {

}