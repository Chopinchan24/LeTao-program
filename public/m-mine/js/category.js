/*
* @Author: jerry
* @Date:   2017-12-27 21:04:17
* @Last Modified by:   jerry
* @Last Modified time: 2017-12-28 10:59:34
*/

$(function(){
  // 初始化mui的区域滚动，传入父容器的选择器
   mui('.mui-scroll-wrapper').scroll({
   scrollY: true, //是否竖向滚动
   scrollX: false, //是否横向滚动
   startX: 0, //初始化时滚动至x
   startY: 0, //初始化时滚动至y
   indicators: false, //是否显示滚动条
   deceleration:0.0009, //阻尼系数,系数越小滑动越灵敏
   bounce: true //是否启用回弹
 });
   // 调用左侧分类菜单
  getCategoryLeftData();
  // 获取id并且渲染页面
  getId();
  // 进入此页面 默认调用一次
  getCategoryRightData(1);
});

function getCategoryLeftData(){
  $.ajax({
    url:"/category/queryTopCategory",
    type:"GET",
    success:function(backData){
      // console.log(backData);
      var html = template("categroyLeftTmp",backData);
      $(".category-left ul").html(html);
      $(".category-left ul li:eq(0)").addClass('active');
    }
  });
}
function getId(){
  // 动态绑定点击事件，委托注册
  $(".category-left").on('click','ul li a',function(e){

    // 获取id，传给被点击的对应右侧显示栏
      $(".category-left ul li").removeClass('active');
      $(e.target.parentNode).addClass('active');
      var id = $(e.target).data('id');
      // console.log(id);
      getCategoryRightData(id);
  });
}

// 获取右侧栏数据并渲染到页面上
function getCategoryRightData(id) {
  $.ajax({
    url: '/category/querySecondCategory',
    type: 'GET',
    data: {'id':id },
    success:function(backData){
        // console.log(backData);
        if(backData.rows.length){
          $('.category-right .mui-scroll').html(template("categroyRightTmp",backData))
        }else{
          $('.category-right .mui-scroll').html("<p>暂无商品</p>")
        }
    }
  }) 
}

