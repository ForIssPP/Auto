const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugins = require('html-webpack-plugin');
const glob = require("glob");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/ChunkModuleIdRangePlugin')

module.exports = {
    entry: {
        app: `./src/index.js`,
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new HtmlWebpackPlugins({
        //     template: `./src/${HtmlPath}.html`,
        //     filename: `${HtmlPath}.html`,
        // }),
        // new ExtractTextPlugin('/css/[name].css'),
        new VueLoaderPlugin(),
    ],
    output: {
        filename: `js/[name].[hash:8].js`,
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[name].js',
    },
    module: {
        rules: [{
                test: /\.(woff|woff2|eot|ttf|otf|TTF|EOT|WOFF)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'font/[name].[ext]'
                    }
                }, ],

            },
            {
                test: /\.(svga)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'svga/[name].[ext]'
                    }
                }, ],

            },
            {
                test: /\.(html)$/,
                exclude: /^node_modules$/,
                use: {
                    loader: 'html-loader',
                }
            },
            {
                test: /\.(vue)$/,
                exclude: /^node_modules$/,
                use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /^node_modules$/,
                loader: 'babel-loader?cacheDirectory=true',
                options: {
                    presets: [
                        "@babel/react",
                        "@babel/env"
                    ]
                }
            }
        ]
    },
}