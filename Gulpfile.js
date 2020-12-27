// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');

// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require("browser-sync").create();
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require('gulp-rename');

// File paths
const path = {
  scss: './scss/**/*.scss',
  js: './js/app.js'
}

// Sass task: compiles the style.scss file into style.css
function build_css() {
  return src(path.scss)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sass()) // compile SCSS to CSS
    .on('error', sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()])) // apply autoprefixer and optimize/minify 
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
    .pipe(dest('./css')) // put final CSS in dist folder
    .pipe(browserSync.stream()); // injext new css for live reloading
}

// JS task: minify js and add sourcemaps
function build_js() {
  return src(path.js)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('./js'));
}


// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watch_task() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  watch([path.scss, path.js], {
      interval: 1000,
      usePolling: true
    },
    series(
      parallel(build_css, build_js),
    )
  );

  watch('*.html').on('change', browserSync.reload);
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
exports.default = series(
  parallel(build_css, build_js),
  watch_task
);

// build js and css files for production
exports.build = parallel(build_css, build_js);