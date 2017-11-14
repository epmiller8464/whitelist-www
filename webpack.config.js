const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: './lib/app.js',
  output: {
    filename: './public/javascripts/app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
}
