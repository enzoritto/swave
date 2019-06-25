const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  entry: './all-tests.js',
  output: {
    path: path.resolve(__dirname, 'tests_build'),
    filename: 'bundle.js'
  },
  watchOptions: {
    ignored: /node_modules/
  },
  plugins: [
    new webpack.ProvidePlugin({ expect: ['expect.js'] })
  ]
});
