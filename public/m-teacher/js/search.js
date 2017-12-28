/*
 * @Author: zw
 * @Date:   2017-12-27 15:47:16
 * @Last Modified by:   zw
 * @Last Modified time: 2017-12-27 17:27:15
 */
$(function() {
    addHistory();
    queryHistory();
    deleteHistory();
    clearHistory();
});
//添加历史记录
function addHistory() {
    // 1. 给搜索按钮添加点击事件 
    $('.btn-search').on('click', function() {
        // 2. 获取输入框输入的搜索内容
        // console.log($('.search-input').val());
        var search = $('.search-input').val();
        if (!search) {
            alert('请输入要搜索的商品');
            return;
        }
        // 3. 把当前的搜索记录存储到本地存储
        // 		3.1 获取本地存储的搜索历史记录 （本地存储里面的值都是字符串）
        // 		3.2 把本地存储历史记录的值转成一个数组  JSON.parse(字符串)
        // 		3.3 把当前搜索的内容 添加到搜索历史记录的数组里面
        // 		3.4 把添加完后的数组 转成字符串存储到本地存储中 JSON.stringify(数组);
        // 3.1 获取本地存储的搜索历史记录 （本地存储里面的值都是字符串）
        var historyData = localStorage.getItem('historyData');
        // 判断本地存储的历史记录是否有值
        if (historyData) {
            // 有值就转成数组
            historyData = JSON.parse(historyData);
        } else {
            // 如果没有值 就赋值为空数组
            historyData = [];
        }
        // 判断当前搜索的内容是否在数组里面存储 存在返回当前存在的索引 不存在返回-1 
        if (historyData.indexOf(search) == -1) {
            //不存在就添加
            // 把搜索的内容添加到历史记录数组里面
            historyData.push(search);
            // 把历史记录数组转成字符串存储到本地存储中setItem('本地存储的键',当前的历史记录的值);
            localStorage.setItem('historyData', JSON.stringify(historyData));
            // 添加了一次历史记录就查询一次
            queryHistory();
        }
        // 点完搜索清空输入框
        $('.search-input').val('');
    });
}

// 查询历史记录 显示到历史记录列表
function queryHistory() {
    /*1. 获取本地存储的搜索历史记录
    2. 把获取的搜索历史记录转换成数组 如果为空就赋值为空数组
    3. 定义模板引擎生成记录记录模板
    4. 调用模板引擎生成html
    5. 把生成的模板放到页面上*/
    // 3.1 获取本地存储的搜索历史记录 （本地存储里面的值都是字符串）
    var historyData = localStorage.getItem('historyData');
    // 判断本地存储的历史记录是否有值
    if (historyData) {
        // 有值就转成数组
        historyData = JSON.parse(historyData);
    } else {
        // 如果没有值 就赋值为空数组
        historyData = [];
    }
    // 如果要反转 就调用数组反转方法
    historyData = historyData.reverse();
    // 数据必须是一个对象
    // template('searchHistoryTmp',数据)
    // 如果是数组需要包装成一个对象才能调用模板引擎生成模板
    var html = template('searchHistoryTmp', { 'rows': historyData });
    // 把生成的模板放到页面上
    $('.search-history-list ul').html(html);
}

function deleteHistory() {
    // 1. 给删除的x添加点击事件
    //     2. 获取当前要删除的记录 （在绑定列表的时候给a添加一个自定义属性 绑定他需要删除的值）
    //     3. 在点击事件里面获取当前x父元素a的自定义属性的值
    //     4. 获取本地存储的值 转成数组
    //     5. 在数组里面查找当前要删除的值（是否存在）
    //     6. 如果存在把当前的值删掉
    //     7. 删除之后要重新保存到本地存储中
    // 因为删除按钮动态生成 需要使用委托绑定事件  注意带.因为是类选择器
    $('.search-history-list').on('click', '.btn-delete', function() {
        // 获取当前点击删除的历史记录
        var history = $(this).parent().data('history');
        //  获取本地存储的搜索历史记录 （本地存储里面的值都是字符串）
        var historyData = localStorage.getItem('historyData');
        // 判断本地存储的历史记录是否有值
        if (historyData) {
            // 有值就转成数组
            historyData = JSON.parse(historyData);
        } else {
            // 如果没有值 就赋值为空数组
            historyData = [];
        }
        //获取到当前历史记录在所有记录数组中的索引
        // 注意indexOf是严格区分数据类型 输入框如果输入的是数字 就是数字 
        //但是数组里面的值是字符串类型 数组1和字符串1 是不一样的 indexOf找不到索引
        // 解决方案就在输入框获取的文字后加一个空字符串 转成字符串
        var historyIndex = historyData.indexOf(history + "");
        historyData.splice(historyIndex, 1)
            // console.log(historyData);
            // 删除完毕之后重新把数组保存到本地存储里面
        localStorage.setItem('historyData', JSON.stringify(historyData));
        // 删除了一次历史记录就查询一次
        queryHistory();
    });
}

function clearHistory() {
    $('.btn-clear').on('click', function() {
        // 直接把本地存储historyData的值设置为空字符串
        localStorage.setItem('historyData', '');
        // 删除了一次历史记录就查询一次
        queryHistory();
    });
}
