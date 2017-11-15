'use strict';

/**
 * Module dependencies
 */
const mongoose = require('mongoose');

var Round = mongoose.model('Round', {
  sequence: [String],

  winner: String,

  isDraw: Boolean,

  board: {
    size: Number
  },

  updatedAt: { type: Date, default: Date.now },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = Round;
