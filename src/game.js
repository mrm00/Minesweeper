// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`


import {Board} from './board.js';


class Game  {       //you could extend Board here and simplify the code, however this is the method that Codecademy suggested.
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {  //I might go super here because it reduces code. To do this... (which you already did)
    //super(numberOfRows, numberOfColumns, numberOfBombs); //   <- and then see below in the playMove method
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
