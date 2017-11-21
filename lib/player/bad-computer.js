'use strict';

const Round = require(process.cwd()+'/lib/round');
const AbstractPlayer = require(process.cwd()+'/lib/player/abstract');

class BadComputer extends AbstractPlayer {

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
