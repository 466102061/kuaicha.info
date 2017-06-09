//设置文档标题
function setDocumentTitle(title) {
    var title = title;
    document.title = title;
}


//获取链接上'?'后键值（key）为str的参数
function getLocationHrefFlag(str){
	//http://www.kuaicha.info/lawMobile/exposureForm.jsp?f=454&k=hjj
	var url=decodeURI(location.href.split('#')[0]);
	//url=decodeURI(url);
	if(url.lastIndexOf("?")!=-1){//假如链接有参数
       var beginIndex = parseInt(url.lastIndexOf("?")+1);
	   var flags = url.substring(beginIndex,url.length);
	   //flags : f=454&k=hjj
		var array = flags.split('&');
	    //str : 链接上'?'后的键值(key)
		for(var i = 0; i < array.length; i++){
			var flag = array[i].split('=');
			if(flag[0] == str){
				return flag[1];
			}
		}
	}
}
$(function(){
	 $(".has-subMenue").hover(function() {
        $(this).addClass("nav-items-bg");
        $(this).find("span").addClass("nav-tab-hover");
        $(this).find(".sub-menue").show();
    },
    function() {
        $(this).removeClass("nav-items-bg");
        $(this).find("span").removeClass("nav-tab-hover");
        $(this).find(".sub-menue").hide();
    });
    $(".sub-menue li").hover(function() {
        $(this).addClass("sub-menue-items-active").siblings().removeClass("sub-menue-items-active");
    },
    function() {
        $(".sub-menue li").removeClass("sub-menue-items-active");
    });
    $(".my-center-items").hover(function() {
        $(this).find("span").addClass("my-center-title-hover");
        $(this).find(".my-center-tab").show();
    },
    function() {
        $(this).find("span").removeClass("my-center-title-hover");
        $(this).find(".my-center-tab").hide();
    });
    $(".my-center-tab li").hover(function() {
        $(this).addClass("my-center-tab-items-cur").siblings().removeClass("my-center-tab-items-cur");
    },
    function() {
        $(".my-center-tab li").removeClass("my-center-tab-items-cur");
    });
});
//弹窗提示函数

function _TalkFunction(){
	/**
	*页面加载函数
	*type == 'show'显示加载；
	*type == 'hide'隐藏加载
	*用法：TalkFunction.load(type)
	*/
	this.load = function(type){
		if(type == 'show'){
		    //remove old load
			$("[id=loading]").remove();
			var loadArray = new Array();
			loadArray.push('<div class="mask-bg pic_png" id="loading">');
			loadArray.push('<div class="mask-loding"></div>');
			loadArray.push('</div>');
			$("body").prepend(loadArray.join(''));
			$("[id=loading]").fadeIn();
		}
		if(type == 'hide'){
			$("[id=loading]").fadeOut();
		}
	};
	/***
	 * 弹窗确认函数
	 * type == 'success'正确弹窗(打钩绿色图标)；type== 'error'错误弹窗(叹号灰色图标); type == 'quest'问号灰色图标
	 * msg 弹窗提示信息
	 * url 跳转url(选填；绝对路径，包括根目录下的文件夹；列如：'index.jsp';'VIEW/login/register.html')
	 * 用法TalkFunction.confirmAlert(type,msg,url);
	 */
	this.confirmAlert = function(type,msg,url){
		$("[id=confirmAlert]").remove();
		var array = new Array();
		array.push('<div class="mask-bg pic_png" id="confirmAlert" style="display:none;">');
		//array.push('<div class="mask-tips-wrap pic_png">');
		array.push('<div class="mask-iner-wrap pic_png">');
		array.push('<div class="btn-wrap"><a class="btn-close btn-tips-top-close" id="btnClose" href="javascript:;"></a></div>');
		if(type == 'success'){
			array.push('<div class="mask-ico-wrap"><span class="mask-ico mask-ico-correct"></span></div>');
		}
		if(type == 'error'){
			array.push('<div class="mask-ico-wrap"><span class="mask-ico mask-ico-warning"></span></div>');
		}
		if(type == 'quest'){
			array.push('<div class="mask-ico-wrap"><span class="mask-ico mask-ico-quest"></span></div>');
		}
		array.push('<p class="mask-tips-msg">'+msg+'</p>');
		array.push('<div class="mask-tips-btn"><a class="btn btn-tips-bottom-close" id="btnConfirm" href="javascript:;">确定</a></div>');
		array.push('</div></div>');
		$("body").prepend(array.join(''));
		$("[id=confirmAlert]").show();
		//绑定关闭弹窗事件
		$(document).on("click","#btnClose,#btnConfirm",function(){
			if(url == '' || url == null || url == 'null' || url == undefined || url == 'undefined'){
				$(this).closest("#confirmAlert").hide();
			}else{
				location.href = "/"+url;
			}
		});
	};
//	/**
//	*浏览器版本过低弹窗提示
//	*html提示信息的html
//	*/
//	this.compatibilityAlert = function(html){
//		$("#compatibility-bg").remove();
//		var array = new Array();
//		array.push('<div class="mask-bg compatibility-bg" id="compatibility-bg" style="display:none;">');
//		array.push('<div class="compatibility-wrap">');
//		array.push('<div class="compatibility-inner">');
//		array.push('<div class="compatibility-content"><p>'+html+'</p></div>');		
//		array.push('<button class="compatibility-btn" id="compatibility-btn">确定</button>');
//		array.push('</div></div></div>');
//		$("body").prepend(array.join(''));
//		$("#compatibility-bg").show();
//		$(document).on("click","#compatibility-btn",function(){
//			$("#compatibility-bg").hide();
//		});
//	}
	/***
	 * ajax返回表单错误弹窗提示函数
	 * array具体错误input框id的集合:最后要获取焦点的input框的id一定是放在数组的最后
	 * msg 弹窗提示信息
	 * 用法TalkFunction.formErrorAlert(msg,obj);
	 */
	this.formErrorAlert = function(objArray,msg){
		$("[id=formErrorAlert]").remove();
		var array = new Array();
		array.push('<div class="mask-bg pic_png" id="formErrorAlert" style="display:none;">');
		array.push('<div class="mask-tips-wrap pic_png">');
		array.push('<div class="btn-wrap"><a class="btn-close btn-tips-top-close" id="btnCloseFormErrorAlert" href="javascript:;"></a></div>');
		array.push('<div class="mask-ico-wrap"><span class="mask-ico mask-ico-warning"></span></div>');
		array.push('<p class="mask-tips-msg">'+msg+'</p>');
		array.push('<div class="mask-tips-btn"><a class="btn btn-tips-bottom-close" id="btnFormErrorAlert" href="javascript:;">确定</a></div>');
		array.push('</div></div>');
		$("body").prepend(array.join(''));
		$("[id=formErrorAlert]").show();
		//绑定关闭弹窗事件
		$(document).on("click","#btnCloseFormErrorAlert,#btnFormErrorAlert",function(){
			for(var i = 0; i< objArray.length; i++){
				$(objArray[i]).val('');
				if(i == objArray.length-1){
					//最后一个input框获取焦点
					$(objArray[i]).val('').focus();
					$(this).closest("#formErrorAlert").hide();
				}
			}
		});
	};
}
var TalkFunction = new _TalkFunction();