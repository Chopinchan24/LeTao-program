/*
* @Author: jerry
* @Date:   2017-12-26 20:16:41
* @Last Modified by:   jerry
* @Last Modified time: 2017-12-26 23:25:57
*/

$(function(){
   mui('.mui-slider').slider({
        interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
    });
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration: 0.001, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });
});

   
