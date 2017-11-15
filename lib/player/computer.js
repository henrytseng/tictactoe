'use strict';

class Computer {

  setBoard(board) {
    this._board = board;
    return this;
  }

  makeMove(i, j) {
    this._board.place(i, j, 'O');
    return this;
  }

  findRandom() {
    let i, j;
    let hasMove = true;
    while(hasMove) {
      i = Math.floor(Math.random() * this._board.size());
      j = Math.floor(Math.random() * this._board.size());
      if(this._board.isAvailable(i, j)) return [i, j];
    }
    return null;
  }

}

module.exports = Computer;
