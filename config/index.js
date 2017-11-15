'use strict';

/**
 * Module dependencies
 */

module.exports = function(env) {
  env = env || process.env.NODE_ENV || 'development';

  return {

    database: {
      'mongodb.app': 'mongodb://localhost:27017/tictactoe'
    }

  };
};
