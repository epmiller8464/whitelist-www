const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: './lib/app.js',
  output: {
    filename: './public/javascripts/app.bundle.min.js'
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
  plugins: [
    // new webpack.optimize.UglifyJsPlugin()
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map'
}
