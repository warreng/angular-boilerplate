'use strict';

module.exports = {
  assets : {
    libs : {
      internal : {
          js : [
            'public/lib/angular/angular.min.js',
            'public/lib/angular/angular.min.js.map',
            'public/lib/angular-resource/angular-resource.min.js',
            'public/lib/angular-resource/angular-resource.min.js.map',
            'public/lib/angular-animate/angular-animate.min.js',
            'public/lib/angular-animate/angular-animate.min.js.map',
            'public/lib/angular-ui-router/release/angular-ui-router.min.js',
            'public/lib/angular-ui-utils/ui-utils.min.js',
            'public/lib/angular-sanitize/angular-sanitize.min.js',
            'public/lib/angular-sanitize/angular-sanitize.min.js.map',
            'public/lib/lodash/dist/lodash.min.js'
          ],
          css : [
          ]
      },
      external : [
      ]
    },
    js : [
      'public/dist/application.min.js'
    ],
    css : [
      'public/dist/styles/css/main.min.css'
    ]
  }
};