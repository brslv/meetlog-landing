const { parallel, series, watch, src, dest, task } = require('gulp')
const sass = require('gulp-sass')
const del = require('del')
const cssPath = './public/css'
const clientJsPath = './public/js'
const imagesPath = './public/images'

function clean(path) {
  return function cleanGivenPath(cb) {
    return del([path], cb)
  }
}

function css() {
  return src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(cssPath))
}

function images() {
  return src('./src/images/**').pipe(dest(imagesPath))
}

function clientJs() {
  return src('./src/js/**/*.js')
    .pipe(dest(clientJsPath))
}

const tasks = {
  // dev/watch tasks
  css: task('css', () => watch(['./src/**/*.scss'], series(clean(cssPath), css))),
  clientJs: task('clientJs', () => watch(['./src/js/**/*.js'], series(clean(clientJsPath), clientJs))),
  images: task('images', () => watch(['./src/images/**']), series(clean(imagesPath), images)),

  // runs a parallel task with all the above
  watch: task('watch', parallel('css', 'clientJs', 'images')),

  // THE build task
  build: task('build', series(
    clean(cssPath),
    css,
    clean(clientJsPath),
    clientJs,
    clean(imagesPath),
    images,
  )),
}

module.exports = tasks
