const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugins = require('html-webpack-plugin');
const glob = require('glob');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/ChunkModuleIdRangePlugin');
const _ENV = process.env.NODE_ENV;
const merge = require('webpack-merge');
const _FILENAME = process.argv[2] && process.argv[2].slice(2);
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');

function entries () {
  var jsDir = path.resolve(__dirname, 'src')
  var entryFiles = glob.sync(jsDir + '/study/openCard/**/*.{js,jsx}')
  var map = {};

  for (var i = 0; i < entryFiles.length; i++) {
      var filePath = entryFiles[i];
      var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
      map[filename] = filePath;
  }
  return map;
}

const openCardDirPath = path.join('./src', 'study', 'openCard');
const entryArray = fs
  .readdirSync(openCardDirPath)
  .filter(pathName => pathName !== 'common');
const openCardCssPlugins = [];
const openCardHtmlPlugins = entryArray.map(pathName => {
  const filePath = path.join(__dirname, openCardDirPath, pathName);
  openCardCssPlugins.push(
    new ExtractTextPlugin({
      filename: 'css/' + pathName + '[hash:8].css'
    })
  );
  return new HtmlWebpackPlugins({
    title: pathName,
    filename: pathName + '.html',
    template: path.join(filePath, pathName + '.ejs'),
    chunks: [pathName]
  });
});
let public = 'appapi/banner/';
const config = {
  entry: entries(),
  resolve: {
    // modules: [path.resolve(__dirname, 'node_modules')],
    mainFields: ['main'],
    extensions: ['.js', 'vue', 'jsx', '.json'],
    alias: {
      vue: 'vue/dist/vue.js',
      // 'react-dom': '@hot-loader/react-dom',
      React: path.resolve(__dirname, './node_modules/react/dist/react.min.js')
      // 'React': 'React'
    }
  },
  plugins: [
    ...openCardHtmlPlugins,
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ],
  output: {
    filename: `[name].[hash:8].js`,
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].js'
  },
  module: {
    noParse: /node_modules\/(moment|chart\.js)/,
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf|TTF|EOT|WOFF)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'font/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(svga)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'svga/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(html)$/,
        exclude: /^node_modules$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.(ejs)$/,
        use: ['ejs-loader']
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
          presets: ['@babel/react', '@babel/env']
        }
      }
    ]
  }
};

const webpackConfigPro = {
  mode: 'production',
  output: {
    publicPath: '__PUBLIC__/' + public,
    // chunkFilename: "[name].[chunkHash:8].js"
    filename: `js/${_FILENAME}.[hash:8].js`,
    chunkFilename: '[name].js'
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
        cache: true // 开启缓存
      })
    ]
  },
  plugins: [
    // new ExtractTextPlugin({
    //   filename: `css/${_FILENAME || 'index'}.[hash:8].css`
    // }),
    ...openCardCssPlugins,
    new webpack.optimize.SplitChunksPlugin({
      name: 'common',
      chunks: 'all',
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups: {
        commons: {
          name: 'commons',
          minChunks: 8,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1
        }
      }
    })
    // 压缩无用css
    // new PurifyCssWebpack({
    //     paths: glob.sync(path.join(__dirname, 'src/*.html'))
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss||sass||css)$/,
        exclude: /^node_modules$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /^node_modules$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '/[name].[ext]',
              limit: 1,
              outputPath: 'images'
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /^node_modules$/,
        loader: 'babel-loader?cacheDirectory=true',
        options: {
          presets: ['@babel/react', '@babel/env']
        }
      }
    ]
  }
};

const webpackConfigDev = {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: './dist',
    disableHostCheck: true,
    hot: true,
    port: 8080
    // host: 'loc.mjliveapp.com',
  },
  performance: {
    maxEntrypointSize: 250000,
    maxAssetSize: 250000
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(scss||sass||css)$/,
        exclude: /^node_modules$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /^node_modules$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'name=[name].[ext]',
              limit: 8000,
              outputPath: 'images'
            }
          }
        ]
      }
    ]
  }
};

if (_ENV === 'development') {
  console.log(merge(config, webpackConfigDev).module.rules);
  module.exports = merge(config, webpackConfigDev);
} else {
  module.exports = merge(config, webpackConfigPro);
}
