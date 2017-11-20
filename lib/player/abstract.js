'use strict';

class AbstractPlayer {

  setBoard(board) {
    this._board = board;
    return this;
  }

  setToken(token) {
    this._token = token;
    return this;
  }

}

module.exports = AbstractPlayer;
