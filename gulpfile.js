const { series, watch, src, dest, task } = require("gulp");
const sass = require("gulp-sass");
const del = require("del");

function clean(cb) {
  return del(["./public/css/**"], cb);
}

function css() {
  return src("./src/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./public/css"));
}

module.exports = {
  css: task("css", () => watch(["./src/**/*.scss"], series(clean, css))),
};
