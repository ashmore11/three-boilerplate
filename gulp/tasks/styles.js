import gulp from 'gulp';
import gulpif from 'gulp-if';
import stylus from 'gulp-stylus';
import nib from 'nib';
import handleError from '../util/handleError';
import CSSmin from 'gulp-minify-css';
import connect from 'gulp-connect';
import config from '../config';

export default function styles () {
  return gulp.src(config.paths.styles.source)
    .pipe(stylus({
      set: ['include css'],
      use: [nib()],
      linenos: config.env.development,
    }))
    .on('error', handleError)
    .pipe(gulpif(config.env.production, CSSmin()))
    .pipe(gulp.dest(config.paths.styles.destination))
    .pipe(gulpif(config.env.development, connect.reload()));
}
