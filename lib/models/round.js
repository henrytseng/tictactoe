'use strict';

/**
 * Module dependencies
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const _schema = new Schema({
  previousPosition: String,

  position: String,

  nextPosition: String,

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
