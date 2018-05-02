'use strict'

const gulp = require('gulp')
const gutil = require('gulp-util')

const browserify = require('browserify')
const watchify = require('watchify')
const babelify = require('babelify')
const source = require('vinyl-source-stream')

const browserSync = require('browser-sync').create()
const merge = require('merge-stream')

let bundler = browserify([
  './js/main.js'
])

let bundle = () => {
  return bundler
  .transform(babelify, {presets: ['es2015']})
  .bundle()
  .on('error', gutil.log)
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('.tmp/js/'))
  .pipe(browserSync.stream({once: true}))
}

gulp.task('browserify', bundle)

// 3rd party libs that don't play nice with browserify
gulp.task('libs', function () {
  var dir = './node_modules/phaser/build/'
  return gulp.src(['phaser.min.js', 'phaser.map'], { cwd: dir, base: dir})
    .pipe(gulp.dest('./.tmp/js/lib/'))
})

gulp.task('js', ['browserify', 'libs'])

// build

gulp.task('build', ['js'])

gulp.task('dist', ['build'], function () {
  var rawFiles = gulp.src([
    'index.html',
    'assets/**/*'
  ], { cwd: './', base: './' })
    .pipe(gulp.dest('./dist/'))

  var builtFiles = gulp.src(['js/**/*'], { cwd: '.tmp', base: '.tmp' })
    .pipe(gulp.dest('./dist/'))

  return merge(rawFiles, builtFiles)
})

gulp.task('watch', function () {
  bundler = watchify(bundler, watchify.args)
  bundler.on('update', bundle)
})

gulp.task('run', ['watch', 'build'], function () {
  browserSync.init({
    server: ['./', '.tmp']
  })

  gulp.watch('**/*.{html,css}').on('change', browserSync.reload)
})

gulp.task('default', ['dist'])
