var fileinclude = require('gulp-file-include'),
  gulp = require('gulp');
  var del = require('del');
  var rename = require("gulp-rename");

gulp.task('processing', function() {
  gulp.src(['markup.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(rename("index.html"))
    .pipe(gulp.dest('.'));
});

gulp.task('move', function() {
// rename via string
gulp.src("./build/*.html")
  .pipe(rename("index.html")).pipe(gulp.dest("./"));
});

gulp.task('delete', function () {
  return del([
    './index.html'
  ]);
});

// gulp.task('copy', function () {
//     gulp.src('markup.html')
//         .pipe(gulp.dest('./copyFile'));
// });
