// wait for the DOM to load before then running userTurn()

// userTurn() is listening for two click events which assign userInput (0 or 5) and userGuess (0, 5 or 10) variables;
// if userInput && userGuess = true, then run generateComputerInput()
// generateComputerInput() returns 0 or 5 which then needs assigning to computerInput variable
// Calculate the winning score by adding userInput and computerInput together - assign to correctScore variable
// Update the number in the middle to be equal to the value of correctScore
// Check if userGuess is equal to correctScore, increment player score in the top left if so
// Run computerTurn()

// computerTurn() is listening for userInput click event ONLY before proceeding to generateComputerInput()
// generateComputerInput()
// generateComputerGuess


let computerInput;
let computerGuess;

document.addEventListener("DOMContentLoaded", function () {
    userTurn();
})

function userTurn () {
    let userInput;
    let userGuess;
    console.log("DOM loaded and userTurn called");
    $(".hand-icon").click(function() {
        let palm = document.getElementById("palm");
        if (this === palm) {
            userInput = 5;
            $("#player-hand").attr("src", "assets/images/palmfaceup.png");
            
        } else {
            userInput = 0;
            $("#player-hand").attr("src", "assets/images/fistfaceup.png");
        }
        console.log(`User input is ${userInput}`);
    })
    $(".number-icon").click(function() {
        let zero = document.getElementById("guess-zero");
        let five = document.getElementById("guess-five");
        if (this === zero) {
            userGuess = 0;
        } else if (this === five) {
            userGuess = 5;
        } else {
            userGuess = 10;
        }
        console.log(`User guess is ${userGuess}`);
    })
    console.log("hello from the bottom of userTurn"); 
    // need to work out how to check that userGuess and userInput have both been selected, and proceed.
}



// Event handlers listening for the clicking of both possible user inputs. Also changes the image on your side of the game depending on which icon you click
// $('.hand-icon').click(function() {
//     let palm = document.getElementById('palm');
//     if (this === palm) {
//         userInput = 5;
//         $('#player-hand').attr("src", "assets/images/palmfaceup.png");
//     } else {
//         userInput = 0;
//         $('#player-hand').attr("src", "assets/images/fistfaceup.png");
//     }
//     console.log(`User input is ${userInput}`);
// });

// $('.number-icon').click(function() {
//     let zero = document.getElementById('guess-zero');
//     let five = document.getElementById('guess-five');
//     if (this === zero) {
//         userGuess = 0;
//     } else if (this === five) {
//         userGuess = 5;
//     } else {
//         userGuess = 10;
//     }
//     console.log(`User has guessed ${userGuess}`);

//     userTurn () 
// });

// // Plays users turn, called once both user inputs have been clicked on.
// function userTurn () {
//     computerInput = generateComputerInput();
//     console.log(`Computer has input ${computerInput}`);
//     if (computerInput === 5) {
//         $('#computer-hand').attr("src", "assets/images/palmfacedown.png");
//     } else {
//         $('#computer-hand').attr("src", "assets/images/fistfacedown.png");
//     }
//     // Add computer input and user input together to calculate the winning score
//     let correctScore = computerInput + userInput;
//     // Update score in the middle
//     $('#round-total').text(`${correctScore}`);
//     console.log(`The correct total is ${correctScore}`);
//     // Check if computer's input + user input = userGuess.
//     if (correctScore === userGuess) {
//        incrementPlayerScore();
//         console.log('Well done, you. guessed correctly');
//     } else {
//         incrementComputerScore();
//         console.log('Sorry, better luck next time');
//     }
// }

// function computerTurn () {
//     // wait for user's input
//     // generate computer's input
//     // generate computer's guess
//     // add user and computer's input together for a total
//     // check if computer's guess is equal to total and add 1 to computer score if correct
//     // proceed to userTurn
//     computerInput = generateComputerInput();
//     console.log(`Computer input is ${computerInput}`);
//     computerGuess = generateComputerGuess();
//     console.log(`Computer guess is ${computerGuess}`);
// }

// // Code to have computer randomly return input (0 or 5)
// function generateComputerInput() {
//     return Math.random() < 0.5 ? 0 : 5;
// }
// // Help on using the Math.random found from stack overflow post by Peter Olsen at https://stackoverflow.com/questions/9730966/how-to-decide-between-two-numbers-randomly-using-javascript

// // Code to have computer randomly return guess (0, 5, or 10)
// function generateComputerGuess () {
//    return Math.floor(Math.random() * (2 - 0 + 1) + 0) * 5;
// }

// function updateCorrectScore () {
//     $('#round-total').text("Hello");
// }

// // Update the player score if the user wins a round
// function incrementPlayerScore () {
//     let oldScore = parseInt(document.getElementById("player-score").innerText);
//     document.getElementById("player-score").innerText = ++oldScore;
// }

// // Update computer score if the computer wins a round
// function incrementComputerScore () {
//     let oldScore = parseInt(document.getElementById("computer-score").innerText);
//     document.getElementById("computer-score").innerText = ++oldScore;
// }