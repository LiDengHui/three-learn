const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ModuleFederationPlugin =
    require('@module-federation/enhanced').ModuleFederationPlugin;

const entries = (function () {
    const entryFiles = glob.sync(
        path.join(__dirname, '../src/entries/') + '**/*.ts'
    );
    const map = {};
    entryFiles.forEach((filePath) => {
        const filename = filePath.replace(
            /.*\/(\w+)\/(\w+)(\.html|\.ts)$/,
            (rs, $1, $2) => $2
        );
        map[filename] = filePath;
    });

    return map;
})();
const htmlPlugins = Object.keys(entries).map((key) => {
    return new HtmlWebpackPlugin({
        title: key,
        chunks: [key],
        filename: path.join(__dirname, '../dist', key + '.html'),
        template: path.resolve(__dirname, '../index.html'),
    });
});
module.exports = {
    entry: entries,
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {},
    },
    devServer: {
        hot: false,
        injectClient: false,
        disableHostCheck: true,
        https: true,
        public: 'http://127.0.0.1:3333',
        port: 3333,
        host: '0.0.0.0',
        proxy: {
            '/api': 'http://47.109.70.11:3000',
            '/_next': 'http://47.109.70.11:3002',
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'swc-loader',
                },
            },
            {
                test: /\.gltf$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { esModule: false },
                    },
                    '@vxna/gltf-loader',
                ],
            },
            {
                test: /\.(bin|jpe?g|png)$/,
                loader: 'file-loader',
                options: { esModule: false },
            },
            {
                test: /\.glsl$/,
                loader: 'raw-loader',
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'three',
            remotes: {
                shop: 'shop@http://localhost:3002/_next/static/chunks/remoteEntry.js',
            },
            shared: { react: 'react' },
        }),
        new webpack.ProvidePlugin({
            THREE: 'three',
            'window.THREE': 'three',
        }),
        ...htmlPlugins,
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 打包业务中公共代码
                common: {
                    name: 'common',
                    chunks: 'initial',
                    minSize: 1,
                    priority: 0,
                    minChunks: 2, // 同时引用了2次才打包
                },
                // 打包第三方库的文件
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    priority: 10,
                    minChunks: 2, // 同时引用了2次才打包
                },
            },
        },
        runtimeChunk: { name: 'manifest' }, // 运行时代码
    },
};
