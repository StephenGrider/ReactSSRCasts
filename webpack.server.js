const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
    // Inform webpack that we're building a bundle
    // for nodeJS, rather that for the browser
    target: 'node',

    // Tell webpack the root file of our
    // server application
    entry: './src/index.js',

    // Tell webpack where to put the output file
    // that is generated
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'server-build')
    },

    externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);
