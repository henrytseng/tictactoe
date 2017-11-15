'use strict';

const async = require('async');
const Game = require('./game');

// Initialize data Object
var _game = new Game();
var i;

// Use this to use user input
var _getUserMove = function(callback) {
  const readlineSync = require('readline-sync');
  var n = readlineSync.question("Move: ");
  let i, j;
  j = (n - 1) % _game.size();
  i = Math.ceil(n / _game.size()) - 1;
  return callback(null, [i, j]);
};

// Run game loop
async.whilst(() => true, (next) => {
  process.nextTick(() => {
    _game.step(next);
  });
});
