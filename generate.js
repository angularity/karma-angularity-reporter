'use strict';

var chalk = require('chalk');

var results = require('./results');

function generateKarmaReport(options) {
  var allResults = options.results;
  var counts = options.counts;
  var displayBanners = (counts.failure > 0 || counts.skipped);
  var stack = [];

  if (displayBanners) {
    process.stdout.write(bannerStart + '\n');
  }
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
        stack[idx] = suiteLoc;
        process.stdout.write(chalk.blue(suiteLoc) + '\n');
      }
      else {
        if (suite.length > stack.length) {
          stack.push(suiteLoc);
          process.stdout.write(chalk.blue(suiteLoc) + '\n');
        }
      }
    });

    //write result line
    process.stdout.write(
      results.types[info.type].symbol + ' ' +
      info.result.description + '\n');

  });
  process.stdout.write('Karma tests: ' + counts.success + '/' + counts.total +
    (counts.skipped === 0 ? '' : ' (' + counts.skipped + ' skipped)') + '\n');
  if (displayBanners > 0) {
    process.stdout.write(bannerStop + '\n');
  }
}

//NOTE we default to a banner width of 80,
//If it becomes a requirement, pass this in via a cofniguration object
var bannerWidth = 80;
var hr    = new Array(bannerWidth + 1);
var bannerStart = (hr.join('\u25BC') + '\n');
var bannerStop = (hr.join('\u25B2') + '\n');

module.exports = {
  report: generateKarmaReport,
};
