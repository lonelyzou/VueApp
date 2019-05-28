# React复习
## 1、 React介绍
* 用于快速构建用户界面的js库
* 特点
	* 声明式
	* 组件化
	* 高效
	* ...

## 2、 创建虚拟DOM对象的两种方式
* js
	* React.createElment('h1', {id: 'myId'}, children, children...)
* jsx
	* `<h1>xxx</h1>`

## 3、 jsx
* 作用：用来创建虚拟DOM对象
* 语法:
	* 以<开头，如果是html同名元素，就当作html标签解析，如果不是，就是组件
	* 以{开头，里面代码就会当作js代码解析
		* if for不能写
* 注意：
	* 必须有且只有一个根标签
	* 标签必须有结束符
	* 如果是组件，首字母必须大写

## 4、 创建组件的两种方式
* 工厂函数:定义简单组件、没有状态的组件
* ES6类：定义功能更加强大，复杂的组件

## 5、 组件三大属性
* state
	* 定义组件内部状态数据
	* 使用场景：当页面需要更新，通过更新状态来完成
* props
	* 用来组件外向组件内传递数据
	* 使用场景：组件间通信
* refs
	* 用来获取DOM元素
	* 一般不用

## 6、 生命周期函数
* 初始化
	* constructor （初始化状态，定义createRef, 只会执行一次）
	* static getDerivedStateFromProps
	* render (得到渲染组件要用的虚拟DOM对象)
	* componentDidMount （发送ajax请求、设置定时器...，只会执行一次）
* 更新
	* static getDerivedStateFromProps
	* shouldComponentUpdate （性能优化，减少组件重新渲染的次数）
	* render
	* getSnapshotFormProps
	* componentDidUpdate （更新时发送ajax，注意一定要有判断条件）
* 卸载
	* componentWillUnmount (收尾工作，清除定时器)

## 7、 受控组件
* 受控组件就是通过 onChange 事件来自动收集表单数据的一种组件
* 非受控组件，通过ref手动收集表单数据的组件

## 8、 高阶组件
* 概念：本质上是一个函数，接受一个组件作为参数，返回值是一个组件
* 作用：用来复用代码
* 场景：当有多个组件都有一个重复的逻辑函数，这时候考虑使用高阶组件提取公共逻辑函数

## 9、 组件间通信
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

## 10、 发送请求方式
* axios
	* 兼容更好，使用更加简单方便
* fetch
	* 原生的技术，兼容性不好，所以一般时使用一个库 - fetch.js

## 11、 路由
* 前端路由：一种映射关系，key-value。key指的是路由路径，value指的是组件。
* 特点：
	* 不会发送请求
	* 会更新url地址
	* 更新局部页面
* 使用： react-router-dom
	* BrowserRouter 所有路由都要包裹这个组件内
	* Route 路由组件： 匹配url地址，一旦匹配上就加载对应组件
	* Link 路由链接：切换url地址，不会发送请求
	* NavLink 路由链接：切换url地址，不会发送请求，会多一个active class
	* Redirect 重定向：一旦加载，就立即重定向到指定地址（切换url地址）
	* Switch 切换：让多个组件从上到下只匹配一个（解决Redirect的死循环问题）
	* withRouter 高阶组件：给被包装组件传递路由组件的三大属性
* 路由组件的三大属性
	* history
		* 切换url地址
	* location
		* 获取路由路径 pathname
		* 获取参数 state
	* match
		* 获取params参数  /shop/:id

* 跳转路由链接（切换url地址）
	* this.props.history.xxx() 用于事件回调函数
	* `<Redirect to="/xxx" />` 用于render方法里面

## 12、 扩展
* Fragment： 
	* 不会生成任何DOM元素，减少不必要DOM结构
	* 性能更好
* 懒加载方案
	* loadable
	* Suspend lazy

## 13、 性能优化方案
* shouldComponentUpdate 减少更新次数
	* 比较新/旧的props和state里面的值, 是否有变化
	* 如果有变化，返回值为true，代表更新
	* 如果都没有变化，返回值为false，代表不更新
* PureComponent
	* 内部对新/旧的props和state里面的值进行浅比较
		* 比较值是否一致
		* 看是否是对象数据
		* 看内部属性的数量是否一致
		* 对比属性的值是否一致
* 因为绝大部分都是进行浅比较（只比较对象的直接属性），如果修改对象属性的属性，就检测不到了，从而导致组件没有重新渲染
* 解决方案
	* 保证每一次更新数据是一个新数据（不要修改原数据，每次产生一个新数据）
	* immuable-js  这个库能保证数据一定是唯一的