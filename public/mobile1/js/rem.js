/*
 * @Author: zhengwei
 * @Date:   2017-12-25 23:39:44
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2017-12-25 23:40:44
 */
var windowWidth = document.documentElement.clientWidth;
console.log(windowWidth);
var htmlfontSize = windowWidth / 10;
document.querySelector('html').style.fontSize = htmlfontSize + 'px';
window.addEventListener('resize', function() {
    var windowWidth = document.documentElement.clientWidth;
    console.log(windowWidth);
    var htmlfontSize = windowWidth / 10;
    document.querySelector('html').style.fontSize = htmlfontSize + 'px';
});
