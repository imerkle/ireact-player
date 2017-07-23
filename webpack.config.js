// webpack.config.js

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webclient =  {
  entry: path.join(__dirname, 'dev','js','client.js'),
  output: {
    path: path.join(__dirname, 'prod','js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: path.join(__dirname,'dev','cssstylesheets'),
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader'
              /* not in development,
              options: {
                minimize: true
              }
              */
            },
            'postcss-loader'
          ]
        })
      },
      {
        enforce: "pre",
        test: path.join(__dirname,'dev','js'),
        use : {
          loader: "eslint-loader",
          options : {
            quiet : true
          }
        }
      },
      {
        test: path.join(__dirname,'dev','js'),
         use : {
            loader: 'babel-loader',
            options: {
              cacheDirectory: 'babel_cache'
            }
         }
      }
    ]
  },
  node: {
    console: true,
    __dirname: true
  },
  devtool :  'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextPlugin({
      filename : "../css/darkstyles.css",
      allChunks : true
    }),
    /*
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, 'app/*.html')),
    })
    */
    new webpack.DefinePlugin({ "global.GENTLY": false }),
    new webpack.LoaderOptionsPlugin({
    debug: true
  }) /*,
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
      //mangle: true,
    mangle: false,
    sourcemap: true,
    beautify: true,
    dead_code: false
  })
  */


  ]
};

module.exports = webclient;
