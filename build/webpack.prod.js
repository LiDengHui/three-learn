const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyPlugin = require('copy-webpack-plugin');
const { publicPath } = require('../config');
module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: 'public',
                    to: publicPath,
                    globOptions: {
                        dot: true,
                        gitignore: true,
                        ignore: ['**/*.blend', '**/*.blend1', '**/*.js'],
                    },
                },
            ],
        }),
    ],
});
