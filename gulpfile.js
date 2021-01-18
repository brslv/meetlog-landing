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

function clientJs() {
  return src("./src/client.js")
    .pipe(dest("./public/js"));
}

module.exports = {
  cssbuild: task("cssbuild", series(clean, css)),
  css: task("css", () => watch(["./src/**/*.scss"], series(clean, css))),
  clientjsbuild: task("clientjsbuild", series(clientJs)),
  clientjs: task("clientjs", () => watch(["./src/client.js"], series(clientJs))),
};
