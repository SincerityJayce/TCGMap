const gulp = require('gulp')

const browserSync = require('browser-sync').create();

function watch (){
    browserSync.init({server: './public/'})

    gulp.watch('./public/*.html').on('change',browserSync.reload())
    gulp.watch('./public/**/*.js').on('change',browserSync.reload())
}

exports.watch = watch;

