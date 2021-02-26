// Change the image on your side of the game depending on which icon you click
$('#palm').click(function() {
    $('#player-hand').attr("src", "assets/images/palmfaceup.png") ;
});
$('#fist').click(function() {
    $('#player-hand').attr("src", "assets/images/fistfaceup.png");
});