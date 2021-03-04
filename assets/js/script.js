// Event listener waiting for the DOM to load

document.addEventListener("DOMContentLoaded", function() {
    runGame();
})

function runGame() {
// event listeners for button clicks 
console.log("runGame has been called");
let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "userInput") {
                alert("you clicked on a hand");
            } else {
                alert(`You clicked on a number`);
            }
        })
    }
}

// Randomly generates 0 or 5, as the computer's input each round
function generateComputerInput () {
    console.log("generateComputerInput has been called");
    let computerInput = Math.random() < 0.5 ? 0 : 5;
    console.log(computerInput);
};

// function generateComputerGuess () {

// };

// function calculateWinningScore () {
    
// };

// function incrementPlayerScore () {

// };

// function incrementComputerScore () {

// };

// function userTurn () {

// };

// function computerTurn ( {

// })

