'use strict';

/**
 * Module dependencies
 */
const async = require('async');
const Board = require('./board');
const Computer = require('./player/computer');
const Round = require('./models/round');

class Game {

  constructor() {
    this._board = (new Board());
    this._computer = (new Computer()).setBoard(this._board);
    this.reset();

    // Initialize with computer AI
    this.player1Move = function(callback) {
      callback(null, this._computer.findRandom());
    }.bind(this);
    this.player2Move = function(callback) {
      callback(null, this._computer.findRandom());
    }.bind(this);
  }

  size() {
    return this._board.size();
  }

  reset() {
    this._sequence = [];
    this._turn = 'X';
    this._winner = null;
    this._draw = false;
    this._board.reset();
  }

  step(callback) {
    let _self = this;

    async.mapSeries([
      this.player1Move,
      this.player2Move
    ], (getMove, next) => {
      try {
        _self._turn = (_self._turn == 'X') ? 'O' : 'X';
        getMove((err, coord) => {
          _self._board.place(coord[0], coord[1], this._turn);
          _self._sequence.push(_self._board.simplify());
          if(_self.isEndGame()) {
            return _self.end(next);
          }

          _self._board.display();
          next();
        });
      } catch(e) {
        console.error(e);
        return;
      }
    }, callback);
  }

  end(callback) {
    this._board.display();
    if(this._winner) {
      console.log(`Winner is ${this._winner}.`);
    } else if(this._isDraw) {
      console.log(`Draw.`);
    }

    let round = new Round({
      sequence: this._sequence,
      winner: this._winner,
      isDraw: this._isDraw,
      board: {size: this._board.size()}
    });

    this.reset();
    round.save(callback);
  }

  isEndGame() {
    let winner = this._board.getWinner();
    if(winner) {
      this._winner = winner;
      return true;

    } else if(this._board.isFull()) {
      this._isDraw = true;
      return true;
    }

    return false;
  }
}

module.exports = Game;
