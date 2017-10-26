'use strict';

var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
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
};

var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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
};

var getNumberofNeighborBombs = function getNumberofNeighborBombs(bombBoard, rowIndex, columnIndex) {
  //return the number of bombs in adjacent neighbors to user "click"
  var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  var numberOfRows = bombBoard.length;
  var numberOfColumns = bombBoard[0].length;
  var numberOfBombs = 0;
  neighborOffsets.forEach(function (offset) {
    //.forEach(offset) is a callback METHOD of an array. The code wrapped in the {} brackets is the callback FUNCTION
    var neighborRowIndex = rowIndex + offset[0]; //each element of neighborOffsets will have the reference parameter "offset" in the terms of
    var neighborColumnIndex = columnIndex + offset[1]; // functionality in the proceeding callback function
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        numberOfBombs++;
      } //for the big if condition, neighborRowIndex and neighborColumnIndex must be strictly less than numberOfRows and numberOfColumns respectively
    } //because those were previously set to lengths (which in an array don't take into account the inital 0 index)
  });
  return numberOfBombs;
};

var flipTile = function flipTile(playerBoard, bombBoard, rowIndex, columnIndex) {
  if (playerBoard[rowIndex][columnIndex] != ' ') {
    console.log('This tile has already been flipped!');
    return;
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberofNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};

var printBoard = function printBoard(board) {
  //so let's break this thing down. See comments below
  console.log(board.map(function (row) {
    return row.join(' | ');
  }).join('\n')); //in completed code this function was modified into a method of the board class
}; // with name print()


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
var playerBoard = generatePlayerBoard(3, 4);
var bombBoard = generateBombBoard(3, 4, 5);
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board: ');
printBoard(playerBoard);
flipTile(playerBoard, bombBoard, 0, 3);
console.log('Updated Player Board: ');
printBoard(playerBoard);

//analysis of the difference between pushing ' ' char or null into the bomb board
/*let nullArray=[null,null,null];
console.log(nullArray.join(' | '));

let spaceArray=[' ',' ',' '];
//console.log(spaceArray.join(' | ')); */

/*Running the above code, it appears that the null character is in fact a "smaller" space character than ' ' (you could word this better)
(but just run this code to see what you mean) switch push(null) and push(' ') to examine the difference
Remember the array.join(arg) turns an ARRAY INTO A STRING whose elements are seperated by arg */