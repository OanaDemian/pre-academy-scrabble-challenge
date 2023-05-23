import {scoringPoints} from "./scoringPoints.js";
import {scrabbleGrid} from "./scrabbleGrid.js";
class Scrabble {

  constructor(word, position, direction) {
    const regex = /[0-9$/\\&+,:;=?@#|'<>.^*()%!-]/;
    if (regex.test(word)){
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
    return this.calculateScore();
  }
//calculates the score for the word and returns it
  calculateScore() {
    const score = this.wordLetters().reduce((acc, letter) => 
      letter in scoringPoints ? acc += this.calculateLetterScore(letter) : acc, 
      0
    );
    return score;
  }
// calculates score for letter by multiplying letter value with multipliers
  calculateLetterScore(letter) {
    const letterPosition = this.lettersAndPositions().filter((letterPosition) => (letterPosition.letter === letter))[0].position;
    const letterPositionMultiplier = this.filterByPosition(letterPosition).letterMultipler;
    const letterScore = parseInt(scoringPoints[letter]) * letterPositionMultiplier;
    return letterScore;
  }

//returns an array of word letters
  wordLetters() {
    const letters = this.word.split("").map((letter) => letter.toLowerCase());
    return letters;
  }
//returns an object containing each word letter and its position on the scrabble grid 
  lettersAndPositions() {
    const lettersAndPositions = this.wordLetters().map((letter,index) => ({
      letter: letter.toLowerCase(),
      position: this.positionByIndex(index)
    }));
    return lettersAndPositions;
  }
//returns the grid coordinates for each letter in the word
  positionByIndex(index) {
    let newVal = 0;
    let posByIndex = {} ;
    if (this.direction === 'horizontal') {newVal = this.position['x'] + index; posByIndex = {x: newVal, y: this.position['y']}};
    if (this.direction === 'vertical') {newVal = this.position['y'] - index; posByIndex = {x: this.position['x'], y: newVal}}; 
    return posByIndex;
  }
// filters the scrabble board object for the tile with the corresponding coordinates. Returns an object contaning {position, letterMultiplier and wordMultiplier}
  filterByPosition(position) {
    const coordinateInGridTile = scrabbleGrid.filter(tile => (tile.position['x'] === position['x']) && (tile.position['y'] === position['y']));
    return coordinateInGridTile[0];
  }
  isEmptyWord = () => (this.word === "" ? true : false);

  isNull = () => (this.word === null ? true : false);

  isWhiteSpace = () => (" \t\n\r\v".indexOf(this.word) > -1 ? true : false);
}

export default Scrabble;
const scrabble = new Scrabble('chome', {x: 0 , y: 14}, 'vertical');
console.log(scrabble.score('chome'))

