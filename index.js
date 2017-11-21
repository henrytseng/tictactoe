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

// Run game loop
_game.start();
async.whilst(() => true, (next) => {
  process.nextTick(() => {
    _game.step(next);
  });
});
