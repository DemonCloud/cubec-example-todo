const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const server = require('./server');

module.exports = {
  entry: './app/index.js',
  // mode: 'development',
  mode: 'production',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'todoapp.webpack.min.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map'
    })
  ],

  devServer: {
    compress: true,
    port: 9001,
    before: server
  },

  devtool: 'inline-cheap-source-map',
};
