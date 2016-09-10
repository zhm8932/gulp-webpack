'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');

var nodemon=require('gulp-nodemon') ;
var gutil=require('gulp-util') ;
var babel=require('gulp-babel') ;
var webpack=require('webpack') ;
var webpackConfig=require('./webpack.config.js') ;

// import gutil from 'gulp-util';
// import babel from 'gulp-babel';
// import webpack from 'webpack';
// import webpackConfig from './webpack.config.js';


// console.log("webpackConfig:",webpackConfig)
console.log("修改重启测试！")
var paths = {
    sass:'./src/sass/**/*.scss',
    js:'./src/js/**/*.js',
    jsx:'./src/js/**/*.jsx',
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
    gulp.watch([paths.js,paths.jsx],['pack'])
    gulp.watch(['./gulpfile.babel.js','./webpack.config.js'],['develop'])
    gulp.watch('dist/js/*.js').on('change',browserSync.reload);
    gulp.watch('views/*.html').on('change',browserSync.reload);

})

gulp.task('develop',function () {
    nodemon({
        script:'gulpfile.babel.js',
        ext:'html js',
        // env: { 'NODE_ENV': 'development' }
    }).on('restart',function () {
        console.log('重启restart gulpfile.babel.js')
    })
})
gulp.task('build',['sass','pack'],function () {
    console.log("第一次打包结束")
})
gulp.task('default',['build','watch'],function () {
    console.log('default')
})