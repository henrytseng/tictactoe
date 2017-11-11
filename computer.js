'use strict';

class Computer {

  setBoard(board) {
    this._board = board;
    return this;
  }

  makeMove(i, j) {
    if(!this._board.isFull()) {

      if(this._board.isAvailable(i, j)) {
        this._board.place(i, j, 'O');
      }

    } else {
      throw(new Error('Unable to make move.'));
    }

    return this;
  }

  findBestMove() {
    let i, j;
    for(i=0; i<this._board.size(); i++) {
      for(j=0; j<this._board.size(); j++) {
        if (this._board.isAvailable(i, j)) {
          return [i, j];
        }
      }
    }
    return null;
  }

}

module.exports = Computer;
