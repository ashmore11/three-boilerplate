const path = require('path');
const querystring = require('querystring');

const src = path.resolve(process.env.PWD, 'src');

const entry = [
  'babel-polyfill',
  `${src}/scripts/entry.js`,
];

if (process.env.NODE_ENV === 'dev') {
  const hotQuery = querystring.stringify({
    path: '/__webpack_hmr',
    timeout: 20000,
    reload: true,
    noInfo: true,
  });

  entry.push(...[
    `webpack-hot-middleware/client?${querystring.unescape(hotQuery)}`,
  ]);
}

module.exports = entry;
