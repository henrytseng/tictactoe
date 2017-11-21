'use strict';

const _stdout = process.stdout;

class Board {

  constructor() {
    this._turn = 0;
    this._verbose = false;
  }

  /**
   * Get size of board
   */
  size() {
    return 3;
  }

  /**
   * Make a move
   *
   * @param  {Number} i      An integer, x-coofd board position
   * @param  {Number} j      An integer, y-coord board position
   * @param  {String} player A player marker, X or O
   * @return {Board}         Instance, chainable
   */
  place(i, j, player) {
    if(this.isAvailable(i, j)) {
      this._turn++;
      this._state[i][j] = player;

    } else {
      throw(new Error(`Invalid move (${i}, ${j})`));
    }
    return this;
  }

  /**
   * Get an array of available positions
   *
   * @return {Array} A list of position
   */
  getAvailable() {
    let list = [];
    let i, j;
    for(i=0; i<this.size(); i++) {
      for(j=0; j<this.size(); j++) {
        if(this.isAvailable(i, j)) {
          list.push([i, j]);
        }
      }
    }
    return list;
  }

  /**
   * Check whether or not position is available
   *
   * @param  {Number}  i An integer, x-coofd board position
   * @param  {Number}  j An integer, y-coord board position
   * @return {Boolean}   True if position is available
   */
  isAvailable(i, j) {
    return this._state[i][j] == null;
  }

  /**
   * Check if board is full
   *
   * @return {Boolean} True if board has no available positions
   */
  isFull() {
    for(var i=0; i<this.size(); i++) {
      for(var j=0; j<this.size(); j++) {
        if(this.isAvailable(i, j)) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Set the state of the board
   *
   * @param {Object} state An Array of Arrays - 2D board
   */
  setState(state) {
    this._state = state;
    return this;
  }

  /**
   * Active check for winner of the game
   *
   * @return {String} X or O, depending on player that has won, default null
   */
  getWinner() {
    let i, j, k;
    let value;
    let checklist = [];
    let winner;

    let isSame = function(list) {
      return list.reduce((a, e) => {
        if(a == null) return a;
        return a == e ? e : null;
      });
    };

    // Verticals
    for(i=0; i<this.size(); i++) {
      for(j=0; j<this.size(); j++) {
        checklist[j] = checklist[j] || [];
        checklist[j].push(this._state[i][j]);
      }
    }

    // Horizontals
    checklist = checklist.concat(this._state);

    // Check diagnol
    let diagnol = [];
    for(j=0; j<this.size(); j++) {
      diagnol.push(this._state[j][j]);
    }
    checklist.push(diagnol);
    diagnol = [];
    for(j=0; j<this.size(); j++) {
      diagnol.push(this._state[this.size() - j - 1][j]);
    }
    checklist.push(diagnol);

    // Check
    for(j=0; j<checklist.length; j++) {
      winner = isSame(checklist[j]);
      if(winner) return winner;
    }

    return null;
  }

  /**
   * Display simple debugging board on one line
   *
   * @return {Board} Instance, chainable
   */
  displaySimple() {
    let charList = this.simplify();
    _stdout.write(`${this._turn} ${charList}`);
    _stdout.write("\n");
    return this;
  }

  /**
   * Display grid debugging board
   *
   * @return {Board} Instance, chainable
   */
  displayVerbose() {
    _stdout.write(`${this._turn}`);
    _stdout.write("\n");
    for(var j=0; j<this.size(); j++) {
      let _row = this._state[j].map(function(n) {
        return !n ? '-' : n;
      }).join('|');

      _stdout.write(`${_row}`);
      _stdout.write("\n");
    }
    return this;
  }

  /**
   * Display debugging
   *
   * @return {Board} Instance, chainable
   */
  display() {
    return (this._verbose) ? this.displayVerbose() : this.displaySimple();
  }

  /**
   * Flatten state to single Array
   *
   * @return {Array} List of position
   */
  flatten() {
    let list = this._state.reduce((a, e) => {
      a = a || [];
      return a.concat(e);
    });
    return list;
  }

  /**
   * Get String of positions
   *
   * @return {String} X, O and - (dash) for empty position(s)
   */
  simplify() {
    return this.flatten().map((i) => (i == null) ? "-" : i).join('');
  }

  /**
   * Clear board and reset state
   *
   * @return {Board} Instance, chainable
   */
  reset() {
    console.log('Starting new game');
    let i, j;

    this._state = [];
    for(i=0; i<this.size(); i++) {
      this._state[i] = [];
      for(j=0; j<this.size(); j++) {
        this._state[i][j] = null;
      }
    }
    this._turn = 0;
    return this;
  }
}

module.exports = Board;
