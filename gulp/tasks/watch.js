import gulp from 'gulp';
import config from '../config';

export default function watch () {
	gulp.watch(config.paths.scripts.watch, ['scripts']);
	gulp.watch(config.paths.styles.watch, ['styles']);

	gulp.emit('update');
}
