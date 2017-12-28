/*
 * @Author: zw
 * @Date:   2017-12-27 10:22:54
 * @Last Modified by:   jerry
 * @Last Modified time: 2017-12-28 10:58:29
 */
$(function() {
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
    //调用 获取左侧分类的菜单数据
    getCategoryLeftData();
    //调用左侧分类的点击
    categoryLeftClick();
    //调用获取右侧分类商品数据的
    getCategoryRightData(1);

});
// 获取左侧分类的菜单数据
function getCategoryLeftData() {
    /*	1.1 使用$.ajax请求左侧分类的API  http://localhost:3000/category/queryTopCategory
    	1.2 定义一个左侧分类的模板
    	1.3 调用template('模板id',数据)
    	1.4 把生成的模板html放到左侧分类页面*/
    $.ajax({
        // url:'http://localhost:3000/category/queryTopCategory'
        url: '/category/queryTopCategory',
        success: function(data) {
            console.log(data);
            // 调用template('模板id',数据)
            var html = template('categoryLeftTmp', data);
            // 把生成的模板html放到左侧分类页面 生成的是li放到ul里面
            $('.category-left ul').html(html);
            // 给第一个li添加active类名
            $('.category-left ul li:eq(0)').addClass('active');
        }
    });
}
//定义获取右侧分类商品的函数
function categoryLeftClick() {
    /*1. 给左侧分类菜单添加点击事件
    2. 在点击事件里面 获取到当前点击的元素
    3. 调用右侧分类的接口 
    		接口地址 http://localhost:3000/category/querySecondCategory?id=1 
    		这个接口地址需要一个参数是分类菜单的id
    4. 拿到当前点击元素对应的分类id 
    5. 在渲染左侧分类菜单的模板的时候同时还要把分类id存起来 （自定义属性）
    6. 通过自定义属性获取点击左侧分类菜单的分类id
    7. 调用ajax发送请求右侧分类商品数据（把分类id作为参数传入）
    8. 定义右侧分类商品的模板引擎 绑定需要渲染的属性
    9. 调用template('模板id',数据)方法生成模板页面
    10 把生成好的的模板页面放到右侧的分类商品容器里面 */
    //给左侧分类菜单绑定点击事件的时候切记不能直接给里面的a绑定因为a是动态生成的
    //给父元素绑定点击事件 通过委托方式绑定给子元素
    // $('.category-left ul li a').on('click',function (e) {//错误的
    // $('.category-left').on('click',function (e) {//正确
    $('.category-left').on('click', 'ul li a', function(e) {
        // 清空所有li的active在给当前点击的a的父元素li添加一个active
        $('.category-left ul li').removeClass('active');
        $(e.target.parentNode).addClass('active');
        var id = $(e.target).data('id');
        getCategoryRightData(id);
    });
}

function getCategoryRightData(id) {
    $.ajax({
        url: '/category/querySecondCategory',
        data: { 'id': id },
        success: function(data) {
            console.log(data);
            var html = template('categoryRightTmp', data);
            // 判断如果有数据就添加html如果没有数据添就添加提示没有数据
            if (data.rows.length) {
                $('.category-right .mui-scroll').html(html);
            } else {
                $('.category-right .mui-scroll').html('<p>暂无商品</p>')
            }
        }
    })
}
