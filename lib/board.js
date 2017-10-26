'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
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