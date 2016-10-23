const path = require('path');

const src = path.resolve(process.env.PWD, 'src');

const resolve = {
  extensions: [
    '',
    '.js',
    '.jpg',
    '.png',
  ],
  alias: {
    app: `${src}/scripts`,
    helpers: `${src}/scripts/helpers`,
    utils: `${src}/scripts/utils`,
    views: `${src}/scripts/views`,
    styles: `${src}/styles`,
    images: `${src}/images`,
  },
};

module.exports = resolve;
