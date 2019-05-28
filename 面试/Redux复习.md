# Redux
## 1、介绍
* 是什么？状态管理库
* 作用：能够集中性多个组件共享的状态
* 核心模块：
	* action-creators
		* 用来定义创建action对象的工厂函数模块
		* action对象：{type: xxx, data: xxx}
	* reducers
		* 根据prevState和action来生成newState
		* 多个reducer函数需要用combineReducers整合在一起
	* store
		* 用来集中性管理数据的仓库
	* action-types
		* 定义action对象type值，常量
* 工作流程：
	* 读取
		* store.getState() 
	* 更新
		* 首先调用action-creators来生成action对象
		* 调用store.dispatch传入action
		* 一旦调用dispatch方法，就会自动遍历reducers函数中的所有reducer函数
		* reducer函数就会根据prevState（从store对象读取的）和action（dispatch传入的）来生成newState
		* newState会自动交给store对象管理
		* store对象将newState保存起来，由store.subscribe来触发组件的重新渲染
		* 从而组件就能得到最新的状态值
* react-redux
	* 简化写redux
	* Provider
		* 接受store属性并管理它
		* 一旦状态发生变化，会自动更新组件
	* connect
		* 一种HOC思想，将redux的读取和更新方法封装起来，传入到对应的组件内
		* 返回一个新组件 -- 容器组件
		* 包装一个用户定义的组件 -- UI组件
* redux-thunk
	* 用来在redux中处理异步代码（发送请求）
	* 异步action creator 返回值函数
	* 同步action creator 返回值action对象
* redux-devtools-extension
	* 用来开发中调试redux状态
