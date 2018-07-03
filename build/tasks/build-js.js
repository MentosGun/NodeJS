import gulp from 'gulp';
import {createProject} from 'gulp-typescript';

let tsProject = createProject('tsconfig.json');

gulp.task('build', () => {
    return tsProject.src()
        .pipe(tsProject()).js
        .pipe(gulp.dest('dist'))
    ;
});
