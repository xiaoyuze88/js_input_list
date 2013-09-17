// js_ul_list.js
// version : 1.0
// author : Xiao Yuze
// license : MIT
// xiaoyz.me



(function(window) {
		var doc = document;
		var tag = {
//original data set;
			data : '1,2,3,4,5',
//data array
			data_arr : [],
//  id of the input tag
			id : '',

// inited = true means this tag is already, false means that sth is missing when init this plugin
			inited : false,

// the dom of the ul dom
// the lis' length
			liLength : 0,

//index of the selected li
			selectLi : -1,
			dom : '',
//status of list shown or not
			showul : false,

//data type ,include 'static','ajax',
// if using 'static', the data is static and is inited by input {data:'datastring'}
// if using 'ajax', you should using the 'onTyping' event and you can using our ajax function or 
// get data in your own way , and trigger the list by trigger function, which will shown below.
			dataType : 'static',


// you should run this function before you using this plugin,the function accept an object,
// 			obj {
//
// 
// 				data : '1,2,3,4,5',		if your data type is static , you should init the data first,
// 											or you can ignore it if using 'ajax' data type.
// 				id :　'inputId', 		id of your input tag,
// 				dataType : 'static'		(optional) default to 'static',or you can use 'ajax' if you need
// 											to show your list dynamically.
// 			}
			init : function (obj) {
				this.data = obj.data || this.data;
				this.id = obj.id || '';

				var dom = doc.getElementById(this.id) || '';
				this.inited = this.checkInit();

				if (dom)
				{
					addEventListener(dom,'keydown',onKeyDown);
					addEventListener(dom,'keyup',onKeyUp);
					addEventListener(dom,'blur',this.onBlur);
					addEventListener(dom,'focus',this.onFocus);
				}
				if ('autocomplete' in dom)
				{
					dom.autocomplete = 'off';
				}

				var uldom = doc.createElement('ul');
				uldom.id = "ul_________append";
				doc.body.appendChild(uldom);
				this.data_arr = this.data.split(',');
				this.dataType = obj.dataType || this.dataType;
			},
			// check whether plugin is inited successfully
			checkInit : function() {
				if(this.data && this.id)
				{
					return true;
				}
				else
				{
					return false;
				}
			},
			// you can use setData if your data type is static,we prefer using trigger function.
			setData : function(data_string) {
				if(data_string && typeof data_string == 'string')
				{
					this.data = data_string;
					this.data_arr = data_string.split(',');
				}
			},
			// you can get your data list yourself, then use this method to setDate and show the li list.
			trigger : function(data_string) {
				if(data_string && typeof data_string == 'string')
				{
					this.setData(data_string);
					this.refreshTagList()
				}
			},
			// get the value of the input
			getValue : function() {
				if(this.id) return doc.getElementById(this.id).value;
				else return false;
			},
			// set the value of the input
			setValue : function(value) {
				if(this.id) 
				{
					doc.getElementById(this.id).value = value;
				}
				else return false;
			},
			// refresh the li list
			refreshTagList : function() {
				if(!this.inited) return false;
				var self = this;
				this.selectLi = -1;
				//当输入字母，重置刷新显示列表
					// 获取已有tag列表
				var value = self.getValue();
				self.clearTagList();
				if(value){
					if(self.data.indexOf(value) > -1)
					{
						var show_arr = [];
						var innerHTML = '';
						for(var l = self.data_arr.length; l; l--)
						{
							if(self.data_arr[l-1].indexOf(value) > -1)
							{
								
								show_arr.push(self.data_arr[l-1]);
							}
						}
						self.liLength = show_arr.length;
						if(self.liLength>0)
						{
							makeUl(show_arr);
						}
					}
				}
			},
			// clear the selected status
			tagUnselected:function (dom) {
			//传入dom,把该li取消选中
				dom.className = '';
				// dom.selected=0;	
			},
			// input the specific dom you want to select
			tagselected:function (dom) {	
				//传入dom,把该li选中，并把其值传到input处
				this.setValue(dom.innerHTML);
				dom.className = 'active';
			},
			// clear the li list
			clearTagList : function() {
				//清除标签显示栏
				var dom = doc.getElementById("ul_________append");
				if(dom)
				{
					this.selectTag=-1;
					if(dom.style.display == 'block')	{
						dom.style.display = 'none';
					}
					dom.innerHTML = '';
					this.showul = false;
				}

			},
			
			// you can use ajax('get','index.php?p=abc&a=c&b=d',function(data){})
			// or ajax('get','index.php',{p:'abc',a:'c',b:'d'},function(data){})
			ajax : function(method,url,data,callback) {
				var xmlhttp,method,callback_fn;
				var send_data = {};

				if(!method || typeof method != 'string') return false;
				method = method.toUpperCase();
				

				if(typeof data == 'function' && typeof callback == 'undefined')
				{
					callback_fn = data;
				}
				else if(Object.prototype.toString.call(data) == '[object Object]' && typeof callback == 'function')
				{
					send_data = data;
					callback_fn = callback;
				}
				else
				{
					return false;
				}

				if (window.XMLHttpRequest)
				{
				// code for IE7+, Firefox, Chrome, Opera, Safari
					xmlhttp = new XMLHttpRequest();
				}
				else
				{
				// code for IE6, IE5
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				if( method == 'GET')
				{
					var urlPara = urlEncode(send_data);
					if(urlPara)
					{
						if(!url.indexOf('?') > -1)
						{
							url += '?' + urlPara;
						}
						else
						{
							url += "&" + urlPara;
						}
					}
					xmlhttp.onreadystatechange = fn;
					xmlhttp.open(method,url,true);
					xmlhttp.send();
				}
				else if(method == 'POST')
				{
					xmlhttp.onreadystatechange = fn;
					xmlhttp.open(method,url,true);
					xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
					xmlhttp.send(urlEncode(send_data));
				}

				function fn()
				{
					var statusText = '';
					var data;

					if (xmlhttp.readyState==4)
					{
						if(xmlhttp.status==200)
						{
							statusText = 'success';
							data = xmlhttp.responseText;
							callback_fn(data,statusText);
						}
						else
						{
							statusText = 'else';
							data = xmlhttp.responseText;
							callback_fn(data,statusText);
						}
					}
				}
			},
			// below is some event handler
			// if you want to show your own ajax data ,you should use this function like:
			// js_ul_list.onTyping = function(){
			//    your callback here
			// }
			onTyping :function(callback) {
				callback();
			},
			// on blur , clear the li list
			onBlur : function(e) {
				tag.clearTagList();
			},
			// on focus , show li list
			onFocus : function (e) {
				tag.refreshTagList();
			},
			// on ese, clear li list
			onEsc : function(event) {
				//按esc，清除tag列表
				this.clearTagList();
				return;	
			},
			// on enter , clear li list
			onEnter : function(event) {
				if(this.showul)
				{
					preventDefault(event);
					this.clearTagList();
				}
			},
			onUpArrow : function(event) {
				preventDefault(event);
				var liArr;
				if(this.selectLi > -1)
				{
					var uldom = doc.getElementById("ul_________append");
					this.selectLi -= 1;

					if(this.selectLi == -1)
					{
						liArr = uldom.childNodes;
						for(var l = liArr.length;l;l--)
						{
							if(liArr[l-1].className == 'active')
							{
								this.tagUnselected(liArr[l-1]);
							}
						}
						
					}
					else
					{

						liArr = uldom.childNodes;
						for(l=liArr.length;l;l--)
						{
							var id = liArr[l-1].id.replace("li_________append_",'');
							if(id == this.selectLi)
							{
								this.tagselected(liArr[l-1]);
								this.tagUnselected(liArr[l]);
							}
						}
					}
				}
			},
			onDownArrow : function(event) {
				preventDefault(event);
				if(this.selectLi >= this.liLength-1) return false;
				this.selectLi += 1;
				var uldom = doc.getElementById("ul_________append");
				var liArr = uldom.childNodes;
				for(l=liArr.length;l;l--)
				{
					var id = liArr[l-1].id.replace("li_________append_",'');
					if(id == this.selectLi)
					{
						this.tagselected(liArr[l-1]);
						if(l-1 > 0)
						{
							this.tagUnselected(liArr[l-2])
						}
					}
				}
			}
		}
	
	function preventDefault(e)
	{
		e = e || window.event;
		if(e.preventDefault)
		{
			e.preventDefault();
		}
		else
		{
			e.returnValue = false;
		}
	}

// input object data
	function urlEncode(data)
	{
		var urlArr = [];
		for(var i in data)
		{
			urlArr.push(i + '=' + encodeURIComponent(data[i]));
		}
		return urlArr.join("&");
	}

// input the data array , and insert the li html inside ul tag.
	function makeUl(li_arr)
	{
		var innerHTML = '';
		var uldom = doc.getElementById("ul_________append");
		var inputdom = doc.getElementById(tag.id);
		for(var i=0,l=li_arr.length; i<l; i++)
		{
			innerHTML += '<li id="li_________append_' + (i) + '">'+ li_arr[i] + '</li>';	
		}
		
		var position = getPosition(inputdom);

		uldom.style.top = (position.top + position.height) + 'px';
		uldom.style.left = position.left + 'px';
		uldom.style.width = position.width + 'px';
		uldom.innerHTML = innerHTML;
		uldom.style.display = 'block';
		tag.showul = true;
	}

	function removeChild(pdom,dom)
	{
		if(pdom && dom)
		{
			try {
				pdom.removeChild(dom);
			} catch(e){}
		}
	}

	function getPosition(dom)
	{	
		if(!dom) return {
			top : 0,
			left : 0 ,
			width : 0,
			height : 0
		}
		var top = getOffsetTop(dom);
		var left = getOffsetLeft(dom);
		
		var width = dom.clientWidth;
		var height = dom.offsetHeight;
		return {
			top : top,
			left : left,
			width : width,
			height : height
		}
	}

// get offsetTop
	function getOffsetTop(dom)
	{
		var top = dom.offsetTop;

		while(dom = dom.offsetParent)
		{
			top += dom.offsetTop;
		}
		return top;
	}

// get offsetLeft
	function getOffsetLeft(dom)
	{
		var left = dom.offsetLeft;
		while(dom = dom.offsetParent)
		{
			left += dom.offsetLeft;
		}
		return left;
	}

	function addEventListener(obj,event,handler) {
		if(window.addEventListener)
		{
			obj.addEventListener(event,handler,false);
		}
		else if(window.attachEvent)
		{
			obj.attachEvent('on' + event,handler);
		}
	}


	function onKeyUp(event) {
		var e = event.keyCode;
		if(
		e != 13 && e != 186 && e != 37 && e != 39 && e != 27 && e != 40 && e != 9 && e != 38)
		{
			if (tag.dataType != 'static')
			{
				// our onTyping only handle some keycode
				tag.onTyping();
			}
			else
			{
				tag.refreshTagList();
			}
		}
	}

	function onKeyDown (event) {
		if(event.keyCode == 13 || event.keyCode == 186){
			// enter button
			tag.onEnter(event);
		} else if(event.keyCode==27) {
			//esc
			tag.onEsc(event);
		} else if(event.keyCode==40 || event.keyCode==9) {
			// tab or arrow down
			tag.onDownArrow(event);
		} else if(event.keyCode==38) {
			//	arrow up
			tag.onUpArrow(event);
		}
	}

	
	//we attach the var 'js_ul_list' to the global object -- window,
	// so you can use js_ul_list.xxx to access our function inside the tag object;
	window.js_ul_list = tag;

})(window);