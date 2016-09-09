'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');
// var babel = require('gulp-babel');
import gutil from 'gulp-util';
import babel from 'gulp-babel';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';

console.log("webpackConfig:",webpackConfig)

var paths = {
    sass:'./src/sass/**/*.scss',
    js:'./src/js/**/*.js',
}

gulp.task('clean',function () {
    return gulp.src('./dist/css')
        .pipe(clean())
})
gulp.task('sass',function () {
    // return gulp.src('./src/sass/**/*.scss')
    return gulp.src(paths.sass)
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({stream:true}))
})

gulp.task('js',function () {
    return gulp.src(paths.js)
        .pipe(babel())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({stream:true}))
})

var myDevConfig = Object.create(webpackConfig);

var devCompiler = webpack(myDevConfig);

//引用webpack对js进行操作
gulp.task("pack",function(callback) {
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-js", err);
        gutil.log("[webpack]", stats.toString({
            colors: true
        }));
        callback();
    });
});

// gulp.task('pack',function(done){
//     webpack(webpackConfig,function(err,stats){
//         if(err) throw new gutil.PluginError('webpack', err)
//         gutil.log('[webpack]', stats.toString({colors: true}))
//         done()
//     })
// })
gulp.task('watch',function () {
    browserSync.init({
        port: 8080,
        server:'./',
        proxy: ""
    })
    gulp.watch(paths.sass,['sass'])
    // gulp.watch(paths.js,['js'])
    gulp.watch(paths.js,['pack'])
    gulp.watch('dist/js/*.js').on('change',browserSync.reload);
    gulp.watch('views/*.html').on('change',browserSync.reload);

})

gulp.task('build',['sass','pack'],function () {
    console.log("开始编译")
})
gulp.task('default',['build','watch'],function () {
    console.log('default')
})