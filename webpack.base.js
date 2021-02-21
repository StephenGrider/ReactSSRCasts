const path = require('path');
module.exports = {
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
    }
};
