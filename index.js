'use strict';

/**
 * Module dependencies
 */
const Argr = require('argr');
const config = require(process.cwd()+'/config')();
const path = require('path');
const async = require('async');
const glob = require('glob');
const mongoose = require('mongoose');

// Initialize connection
mongoose.connect(config.database['mongodb.app'], { useMongoClient: true });
mongoose.Promise = global.Promise;

const Game = require(process.cwd()+'/lib/game');

// Initialize game
var _game = new Game();
var i;

var argr = Argr()
  .option(['x', 'player1'], 'Player 1, X player (human, bad, mimic)', 'bad')
  .option(['o', 'player2'], 'Player 2, O player (human, bad, mimic)', 'bad')
  .option(['b', 'board-size'], 'Game board size, (n x n)', 3)
  .option(['v', 'verbose'], 'Verbose debugging mode', false)
  .option(['h', '?', 'help'], 'Display help')
  .useStrict(true)
  .init(process.argv);

// Display help
if(argr.get('h')) {
  console.log('Usage: '+argr.command().split(path.sep).pop());

  // Build options
  var maxLine = '';
  var i;
  var line;
  var instructions = [];
  argr.options().forEach(function(option) {
    var params = option.param.slice(0).map(function(p) {
      return (p.length === 1) ? '-'+p : '--'+p;
    });

    line = params.join(', ');
    if(line.length > maxLine.length) maxLine = line;
    instructions.push(line);
  });

  // Add descriptions
  argr.options().forEach(function(option, i) {
    var blanks = Array((maxLine.length + 3) - instructions[i].length).join(' ');
    line = ' ' + instructions[i] + blanks + option.description;
    instructions[i] = line;
  });
  console.log(instructions.join("\n"));
  process.exit(1);
}

// Set players
['x', 'o'].forEach((token) => {
  _game.setPlayer(token, argr.get(token));
});

// Set game board size
if(argr.get('b')) _game.setBoardSize(argr.get('b'))

// Debugging
if(argr.get('v')) _game.verbose();

// Run game loop
_game.start();
async.whilst(() => true, (next) => {
  process.nextTick(() => {
    _game.step(next);
  });
});
