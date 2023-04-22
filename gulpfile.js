const { src, dest, parallel, watch } = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

function scripts () {
  return src('./app/amd/src/*.js')
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(dest('./app/amd/build/'))
    .pipe(browserSync.stream());
}

function style () {
  return src('./app/style/*.scss')
    .pipe(concat('all.min.css'))
    .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(dest('./app/'))
    .pipe(browserSync.stream());
}

function watching () {
  watch(['app/style/*.scss'], style);
  watch(['app/amd/src/*.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
  
}

function sync () {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
}

exports.build = parallel(style, scripts, watching, sync);