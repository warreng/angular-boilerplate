'use strict';

var appName = 'demoApp';

angular
  .module(appName,
  [
    'ngResource',
    'ngAnimate',
    'ui.router',
    'ui.utils',
    'ngSanitize',

    'core'
  ]);