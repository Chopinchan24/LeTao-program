/*
 * @Author: zhengwei
 * @Date:   2017-12-25 20:34:05
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2017-12-25 22:21:40
 */
$(function() {
    //获取轮播图容器
    var slider = mui(".mui-slider");
    // 初始化轮播图
    slider.slider({
        interval: 1000 //自动轮播图的时间
    });
    // 初始化mui的滚动插件
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条
        deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
    });
})
