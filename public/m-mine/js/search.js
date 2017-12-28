/*
* @Author: jerry
* @Date:   2017-12-28 10:51:20
* @Last Modified by:   jerry
* @Last Modified time: 2017-12-28 15:41:21
*/

'use strict';
$(function(){
  addHistory();
  queryHistory();
  clearHistory();
  deleteHistory();

});

// 需求1：添加搜索历史并渲染到页面
// 需求2：点击  清空历史清除本地的存储数据
// 需求3： 点击x 清除单条；
// 为本地添加localStorage数据
function addHistory(){
  $('.btn-search').on('click',function(){
    var search = $('.search-input').val();
    if(!search){
      alert("请输入您要搜索的商品");
      return;
    }
    var historyData = localStorage.getItem('historyData');
    if (historyData) {
      historyData = JSON.parse(historyData);
      }
    else {
       historyData = [];
      }
    // 判断一下数组里是否已经有了这个值，有的话就不保存到本地数据中
    if (historyData.indexOf(search)==- 1) {
      // 如果indexof()返回值为-1就说明本地没有保存这个数据，就要本地存储
      historyData.push(search);
      localStorage.setItem('historyData',JSON.stringify(historyData));
      queryHistory();
    }
    $(".search-input").val('');
  });
 };

  function queryHistory(){
    // 查询本地数据
    var historyData = localStorage.getItem('historyData');
    // 判断本地是否有保存数据
    if(historyData){
      historyData = JSON.parse(historyData);
    }else{
      historyData = [];
    }
    // 数组翻转，倒序渲染到页面上
    historyData = historyData.reverse();
    var html = template("searchHistoryTmp",{'rows':historyData});
    $(".search-history-list ul").html(html);
  }



  function clearHistory(){

    $(".btn-clear").on("click",function(){

      localStorage.setItem('historyData','');
      queryHistory();
    });
  }

  function deleteHistory(){
    $(".search-history-list").on('click','.btn-delete',function(){
      var history = $(this).parent().data('history');

      var historyData = localStorage.getItem('historyData');

      if(historyData) {
        historyData = JSON.parse(historyData);
      }else{
        historyData =[];
      }

      var historyIndex = historyData.indexOf(history+"");
      // 删除下标为historyIndex的数组
      historyData.splice(historyIndex,1);
      // 删除完成后再次保存这个数据
      localStorage.setItem('historyData',JSON.stringify(historyData));
      // 重新查询数据，渲染到页面上
      queryHistory();
    })
  }