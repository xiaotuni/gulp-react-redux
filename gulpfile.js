/*
*	Task Automation to make my life easier.
*	Author: Jean-Pierre Sierens
* http://jpsierens.com/tutorial-gulp-javascript-2015-react/
*	===========================================================================
*/

// declarations, dependencies
// ----------------------------------------------------------------------------
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');
var clean = require('gulp-clean');
var scssify = require('scssify')
var path = require('path');
var connect = require('gulp-connect');

var dependencies = [
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'react-router-redux',
  'redux',
  'redux-form',
  'redux-async-connect',
  'react-addons-css-transition-group'
];
// keep a count of the times a task refires
var scriptsCount = 0;

gulp.task('scripts', function () {
  bundleApp(false);
  console.log(new Date().toLocaleTimeString());
});

gulp.task('deploy', function () {
  bundleApp(true);
});

gulp.task('watch', function () {
  gulp.watch(['./src/**/*.js', './src/**/*.jsx', './src/**/*.scss', './src/**/*.css'], ['scripts']);
});


gulp.task('clean-dist', function () {
  return gulp.src('static/dist/')
    .pipe(clean({ force: true }));
});
// start 
gulp.task('start', function () {
  return connect.server({ root: 'static', livereload: true, port: 20000 });
});

gulp.task('default', ['clean-dist', 'scripts', 'watch', 'start']);

function bundleApp(isProduction) {
  scriptsCount++;
  var appBundler = browserify({
    entries: './src/client.js', extensions: ['', '.js', '.jsx', '.json', '.css', '.scss'],
    debug: true
  })

  if (!isProduction && scriptsCount === 1) {
    browserify({ require: dependencies, debug: true })
      .bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulp.dest('./static/dist/'));
  }
  if (!isProduction) {
    dependencies.forEach(function (dep) {
      appBundler.external(dep);
    })
  }

  appBundler
    //.transform("babelify", { presets: ["es2015", "react", 'stage-0'] })      这里的配置放到package里面去了。
    // -----https://github.com/cody-greene/scssify
    .transform("babelify", { "presets": ["es2015", "react", "stage-0"] })
    .transform("scssify", {
      "export": false,
      "sass": { "outputStyle": "compressed", "includePaths": ["node_modules", "bower_components"] },
      "postcss": { "autoprefixer": { "browsers": ["last 2 versions"] } }
    })
    .bundle()
    .on('error', gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./static/dist/'))
    // .pipe(new Promise(function (resolve) {
    //   console.log('重置打包完成...' + new Date().toLocaleString());
    //   resolve({});
    // }))
    .pipe(connect.reload());
}