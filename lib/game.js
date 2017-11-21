'use strict';

/**
 * Module dependencies
 */
const async = require('async');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Board = require(process.cwd()+'/lib/board');
const Human = require(process.cwd()+'/lib/player/human');
const BadComputer = require(process.cwd()+'/lib/player/bad-computer');
const MimicComputer = require(process.cwd()+'/lib/player/mimic-computer');
const Round = require(process.cwd()+'/lib/round');

class Game {

  constructor() {
    this._board = new Board();
    this.player1 = new BadComputer();
    this.player2 = new BadComputer();
  }

  verbose() {
    this._board._verbose = true;
  }

  /**
   * Set player as token
   */
  setPlayer(token, kind) {
    console.log(`Setting ${token}: ${kind}`);
    let refMap = {
      'bad': BadComputer,
      'mimic': MimicComputer,
      'human': Human
    };
    if(['x', 'X'].indexOf(token) != -1) {
      this.player1 = new refMap[kind]();
    } else if(['o', 'O'].indexOf(token) != -1) {
      this.player2 = new refMap[kind]();
    }
  }

  /**
   * Set board size
   */
  setBoardSize(n) {
    this._board._size = n;
  }

  /**
   * Get size of board
   */
  size() {
    return this._board.size();
  }

  /**
   * Initialize
   */
  start() {
    this.reset();
  }

  /**
   * Reset state of game
   */
  reset() {
    this._gameId = ObjectId();
    this.player1.setBoard(this._board).setToken('X');
    this.player2.setBoard(this._board).setToken('O');
    this._sequence = [];
    this._turn = 'X';
    this._winner = null;
    this._isDraw = false;
    this._board.reset();
  }

  /**
   * Iterate 1 round - each player takes a turn
   *
   * @param  {Function} callback A function(err) called when game ending process completed
   */
  step(callback) {
    let _self = this;

    async.mapSeries([
      this.player1,
      this.player2,
    ], (player, next) => {
      try {
        player.makeMove((err, coord) => {
          _self._board.place(coord[0], coord[1], this._turn);
          _self._sequence.push({
            state: _self._board.simplify(),
            move: {
              player: _self._turn,
              i: coord[0],
              j: coord[1]
            }
          });
          if(_self.isEndGame()) {
            return _self.end(next);
          }

          // Next turn
          _self._turn = (_self._turn == 'X') ? 'O' : 'X';

          _self._board.display();
          next();
        });
      } catch(e) {
        console.error(e);
        return;
      }
    }, callback);
  }

  /**
   * End game
   *
   * @param  {Function} callback A function(err) called when game ending process completed
   */
  end(callback) {
    let _self = this;
    this._board.display();
    if(this._winner) {
      console.log(`Winner is ${this._winner}.`);
    } else if(this._isDraw) {
      console.log(`Draw.`);
    }

    let roundSequences = []
    this._sequence.map((item, i, list) => {

      // Enemy initiated move
      let _initiatedBy = (i-1) > 0 ? list[i-1] : null;
      roundSequences.push(new Round({
        initiatedBy: _initiatedBy,
        state: item.state,
        move: item.move,
        sequence: _self._sequence.map((item) => item.state),
        gameId: _self._gameId,
        winner: _self._winner,
        isDraw: _self._isDraw,
        board: {size: _self._board.size()}
      }));
    });

    this.reset();
    Round.collection.insert(roundSequences, callback);
  }

  /**
   * Check game has ended
   *
   * @return {Boolean} True if game state should end
   */
  isEndGame() {
    let winner = this._board.getWinner();
    if(winner) {
      this._winner = winner;
      this._isDraw = false;
      return true;

    } else if(this._board.isFull()) {
      this._isDraw = true;
      return true;
    }

    return false;
  }
}

module.exports = Game;
