const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./config.js');
const express = require('express');
const app = express();

const dist = `${process.env.PWD}/dist`;
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: config.output.path,
  historyApiFallback: true,
  noInfo: true,
  hot: true,
}));

app.use(webpackHotMiddleware(compiler));
app.use(express.static(dist));

app.get('*', (request, response) => {
  response.sendFile(`${dist}/index.html`);
});

app.listen(3000);
