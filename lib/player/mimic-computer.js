'use strict';

const Round = require(process.cwd()+'/lib/models/round');
const AbstractPlayer = require(process.cwd()+'/lib/player/abstract');

class MimicComputer extends AbstractPlayer {

  makeMove(callback) {
    callback(null, this.findRandom());
  }

  findRandom() {
    let i, j;
    let list = this._board.getAvailable();
    return list[Math.floor(Math.random() * list.length)];
  }

}

module.exports = MimicComputer;
