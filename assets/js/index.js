/*
Once page loads, checks the device is in portrait mode (mobile only),
updates html depending on users play history and initiates entry animation 
*/
$(document).ready(function () {
	// Credit: https://github.com/zoet24/presidential-debate/blob/master/assets/js/index.js
	if (window.innerWidth > window.innerHeight && window.innerWidth < 768) {
		$('.landscape-overlay').removeClass('hidden');
		$('.home-container').addClass('hidden');
	}
	// Updates HTML of win vs loss record depending on user's play history
	let winRecord = localStorage.getItem('winRecord');
	let loseRecord = localStorage.getItem('loseRecord');
	let winDifference = winRecord - loseRecord;
	if (winRecord === null) {
		$('#win').text('0');
	} else {
		$('#win').text(`${winRecord}`);
	}
	if (loseRecord === null) {
		$('#lose').text('0');
	} else {
		$('#loss').text(`${loseRecord}`);
	}
	// Updates HTML of h2 tagline depending on the overall scores
	if (winRecord === null && loseRecord === null) {
		$('#tagline').text('Get stuck into your first game!');
	} else if (winDifference < 0) {
		$('#tagline').text(`You're not great at this.`);
	} else if (winDifference > 0) {
		$('#tagline').text(`You're not half bad at this!`);
	} else if (winDifference === 0) {
		$('#tagline').text(`It's neck and neck!`);
	}
	entryAnimation();
});

// Listens for orientation to show or hide the orientation change warning overlay
// Credit:  https://stackoverflow.com/questions/5498934/detect-change-in-orientation-using-javascript
window.addEventListener('orientationchange', function () {
	if (window.innerWidth < window.innerHeight && window.innerHeight < 768) {
		$('.landscape-overlay').removeClass('hidden');
		$('.home-container').addClass('hidden');
	} else {
		$('.landscape-overlay').addClass('hidden');
		$('.home-container').removeClass('hidden');
		$('#tagline').removeClass('tagline-appear');
		$('button').removeClass('play-appear').removeClass('rules-appear');
		$('.home-record').removeClass('record-appear');
	}
});

/*
This function initiates the animation which introduces all content
to the page in a staggered way
*/
function entryAnimation() {
	setTimeout(function () {
		$('.home-img').removeClass('opaque').addClass('home-entry-one');
	}, 1000);
	setTimeout(function () {
		$('.home-img').removeClass('home-entry-one').addClass('home-entry-two');
	}, 1500);
	setTimeout(function () {
		$('.home-img').removeClass('home-entry-two').addClass('home-entry-three');
	}, 2000);
	setTimeout(function () {
		$('.home-img').removeClass('home-entry-three');
		$('.heading-content').removeClass('opaque');
		$('.home-record').removeClass('opaque');
	}, 2500);
}

/*
Loops over the difficulty buttons in the play modal and uses local storage 
to assign how many computer players there will be in game variables object
*/
let difficultyButtons = document.querySelectorAll('.difficulty-button');
for (let difficultyButton of difficultyButtons) {
	difficultyButton.addEventListener('click', function () {
		if (this === document.getElementById('2-player')) {
			localStorage.setItem('computerPlayers', 1);
		} else if (this === document.getElementById('3-player')) {
			localStorage.setItem('computerPlayers', 2);
		} else {
			localStorage.setItem('computerPlayers', 3);
		}
	});
}