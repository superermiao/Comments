var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量配置 dev/online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';//判断是线上还是开发环境
//存放多个不同的html页面,获取html页面参数的方法,获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name,title){
    return {
        template : './src/view/' + name + '.html',
        filename : 'view/' + name + '.html',
        title    :title,
        inject   : true,
        hash     : true,
        chunks   : ['common',name]
    };
};
var config= {
    entry: {
        'common':['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],//入口文件可以有不同的
        'user-login': ['./src/page/user-login/index.js'],
        'user-register':['./src/page/user-register/index.js'],
        'user-pass-reset':['./src/page/user-pass-reset/index.js'],
        'user-center'       : ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-pass-update'  : ['./src/page/user-pass-update/index.js'],
        'result':['./src/page/result/index.js'],
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
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        //user-login.html
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
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
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=8192&name=resource/[name].[ext]'},/*解析图片*/
            { test: /\.string$/, loader: 'html-loader'}
        ]
    },
    //配置一些其他参数，比如文件名引入
    resolve:{
        alias:{
            util          : __dirname+'/src/util',
            page          : __dirname+'/src/page',
            service       : __dirname+'/src/service',
            image         : __dirname+'/src/image',
            node_modules : __dirname+'/node_modules',
        }
    }
};
if ('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports=config;