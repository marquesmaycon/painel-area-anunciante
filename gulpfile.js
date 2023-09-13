const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require('sass'))
const browserSync = require("browser-sync").create()

function sassTask () {
   return src("./src/scss/style.scss", { sourcemaps: true })
      .pipe(sass())
      .pipe(dest("./dist/assets/css/", {sourcemaps: '.'}))
}

function browserSyncServer (callback) {
   browserSync.init({
      server: {
         baseDir: './dist'
      }
   })
   callback()
}

function browserSyncReload (callback) {
   browserSync.reload()
   callback()
}

function watchTask () {
   watch("./dist/*.html", browserSyncReload)
   watch("./src/scss/**/*.scss", series(sassTask, browserSyncReload))
}

exports.default = series(
   sassTask,
   browserSyncServer,
   browserSyncReload,
   watchTask
)