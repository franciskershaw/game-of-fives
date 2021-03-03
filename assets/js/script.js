// Wait fo the DOM to load then run userTurn

document.addEventListener("DOMContentLoaded", function () {
    userTurn();
})

let userInput = "";
let userGuess = "";
let computerInput = "";

function userTurn() {

    $('.hand-icon').click(function () {
        if (this === document.getElementById('fist')) {
            userInput = 0;
            $('#player-hand').attr("src", "assets/images/fistfaceup.png");
            console.log(`userInput is ${userInput}`);
        
        } else {
            userInput = 5;
            $('#player-hand').attr("src", "assets/images/palmfaceup.png");
            console.log(`userInput is ${userInput}`)
            
        }
        checkUserReady();
        return;
    })

    $('.number-icon').click(function () {
        if (this === document.getElementById('zero')) {
            userGuess = 0;
            console.log(`userGuess is ${userGuess}`);
        } else if (this === document.getElementById('five')) {
            userGuess = 5;
            console.log(`userGuess is ${userGuess}`);
        } else {
            userGuess = 10;
            console.log(`userGuess is ${userGuess}`);
        }
        checkUserReady();
        return;
    })

}

function checkUserReady() {

    if (userInput !== "" && userGuess !== "") {
        console.log("user is now ready");
        generateComputerInput();
        console.log(`computerInput is ${computerInput}`);
        console.log(`Correct score would be ${computerInput + userInput}`)
        if (userGuess === userInput + computerInput) {
            console.log(`the user has correctly guessed ${userInput + computerInput}`);
            computerTurn();
        } else {
            console.log("WRONG");
            computerTurn();
        }
    } else {
        console.log("user is not ready yet");
    }
}


function generateComputerInput() {
    computerInput = Math.random() < 0.5 ? 0 : 5;
}

function computerTurn() {
    console.log("run computer turn");
    userInput = "";
    userGuess = "";
    computerInput = "";
    
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