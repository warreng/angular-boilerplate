'use strict';

module.exports = {
  assets : {
    libs : {
      internal :  {
        js : [
        'public/lib/angular/angular.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-sanitize/angular-sanitize.js',
        'public/lib/lodash/dist/lodash.js'
        ],
        css : [
        ]
      },
      external : [
      ]
    },
    js : [
      'public/modules/*[!e2etests]*/*.js', // all module js files expect e2e and unit tests
      'public/modules/*[!e2etests]*/*[!tests]*/*.js'
    ],
    html : [
      'public/modules/*[!e2etests]*/*.html', // all module js files expect e2e and unit tests
      'public/modules/*[!e2etests]*/*[!tests]*/*.html'
    ],
    css : [
      'public/styles/css/main.css'
    ],
    fonts : [
      'public/styles/fonts/**'
    ],
    images : [
      'public/styles/images/**'
    ],
    config : [
      'public/config.js',
      'public/application.js'
    ],
    tests : [
      'public/lib/angular-mocks/angular-mocks.js',
      'public/modules/*/tests/*.js'
    ]
  }
};