// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./public/modules/e2etests/**/*spec.js'],
  suites: {
    login: './public/modules/e2etests/page-tests/login-page/**/*.spec.js'

  },
  capabilities: {
    browserName: 'chrome',
    'chromeOptions': {'args': ['--disable-extensions']}
  },
  onPrepare: function() {
    // Override the timeout for webdriver.
    browser.driver.manage().timeouts().setScriptTimeout(60000);
  },
  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: true,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 60000
  },
  baseUrl: 'http://localhost:8080/' // test port
}