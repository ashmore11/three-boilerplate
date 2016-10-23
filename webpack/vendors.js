const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const DEV = process.env.NODE_ENV === 'dev';

const config = {
  debug: DEV,
  cache: true,
  devtool: DEV ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
  entry: {
    vendors: [
      'dat-gui',
      'gsap',
      'randomcolor',
      'stats-js',
      'three',
      'three-trackballcontrols',
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(process.env.PWD, 'dist/scripts'),
    library: '[name]',
  },
  plugins: [
    new ProgressBarPlugin({ clear: false }),
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(process.env.PWD, 'dist/scripts', '[name].manifest.json'),
      context: path.resolve(process.env.PWD, 'src'),
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(...[
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: { warnings: false },
    }),
  ]);
}

module.exports = config;
