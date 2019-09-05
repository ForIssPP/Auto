const merge = require('webpack-merge');
let config = require('./webpack.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugins = require('html-webpack-plugin');
const path = require('path');
const PurifyCssWebpack = require('purifycss-webpack');
const _FILENAME = process.argv[4].slice(2);
// const HappyPack = require('happypack');
// const os = require('os');
// const happypackThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

// banner
let public = 'appapi/banner/';

// games
// let public = 'appapi/games/';

// home
// let public = 'home/';

// other
// let public = 'appapi/';

module.exports = merge(config, {
    mode: 'production',
    output: {
        publicPath: '__PUBLIC__/' + public,
        // chunkFilename: "[name].[chunkHash:8].js"
        filename: `js/${_FILENAME}.[hash:8].js`,
        chunkFilename: '[name].js',
    },
    externals: {
        vue: 'Vue',
        jquery: 'jQuery',
        swiper: 'Swiper'
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: true, // 允许并发
                cache: true, // 开启缓存
            }),
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: `css/${_FILENAME || 'index'}.[hash:8].css`,
        }),
        new HtmlWebpackPlugins({
            template: `./src/index.html`,
            filename: `${_FILENAME || 'index'}.html`,
        }),
        // 压缩无用css
        // new PurifyCssWebpack({
        //     paths: glob.sync(path.join(__dirname, 'src/*.html'))
        // }),
    ],
    module: {
        rules: [{
                test: /\.(scss||sass||css)$/,
                exclude: /^node_modules$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader'],
                })
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /^node_modules$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '/[name].[ext]',
                        limit: 1,
                        outputPath: 'images'
                    }
                }]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /^node_modules$/,
                loader: 'babel-loader?cacheDirectory=true',
                options: {
                    presets: [
                        "@babel/env"
                    ]
                }
            },
        ],
    },
})