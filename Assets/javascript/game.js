//seperate variables for DOM
var $newGameButton = document.getElementById("new-game-button");
var $placeholders = document.getElementById("placeholders");
var $guessedLetters = document.getElementById("guessed-letters");
var $guessesLeft = document.getElementById("guesses-left");
var $wins = document.getElementById("wins");
var $losses = document.getElementById("losses");

//Create word array themed 'Stranger Things'
var wordBank= ['eleven','demogorgon','hawkins','tubular','stranger','demodog','dart'];
var wins = 0;
var losses = 0;
var guessesLeft = 7;
var gameRunning = false;
var pickedWord = "";
var correctWord= [];
var wrongWord= [];
var underScore = [];

//New Game function

function newGame() {
    gameRunning = true;
    guessesLeft = 7;
    correctWord= [];
    wrongWord= [];
    underScore= [];
//Random Word Selector 
    pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    
//Create the New placeholder
    for (var i= 0; i < pickedWord.length; i++) {
        if (pickedWord[i] === " ") {
            underScore.push(" ");
        } 
        else { 
            underScore.push("_");
        }
    }

//game info goes to DOM
    $guessesLeft.textContent= guessesLeft;
    $placeholders.textContent= underScore.join("");
    $guessedLetters.textContent= wrongWord;

    
};



//This function shows if the key pressed is in the word generated in previous function

function letterGuess (letter) {
    if (gameRunning === true && correctWord.indexOf(letter) === -1) {
        //Run game logic
        correctWord.push(letter);

        //check for letter guess to fit in selected word
        for (var i= 0; i < pickedWord.length; i++) {
            if(pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                underScore[i] = pickedWord[i];
            }
        }
        $placeholders.textContent = underScore.join("");
        
        checkIncorrect(letter)
    }
    else {
        if (gameRunning === false) {
            alert("Click on new game!");
        }
        else {
            alert("Letter guessed already, guess another!");
        }
    }  
};

//Incorrect letter function
function checkIncorrect(letter) {
    //Check to see if the letter did not make it into underScore (incorrect guess)
    if 
    (underScore.indexOf(letter.toLowerCase()) === -1 && underScore.indexOf(letter.toUpperCase()) === -1) {
        //Subtract guesses
        guessesLeft--;
        //put letter into wrongWord bank
        wrongWord.push(letter);
        //write new bank of incorrect letters to DOM
        $guessedLetters.textContent = wrongWord.join(" ");
        //Write new amount of guesses to DOM
        $guessesLeft.textContent = guessesLeft;
    }
    checkLose();
      
    
};

//Did you lose?
function checkLose() {
    
    if (guessesLeft === 0) {
        losses++;
        gameRunning = false;
        $losses.textContent = losses;
        setTimeout(() => alert("YOU LOSE!"), 0);
    }
    checkWin();
};

//Did you Win???
function checkWin() {
    if (pickedWord.toLowerCase() === underScore.join("").toLowerCase()) {
        wins++;
        gameRunning= false;
        $wins.textContent= wins;
        setTimeout(() => alert("You Escaped!"), 2);
    }
};

$newGameButton.addEventListener("click", newGame);

document.onkeyup = function(letter) {
    console.dir(letter);
    if (letter.keyCode >= 65 && letter.keyCode <= 90);
    letterGuess(letter.key);
    
};