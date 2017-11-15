'use strict';

const _stdout = process.stdout;

class Board {

  constructor() {
    this._turn = 0;
  }

  size() {
    return 3;
  }

  place(i, j, player) {
    if(this.isAvailable(i, j)) {
      this._turn++;
      this._state[i][j] = player;

    } else {
      throw(new Error(`Invalid move (${i}, ${j})`));
    }
    return this;
  }

  isAvailable(i, j) {
    return this._state[i][j] == null;
  }

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

  setState(state) {
    this._state = state;
    return this;
  }

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

  displaySimple() {
    let charList = this.flatten().map((i) => (i == null) ? "-" : i).join('');
    _stdout.write(`${this._turn} ${charList}`);
    _stdout.write("\n");
    return this;
  }

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

  display() {
    return this.displaySimple();
  }

  flatten() {
    let list = this._state.reduce((a, e) => {
      a = a || [];
      return a.concat(e);
    });
    return list;
  }

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
