##ejs
### 
1. 是什么：
      一个高效的js模板引擎
2. 作用:
      用来实现服务器渲染的
3. 使用
      - 下载ejs
        ：npm i ejs
      - 设置模板资源目录 (为了找到模板资源,才能将数据渲染上去)
        ：app.set('views', '模板资源目录')
      - 设置使用哪个模板引擎解析
        ：app.set('view engine', '使用的模板引擎')
      - 服务器渲染数据到模板资源上
        ：res.render('模板资源名称', {要渲染的数据})
      - 初始化必须为 res.render('login.ejs', {errMsg：''}); 当判断完登录信息后在给页面上渲染提示信息，
      - 你也可以将用户输入的参数保存到{errMsg, data}中，用户刷新时渲染到input的value上就可以保留用户上次输入的一些信息
4.模板资源语法
       * <%= %>  输出转义的数据到模板页面上（更安全）
       * <%- %>  输出非转义的数据到模板页面上
       * <% %>   能写任意js代码，不输出数据到模板页面上


                const express = require('express');
                const app = express();
                app.set('views', 'views'); //当前文件夹有个views文件夹
                app.set('view engine', 'ejs');
                app.get('/ejs', (req, res) => {
                // const errMsg = '6666';
                const errMsg = '<script src="http://localhost:3000"></script>';
                const data = [1, 2, 3, 4, 5, 6];
                //将数据渲染到模板资源上, 并将渲染好数据的模板资源返回给浏览器
                res.render('login.ejs', {errMsg, data});
                })
                
##[art-template](https://aui.github.io/art-template/zh-cn/docs/syntax.html)
* 1.引入template-web.js文件
* 2.创建模板代码
      - 创建script标签，将type改为text/html
      - 添加id属性，目的为了找到当前元素
* 3.编译模板代码
      template('元素id', {要渲染的数据})
* 4.将编译后的标签字符串渲染到页面指定容器中
* 应用：简化写重复结构，对请求回来的数据进行遍历展示
 
###案例

```
<body>

<div id="wrap"></div>

<script type="text/html" id="tpl">
  {{if flag}}
    {{each data}}
      <h2>{{$index}} - {{$value}}</h2>
    {{/each}}
  {{/if}}
</script>

<script type="text/javascript" src="./jquery-1.12.4.js"></script>
<script type="text/javascript" src="./template-web.js"></script>
<script type="text/javascript">
  /*
    1. 引入template-web.js文件
    2. 创建模板代码
      - 创建script标签，将type改为text/html
      - 添加id属性，目的为了找到当前元素
    3. 编译模板代码
      template('元素id', {要渲染的数据})
    4. 将编译后的标签字符串渲染到页面指定容器中

    应用：简化写重复结构，对请求回来的数据进行遍历展示
   */
  const data = ['jack', 'rose'];
  const flag = true;

  const html = template('tpl', {flag, data});
  console.log(html);

  $('#wrap').html(html);

</script>
</body>
```
##cookie
###cookie
1. 是什么？
      本质上是一个存储浏览器端的文本
2. 作用：
      可以用来给浏览器存储数据的
      解决http协议无状态问题
3. 工作原理
      首次：浏览器发送请求给服务器，服务器返回响应给浏览器，此时返回了cookie，浏览器自动保存下来
      下次：浏览器发送请求时就会自动携带上cookie，服务器通过解析cookie，从而判断浏览器之前的行为（是否登录过），返回给浏览器相应响应
4. 服务器端使用
      - 设置/修改cookie
        res.cookie(key, value, options)
      - 获取cookie
        app.use(cookieParser());
        req.cookies
      - 删除cookie
        res.clearCookie(key)
5. cookie的有效期
      - 会话cookie （浏览器打开到浏览器关闭是一次会话）
        会话开始时产生，会话结束自动销毁
      - 持久化cookie
        res.cookie('userId', 'sunwukong', {maxAge: 1000 * 3600 * 24 * 7}); 7天内生效
        res.cookie('userId', 'sunwukong', {maxAge: 1000 * 3600 * 24 * 365 * 10});  10年内生效，永久
6. 浏览器使用
      document.cookie 读写二合一
      document.cookie = 'hello=123;expires=' + new Date(Date.now() + 1000 * 3600 * 24);
7. 缺点：
      - 存储容量有限  大约4kb左右， 数量为20个左右
      - 传输流量比较大  如果cookie数量比较多，每次请求时都会自动携带cookie
 */


###使用cookie
* 1.使用第三方中间件，下载包 npm i cookie-parser
* 2.引用包：
     const cookieParser = require('cookie-parser');
* 3.app.use(cookieParser())// 解析请求中cookie数据，将其挂载到req.cookies上
     // 获取cookie
  console.log(req.cookies);
  //返回响应
  res.end('get cookie');


###session
1. 是什么？是一个存储服务器端会话对象
2. 作用？存储数据、解决http协议无状态问题
3. 工作原理
      浏览器首次发送给服务器请求，此时开启会话，服务器会为本次会话创建session对象
      服务器会将session的id作为cookie返回给浏览器，浏览器接受后就存起来
      下一次浏览器发送请求就会自动携带上cookie，服务器就要解析cookie得到session_id，
      通过session_id找到对应session对象，然后根据session对象中的内容返回给浏览器相应的响应
4. 使用：
      想将会话存储的session进行持久化储存，就得使用上数据库
      
      设置一个中间件
      今后通过 req.session 读写二合一
5. cookie 和 session 区别
      储存位置： cookie在浏览器端  session在服务器端
      存储容量大小： cookie较小   session无限大
      传输流量： cookie较多    session只产生一个cookie，较小
      安全性：  cookie安全更低（保存不是敏感数据）    session安全更高（登陆、注册）
###使用session
* 配置第三方中间件：修改请求-响应对象 
  * const session = require('express-session'); npm i express-session
  * const MongoStore = require('connect-mongo')(session); npm i connect-mongo
* 工作流程：解析请求发送过来的cookie，找到session_id，自动去数据库中找到对应session对象，挂载到req.session上
* 第三方中间件的使用

          app.use(session({
          secret: 'hello_atguigu',   //参与加密的session_id
          saveUninitialized: false, // 数据不保存，就不创建session
          resave: false, // 如果session没有修改，就不会重新保存
          store: new MongoStore({
            url: 'mongodb://localhost:27017/exec',
            touchAfter: 24 * 3600, //24小时内更新一次，无论发生多少请求（除了那些改变会话数据的东西）
            ttl: 3600 * 24 * 7  //session保存期限7天
          }),
          cookie: {maxAge: 1000 * 3600 * 24 * 7} //cookie有效期7天
        }));
* 例子

        //登录路由
        router.post('/login', async (req, res) => {
          const {username, password} = req.body;
          
          const user = await Users.findOne({username, password: sha1(password)});
          
          if (!user) {
            res.render('login', {errMsg: '用户名或密码错误', username});
          } else {
            //使用session保存用户数据，并且返回一个session_id的cookie给用户
            req.session.userId = user.id;
            res.redirect('/usercenter'); //只有重定向才能改变网址
          }
          
        })
        
        //个人中心页面
        router.get('/usercenter', async (req, res) => {
          //获取session保存的数据
          const {userId} = req.session;
          console.log(userId);
          //不存在cookie直接去登录页面
          if (!userId) res.redirect('/login');