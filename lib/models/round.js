'use strict';

/**
 * Module dependencies
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const _schema = new Schema({
  previous: {
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

  next: {
    state: String,
    move: {
      player: String,
      i: Number,
      j: Number
    }
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

const Round = mongoose.model('Round', _schema);

module.exports = Round;
