// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");
   let word;
   while (true) {
      word = input.question("Please enter a word to score: ");

      if (/^[A-Za-z\s]+$/.test(word)) {
         break;
      } else {
         console.log("Invalid word. Please enter a valid word.")
      }
   }

   return word;

   }


let newPointStructure = transform(oldPointStructure);

let simpleScorer = function(word) {
   return word.length;
}

let vowelBonusScorer = function(word) {
   word = word.toUpperCase();
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      if (['A', 'E', 'I', 'O', 'U'].includes(word[i])) {
         score += 3;
      } else {
         score += 1;
      }
   }
   return score;
}

let scrabbleScorer = function(word) {
   word = word.toLowerCase();
   let score = 0;

   for (let i = 0; i < word.length; i++) {
      score += newPointStructure[word[i]];
   }

   return score;
}

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   },
   {
      name:"Bonus Vowels",
      description:"Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name:"Scrabble",
      description:"The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }

];

function scorerPrompt() {
   console.log("Which scoring algortihm would you like to use?");
   for (let i = 0; i < scoringAlgorithms.length; i++) {
      console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
   }
   let choice;
   while(true) {
      choice = input.question("Enter the number of your choice: ");
      if (choice >= 0 && choice < scoringAlgorithms.length) {
         break;
      } else {
         console.log("Invalid input. Please enter a valid choice.")
      }
      
   }

   return scoringAlgorithms[choice];

}

function transform(oldPointStructure) {
   let newPointStructure = {};
   
   for (const pointValue in oldPointStructure) {

      for ( let i = 0; i < oldPointStructure[pointValue].length; i++) {
         newPointStructure[oldPointStructure[pointValue][i].toLowerCase()] = Number(pointValue);
      }
   }

   return newPointStructure;

}

newPointStructure[' '] = 0;

function runProgram() {
   let continuePlaying = true;

   while (continuePlaying) {
      let word = initialPrompt();
      let selectedAlgorithm = scorerPrompt();
      let score = selectedAlgorithm.scorerFunction(word.toUpperCase());

      console.log(`Score for ${word}: ${score}`);
      
      let playAgain = input.question("Would you like to score another word? (y/n): ").toLowerCase();

      if (playAgain !== 'y') {
         continuePlaying = false;
   }

}

   console.log("Thanks for playing scrabble!");
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
