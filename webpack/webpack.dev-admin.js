const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = {
    mode: 'development',
    entry: './app/admin.js',
    output: {
        filename: 'admin-bundle.js',
        path: path.resolve(__dirname, '../public/admin')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
        ],
    },
};

module.exports = merge(baseConfig, config);
