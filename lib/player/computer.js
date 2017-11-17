'use strict';

const Round = require('../models/round');

class Computer {

  setBoard(board) {
    this._board = board;
    return this;
  }

  makeRandomMove(callback) {
    callback(null, this.findRandom());
  }

  makeSmartMove(callback) {

  }

  findRandom() {
    let i, j;
    let list = this._board.getAvailable();
    return list[Math.floor(Math.random() * list.length)];
  }

}

module.exports = Computer;
