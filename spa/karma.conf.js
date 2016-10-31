// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'angular-cli'],
    plugins: [
        require("karma-phantomjs-launcher"),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-remap-istanbul'),
      require('angular-cli/plugins/karma'),
        require("karma-mocha-reporter")
    ],
    files: [
      { pattern: './src/test.ts', watched: false }
    ],
    preprocessors: {
      './src/test.ts': ['angular-cli']
    },
    remapIstanbulReporter: {
      reports: {
        html: 'coverage',
        lcovonly: './coverage/coverage.lcov'
      }
    },
    angularCli: {
      config: './angular-cli.json',
      environment: 'dev'
    },
    reporters: ["mocha"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DISABLE,
    autoWatch: true,
    browsers: ['Chrome', "PhantomJS"],
    singleRun: false,
    phantomjsLauncher: {
      exitOnResourceError: true
    },
    mochaReporter: {
      showDiff: true,
      divider: "="
    }
  });
};
