#React总结
## 入门
### 特点
* Declarative(声明式编码)
* Component-Based(组件化编码)
* Learn Once, Write Anywhere(支持客户端与服务器渲染)
* 高效

### 高效原因
* 虚拟(virtual)DOM, 不总是直接操作DOM
* DOM Diff算法, 最小化页面重绘, 减少重排重绘的次数

##使用
### 相关js库
* react.js: React的核心库
* react-dom.js: 提供操作DOM的react扩展库
* babel.min.js: 解析JSX语法代码转为纯JS语法代码的库

### 编码
````
//引入相关库
<script type="text/javascript" src="../js/react.development.js"></script>
<script type="text/javascript" src="../js/react-dom.development.js"></script>
<script type="text/javascript" src="../js/babel.min.js"></script>

<script type="text/babel"> //必须声明babel
  // 创建虚拟DOM元素
  const vDom = <h1>Hello React</h1> // 千万不要加引号
  // 渲染虚拟DOM到页面真实DOM容器中
  ReactDOM.render(vDom, document.getElementById('test'))
</script>
```
### 虚拟Dom
* React提供了一些API来创建一种 `特别` 的一般js对象

````
var element = React.createElement('h1', {id:'myTitle'},'hello')
```
* 上面创建的就是一个简单的虚拟DOM对象
* 虚拟DOM对象最终都会被React转换为真实的DOM
* 我们编码时基本只需要操作react的虚拟DOM相关数据, react会转换为真实DOM变化而更新界面
* 创建虚拟Dom方法

````
        <body>
            <div id="test"></div>
        </body>
        
<script type="text/babel">
 // 创建虚拟DOM对象
 const vDom1 = React.createElement('p',{id: 'myId1', className: 'myClass1'}, '珂朵莉',vDom3);
// 将虚拟DOM对象插入到页面的指定容器中,渲染虚拟DOM(元素)
ReactDOM.render(vDom1, document.getElementById('test1')); //方法一

 //方法二
    const id = 'myId2';
    const content = '我永远喜欢珂朵莉';
    const vDom3 = React.createElement('span', {}, 'daisiki');
    const vDom2 = <div><h2 id={id } className="myClass2">{content}</h2>{vDom3}</div>
    // 将虚拟DOM对象插入到页面的指定容器中
    ReactDOM.render(vDom2, document.getElementById('test2'));
    const list = ['1', '2', '3', '4'];
    ReactDOM.render(
        <ul>
            { list.map(( item,index) => <li key={index}>{item}</li> ) }
        </ul>
        ,document.getElementById('test3')) 
<script>
```

### JSX
```
1)	全称:  JavaScript XML
2)	react定义的一种类似于XML的JS扩展语法: XML+JS
3)	作用: 用来创建react虚拟DOM(元素)对象
    a.	var ele = <h1>Hello JSX!</h1>
    b.	注意1: 它不是字符串, 也不是HTML/XML标签
    c.	注意2: 它最终产生的就是一个JS对象
4)	标签名任意: HTML标签或其它标签
5)	标签属性任意: HTML标签属性或其它
6)	基本语法规则
    a.	遇到 <开头的代码, 以标签的语法解析: html同名标签转换为html同名元素, 其它标签需要特别解析
    b.	遇到以 { 开头的代码，以JS语法解析: 标签中的js代码必须用{ }包含,  if/for循环 不能用
7)	babel.js的作用
    a.	浏览器不能直接解析JSX代码, 需要babel转译为纯JS的代码才能运行
    b.	只要用了JSX，都要加上type="text/babel", 声明需要babel来处理
```
##React面向组件编程
###  自定义组件(Component) :
定义组件(2种方式)
```
/*方式1: 工厂函数组件(简单组件)*/
function MyComponent () {
  return <h2>工厂函数组件(简单组件)</h2>
}

/*方式2:  ES6类组件(复杂组件)*/
class MyComponent2 extends React.Component {
  render () {
    console.log(this) // MyComponent2的实例对象
    return <h2>ES6类组件(复杂组件)</h2>
  }
}
```
渲染组件标签
```
ReactDOM.render(<MyComponent />, document.getElementById('example1'))
````
####注意
* 组件名必须首字母大写
* 虚拟DOM元素只能有一个根元素
* 虚拟DOM元素必须有结束标签
    * 单标签 <xx />: 当组件没有内容时，直接用单标签
    * 双标签 <xx></xx> : 当组件有内容时，可以用双标签

