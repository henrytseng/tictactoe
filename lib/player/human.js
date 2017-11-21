'use strict';

const AbstractPlayer = require(process.cwd()+'/lib/player/abstract');

class Human extends AbstractPlayer {

  makeMove(callback) {
    const readlineSync = require('readline-sync');
    var n = readlineSync.question("Move: ");
    let i, j;
    j = (n - 1) % this._board.size();
    i = Math.ceil(n / this._board.size()) - 1;
    return callback(null, [i, j]);
  }

}

module.exports = Human;
