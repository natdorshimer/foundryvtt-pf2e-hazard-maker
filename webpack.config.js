const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: 'source-map',
    entry: './src/index.ts',
    watch: true,
    watchOptions: {
        aggregateTimeout: 100,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'output', 'dist'),
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'resources') + '/',
                    to: path.resolve(__dirname, 'output', 'dist'),
                },
                {
                    from: path.resolve(__dirname, 'module.json'),
                    to: path.resolve(__dirname, 'output', 'module.json'),
                }
            ]
        })
    ]
};