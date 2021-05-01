const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    // Tell webpack to run babel on every file it runs through
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/preset-react',
                        ['@babel/preset-env', {targets: {browsers: ['last 2 versions']}}]
                    ],
                    plugins: [
                        'transform-class-properties'
                    ]
                },
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [new LoadablePlugin()]
};
