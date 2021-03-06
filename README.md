#Javascript Input Data List#

Javascript Input Data List is a JS plugin that can show the data list when typing on an input tag.

* Is written by pure Javascript , and please feel free using it without any library.
* The js_input_list.min.js is only 4kb.
* Supports IE6+, Firefox, Chrome, Safari and other standard browsers.
* Written by Xiao Yuze ( xiaoyz.me )
* I accept further customization job if you require more functions. Please contact me via xiaoyuze88@gmail.com

![screenshot](https://raw.github.com/xiaoyuze88/js_input_list/master/preview.png)

##Configuration##

Usage: 

```javascript

js_input_list.init({configObject});

```

If your data type is static:
```javascript
js_input_list.init({
	data:'abc,ae,a,efg,hijk,lmno,pqrs,tuvw,xyz', 
	id : 'inputid',  							
	dataType : 'static',	
	ignoreCase : true					 
});
```

If your want to check data dynamtically by using ajax:
```javascript

js_input_list.init({
	id : 'inputid',
	dataType : 'ajax',
	ignoreCase : true
});

js_input_list.onTyping = function(){
	var value = js_input_list.getValue();
	js_input_list.ajax("post",'data.php',{value:value},function(data,status) {
		if(status=='success')
		{
			js_input_list.trigger(data);	
		}
		else
		{
			alert(data);
		}
	});
};
```

You can use the following keys in the configObject to overwrite the default configuration:

<b>id (String)</b>
<i style="display:block; margin-left:2em;">(Required) The id of the input tag you want to show the list.</i>

<b>dataType (String)</b>
<i style="display:block; margin-left:2em;">(Optional) It can be 'static',or 'ajax'. Default to be 'static', if your data type is static, you need to init the data list when init the plugin, or you can set it later by using <b>js_input_list.setData</b> function.  </i>
<i style="display:block; margin-left:2em;">If your data type is 'ajax', you can handle your data in your own way, then use the  <b>js_input_list.trigger</b> function. Also you can use <b>js_input_list.ajax</b> function to get your data, then use the 'trigger' method, like the example shown before.</i>

<b>data (String)</b>
<i style="display:block; margin-left:2em;">(Optional) If your data type is 'static', you need to init your data list, also you can set it later by using. <b>js_input_list.setData</b> function</i>

<b>ignoreCase (Boolean)</b>
<i style="display:block; margin-left:2em;">(Optional) Default to be false, if it set to true, it will ignore upper or lower case when match the value with the data list. <b style="font-size:14px;opacity:0.8">(NOTICE: If you want to igone case while you're using 'ajax' data type, make sure your server side ignore the case too.)</b></i>

##Data Type 'AJAX'##
<i style="display:block; margin-left:2em;">If your data type is 'ajax', there are two ways to set data list dynamiclly by using ajax.
</i>
<br/>
<i style="display:block; margin-left:2em;">
1. You can handle your data in your own way , then trigger the <b>js_input_list.trigger(string) </b>method.
</i>
<br/>
```javascript
var data = "a,b,c"; // get the data list in your own way.
js_input_list.trigger(data);	//then trigger the data list and try to match the value in the input tag with data list
```

<i style="display:block; margin-left:2em;">
2. You can use the 'ajax' function to send a ajax request and then trigger it, just remember to put them into the onTyping event's handler.
</i>
<br/>
```javascript
js_input_list.onTyping = function(){
	var value = js_input_list.getValue();
	js_input_list.ajax("get",'data.php',{value:value},function(data,status) {
		if(status=='success')
		{
			js_input_list.trigger(data);	
		}
		else
		{
			alert(data);
		}
	});
};
```




##Methods##
I expose some methods that is useful.

You can simply use it like:
```javascript
js_input_list.method(arguments);
```

<b>setData (String)</b>
<i style="display:block; margin-left:2em;">Set your data list,the data format should be like "abc,paul,paris,marks".</i>

```javascript
var data = "a,b,c,paul,ajax";
js_input_list.setData(data);
```

<b>getValue ()</b>
<i style="display:block; margin-left:2em;">This function can return the value of the input tag that you inited.</i>

<b>setValue ()</b>
<i style="display:block; margin-left:2em;">This function can set the value of the input tag that you inited.</i>

<b>hide ()</b>
<i style="display:block; margin-left:2em;">By using this function , the ul list will be hidden.</i>

<b>show ()</b>
<i style="display:block; margin-left:2em;">By using this function , it will check the value of the input tag and try to find it in your data list first. If found match data , the ul list will show. Please make sure you've inited your data list already.</i>

<b>trigger (String)</b>
<i style="display:block; margin-left:2em;">By input the data string to the function, it will set it to the data list first and then get the value of your input tag, if there is something match, show it. Please make sure the data you input is the right data format like "a,b,c".</i>

```javascript
var data = "a,b,c"; // get the data list in your own way.
js_input_list.trigger(data);	//then trigger the data list and try to match the value in the input tag with data list
```

<b>ajax (method,url,data,callback)</b>
<br/>
<i style="display:block; margin-left:2em;">This function looks kinder similar with that in the jQuery, but there is difference.<br/> If you're using 'get' method(both 'get' or 'GET' is ok), you can use it like 
```javascript
ajax('get','index.php?a=b&c=d',callback); // recommend

//or

ajax('get','index.php',{a:'b',c:'d'},callback);
```
 They are both ok, however the previous one is strongly recommend.<br/>  The callback function receive two parameter, 'data' and 'status', just like the one in jQuery.But the status has only 'success' and 'else' two options.<br/>  If using 'post' method, you can only use it in this way : ajax('post','index.php',{a:'b',c:'d'},callback)</i>
<br/> 
Example ('GET' method):
```javascript
js_input_list.ajax("get",'data.php',{value:value},function(data,status) { // recommend
	if(status=='success')
	{
		js_input_list.trigger(data);	
	}
	else
	{
		alert(data);
	}
});

//or

js_input_list.ajax("get",'data.php?a=b&c=d',function(data,status) {
	if(status=='success')
	{
		js_input_list.trigger(data);	
	}
	else
	{
		alert(data);
	}
});

```

Example ('POST' method):
```javascript
js_input_list.ajax("post",'data.php',{value:value},function(data,status) {
	if(status=='success')
	{
		js_input_list.trigger(data);	
	}
	else
	{
		alert(data);
	}
});
```

##Event##

<b id="onTyping">onTyping </b>
<i style="display:block; margin-left:2em;">This event is triggered by typing in the input tag, you should put the ajax, or trigger function inside the event handler.</i>
```javascript
js_input_list.onTyping = function(){
	var value = js_input_list.getValue();
	js_input_list.ajax("get",'data.php',{value:value},function(data,status) {
		if(status=='success')
		{
			js_input_list.trigger(data);	
		}
		else
		{
			alert(data);
		}
	});
};
```