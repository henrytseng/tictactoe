'use strict';

const Game = require('./game');

// Initialize data Object
var _game = new Game();
var i;


for(;;) {

  _game.step(function(move) {
    const readlineSync = require('readline-sync');
    var n = readlineSync.question("Move: ");
    let i, j;
    i = (n - 1) % _game.size();
    j = Math.ceil(n / _game.size()) - 1;
    let list = [i, j];

    move(parseInt(list[1]), parseInt(list[0]));
  });

}
