'use strict';

var resultTypes = {
  success: {
    name: 'success',
    symbol: '✓',
  },
  skipped: {
    name: 'skipped',
    symbol: '-',
  },
  failure: {
    name: 'failure',
    symbol: '✗',
  },
};

module.exports = {
  types: resultTypes,
};
