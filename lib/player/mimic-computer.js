'use strict';

const Round = require(process.cwd()+'/lib/round');
const AbstractPlayer = require(process.cwd()+'/lib/player/abstract');
const BadComputer = require(process.cwd()+'/lib/player/bad-computer');

class MimicComputer extends BadComputer {

  makeMove(callback) {
    let _self = this;
    this.findBestMove((err, suggestedMove) => {
      if(err) return callback(err);
      callback(null, suggestedMove);
    });
  }

  /**
   * Find best possible move based off of game round history
   *
   * @param  {Function} callback [description]
   */
  findBestMove(callback) {
    let _state = this._board.simplify();
    let _player = this._turn;
    let _self = this;
    Round.aggregate(
      { $match: { 'initiatedBy.state': _state } },
      { $group: {
          _id: '$state',
          move: { $first: '$move' },
          'wins': { $sum: { $cond: [ { $eq: ["$winner", _player] }, 1, 0 ] } },
          'total': { $sum: 1 }
      } },
      { $project: {
        _id: 1,
        move: 1,
        wins: 1,
        total: 1,
        ratio: { $divide: [ "$wins", "$total" ] }
      } },
      { $sort: { total: -1 } },
      { $limit: 1 }
    ).exec((err, results) => {
      if(err) return callback(err);

      if(results && results.length) {
        // console.log('Making decision found move');
        callback(null, [results[0].move.i, results[0].move.j]);
      } else {
        // console.log('Making random move');
        callback(null, _self.findRandom());
      }
    });
  }

}

module.exports = MimicComputer;
