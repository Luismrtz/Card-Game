import '../scss/main.scss'

import  './canvas.js'

//* parcel-bundler fix for audio (only loads paths from require, imports, workers)
let p1 = require('../Assets/Audio/calm2.mp3');
let p2 = require('../Assets/Audio/cardFlip.wav');
let p3 = require('../Assets/Audio/matching.wav');
let p4 = require('../Assets/Audio/victory2.wav');
let p5 = require('../Assets/Audio/waterOver.wav');



class AudioController { 
    // tracking audio/volume properties
    constructor() {
               this.bgMusic = new Audio(p1);
                this.flipSound = new Audio(p2);
                this.matchSound = new Audio(p3);
                this.victorySound = new Audio(p4);
                this.gameOverSound = new Audio(p5);
                 this.bgMusic.volume = 0.04; // base game's track volume
         this.flipSound.volume = 0.05; 
        this.victorySound.volume = 0.01;
        this.gameOverSound.volume = 0.01;
        this.matchSound.volume = .09;
        
       this.bgMusic.loop = true; // to loop
        
    }
    startMusic() {
        this.bgMusic.play();  // for when we call this via 'new' ac or somefin
      //  this.bgMusic.volume = 0.6;
    } 
stopMusic() {
this.bgMusic.pause();// no stop functionality in js so pause()
this.bgMusic.currentTime = 0; //putting music time to zero so it replays from beginning when paused
}

    flip() {
        this.flipSound.play();
    }
    match() {
        this.matchSound.play();
    }
    victory() {
        this.stopMusic(); // to stop MAIN music when we win, 
        this.victorySound.play(); // and play VICTORY music
}

 gameOver() {
  this.stopMusic();
    this.gameOverSound.play();
 }
 
}
class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
        this.ac = new AudioController(); // Inheriting AudioController and its properties to 'ac'
    }
    //! note: class constructors ONLY get called ONCE when written and when 'new' is made
    //! so we CALL a function for this (startGame) to be called multiple times

    startGame() {
  
        this.cardToCheck = null; // no card to check, so cardtocheck is on null (when not match)
        this.totalClicks = 0; // to reset clicks
        this.timeRemaining = this.totalTime; // to reset time depending on set variable
        this.matchedCards = []; // where all the matched cards will go so we know if matched. But set to empty at start
        this.busy = true; // to check if allowed to flip a card

  
        setTimeout(() => {
            this.ac.startMusic();
            this.shuffleCard(this.cardsArray);
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }



    flipCard(card) { //* this is called in orignal forEach we initiated
        if(this.canFlipCard(card)) {// if(true) canFlipCard returns true
            this.ac.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks; // to increment flips #
            card.classList.add('visible');

            if(this.cardToCheck) //if is not null
                    // check if match
                    this.checkForCardMatch(card);
            else    
                    this.cardToCheck = card;


        }
    }

    // grab card and compare to other| push to cardMatch/ or cardMisMatch
    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else
            this.cardMisMatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }
    //push card1/card2 to array if matched
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.ac.match(); // play 'isMatched' sound
        if(this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }

    // remove visible if no match, cannot flip until timeout finishes.
    cardMisMatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible'); 
            this.busy = false;
        }, 1000);
    }



    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;
    }


    // timer countdown. 
    startCountDown() {
        return setInterval(() => { 
            this.timeRemaining--; 
            this.timer.innerText = this.timeRemaining; 
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }

    // banner overlays
    gameOver() {
        clearInterval(this.countDown);
        this.ac.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
    }

    victory() {
        clearInterval(this.countDown);
        this.ac.victory();
        document.getElementById('victory-text').classList.add('visible');
    }



    shuffleCard() { //static function | remember: 'cardsArray = cards' in mixOrMatch constructor
    for(let i = this.cardsArray.length -1; i > 0; i--) {  //fisher yates shuffle pattern
         let randIndex = Math.floor(Math.random() * (i+1));      //looping through this backwards
         // detects ALL cards, grabs length(16) loops downwards. everyloop gets random int for grid
     //? length - 1 because need it to start from 0-15, instead of grabbing full length of 16
      //* (i+1)); because we already set i to [0-15]  cant mult by 0, so adding 1 so its (1-16) when in formula 
            this.cardsArray[randIndex].style.order = i; 
          //links to the grid-order prototype in style of '.card'| = i is 0 bound, so [0-15]. 
            this.cardsArray[i].style.order = randIndex;
        }
    }
    canFlipCard(card) { 
    // NOT allowed to flip card when....
            // this.busy = true
            // clicking on card that is already matched
            // one is already clicked and checking for a match
            return (!this.busy && !this.matchedCards.includes(card) && card != this.cardToCheck)
            // return true if all these are false
    }
}


// if page hasn't loaded yet, wait for page to load before running js. 
//start
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready()); // 'DOMContentLoaded' = once everything in htmlDOM has loaded. call function
} else {
    ready();
}






// ? tip: getElementbyClassName 
//         1 returns an HTMLCollection, which needs to be converted to an array BUT is live loaded. 

// ? tip: querySelectorAll  
//         1 returns a nodelist, forEach works for nodeLists, BUT nodelist is NOT ARRAY and not live loaded | BUT CAN CALL ANYTHING YO, div > li
//                         STILL NEEDS TO BE CONVERTED TO ARRAY to access array prototypes methods (push/pop/slice)
//         2 note: cant convert queryselectorall to array when just pulling a div. 
//                   might be because its not hot loaded/live like getelementsbyclassName
  
        



//hotlive so className
//start
function ready () { 
    let overlays = [...(document.getElementsByClassName('overlay-text'))]; //array of these overlay-text elements
   
     //* need it to be an array for future purposes.
     let cards = Array.from(document.getElementsByClassName('card')); 
     //* instance of the object flipcard(card)
     let game = new MixOrMatch(50, cards); //? links to constructor and passes (arguments,arguments)
    
     //flips all visible cards
    overlays.forEach(overlay => { //can use forEach here now since overlay-text was converted
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
             game.startGame();
        });
    });  

    //on any card click, call flip card with selected card
    cards.forEach(card => {
        card.addEventListener('click', () => {
            //MixOrMatch constructor .flipCard function
             game.flipCard(card);           
        });
    });


}









