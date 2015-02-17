'use strict';

var results = require('./results');
var generate = require('./generate');

var AngularityReporter = function KarmaAngularityReporter(config, baseReporterDecorator) {
  baseReporterDecorator(this);

  var allMessages = [];
  var allResults = [];
  var counts = {
    total: 0,
    success: 0,
    skipped: 0,
    failure: 0,
  };

  function defaultAdapter(msg) {
    allMessages.push(msg);
  };

  function onRunStart(browsers) {
  }

  function onRunComplete() {
    generate.report({
      results: allResults,
      counts: counts,
    });
  }

  function onBrowserStart(browser) {
  }

  function onBrowserComplete(browser) {
  }

  function specSuccess(browser, result) {
    ++counts.total;
    ++counts.success;
    allResults.push({
      type: results.types.success.name,
      browser: browser,
      result: result,
    });
  }

  function specSkipped(browser, result) {
    ++counts.total;
    ++counts.skipped;
    allResults.push({
      type: results.types.skipped.name,
      browser: browser,
      result: result,
    });
  }

  function specFailure(browser, result) {
    ++counts.total;
    ++counts.failure;
    allResults.push({
      type: results.types.failure.name,
      browser: browser,
      result: result,
    });
  }

  function onExit(done) {
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
}
AngularityReporter.$inject = ['config', 'baseReporterDecorator'];

module.exports = {
  'reporter:angularity': ['type', AngularityReporter],
};
