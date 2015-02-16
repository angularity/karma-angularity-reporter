'use strict';

function AngularityReporter(config, baseReporterDecorator) {
  baseReporterDecorator(this);

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
      console.log(bannerStart);
    }
    //TODO @bguiz output each of the failing tests
    console.log('Karam tests: ' + numSuccess + '/' + numTotal +
      (numSkipped === 0 ? '' : '(' + numSkipped + ' skipped)'));
    if (numFailure > 0) {
      console.log(bannerStop);
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
      type: ResultTypes.success.name,
      browser: browser,
      result: result,
    });
  }

  function specSkipped(browser, result) {
    ++numTotal;
    ++numSkipped;
    allResults.push({
      type: ResultTypes.skipped.name,
      browser: browser,
      result: result,
    });
  }

  function specFailure(browser, result) {
    ++numTotal;
    ++numFailure;
    allResults.push({
      type: ResultTypes.failure.name,
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
  process.stdout.write(start + '\n' + report + '\n\n' + stop);
}
AngularityReporter.$inject = ['config', 'baseReporterDecorator'];

var ResultTypes = {
  success: {
    name: 'success',
    symbol: '✓',
  },
  skipped: {
    name: 'skipped',
    symbol: '✗',
  },
  failure: {
    name: 'failure',
    symbol: '-',
  },
};



module.exports = {
  'reporter:angularity': ['type', AngularityReporter],
};
