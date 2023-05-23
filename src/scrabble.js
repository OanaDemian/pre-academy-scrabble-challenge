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
      letter: letter.toLowerCase(),
      position: this.positionByIndex(index)
    }));
    return values;
  }

  #positionByIndex(index) {
    let newVal = 0;
    let posByIndex = {} ;
    if (this.direction === 'horizontal') {newVal = this.position['x'] + index; posByIndex = {x: newVal, y: this.position['y']}};
    if (this.direction === 'vertical') {newVal = this.position['y'] - index; posByIndex = {x: this.position['x'], y: newVal}}; 
    return posByIndex;
  }

  filterByPosiiton(coordinate) {

  }
  isEmptyWord = () => (this.word === "" ? true : false);

  isNull = () => (this.word === null ? true : false);

  isWhiteSpace = () => (" \t\n\r\v".indexOf(this.word) > -1 ? true : false);
}

export default Scrabble;


