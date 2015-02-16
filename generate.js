'use strict';

 var results = require('./results');

function generateKarmaReport(allResults, options) {
  //DEBUG console.log(JSON.stringify(allResults, undefined, '  '));
  allResults.forEach(function(info, idx) {
    process.stdout.write(
        ' ' + results.types[info.type].symbol + ' ' +
        info.result.description + '\n');
  });
  return JSON.stringify(allResults, undefined, '  ');
}

module.exports = {
  report: generateKarmaReport,
};
