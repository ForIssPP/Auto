const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugins = require('html-webpack-plugin');
const glob = require("glob");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/ChunkModuleIdRangePlugin');
const _ENV = process.env.NODE_ENV;
const merge = require('webpack-merge');
const _FILENAME = process.argv[4] && process.argv[4].slice(2);
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack')

let public = 'appapi/banner/';

const config = {
    entry: {
        app: ['react-hot-loader/patch', './src/index.js']
    },
    resolve: {
        // modules: [path.resolve(__dirname, 'node_modules')],
        mainFields: ['main'],
        extensions: ['.js', 'vue', 'jsx', '.json'],
        alias: {
            vue: 'vue/dist/vue.js',
            // 'react-dom': '@hot-loader/react-dom',
            'React': path.resolve(__dirname, './node_modules/react/dist/react.min.js'),
            // 'React': 'React'
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
        noParse: /node_modules\/(moment|chart\.js)/,
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
                exclude: /^node_modules|bower_components$/,
                include: [path.resolve(__dirname, 'src')],
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
};

const webpackConfigPro = {
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
                        "@babel/react",
                        "@babel/env"
                    ]
                }
            },
        ],
    },
};

const webpackConfigDev = {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    devServer: {
        contentBase: './dist',
        disableHostCheck: true,
        hot: true,
        port: 8080,
        host: 'loc.mjliveapp.com',
    },
    performance: {
        maxEntrypointSize: 250000,
        maxAssetSize: 250000,
        hints: 'warning',
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
                use: ['vue-style-loader', 'css-loader', 'sass-loader', ]
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
        ]
    },
};

if (_ENV === "development") {
    module.exports = merge(config, webpackConfigDev);
} else {
    module.exports = merge(config, webpackConfigPro);
}