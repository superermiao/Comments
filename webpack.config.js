var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config= {
    entry: {
        'common':['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],//入口文件可以有不同的
        'login': ['./src/page/login/index.js']
    },
    output: {
        path: './dist',//输出路径的根目录
        /* filename: '[name].js'*/
        filename: 'js/[name].js'//输出的文件名
    },
    externals: {//加载外部的变量或模块
        'jquery': 'window.jQuery'
    },
    plugins: [//通用模块的配置
        new  webpack.optimize.CommonsChunkPlugin({
            name: 'common',//把公共的common入口文件放这里
            filename: 'js/base.js'
        }),
        new ExtractTextPlugin("css/[name].css"),//[name]相当于一个变量
    ],
    module: {
        loaders: [
            { test: /\.css$/, loader:  ExtractTextPlugin.extract("style-loader","css-loader") }
        ]
    },
};
 module.exports=config;