import {scoringPoints} from "./scoringPoints.js";
import {scrabbleGrid} from "./scrabbleGrid.js";

export class Scrabble {
  constructor(word, position, direction) {
    const scrabbleTilesRegex = /[0-9$/\\&+,:;=?@#|'<>.^*()%!-]/;
    if (scrabbleTilesRegex.test(word)) {
      throw new Error ('Words can only contain letters.');
    } else { 
       this.word = word;
    }
    this.position = position;
    this.direction = direction;
  }

  //returns the score for the word
  score() {
    if (this.isEmptyWord() || this.isNull() || this.isWhiteSpace()) return 0;
    const baseScore = this.calculateBaseScore();
    const wordMultipliers = this.calculateWordMultipliers();
    const finalScore = wordMultipliers.reduce((finalScore, multiplier) => finalScore * multiplier, baseScore)
    return finalScore;
  }

  //calculates the base score for the word without word multipliers
  calculateBaseScore = () => this.wordLetters().reduce((acc, letter) => 
    letter in scoringPoints ? acc += this.calculateTileScore(letter) : acc, 
    0
  );

  //calculates the base score for the tile with letter multipliers
  calculateTileScore = (letter) => parseInt(scoringPoints[letter]) * this.letterMultiplier(letter);

  // gets word multiplier value for each tile
  calculateWordMultipliers = () => this.wordLetters().map((letter) => this.wordMultiplier(letter));

  // calculates letter multiplier
  letterMultiplier(letter) {
    const letterPosition = this.lettersAndPositions().filter((letterPosition) => (
      letterPosition.letter === letter))[0].position;
    const letterPositionMultiplier = this.filterByPosition(letterPosition).letterMultipler;
    return letterPositionMultiplier;
  }

  // calculates word multiplier
  wordMultiplier(letter) {
    const letterPosition = this.lettersAndPositions().filter((letterPosition) => (
      letterPosition.letter === letter))[0].position;
    const wordPositionMultiplier = this.filterByPosition(letterPosition).wordMultiplier;
    return wordPositionMultiplier;
  }

  //returns an array of word letters
  wordLetters = () => this.word.split("").map((letter) => letter.toLowerCase())

  //returns an object containing each word letter and its position on the scrabble grid 
  lettersAndPositions = () => this.wordLetters().map((letter, index) => (
    {
      letter: letter.toLowerCase(),
      position: this.positionByIndex(index)
    }
  ));

  //returns the grid coordinates for each letter in the word
  positionByIndex(index) {
    if (this.direction === 'horizontal') {
      const tileOffset = this.position['x'] + index;
      return { x: tileOffset, y: this.position['y'] }
    } else {
      const tileOffset = this.position['y'] - index;
      return { x: this.position['x'], y: tileOffset }
    }
  }

  // filters the scrabble board object for the tile with the corresponding coordinates.
  // Returns an object contaning {position, letterMultiplier and wordMultiplier}
  filterByPosition(position) {
    const coordinateInGridTile = scrabbleGrid.find(tile => (
      tile.position['x'] === position['x'] && 
      tile.position['y'] === position['y']
    ));
    return coordinateInGridTile;
  }

  isEmptyWord = () => (this.word === "" ? true : false);

  isNull = () => (this.word === null ? true : false);

  isWhiteSpace = () => (" \t\n\r\v".indexOf(this.word) > -1 ? true : false);
}

const scrabble = new Scrabble('chair', {x: 0 , y: 14}, 'horizontal');
console.log(scrabble.score())

