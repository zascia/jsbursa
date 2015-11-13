/**
 * Created by ashu on 10-Nov-15.
 */
'use strict';

// some environment defines
CONST NODE_ENV = process.env.NODE_ENV || 'development';
// to use plugins we need to include webpack directly
CONST webpack = require('webpack');

module.exports = {
  // point of entry
  entry: "./home",
  // output params
  output: {
    filename: "build.js",
    // exported global var name
    library: "home"
  },
  // restart build after code changes
  watch: NODE_ENV === 'development',
  // source map --> also can be eval for DEV env
  devtool: NODE_ENV === 'development' ? "cheap-inline--source-map" : null,
  // including plugins
  plugins: [
    // to use some const values etc in other modules
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    })
  ],

  // include loaders
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel'
    }]
  }

};