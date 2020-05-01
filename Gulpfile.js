var gulp = require("gulp");
var sass = require("gulp-sass");
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var srcmaps = require("gulp-sourcemaps");
var livereload = require("gulp-livereload");
var connect = require("gulp-connect");
var wait = require("gulp-wait");

gulp.task("compile:scss", function() {
  return gulp.src("./scss/*.scss")
    .pipe(wait(500))
    .pipe(srcmaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(srcmaps.write("."))
    .pipe(gulp.dest("./css"))
    .pipe(livereload());
});

gulp.task("minify:css", function() {
  gulp.src("./scss/*.scss")
    .pipe(srcmaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(srcmaps.write("."))
    .pipe(gulp.dest("./css"));
});

gulp.task("build:js", function() {
  gulp.src("./js/app.js")
    .pipe(uglify())
    .pipe(rename("app.min.js"))
    .pipe(gulp.dest("./js"));
  console.log("changes made on js");
});

gulp.task("connect", function() {
  connect.server({
      port: 4200,
  });
})

gulp.task("watch", function() {
  livereload.listen();
  gulp.watch("./scss/**/*.scss", ["compile:scss", "minify:css"]);
  gulp.watch("./js/app.js", ["build:js"]);
});

gulp.task("build", ["compile:scss", "minify:css", "build:js"]);


gulp.task("default", ["watch"]);