#### render()渲染组件标签的基本流程
* React内部会创建组件实例对象
* 得到包含的虚拟DOM并解析为真实DOM
* 插入到指定的页面元素内部

### React 的 三大属性
###state
* state是组件对象最重要的属性, 值是对象(可以包含多个数据)
* 组件被称为"状态机", 通过更新组件的state来更新对应的页面显示(重新渲染组件)

####用法
* 初始化 
  * 在constructor中定义 this.state = {xxx: xxx},  
  * 不在constructor定义：state = {xxx: xxx}
* 读取 this.state.xxx
* 更新 this.setState({xxx: xxx})

####注意

1. setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。
2. 如果需要获取“异步”场景的 setState 的值  --> this.setState(partial, callback) 在callback中拿到最新的值
3. 如果要在“异步”场景更新多次 setState --> this.setState((prevState, props) => {return newState})

###props
* 每个组件对象都会有props(properties的简写)属性
* 组件标签的所有属性都保存在props中

####作用
* 用来组件外向组件内传递数据，通过标签属性从组件外向组件内传递变化的数据
* 使用场景：组件间通信
* 注意: 组件内部不要修改props数据

####使用
* 约束属性的类型和必要性 static propTypes = {xxx: PropTypes.func.isRequired}
* 定义属性的默认值 static defaultProps = {xxx: xxx}
* 内部读取某个属性值，获取组件外向组件内传递的标签属性 this.props.xxx / const { name, age, sex } = this.props;
* 扩展属性: 将对象的所有属性通过props传递，设置 **<List name={xxx}> / <Person {...person}/>**
* 默认属性值： 原来方案Person.defaultProps = {name: 'Mary'}  最新方案：static defaultProps = {
name: 'Mary'}

* 组件类的构造函数
````
constructor (props) {
super(props)
console.log(props) // 查看所有属性
}
````
####区别一下组件的props和state属性
* state: 组件自身内部可变化的数据
* props: 从组件外部向组件内部传递数据, 组件内部只读不修改

###refs
####介绍
* 组件内的标签都可以定义ref属性来标识自己， 用来获取DOM元素

    ````
    a.	<input type="text" ref={this.createRef}/> (推荐使用)
    b.	<input type="text" ref={input => this.funcRef = input}/> 
    c.	<input type="text" ref="stringRef" /> (即将废弃)
    d.	回调函数在组件初始化渲染完或卸载时自动调用
    ````
* 在组件中可以通过this.msgInput来得到对应的真实DOM元素
* 作用: 通过ref获取组件内容特定标签对象, 进行读取其相关数据

