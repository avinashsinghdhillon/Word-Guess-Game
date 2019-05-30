var dictionary = ["Unforgiven", "Tombstone", "Shane", "Stagecoach", "Winchester", "Hondo",
        "Laramie", "Hombre", "Appaloosa", "Barbarosa", "Montana", "Conagher", "Thunderheart",
        "Geronimo",  "Sodbusters", "Troublemakers", "Desparado", "Hiawatha", "Gunfighter",
        "Bandidas", "Shadowheart", "Redemption", "Windwalker", "Silverado", "Django",
        "Independence", "Gunfighters", "Chisum", "Catlow", "Tecumseh"];


// this is the object: game 
let game = {
    numGuessesRem: 0,
    lettersUsed: [],
    //function to get quiz word from dictionary
    quizWord: ()=> (dictionary[Math.floor(Math.random()* dictionary.length)]),

    //function to create blanks for letters on screen
    


    //function to check if letter pressed exists in quiz word or lettersUsed array
    // var tempWord = 

    // document.getElementById("quizWord-Text").innerText = tempWord;
    // return tempWord;
};

