import gulp from 'gulp';
import webpack from 'webpack-stream';
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import connect from 'gulp-connect';
import handleError from '../util/handleError';
import config from '../config';

export default function scripts () {
  return gulp.src(config.paths.scripts.source)
    .pipe(webpack(config.webpack))
    .on('error', handleError)
    .pipe(gulp.dest(config.paths.scripts.destination))
    .pipe(gulpif(config.env.development, connect.reload()));
}
