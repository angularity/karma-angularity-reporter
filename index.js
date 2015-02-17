'use strict';

var generate = require('./generate');
var results = require('./results');

var AngularityReporter = function KarmaAngularityReporter(config, baseReporterDecorator) {
  baseReporterDecorator(this);

  var allMessages = [];
  var allResults = [];
  var numTotal = 0;
  var numSuccess = 0;
  var numSkipped = 0;
  var numFailure = 0;

  function defaultAdapter(msg) {
    allMessages.push(msg);
  };

  function onRunStart(browsers) {
    //TODO
  }

  function onRunComplete() {
    if (numFailure > 0) {
      process.stdout.write(bannerStart + '\n');
    }
    generate.report(allResults);
    // process.stdout.write( + '\n');
    process.stdout.write('Karma tests: ' + numSuccess + '/' + numTotal +
      (numSkipped === 0 ? '' : ' (' + numSkipped + ' skipped)') + '\n');
    if (numFailure > 0) {
      process.stdout.write(bannerStop + '\n');
    }
  }

  function onBrowserStart(browser) {
    //TODO
  }

  function onBrowserComplete(browser) {
    //TODO
  }

  function specSuccess(browser, result) {
    ++numTotal;
    ++numSuccess;
    allResults.push({
      type: results.types.success.name,
      browser: browser,
      result: result,
    });
  }

  function specSkipped(browser, result) {
    ++numTotal;
    ++numSkipped;
    allResults.push({
      type: results.types.skipped.name,
      browser: browser,
      result: result,
    });
  }

  function specFailure(browser, result) {
    ++numTotal;
    ++numFailure;
    allResults.push({
      type: results.types.failure.name,
      browser: browser,
      result: result,
    });
  }

  function onExit(done) {
    //TODO
    done();
  }

  this.adapters = [defaultAdapter];
  this.onRunStart = onRunStart;
  this.onRunComplete = onRunComplete;
  this.onBrowserStart = onBrowserStart;
  this.onBrowserComplete = onBrowserComplete;
  this.specSuccess = specSuccess;
  this.specSkipped = specSkipped;
  this.specFailure = specFailure;
  this.onExit = onExit;

  var bannerWidth = Number(config.bannerWidth) || 80;
  var hr    = new Array(bannerWidth + 1);
  var bannerStart = (hr.join('\u25BC') + '\n');
  var bannerStop = (hr.join('\u25B2') + '\n');
}
AngularityReporter.$inject = ['config', 'baseReporterDecorator'];

module.exports = {
  'reporter:angularity': ['type', AngularityReporter],
};
