const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const PATHS = {
  src: path.resolve(process.env.PWD, 'src'),
  dist: path.resolve(process.env.PWD, 'dist'),
};

const plugins = [
  new ProgressBarPlugin({ clear: false }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
  new HtmlWebpackPlugin({
    template: `${PATHS.src}/index.html`,
    hash: true,
  }),
  new AddAssetHtmlPlugin({
    filepath: `${PATHS.dist}/scripts/vendors.js`,
    outputPath: 'scripts',
    includeSourcemap: false,
    publicPath: '/scripts/',
    hash: true,
  }),
  new webpack.DllReferencePlugin({
    context: PATHS.src,
    manifest: require(`${PATHS.dist}/scripts/vendors.manifest.json`),
  }),
  new webpack.ProvidePlugin({
    THREE: 'three',
    'three-trackballcontrols': 'TrackballControls',
  })
];

if (process.env.NODE_ENV === 'dev') {
  plugins.push(...[
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]);
}

if (process.env.NODE_ENV === 'production') {
  plugins.push(...[
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: { warnings: false },
    }),
  ]);
}

module.exports = plugins;
