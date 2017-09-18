'use strict'
var conf={
    serverHost:'',
}
var super_mm={
    //网络请求
    request  : function (param) {
        var _this=this;
        $.ajax({
            type       : param.method || 'get',
            url        : param.url || '',
            dataType   : param.type || 'json',
            data       : param.data || '',
            success:function (res) {
                //请求成功
                if(0===res.status){
                    typeof  param.success==="function" && param.success(res.data,res.msg)
                }
                //没有登录状态，需要强制登录
                else if(10===res.status){
                    _this.doLogin();
                }
                //请求数据错误
                else if (1===res.status){
                    typeof  param.error==="function" && param.error(res.msg)
                }
            },
            error:function (err) {
                typeof  param.error==="function" && param.error(err.statusText)
            }
        })
    },
    //获取服务器地址
    getServerUrl:function (path) {
        return conf.serverHost=path;
    },
    //获取url参数：
    getUrlParam:function (name) {
        //ss.com?hhh=aaa
        var reg    = new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]):null;
    },
    //统一登录处理
    doLogin:function () {
        window.location.href='./Login.html?redirect='+encodeURIComponent(window.location.href);
    }
};

module.exports=super_mm;