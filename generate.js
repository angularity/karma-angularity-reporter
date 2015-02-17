'use strict';

 var results = require('./results');

function generateKarmaReport(allResults, options) {
  var stack = [];
  allResults.forEach(function(info, idx) {
    //inspect stack and write new line if changed
    var suite = info.result.suite;
    while (stack.length > suite.length) {
      stack.pop();
    }
    suite.forEach(function(suiteLoc, idx) {
      var stackLoc;
      if (idx < stack.length) {
        stackLoc = stack[idx];
        if (suiteLoc === stackLoc) {
          return;
        }
        process.stdout.write(suiteLoc + '\n');
        stack[idx] = suiteLoc;
      }
      else {
        if (suite.length > stack.length) {
          process.stdout.write(suiteLoc + '\n');
          stack.push(suiteLoc);
        }
      }
    });
    //write result line
    process.stdout.write(
        results.types[info.type].symbol + ' ' +
        info.result.description + '\n');
  });
  return JSON.stringify(allResults, undefined, '  ');
}

module.exports = {
  report: generateKarmaReport,
};
