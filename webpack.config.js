'use strict'

const path = require('path')

const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
  },
  devServer: {
    hot: true,
    liveReload: true,
    open: true,
    historyApiFallback: true,
    compress: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Enable HMR
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
      template: './index.html',
    }),
  ],
}