####使用
```
 1.<input type="text" ref={this.createRef}/>
 2.<input type="text" ref={(input) => this.funcRef = input}/>
 3.<input type="text" ref="stringRef"/>
     constructor(props) {
        super(props);
        this.createRef = React.createRef();
      }
      
// 获取input标签的值
1. this.createRef.current
2. console.log(this.funcRef);
3. console.log(this.refs.stringRef);
````
### 事件处理
* 通过onXxx属性指定组件的事件处理函数(注意大小写)
 * a.React使用的是自定义(合成)事件, 而不是使用的原生DOM事件
 * b.React中的事件是通过事件委托方式处理的(委托给组件最外层的元素)
* 通过event.target得到发生事件的DOM元素对象 
    
    ````
    <input onFocus={this.handleClick}/>
    handleFocus(event) {
    event.target  //返回input对象
    }
    
#### 强烈注意
* 1)组件内置的方法中的this为组件对象
* 2)在组件类中自定义的方法中this为undefined
    * a.	强制绑定this: 通过函数对象的bind()
    * b.	箭头函数(ES6模块化编码时才能使用)
* React组件中函数this指向规则
    * 组件内置的方法中的this为组件的实例对象
    * 在组件类中自定义的方法中this为undefined
    * 通过函数对象的bind()强制绑定this指向为组件实例对象，也就是this
    * 箭头函数this就能指向实例对象(ES6模块化编码时才能使用)
    * 工厂函数组件中this为undefined
    * ES6类组件(复杂组件)this为组件的实例对象

#### 表单的组件分类                                                               
* 受控组件: 通过 onChange 事件来自动收集表单数据的一种组件
* 非受控组件: 通过ref手动收集表单数据的组件，需要时才手动读取表单输入框中的数据(onClick)

#### 高阶组件
* 概念：本质上是一个函数，接受一个组件作为参数，返回值是一个组件
* 作用：用来复用代码
* 场景：当有多个组件都有一个重复的逻辑函数，这时候考虑使用高阶组件提取公共逻辑函数

####组件间通信
* props
	* 用于父子组件通信
	* 父 --> 子 ： 传入一般属性，子组件读取使用
	* 子 --> 父 ： 父组件定义操作数据方法，传递子组件，子组件调用传参来修改父组件数据
* pubsub
	* 用于兄弟、祖孙组件通信
	* subscribe 订阅，只能订阅一次。先订阅在发布
	* publish 发布，可以发布多次
* redux
	* 用于保存多个组件中共享状态数据
* 定义公共对象保存数据，其他组件引入使用
* webStorage 
   
###组件化编码流程和套路
####组件编码流程：
    1.拆分组件：根据页面功能拆分
      APP
      AddTodo
      TodoList
    2.实现静态组件
      先实现大的组件（最外层的），再实现里面的组件
      先有一个基本的显示效果
    3.实现动态组件
      1.需不需要定义状态数据？ 看页面是否有变化，有变化就要定义状态数据
      2.状态数据定义在哪里？ APP
         如果数据是单个组件需要，就定义在单个组件中
         如果数据是多个组件需要，就定义在公共的父组件中，也就是引用了那几个多组件的父组件
      3.状态数据定义为什么？
         定义成对象、数组、基本数据类型。
         方便插入数据和遍历展示，所以用数组
     4.子组件如何操作父组件的数据
         父组件定义操作数据的方法（数据再哪，操作数据的方法就在在哪）
         父组件将操作数据的方法传给子组件，子组件调用就能修改父组件的数据

### 组件的生命周期函数
#### 理解
* 组件对象从创建到死亡它会经历特定的生命周期阶段
* React组件对象包含一系列的勾子函数(生命周期回调函数), 在生命周期特定时刻回调
* 我们在定义组件时, 可以重写特定的生命周期回调函数, 做特定的工作

#### 生命周期详述
* 组件的三个生命周期状态:
	* Mount：插入真实 DOM，渲染时
    * Update：被重新渲染，更新时
    * Unmount：被移出真实 DO，,卸载时
* React 为每个状态都提供了勾子(hook)函数
    * componentWillMount()
    * componentDidMount()
    * componentWillUpdate()
    * componentDidUpdate()
    * componentWillUnmount()
* 生命周期流程:
 * 第一次初始化渲染显示: ReactDOM.render()
      * constructor(): 创建对象初始化state
      * componentWillMount() : 将要插入回调
      * render() : 用于插入虚拟DOM回调
      * componentDidMount() : 已经插入回调
 * 每次更新state: this.setSate()
      * componentWillUpdate() : 将要更新回调
      * render() : 更新(重新渲染)
      * componentDidUpdate() : 已经更新回调
 * 移除组件: ReactDOM.unmountComponentAtNode(containerDom)
      * componentWillUnmount() : 组件将要被移除回调



#### 生命周期函数作用:
	 constructor()`
		* 初始化state
		* 修改函数的this指向
		* 只会执行一次
	 static getDerivedStateFromProps(nextProps, prevState)`
		* 一般不用
		* 使组件能够根据props的更改来更新其内部状态
	 render()`
		* 渲染组件
	 componentDidMount()`
		* 发送ajax请求
		* 执行异步任务
		* 只会执行一次
	 shouldComponentUpdate(nextProps, nextState)`
		* react性能优化，减少不必要的render
	 getSnapshotBeforeUpdate(prevProps, prevState)`
		* 一般不用
		* 可以在渲染之前得到DOM对象从而获取一些信息
	 componentDidUpdate(prevProps, prevState, snapshot)`
		* 更新组件完成时对DOM进行操作
		* 发送ajax请求（注意不要陷入死循环）
	 componentWillUnmount()`
		* 清除定时器，收尾工作等

#### 重要的生命周期(必须掌握)
* constructor() 初始化状态，定义createRef, 只会执行一次
* render() 初始化渲染或更新渲染调用
* componentDidMount() 开启监听, 发送ajax请求、设置定时器...，只会执行一次
* componentWillUnmount() 做一些收尾工作, 如: 清理定时器
* componentDidUpdate()  可以获取更新后DOM元素，从而进行操作
* shouldComponentUpdate 专门用来做React性能优化的，减少组件重新渲染的次数：将之前的状态/属性和当前的状态/属性进行对比，如果一样，就不更新，如果不一样就更新
       返回值为true就更新
       返回值为false就不更新

##React脚手架
### 介绍
* xxx脚手架: 用来帮助程序员快速创建一个基于xxx库的模板项目
   * a.	包含了所有需要的配置
   * b.	指定好了所有的依赖
   * c.	可以直接安装/编译/运行一个简单效果
* react提供了一个用于创建react项目的脚手架库: create-react-app
* 项目的整体技术架构为:  react + webpack + es6 + eslint + babel
* 使用脚手架开发的项目的特点: 模块化, 组件化, 工程化

### 创建项目并启动
    npm install -g create-react-app  //全局安装create-react-app
    create-react-app hello-react    //创建一个项目名称为hello-react的脚手架              
    npm start                      //必须在hello-react文件目录下运行

### react脚手架项目结构
    ReactNews
    	|--node_modules---第三方依赖模块文件夹
    	|--public
    		|-- index.html-----------------主页面
    	|--src------------源码文件夹
    		|--components-----------------react组件
    		|--index.js-------------------应用入口js
    	|--.gitignore------git版本管制忽略的配置
    	|--package.json----应用包配置文件 
    	|--README.md-------应用描述说明的readme文件

##react ajax
### 前置说明
* React本身只关注于界面, 并不包含发送ajax请求的代码
* 前端应用需要通过ajax请求与后台进行交互(json数据)
* react应用中需要集成第三方ajax库(或自己封装)

### 常用的ajax请求库
* jQuery: 比较重, 如果需要另外引入不建议使用
* axios: 轻量级, 建议使用
   * a.	封装XmlHttpRequest对象的ajax
   * b.	 promise风格
   * c.	可以用在浏览器端和node服务器端
* fetch: 原生函数, 但老版本浏览器不支持
 * a.不再使用XmlHttpRequest对象提交ajax请求
 * b.为了兼容低版本的浏览器, 可以引入兼容库fetch.js
 * https://github.github.io/fetch/
 * https://segmentfault.com/a/1190000003810652

 
````
componentDidMount(){
            //发送Ajax请求
          /* axios.get('https://api.github.com/search/repositories?q=r&sort=stars')
                //axios.get('/user', {params: {q:r,sort:stars}})
                //axios.post('/user', {firstName: 'Fred',lastName: 'Flintstone'})
               .then(response => {
                   const {name, html_url} = response.data.items[0];
                   this.setState({ name,url: html_url})
                    })
               .catch(err =>{
                   console.log(err);
                   })*/
         fetch('https://api.github.com/search/repositories?q=v&sort=stars')
            //get: fetch(url) post: fetch(url, {method: "POST" body:JSON.stringify(data),})
               .then(res => res.json())
               .then(response =>{
                   console.log(response);
                   const {name, html_url} = response.items[0];
                   this.setState({name,url: html_url })
                    })
               .catch(err =>{
                   console.log(err);
               })
        }
```

