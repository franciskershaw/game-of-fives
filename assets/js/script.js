// Change the image on your side of the game depending on which icon you click
$('.hand-icon').click(function() {
    let palm = document.getElementById('palm');
    if (this === palm) {
        $('#player-hand').attr("src", "assets/images/palmfaceup.png");
    } else {
        $('#player-hand').attr("src", "assets/images/fistfaceup.png");
    }
});

// Function for the game which is run after choosing a difficulty
function game () {

}

// Computer randomly selects 0 or 5 each round
function calculateComputerInput() {
    let computerInput = Math.random() < 0.5 ? 0 : 5;
    return computerInput;
}
// Help on using the Math.random found from stack overflow post by Peter Olsen at https://stackoverflow.com/questions/9730966/how-to-decide-between-two-numbers-randomly-using-javascript

// Every other round, the computer randomly picks either 0, 5, or 10 as their chosen score
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