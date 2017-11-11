'use strict';

const Board = require('./board');
const Computer = require('./computer');

class Game {

  constructor() {
    this._board = (new Board()).reset();
    this._computer = (new Computer()).setBoard(this._board);

    // Initialize with computer AI
    this.getPlayer1 = function(move) {
      return this._computer.findRandom();
    };
    this.getPlayer2 = function(move) {
      return this._computer.findRandom();
    };
  }

  size() {
    return this._board.size();
  }

  step() {
    const _self = this;
    let list;

    // Player 1
    this._board.display();
    try {
      list = this.getPlayer1();
      _self._board.place(list[0], list[1], 'X');
      
    } catch(e) {
      console.error(e.message);
      return;
    }
    if(this.isEndGame()) return;

    // Player 2
    this._board.display();
    try {
      list = this.getPlayer2();
      _self._board.place(list[0], list[1], 'O');

    } catch(e) {
      console.error(e.message);
      return;
    }

    if(this.isEndGame()) return;
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