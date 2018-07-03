import gulp from 'gulp';

gulp.task('watch', ['server'], () => {
  gulp.watch('src/**/*', ['server']);
})
