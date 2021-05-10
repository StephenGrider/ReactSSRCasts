const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = {
    // Tell webpack the root file of our
    // client application
    entry: './app/admin.js',

    // Tell webpack where to put the output file
    // that is generated
    output: {
        filename: 'admin-bundle.js',
        path: path.resolve(__dirname, '../public')
    }
};

module.exports = merge(baseConfig, config);
