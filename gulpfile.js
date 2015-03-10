/**
* Gulp
* tasks:
* gulp (default) reloads files into index and watches for updates
* production - prepare the files for production environment and start production server.
* test - run the unit tests once
* tdd - run continuing tests that watches for updates
*/

// Dependencies
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var gulp = require('gulp');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require("gulp-rename");
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

//Configuration files
var configDev = require('./public/config/env/development.js');
var configProd = require('./public/config/env/production.js');

var reload = browserSync.reload;
var karma = require('karma').server;

//Environment configuration
var basePath = './public';
var distIndex = basePath + '/dist/';

var paths = {
  dev : {
    config : configDev.assets.config,
    modules : configDev.assets.js,
    html : {
      index : basePath + '/templates/index.html',
      modules : configDev.assets.html
    },
    css : {
      assets : configDev.assets.css,
      directory : basePath + '/styles/css'
    },
    fonts : {
      assets : configDev.assets.fonts,
      directory : basePath + '/styles/fonts'
    },
    images : {
      assets : configDev.assets.images,
      directory : basePath + '/styles/images'
    },
    sass : {
      assets : {
        files : 'public/styles/sass/**/*.{scss,sass}',
        main : basePath + '/styles/sass/main.scss'
      }
    },
    libs : {
      internal : {
        js : configDev.assets.libs.internal.js,
        css : configDev.assets.libs.internal.css
      },
      external : {
        js : configDev.assets.libs.external
      }
    }

  },
  production : {
    directory : basePath + '/dist/',
    app : {
      js : configProd.assets.js
    },
    css : {
      assets : configProd.assets.css,
      directory : distIndex + 'styles/css/'
    },
    libs : {
      internal : {
        js : configProd.assets.libs.internal.js,
        css : configProd.assets.libs.internal.css
      },
      external : {
        js : configProd.assets.libs.external
      }
    }
  }
};


//Add default tasks
gulp.task('default', ['insertAngularPlusExtLibFilesDev', 'watch', 'start']);
gulp.task('production', ['build', 'preapareDistribution', 'insertAngularPlusExtLibFilesProd', 'startProduction']);
gulp.task('preapareDistribution', ['moveAssets', 'moveHtmlFiles', 'moveFontsNdImages']);


//Task to run jshint for the js files
gulp.task('jshint', function() {
  return gulp.src(paths.dev.modules)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//Update the files on the public folder when it's changes
var fastReload = function fastReload(event){
  insertAngularPlusExtLibFilesDev();
  reload();
};


gulp.task('watch', function() {
  //livereload.listen({ basePath: basePath});
  gulp.watch(paths.dev.sass.assets.files, ['sass', fastReload]);
  gulp.watch(paths.dev.modules, fastReload);
  gulp.watch(paths.dev.html.modules, fastReload);
});

gulp.task('moveAssets', function() {

  // Moving library css and js files
  var prodLibsJsNdCss = paths.production.libs.internal.js.concat(paths.production.libs.internal.css);
  gulp.src(prodLibsJsNdCss, {base: './public'})
    .pipe(gulp.dest(distIndex));
});

gulp.task('moveHtmlFiles', function() {
  gulp.src(paths.dev.html.modules, {base: './public'})
    .pipe(gulp.dest(distIndex));
});

// Move fonts and images from dev to dist
gulp.task('moveFontsNdImages', function() {
  var fontsNdImages = paths.dev.images.assets.concat(paths.dev.fonts.assets);

  gulp.src(fontsNdImages, {base: './public'})
    .pipe(gulp.dest(distIndex));
});

//Build all the JS files and merge it in a distribution file
gulp.task('build', function() {
  var configPlusModules = paths.dev.config.concat(paths.dev.modules);

  gulp.src(configPlusModules)
    .pipe(concat('application.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest(paths.production.directory));

  gulp.src(paths.dev.css.assets)
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.production.css.directory));
});

//Start the server for Development environment
gulp.task('start', function() {
  connect.server({
    root : 'public/',
    livereload : true
  });
});

//Start the server for Production environment
gulp.task('startProduction', function() {
  connect.server({
    root : 'public/dist/',
    livereload : false
  });
});


// compile sass into main.css
gulp.task('sass', function () {
    gulp.src(paths.dev.sass.assets.main)
        .pipe(sass({
          outputStyle : 'nested',
          precision : 10,
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions','ie 9']
        }))
        .pipe(gulp.dest(paths.dev.css.directory));
});


// Dev env - add angular files and lib files to index.html
var insertAngularPlusExtLibFilesDev = function insertAngularPlusExtLibFilesDev() {
  gulp.src(paths.dev.html.index)
    .pipe(inject(gulp.src(paths.dev.config, {read: false}), {name: 'config', ignorePath : '/public'}))
    .pipe(inject(gulp.src(paths.dev.modules, {read: false}),{name : 'angularFiles', ignorePath : '/public'}))
    .pipe(inject(gulp.src(paths.dev.libs.internal.js, {read: false}), {name: 'internalLibs', ignorePath : '/public'}))
    .pipe(inject(gulp.src(paths.dev.libs.internal.css, {read: false}), {name: 'internalLibsCss', ignorePath : '/public'}))
    // .pipe(inject(gulp.src(paths.dev.libs.external.js, {read: false}), {name: 'externalLibs'}))
    .pipe(inject(gulp.src(paths.dev.css.assets, {read: false}), {name: 'cssFiles', ignorePath : '/public'}))
    .pipe(gulp.dest(basePath))
    .pipe(livereload());
};
gulp.task('insertAngularPlusExtLibFilesDev', insertAngularPlusExtLibFilesDev);

// Production env - add angular files and lib files to index.html
gulp.task('insertAngularPlusExtLibFilesProd', function() {
  gulp.src(paths.dev.html.index)
    .pipe(inject(gulp.src(paths.production.app.js, {read: false}), {name: 'angularFiles', ignorePath : '/public/dist/'}))
    .pipe(inject(gulp.src(paths.production.libs.internal.js, {read: false}), {name: 'internalLibs', ignorePath : '/public'}))
    .pipe(inject(gulp.src(paths.production.libs.internal.css, {read: false}), {name: 'internalLibsCss', ignorePath : '/public'}))
    // .pipe(inject(gulp.src(paths.production.libs.external.js, {read: false}), {name: 'externalLibs'}))
    .pipe(inject(gulp.src(paths.production.css.assets, {read: false}), {name: 'cssFiles', ignorePath : '/public/dist'}))
    .pipe(gulp.dest(distIndex));
});


// KARMA TESTS //
/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});



