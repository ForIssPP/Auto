const merge = require('webpack-merge');
const config = require('./webpack.config');
const webpack = require('webpack');
const HtmlWebpackPlugins = require('html-webpack-plugin');

module.exports = merge(config, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        disableHostCheck: true,
        hot: true,
        host: 'loc.mjliveapp.com',
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugins({
            template: `./src/index.html`,
        })
    ],
    module: {
        rules: [{
                test: /\.(scss||sass||css)$/,
                exclude: /^node_modules$/,
                use: ['vue-style-loader', 'css-loader', 'sass-loader',]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /^node_modules$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'name=[name].[ext]',
                        limit: 8000,
                        outputPath: 'images'
                    }
                }]
            },
            // {
            //     loader: 'image-webpack-loader',
            //     options: {
            //         bypassOnDebug: true
            //     }
            // },
        ]
    },
});