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

  score() {
    if (this.isEmptyWord() || this.isNull() || this.isWhiteSpace()) return 0;
    return this.#calculateScore();
  }

  #calculateScore() {
    const score = this.#wordLetters().reduce((acc, letter) => 
      letter in scoringPoints ? acc += parseInt(scoringPoints[letter]) : acc, 
      0
    );
    return score;
  }

  #wordLetters() {
    const letters = this.word.split("").map((letter) => letter.toLowerCase());
    return letters;
  }

  #lettersToValues() {
    const values = this.#wordLetters().map((letter,index) => ({
      letter: letter,
      position: positionByIndex(index)
    }));
    return values;
  }

  positionByIndex(index) {
    this.direction === 'horizontal' ? this.position['x'] += index : this.position['x'];
    this.direction === 'vertical' ? this.position['y'] -= index : this.position['y'];
    return this.position;
  }

  isEmptyWord = () => (this.word === "" ? true : false);

  isNull = () => (this.word === null ? true : false);

  isWhiteSpace = () => (" \t\n\r\v".indexOf(this.word) > -1 ? true : false);
}

export default Scrabble;

const scrabble = new Scrabble('fo',{x: 0, y: 14}, 'vertical');
console.log(scrabble.positionByIndex(7))

