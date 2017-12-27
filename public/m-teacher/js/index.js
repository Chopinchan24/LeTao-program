/*
 * @Author: zhengwei
 * @Date:   2017-12-26 15:03:37
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2017-12-26 17:15:37
 */
$(function() {
    //获得slider插件对象 调用slider初始化轮播图的方法
    mui('.mui-slider').slider({
        // 1. 开启自动轮播图 毫秒数
        interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
    });
    // 初始化mui的区域滚动 传入父容器的选择器
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration: 0.001, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });
})
