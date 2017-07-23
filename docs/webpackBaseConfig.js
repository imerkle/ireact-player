// @flow weak
const webpack = require('webpack');
const path = require('path');
const pkg = require('../package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        MATERIAL_UI_VERSION: JSON.stringify(pkg.version),
      },
    }),
    new ExtractTextPlugin({
      filename : path.resolve(__dirname, 'build','darkstyles.css'),
      allChunks : true
    })
  ],
  resolve: {
    alias: {
      docs: path.resolve(__dirname, '../docs'),
      'material-son': path.resolve(__dirname, '../material-son'),
      'utube': path.resolve(__dirname, '../src'),
      //'material-ui-icons': path.resolve(__dirname, '../packages/material-ui-icons/src'),
    },
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: { path: path.resolve(__dirname,'..','postcss.config.js') }
              }
            },
          ]
        })
      },
    ],
  },
};
