###BOM对象
	这些BOM对象在浏览器中都是作为window对象的属性保存的，可以通过window对象来使用，也可以直接使用
  	Window
  			- 代表的是整个浏览器的窗口，同时window也是网页中的全局对象
  	
  	Navigator
 			- 代表的当前浏览器的信息，通过该对象可以来识别不同的浏览器
 			
    Location
                - 代表当前浏览器的地址栏信息，通过Location可以获取地址栏信息，或者操作浏览器跳转页面
                        Document 和 Window 接口都有这样一个链接的Location，
                        分别通过 Document.location和Window.location进行访问
 					
 	History
 			- 代表浏览器的历史记录，可以通过该对象来操作浏览器的历史记录
  				由于隐私原因，该对象不能获取到具体的历史记录，只能操作浏览器向前或向后翻页
  				
  	Screen
  			- 代表用户的屏幕的信息，通过该对象可以获取到用户的显示器的相关的信息
  				基本不用

###Window
	alert(message);
		 显示一个警告对话框,上面显示有指定的文本内容以及一个"确定"按钮
	confirm();
		显示一个具有一个可选消息和两个按钮(确定和取消)的模态对话框 
	prompt(text, value)
		result = window.prompt(text, value);
		显示一个对话框,对话框中包含一条文字信息,用来提示用户输入文字.
			result 用来存储用户输入文字的字符串，或者是 null.
			text 用来提示用户输入文字的字符串,如果没有任何提示内容,该参数可以省略不写.
			value 文本输入框中的默认值
	open()
	        根据指定的参数，将一个资源加载到一个新的浏览上下文（如一个窗口）
	        或一个已经存在的浏览上下文中
		    window.open(urlStr,name,str);
		    
	close()
		关闭当前窗口或某个指定的窗口
		
###Navigator
    userAgent
        返回当前浏览器的用户代理（user agent）字符串。	
		
###Location
	href
		包含整个URL的一个字符串
	protocol
		包含URL对应协议的一个字符串，最后有一个":"
	host
		包含了域名的一个字符串，可能在该串最后带有一个":"并跟上URL的端口号
	hostname
		不带端口号的域名
	port
		包含端口号的一个字符串
	pathname
		包含URL中路径部分的一个字符串，开头有一个“/"
	search
		包含URL参数的一个字符串，开头有一个“?”
	hash
		包含块标识符的字符串，开头有一个“#”
		
	Location.replace()方法以给定的URL来替换当前的资源
		调用replace()方法后，当前页面不会保存到会话历史中（session History），这样用户点击回退按钮将不会再跳转到该页面
		
  	Location.reload() 方法用来刷新当前页面。
  		该方法只有一个参数，当值为 true 时，将强制浏览器从服务器加载页面资源，当值为 false 或者未传参时，浏览器则可能从缓存中读取页面
  	  
###History
	History.back()
		前往上一页, 用户可点击浏览器左上角的返回按钮模拟此方法. 等价于 history.go(-1).
	History.forward()
		在浏览器历史记录里前往下一页，用户可点击浏览器左上角的前进按钮模拟此方法. 等价于 history.go(1).
	History.go()
		通过当前页面的相对位置从浏览器历史记录( 会话记录 )加载页面。比如：参数为-1的时候为上一页，参数为1的时候为下一页			 		
			 