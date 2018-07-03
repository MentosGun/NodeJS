import gulp from 'gulp';
import {spawn} from 'child_process';
import {readFileSync} from 'fs';

let node = null;

gulp.task('server', ['build'], () => {
  if (null !== node) {
    node.kill();
  }

  const package = JSON.parse(readFileSync('./package.json'))

  node = spawn('node', ['dist/index.js'], {
    stdio: 'inherit',
  });

  node.on('close', (code) => {
    if (8 == code) {
      gulp.log('There is an error');
    }
  });



  gulp.watch('src/**/*', ['build-js'])
});

process.on('exit', () => {
  if (null !== node) {
    node.kill();
  }
});
