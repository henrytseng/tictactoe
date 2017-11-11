'use strict';

const Board = require('./board');
const Computer = require('./computer');

class Game {

  constructor() {
    this._board = (new Board()).reset();
    this._computer = (new Computer()).setBoard(this._board);
  }

  size() {
    return this._board.size();
  }

  step(getPlayerMove) {
    const _self = this;

    this._board.display();

    try {
      getPlayerMove(function(i, j) {
        _self._board.place(i, j, 'X');
      });
    } catch(e) {
      console.error(e.message);
      return;
    }

    if(this.isEndGame()) return;

    // var moveList = this._computer.findBestMove();
    // if(moveList) {
    //   this._computer.makeMove(moveList[0], moveList[1]);
    //   this._board.display();
    // }
  }

  isEndGame() {
    let winner = this._board.getWinner();
    if(winner) {
      this._board.display().reset();
      console.log(`Winner is ${winner}.`);
      return true;

    } else if(this._board.isFull()) {
      this._board.display().reset();
      console.log(`Draw.`);
      return true;
    }

    return false;
  }
}

module.exports = Game;