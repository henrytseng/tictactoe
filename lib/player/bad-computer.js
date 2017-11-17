'use strict';

const Round = require('../models/round');
const Player = require('./index');

class BadComputer extends Player {

  makeMove(callback) {
    callback(null, this.findRandom());
  }

  findRandom() {
    let i, j;
    let list = this._board.getAvailable();
    return list[Math.floor(Math.random() * list.length)];
  }

}

module.exports = BadComputer;
