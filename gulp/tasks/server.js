import gulp from 'gulp';
import connect from 'gulp-connect';

export default function server () {
  return connect.server({
    port: 3000,
    root: 'public',
    fallback: 'public/index.html',
    livereload: true,
  });
}
