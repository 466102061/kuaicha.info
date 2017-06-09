/**
 * js import file
 */

//var location = (window.location+'').split('/');
//var basePath = location[0]+'//'+location[2]+'/'+location[3]+'/'; 
//alert(location);
// 
var version= 1.006;
var importArray = new Array();

// CSS
importArray.push('<link href="/stylesheets/init.css?v='+version+'" rel="stylesheet" type="text/css">');
importArray.push('<link href="/stylesheets/main.css?v='+version+'" rel="stylesheet" type="text/css">');

// js
importArray.push('<script type="text/javascript" src="/javascripts/jquery-1.10.2.min.js?v='+version+'"></script>');
importArray.push('<script type="text/javascript" src="/javascripts/jquery.cookie.js?v='+version+'"></script>');
importArray.push('<script type="text/javascript" src="/javascripts/common.js?v='+version+'"></script>');

document.write(importArray.join(""));

//判断文档类型（html、jsp、php）
function judgeDocumentType(){
	var url=decodeURI(location.href.split('#')[0]);
    var beginIndex = parseInt(url.lastIndexOf("/")+1);
    var flags = url.substring(beginIndex,url.length);
    if(flags.lastIndexOf("?")!=-1){//假如链接有参数index.jsp?p=p
    	var lastIndex = parseInt(flags.lastIndexOf("?"));
    	flags = flags.substring(0,lastIndex);
    }
    //flags = index.jsp/index.html
    var index = parseInt(flags.lastIndexOf(".")+1);
    var flag = flags.substring(index,flags.length);
    return flag;
}
//引用特有的js
function initRequriedJs(string){
	var hm = document.createElement("script");
	hm.type='text/javascript';
	hm.src = '/javascripts/'+string+'?v='+version;
	document.getElementsByTagName("body")[0].appendChild(hm);
}