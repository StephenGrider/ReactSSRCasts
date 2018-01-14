const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  // Inform webpack that we're building a bundle
  // for nodeJS, rather than for the browser
  target: 'node',

  // Tell webpack the root file of our
  // server application
  entry: './src/index.js',

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  // Tell webpack not to bundle any libs into the build/bundle.js (server side bundle) as long as
  // the lib is in node_modules folder. This will reduce the size of build/bundle.js and 
  // make the webpack boots up the bundle faster
  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);
