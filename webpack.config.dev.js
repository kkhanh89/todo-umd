const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // defines the application entry points
  entry: [
    'webpack-hot-middleware/client',
    './index.jsx',
    './index.css'
  ],
  // defines the output file, which contains ALL the code needed to run the application
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build'
  },
  module: {
    loaders: [
      // this allow us to use newer JavaScript syntax and APIs without worrying about the browsers
      // that does not yet implement those features
      {
        loader: 'babel',
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'index.jsx'),
          path.resolve(__dirname, 'app')
        ],
        query: {
          presets: ['es2015', 'react', 'react-hmre']
        }
      },
      // this allows us to extract all stylesheets file into a single file, bundle.css, so we only
      // have to import a single CSS file when running the application. see plugins section below
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader?modules&sourceMap&localIdentName=[local]--[hash:base64:8]')
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('bundle.css', {
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
