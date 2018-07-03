import gulp from 'gulp';
import {spawn} from 'child_process'
import {readFileSync} from 'fs';

let node = null;

gulp.task('server', ['build'], () => {
    if (null !== node) {
        node.kill();
    }

    const packages = JSON.parse(readFileSync('./package.json'));

    node = spawn('node', [packages.main], {
        stdio: 'inherit',
    });

    node.on('close', (code) => {
        if (8 === code) {
            gulp.log('There is an error.');
        }
    });
});

process.on('exit', () => {
    if (null !== node) {
        node.kill();
    }
});
