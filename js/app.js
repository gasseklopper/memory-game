/*
 * Create a list that holds all of your cards
 */
// object list with the cards named by symbol icons

let objects = ['diamond','paper-plane-o','anchor','bolt','cube','leaf','bicycle','bomb','cube', 'diamond','paper-plane-o','anchor','bolt','cube','leaf','bicycle','bomb','cube',]
//array to store toggled cards to compare them or control status
let toggledCards = [];

//increment the move counter and display it on the page (put this functionality in another function that you call from this one)
let moves = 0;

// Clock bolean
let clockOff = true;

// time declares a block scope local variable
let time = 0;

// clockId declares a block scope local variable
let clockId;

// declares a block scope local variable
let matched = 0;

//declares a const with the max matches in the game
const TOTAL_PAIRS = 8;

//selects the css class deck
const deck = document.querySelector('.deck');
/*

 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// reset the game with different functions resetClockAndTime() resetMoves()  resetStars() shuffleDeck() resetCards() matched = 0;
resetGame();



// set up the event listener for a card. If a card is clicked:
deck.addEventListener('click', event => {
	const clickTarget = event.target;
	if (isClickValid(clickTarget)) {
		if (clockOff) {
			startClock();
			clockOff = false;
		}
		//display the card's symbol (put this functionality in another function that you call from this one)
		toggleCard(clickTarget);
		//add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
		addToggleCard(clickTarget);
		//if the list already has another card, check to see if the two cards match
		if (toggledCards.length === 2) {
			addMove();
			checkForMatch(clickTarget);
			//increment the move counter and display it on the page (put this functionality in another function that you call from this one)
			checkScore();
		}
	}
});

//increment the move counter and display it on the page (put this functionality in another function that you call from this one)
function addMove() {
	moves++;
	const movesText = document.querySelector('.moves');
	movesText.innerHTML = moves;
}

// use the shuffle function to shuffle the array from returning .deck li
function shuffleDeck(){
	const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
	const shuffledCards = shuffle(cardsToShuffle);
	for (card of shuffledCards) {
		deck.appendChild(card);
	}
}

//display the card's symbol (put this functionality in another function that you call from this one)
// toogle css open and show class
function toggleCard(clickTarget) {
	clickTarget.classList.toggle('open');
	clickTarget.classList.toggle('show');
}

// toogle css match class
function toggleMatchCard(clickTarget) {
	clickTarget.classList.toggle('match');
}

//add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
//add clickTarget value to toggledCards array
function addToggleCard(clickTarget) {
	toggledCards.push(clickTarget);
}

// checks if the click is valid
function isClickValid(clickTarget) {
	return (
		clickTarget.classList.contains('card') &&
			!clickTarget.classList.contains('match') &&
		toggledCards.length < 2 &&
		!toggledCards.includes(clickTarget)
	);
}


// checking for card matchews with an  if else loop and condtion x1 === x2
function checkForMatch() {
	if (
		toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className
	) {
		// if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
		toggleMatchCard(toggledCards[0]);
		toggleMatchCard(toggledCards[1]);
		toggledCards = [];
		matched++;
		// stop the game if  TOTAL_PAIRS reached with a timeout of 1000
		setTimeout(() => {
			if (matched === TOTAL_PAIRS) {
				gameOver();
			}
		}, 1000);
	}else{
		//setTimeOut is a callback function that runs after the designated time expires.
		setTimeout(() => {
			// if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
			toggleCard(toggledCards[0]);
			toggleCard(toggledCards[1]);
			toggledCards = [];
		}, 1000);

	}
}

// function for controlling the stars by var moves
function checkScore() {
	if (moves === 16 || moves === 24 )
	{
		hideStar();
	}
}

// hide star function ends with a break so if  function called hide one ".stars li" css class
function hideStar() {
	const starList = document.querySelectorAll('.stars li');
	for (star of starList) {
		if (star.style.display !== 'none')
		{
			star.style.display = 'none';
			break;
		}
	}
}

// startClock starts an interval which is increamentet by time++ for each call
function startClock () {
		clockId = setInterval(() => {
		time++;
		displayTime();
	}, 1000);
}

// function to select css class .clock and change innerHTML with var time which is calulated
function displayTime() {
	const clock = document.querySelector('.clock');
	clock.innerHTML = time;

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	if (seconds < 10) {
		clock.innerHTML = `${minutes}:0${seconds}`;
	} else {
		clock.innerHTML = `${minutes}:${seconds}`;
	}
}

// function to clearInterval clockId variable
function stopClock() {
	clearInterval(clockId);
}

// game over is called if u complete the game this is reached if const Total_PAIRS is reached. then stop clock. write let variables to the modal and toggle it on screen
function gameOver() {
	stopClock();
	writeModalStats();
	toggleModal();
}

// function replaygame opens reset game an toggle Modal
function replayGame() {
	resetGame();
	toggleModal();
}

// function resetCards selects css class .deck li  and for each it resets the className to 'card'
function resetCards() {
	const cards = document.querySelectorAll('.deck li');
	for (let card of cards) {
		card.className = 'card';
	}
}

// selector for css classes to write variables to the modal HTML
function writeModalStats(){
	const timeStat = document.querySelector('.modal__time');
	const clockTime = document.querySelector('.clock').innerHTML;
	const moveStat = document.querySelector('.modal__moves');
	const starsStat = document.querySelector('.modal__stars');
	const stars = getStars();
	timeStat.innerHTML = `Time = ${clockTime}`;
	moveStat.innerHTML = `Moves = ${moves}`;
	starsStat.innerHTML = `Stars = ${stars}`;
}

// ToggleModal function toggle css class of modal__background
function toggleModal() {
	const modal = document.querySelector('.modal__background');
	modal.classList.toggle('hide');
}

// getStars function counts and returns css class of .stars li with the style display:none
function getStars() {
	stars = document.querySelectorAll('.stars li');
	starCount = 0;
	for (star of stars) {
		if (star.style.display !== 'none') {
			starCount++;
		}
	}
	return starCount;
}



// RESET AND REPLAY functions
// selector for css class .modal__cancel and addEventListener click toggleModal here u can add more functions calls with this arrow function
document.querySelector('.modal__cancel').addEventListener('click', () => {
	toggleModal();
});
// selector for css class .restart and addEventListener click resetgame
document.querySelector('.restart').addEventListener('click', resetGame)

// selector for css class .modal__replay and addEventListener click replaygame
document.querySelector('.modal__replay').addEventListener('click', replayGame );

// selector for css class .modal__close and addEventListener click toggleModal
document.querySelector('.modal__close').addEventListener('click', toggleModal );

// reset the game with different functions resetClockAndTime() resetMoves()  resetStars() shuffleDeck() resetCards() matched = 0;
function resetGame() {
	resetClockAndTime();
	resetMoves();
	resetStars();
	shuffleDeck();
	resetCards();
	matched = 0;
}

// reset the variables time, change bolean value vor clockOff call stopClock and displayTime
function resetClockAndTime() {
	stopClock();
	clockOff = true;
	time = 0;
	displayTime();
}

// reset the moves and write it to the innerHTML of class .moves
function resetMoves() {
	moves = 0;
	document.querySelector('.moves').innerHTML = moves;
}

// reset the stars with a querySelectorAll at .stars li and change style to display:inline instead of display:none
function resetStars() {
	stars = 0;
	const starList = document.querySelectorAll('.stars li');
	for (star of starList) {
		star.style.display = 'inline';
	}
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}
