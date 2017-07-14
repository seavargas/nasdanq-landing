const path = require('path');
const webpack = require('webpack');
const BabiliPlugin = require('babili-webpack-plugin');

module.exports = {
    devtool: 'none',
    entry: [
        'babel-polyfill',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new BabiliPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            query: {
                presets: [
                    'es2015',
                    'react',
                    'stage-2'
                ],
                plugins: []
            },
            include: path.join(__dirname, 'src')
        }]
    }
};
