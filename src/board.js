export class Board {
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
