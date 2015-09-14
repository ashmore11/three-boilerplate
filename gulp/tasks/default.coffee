gulp = require 'gulp'

gulp.task "build",   ['scripts', 'styles', 'vendor']
gulp.task "default", ['build', 'watch', 'server']