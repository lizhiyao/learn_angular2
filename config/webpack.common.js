var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        // 在大多数现代浏览器中运行 Angular 2 程序时需要的标准填充物
        'polyfills': './src/polyfills.ts',
        // 需要的提供商文件： Angular 2 、 Lodash 、 bootstrap.css ……
        'vendor': './src/vendor.ts',
        // 应用代码
        'app': './src/main.ts'
    },

    resolve: {
        // 告诉 Webpack 如何通过查找匹配的文件来 解析 模块文件的加载请求
        extensions: ['', '.js', '.ts']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },
            {
                // 匹配应用级样式
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                // 匹配组件局部样式 
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw'
            }
        ]
    },

    plugins: [
        // 我们希望 app.js 包中只包含应用代码，而 vendor.js 包中只包含提供商代码。
        // 应用代码中 import 了提供商代码。 Webpack 还没有智能到自动把提供商代码排除在 app.js 包之外。
        // CommonsChunkPlugin 插件能完成此工作。
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        // Webpack 生成了一些 js 和 css 文件
        // Webpack 可以通过 HtmlWebpackPlugin 自动为我们注入那些 script 和 link 标签
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};
