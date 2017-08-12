var fileinclude = require('gulp-file-include');
var gulp = require('gulp');
var del = require('del');
var rename = require("gulp-rename");
var each = require('gulp-each');
var foreach = require('gulp-foreach');
//var minifyCss = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var gzip = require('gulp-gzip');

const arrayHtmlFiles = [];
//const arrayCssFiles = [];

gulp.task('processing',['delete'],function () {

  return gulp.src('./**/markup.html')
    .pipe(foreach(function(stream, file){
      var pathFile = file.path;
      var finalPath = pathFile.substring(0,pathFile.lastIndexOf("/")+1);
      arrayHtmlFiles.push(finalPath);
      return stream
    }))
});

gulp.task('sitemaphtml',['processing'],function () {
  gulp.src(['./sitemapmarkup.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '/Applications/MAMP/htdocs/thetruthengineland/production/'
    }))
    .pipe(gzip({gzipOptions:{level:9}}))
    .pipe(rename("sitemap.html"))
    .pipe(gulp.dest('.'));
});

gulp.task('default',['sitemaphtml'], function () {
    for(var member of arrayHtmlFiles){
      gulp.src([member+'markup.html'])
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '/Applications/MAMP/htdocs/thetruthengineland/production/'
        }))
        .pipe(minifyHTML({ conditionals: true, spare:true}))
        .pipe(gzip({gzipOptions:{level:9}}))
        .pipe(rename("index.html"))
        .pipe(gulp.dest(member));
    }
});

gulp.task('delete', function () {
  return del([
    './**/index.html',
    './**/*.gz',
    './**/*.js.html',
    './**/*.js.sample',
    './**/*.css.html',
    './**/markup.html.sample',
    './**/*.css.sample',
    './sitemap.html',
    '!./common/header/index.html',
    '!./common/footer/index.html'
  ]);
});

const arrayGzipFiles = [];
gulp.task('gzip-iterate', function() {
  return gulp.src('./**/*.{js,css}')
    .pipe(foreach(function(stream, file){
      var pathFile = file.path;
      if (!(pathFile.indexOf("node_modules")>=0) && !(pathFile.indexOf("index.html")>=0) && !(pathFile.indexOf("gulpfile.js")>=0) && !(pathFile.indexOf("google")>=0))
        arrayGzipFiles.push(pathFile);
      return stream
    }))
});

gulp.task('gzip',['gzip-iterate'], function () {
    for(var member of arrayGzipFiles){
      var finalPath = member.substring(0,member.lastIndexOf("/")+1);
      gulp.src(member)
        .pipe(gzip({gzipOptions:{level:9}})).pipe(rename(function (path) {
            if (path.basename == 'markup.html')
            {
              path.basename ="index";
              path.extname= ".html";
            }
            else if (path.basename == 'sitemapmarkup.html')
            {
              path.basename ="sitemap";
              path.extname= ".html";
            }
          })).pipe(gulp.dest(finalPath));
    }
});
