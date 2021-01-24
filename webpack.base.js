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
                        'react',
                        'stage-0',
                        ['env', {targets: {browsers: ['last 2 versions']}}]
                    ],
                    plugins: [
                        'transform-class-properties'
                    ]
                },
            }
        ]
    },
    // Resolve IDE (IntelliJ/WebStorm) file path aliases hints.
    // Use this webpack.config.js under
    // File->Settings->Languages&Frameworks->JavaScript->Webpack.
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@client': path.resolve(__dirname, 'src/client/'),
            '@root': path.resolve(__dirname, 'src/'),
            '@services': path.resolve(__dirname, 'src/services/')
        }
    }
};