##react路由
###相关理解
#### react-router的理解
* react的一个插件库
* 专门用来实现一个SPA应用
* 基于react的项目基本都会用到此库

#### SPA的理解
* 单页Web应用（single page web application，SPA）
* 整个应用只有一个完整的页面
* 点击页面中的链接不会刷新页面, 本身也不会向服务器发请求
* 当点击路由链接时, 只会做页面的局部更新，网址也会对应的改变
* 数据都需要通过ajax请求获取, 并在前端异步展现

#### 路由的理解
##### 什么是路由?
* 一个路由就是一个映射关系(key:value)
* key为路由路径, value可能是function/component

#####路由分类
* 后台路由: node服务器端路由, value是function, 用来处理客户端提交的请求并返回一个响应数据
  * a.	注册路由: router.get(path, function(req, res))
  * b.	当node接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据
* 前台路由: 浏览器端路由, value是component（组件）, 当请求的是路由path时, 浏览器端前没有发送http请求, 但界面会更新显示对应的组件 
 * a.注册路由: <Route path="/about" component={About} />
 * b.当浏览器的hash变为#about时, 当前路由组件就会变为About组件
 
##### 区别：
	* 前端路由
		* 不需要发送请求
		* 不会刷新整个页面，局部更新
		* 会修改url地址和浏览器历史记录
		* value是component
	* 后端路由
		* 会发送请求
		* 会刷新整个页面
		* 会修改url地址和浏览器历史记录
		* value是callback
