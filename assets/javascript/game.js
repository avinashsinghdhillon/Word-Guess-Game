var dictionary = ["Unforgiven", "Tombstone", "Shane", "Stagecoach", "Winchester", "Hondo",
        "Laramie", "Hombre", "Appaloosa", "Barbarosa", "Montana", "Conagher", "Thunderheart",
        "Geronimo",  "Sodbusters", "Troublemakers", "Desparado", "Hiawatha", "Gunfighter",
        "Bandidas", "Shadowheart", "Redemption", "Windwalker", "Silverado", "Django",
        "Independence", "Gunfighters", "Chisum", "Catlow", "Tecumseh"];

var lettersUsed = new Array();

//function to 
function getQuizWord (){

        return (dictionary[Math.floor(Math.random()* dictionary.length)]);
}

//function to create blanks for letters on screen


//function to check if letter pressed exists in quiz word or lettersUsed array

      
      
      
function keyPressed (keyInput) {
        if(lettersUsed.indexOf(keyInput) >= 0){
                //letter has already been used
                document.getElementById("Msg-Text").textContent = "Letter already guessed";
        }else{
                lettersUsed.push(keyInput);
                document.getElementById("guessedLetters-Text").textContent = lettersUsed[0];
        }
}


// this is the object: game 
let game = {
    numGuessesRem: 0,
    lettersUsed: [],
    quizWord: dictionary[Math.floor(Math.random()* dictionary.length)],//get quiz word from dictionary
};

console.log(game.quizWord);
document.getElementById("quizWord-Text").textContent = game.quizWord;

document.onkeyup = function(event) {
        var key = event.key;
        keyPressed(key);
}