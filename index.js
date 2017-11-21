'use strict';

/**
 * Module dependencies
 */
const config = require(process.cwd()+'/config')();
const async = require('async');
const glob = require('glob');
const mongoose = require('mongoose');

// Initialize connection
mongoose.connect(config.database['mongodb.app'], { useMongoClient: true });
mongoose.Promise = global.Promise;

const Game = require('./lib/game');

// Initialize game
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
_game.start();
async.whilst(() => true, (next) => {
  process.nextTick(() => {
    _game.step(next);
  });
});
