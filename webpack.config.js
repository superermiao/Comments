var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量配置 dev/online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';//判断是线上还是开发环境
//存放多个不同的html页面,获取html页面参数的方法
var getHtmlConfig = function(name){
    return {
        template : './src/view/' + name + '.html',
        filename : 'view/' + name + '.html',
        inject   : true,
        hash     : true,
        chunks   : ['common',name]
    };
};
var config= {
    entry: {
        'common':['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],//入口文件可以有不同的
        'login': ['./src/page/login/index.js']
    },
    output: {
        path: './dist',//输出路径的根目录
        publicPath:'/dist',
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
        //css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),//[name]相当于一个变量
        //html模版处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        //login.html
        new HtmlWebpackPlugin(getHtmlConfig('login')),
       /* new HtmlWebpackPlugin({
            template : './src/view/login.html',
            filename : 'view/login.html',
            inject   : true,
            hash     : true,
            chunks   : ['common','login'],
        })*/
    ],
    module: {
        loaders: [
            { test: /\.css$/, loader:  ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(jpg|png|gif|svg|ttf|woff|eot)$/, loader: 'url-loader?limit=8192&name=resource/[name].[ext]'},/*解析图片*/
        ]
    },
    //配置一些其他参数，比如文件名引入
    resolve:{
        alias:{
            util:__dirname+'/src/util',
            page:__dirname+'/src/page',
            service:__dirname+'/src/service',
            image:__dirname+'/src/image',
        }
    }
};
if ('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

 module.exports=config;