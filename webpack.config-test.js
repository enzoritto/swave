const path = require('path');
const webpack = require('webpack');

module.exports = {
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
};
