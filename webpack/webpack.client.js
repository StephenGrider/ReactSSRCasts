const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = {
    // Tell webpack the root file of our
    // client application
    entry: './app/client.js',

    // Tell webpack where to put the output file
    // that is generated
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../public/client')
    }
};

module.exports = merge(baseConfig, config);
