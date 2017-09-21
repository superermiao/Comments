'use strict'
require('./index.css');
require('page/common/nav-simple/index.js');
var super_mm=require('util/super_mm.js');
var super_user=require('service/user-service.js');
//错误信息
var formError={
    show:function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hidden:function () {
        $('.error-item').hide().find('.err-msg').text('');
    },

}

/*page部分逻辑：输入，登录点击，出错出现提示，成功跳转登录后的页面*/
var page={
    init:function () {
        this.bindEvent();//绑定一些事件
    },
    bindEvent:function () {
        var _this=this;
        //登录按钮的点击
        $('#submit').click(function () {
            _this.submit();
        });
        //回车提交
        $('.user-content').keyup(function (e) {
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    //post form
    submit:function () {
        var formData={
            username:$.trim($('#username').val()),
            password:$.trim($('#password').val())
        },
            //表单验证结果
        validateResult=this.formValidate(formData);
        if(validateResult.status){
            //成功,跳到登录之后
            super_user.login(formData,function (res) {
                window.location.href=super_mm.getUrlParam('redirect')||'index.html'
            },function (errMsg) {
                formError.show(errMsg);
            });
        }else {
            //失败
            formError.show(validateResult.msg);
        }
    },
    //表单验证
    formValidate:function (formData) {
        var result={
            status:false,
            msg:'',
        };
        if(!super_mm.validate(formData.username,'require')){
            result.msg='用户名不能为空';
            return result;
        }
        if(!super_mm.validate(formData.password,'require')){
            result.msg='密码不能为空';
            return result;
        }
        //通过验证
        result.status=true;
        result.msg='验证通过';
        return result;
    }
};

$(function () {
    page.init();
});