'use strict';

console.log('defining: Round');

/**
 * Module dependencies
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const _schema = new Schema({
  initiatedBy: {
    state: String,
    move: {
      player: String,
      i: Number,
      j: Number
    }
  },

  state: String,

  move: {
    player: String,
    i: Number,
    j: Number
  },

  sequence: [String],

  gameId: Schema.ObjectId,

  winner: String,

  isDraw: Boolean,

  board: {
    size: Number
  },

  updatedAt: { type: Date, default: Date.now },

  createdAt: { type: Date, default: Date.now }
});

// Indexes
_schema.index({ sequence: 1 });
_schema.index({ 'initiatedBy.state': 1, 'winner': 1 });

const Round = mongoose.model('Round', _schema);

module.exports = Round;
