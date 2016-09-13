var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    htmlLoader: {
        minimize: false // workaround for ng2
    },

    plugins: [
        // 如果出现任何错误，就终止构建
        new webpack.NoErrorsPlugin(),
        // 检测完全相同 ( 以及几乎完全相同 ) 的文件，并把它们从输出中移除
        new webpack.optimize.DedupePlugin(),
        // 最小化 (minify) 生成的包
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            }
        }),
        // 把内嵌的 css 抽取成外部文件，并为其文件名添加“缓存无效哈希”
        new ExtractTextPlugin('[name].[hash].css'),
        // 用来定义环境变量，以便我们在自己的程序中引用它
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })
    ]
});
