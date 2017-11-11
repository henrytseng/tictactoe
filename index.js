'use strict';

const Game = require('./game');

// Initialize data Object
var _game = new Game();
var i;

// Use this to use user input
var _getUserInput = function() {
  const readlineSync = require('readline-sync');
  var n = readlineSync.question("Move: ");
  let i, j;
  j = (n - 1) % _game.size();
  i = Math.ceil(n / _game.size()) - 1;
  return [i, j];
};

// Run game loop
for(;;) {
  _game.step();
}
