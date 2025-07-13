const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                publicPath: '/three-learn',
            },
        }),

    ],
    devServer: {
        open: ['/three-learn/index.html'],
        static: {
            publicPath: '/three-learn',
        },
    },
});
