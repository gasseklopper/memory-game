/*
 * Create a list that holds all of your cards
 */
// object list with the card symbol icons

let objects = ['diamond','paper-plane-o','anchor','bolt','cube','leaf','bicycle','bomb','cube', 'diamond','paper-plane-o','anchor','bolt','cube','leaf','bicycle','bomb','cube',]
//array to store toggled cards to compare them or control status
let toggledCards = [];

//increment the move counter and display it on the page (put this functionality in another function that you call from this one)
let moves = 0;

let clockOff = true;

let time = 0;

let clockId;
let matched = 0;
const TOTAL_PAIRS = 1;




//shuffle the list of cards using the provided "shuffle" method below

//selects the css class deck
const deck = document.querySelector('.deck');
/*

 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
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

		if (matched === TOTAL_PAIRS) {
			gameOver();
		}
	}else{
		console.log('not a Match!')
		//setTimeOut is a callback function that runs after the designated time expires.
		setTimeout(() => {
			// if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
			toggleCard(toggledCards[0]);
			toggleCard(toggledCards[1]);
			toggledCards = [];
		}, 1000);

	}
}

function checkScore() {
	if (moves === 16 || moves === 24 )
	{
		hideStar();
	}
}

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

function startClock () {
		clockId = setInterval(() => {
		time++;
		displayTime();
		console.log(time);
	}, 1000);
}

function displayTime() {
	const clock = document.querySelector('.clock');
	console.log(clock);
	clock.innerHTML = time;

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	if (seconds < 10) {
		clock.innerHTML = `${minutes}:0${seconds}`;
	} else {
		clock.innerHTML = `${minutes}:${seconds}`;
	}
}

function stopClock() {
	clearInterval(clockId);
}

function gameOver() {
	stopClock();
	writeModalStats();
	toggleModal();
}

function replayGame() {
	resetGame();
	toggleModal();
}

function resetCards() {
	const cards = document.querySelectorAll('.deck li');
	for (let card of cards) {
		card.className = 'card';
	}
}

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

function toggleModal() {
	const modal = document.querySelector('.modal__background');
	modal.classList.toggle('hide');
}





function getStars() {
	stars = document.querySelectorAll('.stars li');
	starCount = 0;
	for (star of stars) {
		if (star.style.display !== 'none') {
			starCount++;
		}
	}
	console.log(starCount);
	return starCount;
}

document.querySelector('.modal__cancel').addEventListener('click', () => {
	toggleModal();
});

document.querySelector('.restart').addEventListener('click', resetGame)

document.querySelector('.modal__replay').addEventListener('click', replayGame );

function resetGame() {
	resetClockAndTime();
	resetMoves();
	resetStars();
	shuffleDeck();
	resetCards();
	matched = 0;
}

function resetClockAndTime() {
	stopClock();
	clockOff = true;
	time = 0;
	displayTime();
}

function resetMoves() {
	moves = 0;
	document.querySelector('.moves').innerHTML = moves;
}

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

//*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)


		//()+ if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
