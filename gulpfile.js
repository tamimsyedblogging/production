var fileinclude = require('gulp-file-include');
var gulp = require('gulp');
var del = require('del');
var rename = require("gulp-rename");
var each = require('gulp-each');
var foreach = require('gulp-foreach');
var minifyCss = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');

const arrayHtmlFiles = [];
const arrayCssFiles = [];

gulp.task('processing',['delete'],function () {

  return gulp.src('./**/markup.html')
    .pipe(foreach(function(stream, file){
      var pathFile = file.path;
      var finalPath = pathFile.substring(0,pathFile.lastIndexOf("/")+1);
      arrayHtmlFiles.push(finalPath);
    //  console.log("finalPath >> "+finalPath+" >> length "+arrayHtmlFiles.length);
      gulp.src(['/Applications/MAMP/htdocs/thetruthengineland/**/markup.html'])
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '/Applications/MAMP/htdocs/thetruthengineland/production'
        }))
        .pipe(rename("index.html"));
      return stream
    }))
});

gulp.task('css',function () {

  return gulp.src('./**/*.css')
    .pipe(foreach(function(stream, file){
      var pathFile = file.path;
      var finalPath = pathFile.substring(0,pathFile.lastIndexOf("/")+1);
      if (!(pathFile.indexOf("node_modules")>=0))
        arrayCssFiles.push(finalPath);
      return stream
    }))
});

gulp.task('sitemaphtml',['processing'],function () {
  gulp.src(['./sitemapmarkup.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '/Applications/MAMP/htdocs/thetruthengineland/production/'
    }))
    .pipe(rename("sitemap.html"))
    .pipe(gulp.dest('.'));
});

gulp.task('default',['css-iterate','sitemaphtml'], function () {
    for(var member of arrayHtmlFiles){
      gulp.src([member+'markup.html'])
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '/Applications/MAMP/htdocs/thetruthengineland/production/'
        }))
        .pipe(minifyHTML({ conditionals: true, spare:true}))
        .pipe(rename("index.html"))
        .pipe(gulp.dest(member));
    }
});

gulp.task('css-iterate',['css'], function () {
    for(var member of arrayCssFiles){
      gulp.src(member+"/*.css")
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(member));
    }
});

gulp.task('delete', function () {
  return del([
    './**/index.html',
    './sitemap.html',
    '!./common/header/index.html',
    '!./common/footer/index.html'
  ]);
});
