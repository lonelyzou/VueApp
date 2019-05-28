##1
###XML
* XML 可扩展标记语言。
* XML 被设计用来传输和存储数据。
* XML和HTML类似，不同的是HTML中都是预定义标签，而XML中没有预定义标签，全都是自定义标签，用来表示一些数据。
* 例子：学生数据：
 
         name = "孙悟空" ; age = 18 ; gender = "男" ;   
* 用XML表示：

        <student>
           <name>孙悟空</name>
           <age>18</age>
           <gender>男</gender>
        </student>
* 现在已经被JSON取代了。
* 用JSON表示：
  
        {"name":"孙悟空","age":18,"gender":"男"}

* 缺点
 * 获取xml存储的数据很麻烦，要匹配正则，使用麻烦，要用库转换为json
 * 传输数据大，请求时间长

###AJAX
* AJAX 简介
 * AJAX 全称为Asynchronous Javascript And XML，就是异步的 JS 和 XML。
 * 通过AJAX可以在浏览器中向服务器发送异步请求。
 * AJAX 不是新的编程语言，而是一种使用现有标准的新方法。
* AJAX的工作原理
  * Ajax的工作原理相当于在用户和服务器之间加了一个中间层(Ajax引擎)，当js引擎解析到Ajax，就交由Ajax引擎解析，并将异步请求发送给服务器，服务器返回响应给Ajax引擎，Ajax引擎又把数据返回给浏览器，使用户操作与服务器响应异步化。
* AJAX的使用: 发送ajax请求
 1. 创建xhr对象

            const xhr = new XMLHttpRequest();
 2. 绑定事件监听
 
             //xhr.responseXML 接收xml格式的响应数据
             //xhr.responseText 接收文本格式的响应数据

             xhr.onreadystatechange = () => {
                xhr.readyState ajax内部状态
                  0: 代表xhr对象被创建好了，初始化状态
                  1: 代表xhr.send方法还未调用（还未发送请求），还可以设置请求头相关信息
                  2: 代表xhr.send方法已经调用（已经发送请求了），并且接受到了部分响应数据（响应首行和响应头 --> 响应状态码，响应头信息）
                  3: 代表接受了部分/全部响应体数据（数据小就全部接受了，数据大就还没接受完）
                  4: 代表接受了全部响应体数据（响应完成了，全部接受完了）
             xhr.status 响应状态码
             
               //当readystate值发生变化的时候，就触发当前事件
             xhr.onreadystatechange = function () {
                console.log('onreadystatechange()');
                //接受响应的内容
               if (xhr.readyState === 2) {
                console.log('来到了readyState===2的时候');
                console.log(xhr.status);
                console.log(xhr.getResponseHeader('ETag'));
                }
                  if (xhr.readyState === 3) {
                    console.log('来到了readyState===3的时候');
                    console.log(xhr.responseText);  //响应数据
                  }
                  if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log('来到了readyState===4的时候');
                    console.log(xhr.responseText);  //响应数据
                  }
                }
              }
 3. 设置请求信息

            xhr.open(请求方式, 请求地址(get请求的查询字符串参数));
            xhr.setRequestHeader(key, value); 设置请求头信息
            xhr.open('GET', 'http://localhost:3000/ajax?username=jack&password=123&date=' + Date.now());
            xhr.setRequestHeader('xxxx', 'xxxxx');
            // xhr.open('POST', 'http://localhost:3000/ajax');
            // xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
 4. 发送请求

             xhr.send(body(post请求的请求体参数-要求以urlencoded方法编码));
             xhr.send();
             // xhr.send('username=jack&password=123'); post请求发送数据
             // 取消发送的ajax请求
              xhr.abort();//常用于验证码重复获取
   
* 解决IE缓存问题
  * 问题：在一些浏览器中(IE),由于缓存机制的存在，ajax只会发送的第一次请求，剩余多次请求不会在发送给浏览器而是直接加载缓存中的数据。 
  * 解决方式：浏览器的缓存是根据url地址来记录的，所以我们只需要修改url地址即可避免缓存问题
xhr.open("get","/testAJAX?t="+Date.now());

* 问题:
  * GET请求
            chrome/firefox 能够缓存get请求, 但是缓存是需要访问服务器然后才走的协商缓存 状态码304
            ie 能够缓存get请求, 但是缓存是没有访问服务器,直接自己浏览器实现了强制缓存 状态码200
              -->  同样的请求拿不到最新的数据
  * 解决: 让请求每次都不一样, 这样就不会缓存了.  http://localhost:3000/ajax?date= Date.now() / Math.random()
  * 缺点: 当前请求就没办法缓存了

###jQuery中的AJAX
* get请求
 * $.get(url, [data], [callback], [type])
   * url:请求的URL地址。
   * data:请求携带的参数。
   * callback:载入成功时回调函数。
   * type:设置返回内容格式，xml, html, script, json, text, _default。
           
             $.ajax({
                  url: 'http://localhost:3000/ajax',  //请求地址
                  method: 'GET',  //请求方式
                  data: {      //get请求查询字符串参数
                    username: 'jack',
                    age: 20
                  },
                  success: function (data) {  //响应成功的回调函数
                    console.log(data);
                  },
                  error: function (error) {  //响应失败的回调函数
                    console.log(error);
                  }
                })
* post请求
 * $.post(url, [data], [callback], [type])
   * url:请求的URL地址。
   * data:请求携带的参数。
   * callback:载入成功时回调函数。
   * type:设置返回内容格式，xml, html, script, json, text, _default。
            
                $.ajax({
                  url: 'http://localhost:3000/ajax',  //请求地址
                  method: 'POST',  //请求方式
                  data: {      //请求参数
                    username: 'jack',
                    age: 20
                  },
                  success: function (data) {  //响应成功的回调函数
                    console.log(data);
                  },
                  error: function (error) {  //响应失败的回调函数
                    console.log(error);
                  }
                })

* 简写型   

        $.get/post(请求地址[,请求参数],成功的回调函数)
        $.get('http://localhost:3000/ajax', {username: 'bob', age: 18}, function (data) {
              console.log(data);
        })
































