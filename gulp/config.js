import webpack from 'webpack';

export default {
  /**
   * Environment variables
   */
  env: {
    production: process.env.NODE_ENV === 'production',
    development: process.env.NODE_ENV === 'development',
    basepath: process.env.PWD,
  },

  /**
   * Paths for all the source files
   */
  paths: {
    vendor: {
      destination: './public/js/',
      filename: 'vendor.js',
    },
    scripts: {
      source: './src/scripts/app.js',
      watch: './src/**/*.js',
      destination: './public/js/',
      filename: 'app.js',
    },
    styles: {
      source: './src/styles/app.styl',
      watch: 'src/styles/**/*.styl',
      destination: './public/css/',
    },
  },

  /**
   * Webpack
   */
  webpack: {
    entry: {
      app: `${process.env.PWD}/src/scripts/app`,
    },
    output: {
      path: `${process.env.PWD}/public`,
      filename: '[name].js',
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        TweenMax: 'gsap',
        THREE: 'three',
      })
    ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        }
      ]
    },
    resolve: {
      extensions: ['', '.js'],
      alias: {
        app: `${process.env.PWD}/src/scripts`,
        views: `${process.env.PWD}/src/scripts/views`,
        utils: `${process.env.PWD}/src/scripts/utils`,
        helpers: `${process.env.PWD}/src/scripts/helpers`
      }
    },
  }
};
