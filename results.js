'use strict';

var chalk = require('chalk');

//NOTE this workaround is necessary, see issue:
//https://github.com/sindresorhus/supports-color/issues/13
//TODO @bguiz remove workaround when issue has been resolved
if ('SUPPORTS_COLOR' in process.env) {
  chalk.enabled = function() { return true; };
}

var resultTypes = {
  success: {
    name: 'success',
    symbol: chalk.green('✓'),
  },
  skipped: {
    name: 'skipped',
    symbol: chalk.yellow('-'),
  },
  failure: {
    name: 'failure',
    symbol: chalk.red('✗'),
  },
};

// console.log(resultTypes);

module.exports = {
  types: resultTypes,
};
