
//Global variables
var dictionary = ["Unforgiven", "Tombstone", "Shane", "Stagecoach", "Winchester", "Hondo",
        "Laramie", "Hombre", "Appaloosa", "Barbarosa", "Montana", "Conagher", "Thunderheart",
        "Geronimo",  "Sodbusters", "Troublemakers", "Desparado", "Hiawatha", "Gunfighter",
        "Bandidas", "Shadowheart", "Redemption", "Windwalker", "Silverado", "Django",
        "Independence", "Chisum", "Catlow", "Tecumseh"];

var lettersLeftToMatch = new Array();
var gamesWon = 0;

//function to create blank placeholders for quiz word letters
function createPlaceholder() {
        // debugger;
        var parentEle = document.getElementById("guessedLetters-Text");
        lettersLeftToMatch.forEach(char =>{
                var childEle = document.createElement("div");
                childEle.setAttribute("class","guessLetters letter-" + char);
                childEle.style.color = "rgb(247, 203, 122)";
                childEle.textContent = char;
                parentEle.appendChild(childEle);
        });
}

//adds letters to the letters used (incorrectly) row.
function addLettersUsed(str, idNum) {
        document.getElementById("used" + idNum).textContent = str;
        lettersLeftToMatch = game.quizWord.toLowerCase().split("");
}

//this clears the game board
function clearGameboard() {
        var parentEle = document.getElementById("guessedLetters-Text");
        while (parentEle.firstChild) {
                parentEle.removeChild(parentEle.firstChild);
        }
        document.getElementById("guessedLetters-Text").backgroundColor = "rgb(247, 203, 122)";

        parentEle = document.getElementById("lettersUsed-Text");
        parentEle.children.textContent = "";

}


//resets the game
function resetGame(){
        // debugger;
        document.getElementById("any-Key").style.opacity = 1;
        game.numGuessesRem = 10;
        game.incorrectLettersUsed.splice(0, game.incorrectLettersUsed.length);
        console.log("NEW GAME !!!");
        document.getElementById("msg-Text").textContent = "NEW GAME !!!";
        game.quizWord = dictionary[Math.floor(Math.random()* dictionary.length)];
        lettersLeftToMatch = game.quizWord.toLowerCase().split("");
        console.log("Word to guess: " +game.quizWord);
        clearGameboard();
        createPlaceholder();
}

//function to check if letter pressed exists in the "quizWord"  or incorrectLettersUsed array   
function keyPressed (keyInput) {
        //debugger;
        if(lettersLeftToMatch.indexOf(keyInput) >= 0){
                // add and show the correctly guessed character/s on the game board
                var letterList = document.getElementsByClassName("letter-" + keyInput);
                for (var i = 0; i < letterList.length; i++){
                        letterList[i].style["color"] = "brown";
                }
                //look for multiple matches
                lettersLeftToMatch.forEach(char => {
                        //this needs to be refactored to avoid doing the same check twice
                        if(lettersLeftToMatch.indexOf(keyInput) >= 0){
                                //deletes the matched character from the "lettersLeftToMatch" array
                                lettersLeftToMatch.splice([lettersLeftToMatch.indexOf(keyInput)], 1);
                        }
                });
                document.getElementById("msg-Text").textContent = "Good guess!";
                game.correctLetters.push(keyInput);
                //check if the last accepted letter solved the game
                if(lettersLeftToMatch.length == 0){
                        //start a new game and add to user score
                        document.getElementById("msg-Text").textContent = "You won!";
                        gamesWon++;
                        document.getElementById("gamesWon-Text").textContent = "Games Won: " + gamesWon;
                        resetGame();
                }
        }
        else if(game.incorrectLettersUsed.indexOf(keyInput) >= 0 || game.correctLetters.indexOf(keyInput) >= 0){
                //letter has already been used
                document.getElementById("msg-Text").textContent = "Letter's already used";
        }else{
                game.incorrectLettersUsed.push(keyInput);
                var indx = 0;
                if(game.numGuessesRem < 10){indx = (game.numGuessesRem - 10) * (-1);}
                addLettersUsed(keyInput, indx); //this gives us the index to be used for insertion of used letters
                game.numGuessesRem--;
                document.getElementById("guessesRem-Text").textContent = "Guesses Remaining: " + game.numGuessesRem;
                document.getElementById("msg-Text").textContent = "Incorrect guess.";

                //check if the user has run out of turns. If so, restart game.
                if(game.numGuessesRem <= 0){
                        //show the entire word now
                        var letterList = document.getElementsByClassName("guessLetters");
                        for (var i = 0; i < letterList.length; i++){
                        letterList[i].style["color"] = "brown";
                        }
                        //tried transitions to hold the flow of the program so I could display the word- Ineffective
                        //document.getElementById("guessedLetters-Text").style.backgroundColor = "rgb(4, 65, 24)";

                        document.getElementById("msg-Text").textContent = "Game Over!";
                        resetGame();
                }
        }
}


// this is the "game" object 
let game = {
        numGuessesRem: 10,
        correctLetters: [],//we may not need this later
        incorrectLettersUsed: [],
        //get quiz word from dictionary
        quizWord: dictionary[Math.floor(Math.random()* dictionary.length)]
};

console.log("Word to guess: " +game.quizWord);

lettersLeftToMatch = game.quizWord.toLowerCase().split("");

createPlaceholder();

document.onkeyup = function(event) {
        var keyP = event.key.toLowerCase();
        //document.getElementById("msg-Text").textContent = "";
        document.getElementById("any-Key").style.opacity = 0;
        document.getElementById("guessesRem-Text").textContent = "Guesses Remaining: " + game.numGuessesRem;
        document.getElementById("gamesWon-Text").textContent = "Games Won: " + gamesWon;

        //check if key pressed is a letter or number
        if(event.keyCode > 47 && event.keyCode < 91){
                console.log(keyP);
                keyPressed(keyP);
        }
        else{
                document.getElementById("msg-Text").textContent = "Use letters and numbers only";
        }
}
