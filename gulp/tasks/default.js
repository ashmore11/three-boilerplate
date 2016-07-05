import gulp from 'gulp';
import scripts from './scripts';
import styles from './styles';
import server from './server';
import config from '../config';

gulp.task('build',
  gulp.parallel(scripts, styles)
);

gulp.task('watch', function () {
  gulp.watch(config.paths.scripts.watch, gulp.parallel(scripts));
  gulp.watch(config.paths.styles.watch, gulp.parallel(styles));
  gulp.emit('update');
});

gulp.task('default',
  gulp.parallel('build', server, 'watch')
);
