'use strict'

/*
var $$=require('jquery');
console.log('hello index');
$$('body').html('hello index')*/
var super_mm=require('util/super_mm');
var html='<div>{{data}}</div>'
var data={
    data:123
}
console.log(super_mm.renderHtml(html,data));
