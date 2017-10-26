class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfRows=numberOfRows;
    this._numberOfColumns=numberOfColumns;
    this._numberOfBombs=numberOfBombs;
    this._numberOfTiles= numberOfRows*numberOfColumns;
    this._playerBoard= Board.generatePlayerBoard(numberOfRows,numberOfColumns);
    this._bombBoard=Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
  get playerBoard() {
    return this._playerBoard;
  }

   flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] != ' ') {
      console.log('This tile has already been flipped!');
      return;
    }
    else if (this._bombBoard[rowIndex][columnIndex]==='B') {
      this._playerBoard[rowIndex][columnIndex]= 'B';
    }
    else {
      this._playerBoard[rowIndex][columnIndex]=this.getNumberofNeighborBombs(rowIndex,columnIndex);
    }
    this._numberOfTiles--;
  }
   getNumberofNeighborBombs(rowIndex, columnIndex) {    //return the number of bombs in adjacent neighbors to user "click"
    const neighborOffsets=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    const numberOfRows=this._bombBoard.length;
    const numberOfColumns=this._bombBoard[0].length;
    let numberOfBombs=0;
    neighborOffsets.forEach(offset => {   //.forEach(offset) is a callback METHOD of an array. The code wrapped in the {} brackets is the callback FUNCTION
      const neighborRowIndex= rowIndex+offset[0];  //each element of neighborOffsets will have the reference parameter "offset" in the terms of
      const neighborColumnIndex= columnIndex+offset[1]; // functionality in the proceeding callback function
      if ((neighborRowIndex >=0 && neighborRowIndex <numberOfRows) && (neighborColumnIndex>=0 && neighborColumnIndex<numberOfColumns)) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }
  hasSafeTiles() {
    return (this._numberOfTiles!==this._numberOfBombs);
  }
  printPlayerBoard() {     //so let's break this thing down, see comments below
    return this.playerBoard.map(row => row.join(' | ')).join('\n');
  }
  printBombBoard() {
      return this._bombBoard.map(row=>row.join(' | ')).join('\n');
  }
  static generatePlayerBoard(numberOfRows,numberOfColumns)  {
    let board=[];           //empty array which will be total board
    for (let i=0;i<numberOfRows;i++) {    //loop through specified number of rows
      let row=[];                        //create empty array (look closely it resets after each loop) this will hold 1 row and push to board
      for (let j=0; j<numberOfColumns;j++) { //loop through specified columns and push ' ' chars to the blank row (creates columns)
        row.push(' ');  //push to empty row array
      }
      board.push(row); //push to board array
    }
    return board; //returns the generated player board
  }
  static generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs)  {
    let board=[];
    for (let i=0;i<numberOfRows;i++) {      //same code as previous function
      let row=[];
      for (let j=0; j<numberOfColumns;j++) {
        row.push(' ');  //only difference is we are pushing a null value instead of a ' ' char
      }                 //not too sure as to why... running code with row.push(' ') produces a cleaner output in my opinion (see output by executing code)
      board.push(row);  //for now I am going to keep push(' ') instead of push(null) => may change later depending on functionality
    }                  //see analysis at the bottom of code for more explicit look into this functionality

    let numberOfBombsPlaced=0;    //code for placing bombs on the bomb board
    while (numberOfBombsPlaced<numberOfBombs) {       //note this code (so far) can place a bomb over an exisiting bomb, will fix later
      let randomRowIndex= (Math.floor(Math.random()*numberOfRows));
      let randomColumnIndex= (Math.floor(Math.random()*numberOfColumns));
      if (board[randomRowIndex][randomColumnIndex]  !== 'B') {
       board[randomRowIndex][randomColumnIndex]='B';
       numberOfBombsPlaced++;
    }
    }
    return board;
  }
}



class Game  {       //you could extend Board here and simplify the code, however this is the method that Codecademy suggested.
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {  //I might go super here because it reduces code. To do this... (which you already did)
    //super(numberOfRows, numberOfColumns, numberOfBombs); //   <-
    this._numberOfRows=numberOfRows;
    this._numberOfColumns= numberOfColumns; //then comment out all this stuff
    this._numberOfBombs= numberOfBombs;
    this._board= new Board(numberOfRows, numberOfColumns, numberOfBombs); //this was the tricky part, this._board creates an instance of the Board
  } //class inside the constructor of Game. So when we say const g= new Game, to reference SPECIFICALLY Board properties and methods outside
   //of our object, we MUST use g._board. For example, to access _numberOfTiles we must use g._board._numberOfTiles;however to access
   //_numberOfRows we use g._numberOfRows. So effectively g is a different instance than g._board. g has access to everything inside the Game
   //class, while g._baord has access ot everything insde the Board class. So when calling g._board.playMove we throw an error. Why? because
   //the Board class has no idea what the method playMove is; however calling g.playMove works perfectly because playMove is in the Game class
   //which g is an instance of


playMove(rowIndex, columnIndex) {     //then simply change all this._board calls to this.
  this._board.flipTile(rowIndex,columnIndex);
  if (this._board.playerBoard[rowIndex][columnIndex]=== 'B') {
    console.log('You lose... Final Board:');
    console.log(this._board.printPlayerBoard());
    console.log(this._board.printBombBoard());
  }
  else if (!this._board.hasSafeTiles) {
    console.log('You win!');
    console.log(this._board.printPlayerBoard());
  }
  else {
    console.log('Current Board: ');
    console.log(this._board.printPlayerBoard());
  }
}
}


class Test extends Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
      super(numberOfRows, numberOfColumns, numberOfBombs);
}
}

const g= new Game(2,2,1);
//console.log(g._board._numberOfTiles); refernce the instance g how Codecademy set it up. Again might use extends to simplify this to
//console.log(g._board._numberOfBombs);  g._numberOfTiles/g.numberOfBombs
g.playMove(1,0);

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
