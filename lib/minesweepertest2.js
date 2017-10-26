'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, columnIndex) {
      if (this._playerBoard[rowIndex][columnIndex] != ' ') {
        console.log('This tile has already been flipped!');
        return;
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberofNeighborBombs(rowIndex, columnIndex);
      }
      this._numberOfTiles--;
    }
  }, {
    key: 'getNumberofNeighborBombs',
    value: function getNumberofNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      //return the number of bombs in adjacent neighbors to user "click"
      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;
      var numberOfBombs = 0;
      neighborOffsets.forEach(function (offset) {
        //.forEach(offset) is a callback METHOD of an array. The code wrapped in the {} brackets is the callback FUNCTION
        var neighborRowIndex = rowIndex + offset[0]; //each element of neighborOffsets will have the reference parameter "offset" in the terms of
        var neighborColumnIndex = columnIndex + offset[1]; // functionality in the proceeding callback function
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    }
  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }
  }, {
    key: 'printPlayerBoard',
    value: function printPlayerBoard() {
      //so let's break this thing down, see comments below
      return this.playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n');
    }
  }, {
    key: 'printBombBoard',
    value: function printBombBoard() {
      return this._bombBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n');
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = []; //empty array which will be total board
      for (var i = 0; i < numberOfRows; i++) {
        //loop through specified number of rows
        var row = []; //create empty array (look closely it resets after each loop) this will hold 1 row and push to board
        for (var j = 0; j < numberOfColumns; j++) {
          //loop through specified columns and push ' ' chars to the blank row (creates columns)
          row.push(' '); //push to empty row array
        }
        board.push(row); //push to board array
      }
      return board; //returns the generated player board
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];
      for (var i = 0; i < numberOfRows; i++) {
        //same code as previous function
        var row = [];
        for (var j = 0; j < numberOfColumns; j++) {
          row.push(' '); //only difference is we are pushing a null value instead of a ' ' char
        } //not too sure as to why... running code with row.push(' ') produces a cleaner output in my opinion (see output by executing code)
        board.push(row); //for now I am going to keep push(' ') instead of push(null) => may change later depending on functionality
      } //see analysis at the bottom of code for more explicit look into this functionality

      var numberOfBombsPlaced = 0; //code for placing bombs on the bomb board
      while (numberOfBombsPlaced < numberOfBombs) {
        //note this code (so far) can place a bomb over an exisiting bomb, will fix later
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }
      }
      return board;
    }
  }]);

  return Board;
}();

var Game = function () {
  //you could extend Board here and simplify the code, however this is the method that Codecademy suggested.
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    //I might go super here because it reduces code. To do this... (which you already did)
    //super(numberOfRows, numberOfColumns, numberOfBombs); //   <-
    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns; //then comment out all this stuff
    this._numberOfBombs = numberOfBombs;
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs); //this was the tricky part, this._board creates an instance of the Board
  } //class inside the constructor of Game. So when we say const g= new Game, to reference SPECIFICALLY Board properties and methods outside
  //of our object, we MUST use g._board. For example, to access _numberOfTiles we must use g._board._numberOfTiles;however to access
  //_numberOfRows we use g._numberOfRows. So effectively g is a different instance than g._board. g has access to everything inside the Game
  //class, while g._baord has access ot everything insde the Board class. So when calling g._board.playMove we throw an error. Why? because
  //the Board class has no idea what the method playMove is; however calling g.playMove works perfectly because playMove is in the Game class
  //which g is an instance of


  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      //then simply change all this._board calls to this.
      this._board.flipTile(rowIndex, columnIndex);
      if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
        console.log('You lose... Final Board:');
        console.log(this._board.printPlayerBoard());
        console.log(this._board.printBombBoard());
      } else if (!this._board.hasSafeTiles) {
        console.log('You win!');
        console.log(this._board.printPlayerBoard());
      } else {
        console.log('Current Board: ');
        console.log(this._board.printPlayerBoard());
      }
    }
  }]);

  return Game;
}();

var Test = function (_Board) {
  _inherits(Test, _Board);

  function Test(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Test);

    return _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this, numberOfRows, numberOfColumns, numberOfBombs));
  }

  return Test;
}(Board);

var g = new Game(2, 2, 1);
//console.log(g._board._numberOfTiles); refernce the instance g how Codecademy set it up. Again might use extends to simplify this to
//console.log(g._board._numberOfBombs);  g._numberOfTiles/g.numberOfBombs
g.playMove(1, 0);

/*const x= new Board(5,3,3);
const y= new Test(6,3,3);
console.log(x._numberOfRows);
console.log(y._numberOfRows);
//console.log(g._numberOfRows);
//console.log(g._numberOfColumns); */

/*First we set up an arrow function with input variable board =>... next we call the array iteration .map method board.map(row => row.join(...))
on each element in array. Recall that the .map method transforms (or maps) EVERY element in an array according to some function or operation
(in this case we are taking each element in board (we defined the parameter as row) and operating on those elements (row) with .join())
But each element of board is an array itself so we introduce the parameter row to represent each element in board.
We then operate on each row and use the mapping function on each row -> row.join(' | ') to join the nested elements of each element of board

Next row.join(' | ') turns each iterated array into a string whose content is the elements of the array
(in this case ' ' and 'B') seperated by ' | ' character.
Next we .join on the entire thing => so to break this down for example let x=board.map(row=> row.join(' | ')) so x now holds that array
that I described previously in code this looks like...
let x= board.map(row => row.join(' | '));
so now we run x.join(' \n ') which acts on the array x (which again now just has strings as elements) and seperates them by a new line character.
So we get the output...
for Player board
|   |   |
|   |   |
|   |   |
and for the Bomb board (AGAIN this is using the .push(' ') instead of .push(null) )
output looks weird in the comment format, but running the code execution produces a much cleaner output
| B |   |
B |   | B |
|   | B |
*/

//Execution of the code
/*const playerBoard= generatePlayerBoard(3,4);
const bombBoard= generateBombBoard(3,4,5);
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
flipTile(playerBoard,bombBoard,0,0);
console.log('Updated Player Board: ');
printBoard(playerBoard);
flipTile(playerBoard,bombBoard,0,3);
console.log('Updated Player Board: ');
printBoard(playerBoard); /*

//analysis of the difference between pushing ' ' char or null into the bomb board
/*let nullArray=[null,null,null];
console.log(nullArray.join(' | '));

let spaceArray=[' ',' ',' '];
//console.log(spaceArray.join(' | ')); */

/*Running the above code, it appears that the null character is in fact a "smaller" space character than ' ' (you could word this better)
(but just run this code to see what you mean) switch push(null) and push(' ') to examine the difference
Remember the array.join(arg) turns an ARRAY INTO A STRING whose elements are seperated by arg */