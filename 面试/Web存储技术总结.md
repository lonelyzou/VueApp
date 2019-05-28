## Cookie
1. 是什么？
  * 本质上是一个存储浏览器端的文本
2. 作用：
  * 可以用来给浏览器存储数据的
  * 解决http协议无状态问题
3. 工作原理
  * 首次：浏览器发送请求给服务器，服务器返回响应给浏览器，此时返回了cookie，浏览器自动保存下来
  * 下次：浏览器发送请求时就会自动携带上cookie，服务器通过解析cookie，从而判断浏览器之前的行为（是否登录过），返回给浏览器相应响应
4. 服务器端使用
  - 设置/修改cookie
    res.cookie(key, value, options)
  - 获取cookie
    app.use(cookieParser());
    req.cookies
  - 删除cookie
    res.clearCookie(key)
5. 浏览器使用
  * document.cookie 读写二合一
  
  * document.cookie = 'hello=123;expires=' + new Date(Date.now() + 1000 * 3600 * 24);
6. cookie的有效期
  - 会话cookie （浏览器打开到浏览器关闭是一次会话）
     * 会话开始时产生，会话结束自动销毁
  - 持久化cookie
     * res.cookie('userId', 'sunwukong', {maxAge: 1000 * 3600 * 24 * 7}); 7天内生效
     * res.cookie('userId', 'sunwukong', {maxAge: 1000 * 3600 * 24 * 365 * 10});  10年内生效，永久
7. 缺点：
  - 存储容量有限  大约4kb左右， 数量为20个左右
  - 传输流量比较大  如果cookie数量比较多，每次请求时都会自动携带cookie

## Session
1. 是什么？是一个存储服务器端会话对象
2. 作用？存储数据、解决http协议无状态问题
3. 工作原理
  * 浏览器首次发送给服务器请求，此时开启会话，服务器会为本次会话创建session对象
  * 服务器会将session的id作为cookie返回给浏览器，浏览器接受后就存起来
  * 下一次浏览器发送请求就会自动携带上cookie，服务器就要解析cookie得到session_id，
  * 通过session_id找到对应session对象，然后根据session对象中的内容返回给浏览器相应的响应
4. 使用：
  * 想将会话存储的session进行持久化储存，就得使用上数据库
  * 设置一个中间件
  * 今后通过 req.session 读写二合一

5. cookie 和 session 区别
  * 储存位置： cookie在浏览器端  session在服务器端
  * 存储容量大小： cookie较小   session无限大
  * 传输流量： cookie较多    session只产生一个cookie，较小
  * 安全性：  cookie安全更低（保存不是敏感数据）    session安全更高（登陆、注册）


## Webstorage
* SessionStorage和LocalStorage都是本地存储，不会被发送到服务器上。同时空间比Cookie大很多，一般支持5-10M
* 浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。
  * Storage.getItem('key');
    * 该方法接受一个键名作为参数，返回键名对应的值。
  * Storage.setItem('key', 'value');
    * 该方法接受一个键名和值作为参数，将会把键值对添加到存储中，如果键名存在，则更新其对应的值。
  * Storage.removeItem('key');
    * 该方法接受一个键名作为参数，并把该键名从存储中删除。
  * Storage.clear()
    * 调用该方法会清空存储中的所有键名
	* storage事件：	
	  * Storage 对象发生变化时（即创建/更新/删除数据项时，重复设置相同的键值不会触发该事件，Storage.clear() 方法至多触发一次该事件）会触发
    * 在同一个页面内发生的改变不会起作用
    * 在相同域名下的其他页面发生的改变才会起作用。(修改的页面不会触发事件，与它共享的页面会触发事件)
* 区别
  * LocalStorage是浏览器本地持久化存储技术，也叫永久存储
  * SessionStorage是浏览器本地临时存储技术，也叫会话存储
* 使用`store`库完美兼容所有浏览器

## IndexDB和WebSQL
* IndexedDB 和 WebSQL 都是用于客户端存储大量结构化数据。
* 该API使用索引来实现对该数据的高性能搜索。
* 不同的是IndexedDB是非关系型，而WebSQL是关系型。
* WebSQL官方不在维护，但兼容性较好，基本不使用。
* IndexedDB在维护，兼容性较差
* 结合`localForage`库使用IndexDB和WebStorage
* https://juejin.im/post/5bdd67206fb9a04a0c2de0c3
* https://github.com/localForage/localForage

## PWA
* 渐进式网络应用程序(Progressive Web Application - PWA)，是一种可以提供类似于原生应用程序(native app)体验的网络应用程序(web app)。PWA 可以用来做很多事。其中最重要的是，在离线(offline)时应用程序能够继续运行功能。这是通过使用名为 Service Workers 的网络技术来实现的。
* 简单来讲：
	* 能够离线访问资源
	* 能够使用原生系统功能
* https://zoumiaojiang.com/article/amazing-workbox-3/

## Manifest
* html5 离线缓存文件
* https://juejin.im/post/59cdb48b518825788565c5f0