* 使用前端路由的作用：
	* 用来开发SPA（单页面应用）
	* 整个应用一个完整页面
	* 不需要发送请求
	* 不会刷新整个页面，局部更新
	* 会修改url地址和浏览器历史记录
	
####前端路由的实现
history库
   
    a.	网址: https://github.com/ReactTraining/history
    b.	管理浏览器会话历史(history)的工具库
    c.	包装的是原生BOM中window.history和window.location.hash
history API
 
    a.	History.createBrowserHistory(): 得到封装window.history的管理对象
    b.	History.createHashHistory(): 得到封装window.location.hash的管理对象
    c.	history.push(): 添加一个新的历史记录
    d.	history.replace(): 用一个新的历史记录替换当前的记录
    e.	history.goBack(): 回退到上一个历史记录
    f.	history.goForword(): 前进到下一个历史记录
    g.	history.listen(function(location){}): 监视历史记录的变化
   
####react-router相关API
组件
```
使用： react-router-dom
    1)	<BrowserRouter>
         browserHistory 是使用 React-Router 的应用推荐的 history方案。
         它使用浏览器中的 History API 用于处理 URL，创建一个像example.com/list/123这样真实的 URL 
         <BrowserRouter><App /></BrowserRouter>
    2)	<HashRouter>
        
    3)	<Route>
         <Route path="/about" component={About}/>
         <Route path="/home/message/:id" component={MessageDetail}/>
          一旦url变为path对应的值，就加载component中的组件进行显示
    4)	<Redirect>
         <Redirect to="/about"/>
         什么路径都匹配，一旦匹配上就跳转到指定网址,与Switch配合使用
    5)	<Link> 
          只修改url的地址，不会发送请求      
          <Link to="/home">珂朵莉</Link>
    6)	<NavLink> 
         只修改url的地址，不会发送请求，并且多了一个class:active  
        export default function MyNavLink(props) {
           return <NavLink {...props} activeClassName='activeClass'/>
           }
        <MyNavLink to="/about">About</MyNavLink>
    7)	<Switch>
        切换显示（针对内部组件 - 子组件）：让多个组件从上到下只匹配一个（解决Redirect的死循环问题）
        <Switch>
           <Route path="/about" component={About}/>
           <Route path="/home" component={Home}/>
           <Redirect to="/about"/>
        </Switch>
    8) import { withRouter } from 'react-router-dom'）
     withRouter 作用：给非路由组件传递路由组件三个属性（history、location、match）@withRouter   
````

* 路由组件的三大属性
	* history
		* 切换url地址,修改浏览器历史记录
	* location
		* 获取路由路径,获取请求path, pathname
		* 获取参数 state
	* match
		* 获取params参数 -->  /shop/:id
* 跳转路由链接（切换url地址）
	* this.props.history.xxx() 用于事件回调函数
	* `<Redirect to="/xxx" />` 用于render方法里面
	 
##react-ui库
### material-ui(国外)
* 官网: http://www.material-ui.com/#/
* github: https://github.com/callemall/material-ui

### ant-design(国内蚂蚁金服)
* PC官网: https://ant.design/index-cn
* 移动官网: https://mobile.ant.design/index-cn
* Github: https://github.com/ant-design/ant-design/
* Github: https://github.com/ant-design/ant-design-mobile/

## 扩展
* Fragment： 
 `return <Fragment><h2>App组件</h2></Fragment>;`
	* 不会生成任何DOM元素，减少不必要DOM结构
	* 性能更好

* 懒加载方案
	* loadable
	* Suspend lazy
	
* 在显示时，将内容写入__html对象中即可
 * `<div dangerouslySetInnerHTML={{ __html: '<div>123</div>' }} />` 