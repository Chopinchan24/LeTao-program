/*
 * @Author: zhengwei
 * @Date:   2017-12-25 22:27:23
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2017-12-25 23:35:52
 */
$(function() {
    // 初始化mui的滚动插件
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.003 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    //获取左侧分类的数据
    getCategoryLeftData();
});

function getCategoryLeftData() {
    $.ajax({
        url: '/category/queryTopCategory',
        success: function(data) {
            var html = template('categoryLeftTmp', data);
            $('.category-left ul').html(html);
            $('.category-left ul li').eq(0).addClass('active');
            // 左侧分类的点击
            $('.category-left ul').on('click', function(e) {
                $('.category-left ul li').removeClass('active');
                var li = $(e.target.parentNode);
                li.addClass('active');
                // 点击显示右侧的对应的分类商品 把点击的li的分类id传入
                getCategoryRightData(li.data('id'))
            });
        }
    })
}
//获取右侧分类的数据 需要传入分类id
function getCategoryRightData(id) {
    $.ajax({
        url: '/category/querySecondCategory',
        data: { id: id },
        success: function(data) {
            var html = template('categoryRightTmp', data);
            if (html) {
                $('.category-detail').html(html);
            } else {
            	 $('.category-detail').html('<li>没有数据</li>');
            }
        }
    })
}
