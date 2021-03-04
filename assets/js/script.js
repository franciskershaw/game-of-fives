// Event handlers listening for the clicking of both possible user inputs. Also changes the image on your side of the game depending on which icon you click

let userInput;
let userGuess;
let computerInput;
console.log(`userInput is ${userInput}`);
console.log(`userGuess is ${userGuess}`);
    $('.hand-icon').click(function () {
        if (this === document.getElementById('fist')) {
            userInput = 0;
            $('#player-hand').attr("src", "assets/images/fistfaceup.png");
        } else {
            userInput = 5;
            $('#player-hand').attr("src", "assets/images/palmfaceup.png");
        }
        console.log(`userInput is ${userInput}`);
    });

    $('.number-icon').click(function () {
        if (this === document.getElementById('zero')) {
            userGuess = 0;
        } else if (this === document.getElementById('five')) {
            userGuess = 5;
        } else {
            userGuess = 10;
        }
        console.log(`userGuess is ${userGuess}`);
        userTurn();
    })

// Plays users turn, called once 0, 5 or 10 has been clicked.

function userTurn () {
    computerInput = generateComputerInput();
    console.log(`Computer has input ${computerInput}`);
    if (computerInput === 5) {
        $('#computer-hand').attr("src", "assets/images/palmfacedown.png");
    } else {
        $('#computer-hand').attr("src", "assets/images/fistfacedown.png");
    }
// Add computer input and user input together to calculate the winning score
    let correctScore = computerInput + userInput;
//     // Update score in the middle
    $('#round-total').text(`${correctScore}`);
    console.log(`The correct total is ${correctScore}`);
//     // Check if computer's input + user input = userGuess.
    if (correctScore === userGuess) {
       incrementPlayerScore();
        console.log('Well done, you. guessed correctly');
    } else {
        incrementComputerScore();
        console.log("You've guessed incorrectly");
    }
}

// Returns 0 or 5 as the computer's input each round
function generateComputerInput() {
    return Math.random() < 0.5 ? 0 : 5;
}

// Update the player score if the user wins a round
function incrementPlayerScore () {
    let oldScore = parseInt(document.getElementById("player-score").innerText);
    document.getElementById("player-score").innerText = ++oldScore;
}

// Update computer score if the computer wins a round
function incrementComputerScore () {
    let oldScore = parseInt(document.getElementById("computer-score").innerText);
    document.getElementById("computer-score").innerText = ++oldScore;
}

// // Code to have computer randomly return input (0 or 5)
// function generateComputerInput() {
//     return Math.random() < 0.5 ? 0 : 5;
// }
// // Help on using the Math.random found from stack overflow post by Peter Olsen at https://stackoverflow.com/questions/9730966/how-to-decide-between-two-numbers-randomly-using-javascript

// // Code to have computer randomly return guess (0, 5, or 10)
// function generateComputerGuess () {
//    return Math.floor(Math.random() * (2 - 0 + 1) + 0) * 5;
// }

