const gulp = require("gulp");
const tslint = require("gulp-tslint");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const mocha = require('gulp-mocha');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const tsify = require("tsify");
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const print = require('gulp-print');

gulp.task('clean:transpiled', function () {
  return del([
    'out/**/*',
  ]);
});

gulp.task("transpile", ['clean:transpiled'], function () {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("out"));
});

gulp.task("lint", function () {
  return gulp.src('src/**')
    .pipe(tslint({
      formatter: "verbose"
    }))
    .pipe(tslint.report());
});

gulp.task('test', ['transpile'], function () {
  process.env.NODE_ENV = 'TEST';
  const mochaOptions = {
    timeout: 50000,
    // grep: ''
  }
  const testFiles = 'out/test/**/*.spec.js';
  const srcFiles = [
    'out/test/init.js',
    testFiles
  ];
  return gulp.src(srcFiles, { read: false })
    // .pipe(print())
    .pipe(mocha(mochaOptions))
    .on('error', function (error) {
      console.error(error);
    })
    .on('end', function () {
      console.log('Tests finished.');
    });
});

gulp.task("bundle:webapp", ['transpile'], function () {
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['out/web_client/app.js'],
    cache: {},
    packageCache: {}
  })
  .plugin(tsify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest("dist"));
});

gulp.task('start:server', ['transpile'], function () {
  const startServer = require('./out/server/startServer').default;
  console.log(startServer);
  return startServer();
});

gulp.task('db:seed', function () {
  const seed = require('./out/server/db/seed');
  return seed.seed();
});
