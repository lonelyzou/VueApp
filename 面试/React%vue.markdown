react和vue的区别
相同点：
都支持服务端渲染
都有Virtual DOM，组件化开发，通过props参数进行父子组件数据的传递，都实现webComponents规范
数据驱动视图
都有支持native的方案，React的React native，Vue的weex

不同点：
* React严格上只针对MVC的view层，Vue则是MVVM模式
* 数据绑定：Vue有实现了双向数据绑定，React数据流动是单向的
* Vue 的表单可以使用 v-model 支持双向绑定，相比于 React 来说开发上更加方便，当然了 v-model 其实就是个语法糖，本质上和 React 写表单的方式没什么区别。
* state对象在react应用中是不可变的，需要使用setState方法更新状态；在Vue中，state对象并不是必须的，数据由data属性在Vue对象中进行管理。
* 改变数据方式不同，Vue 修改状态相比来说要简单许多，React 需要使用 setState 来改变状态，并且使用这个 API 也有一些坑点。并且 Vue 的底层使用了依赖追踪，页面更新渲染已经是最优的了，但是 React 还是需要用户手动去优化这方面的问题。
* React 需要使用 JSX，有一定的上手成本，并且需要一整套的工具链支持，但是完全可以通过 JS 来控制页面，更加的灵活。Vue 使用了模板语法，相比于 JSX 来说没有那么灵活，但是完全可以脱离工具链，通过直接编写 render 函数就能在浏览器中运行。
* 在生态上来说，两者其实没多大的差距，当然 React 的用户是远远高于 Vue 的。
* 在上手成本上来说，Vue 一开始的定位就是尽可能的降低前端开发的门槛，然而 React 更多的是去改变用户去接受它的概念和思想，相较于 Vue 来说上手成本略高。

#前端路由原理？两种实现方式有什么区别？
前端路由实现起来其实很简单，本质就是监听 URL 的变化，然后匹配路由规则，显示相应的页面，并且无须刷新页面。目前前端使用的路由就只有两种实现方式 Hash 模式   History 模式
###Hash 模式
`www.test.com/#/` 就是 Hash URL，当 # 后面的哈希值发生变化时，可以通过 hashchange 事件来监听到 URL 的变化，从而进行跳转页面，并且无论哈希值如何变化，服务端接收到的 URL 请求永远是 www.test.com。

    window.addEventListener('hashchange', () => {
      // ... 具体逻辑
    })
Hash 模式相对来说更简单，并且兼容性也更好。

###History 模式
History 模式是 HTML5 新推出的功能，主要使用 history.pushState 和 history.replaceState 改变 URL。
通过 History 模式改变 URL 同样不会引起页面的刷新，只会更新浏览器的历史记录。

    // 新增历史记录
    history.pushState(stateObject, title, URL)
    // 替换当前历史记录
    history.replaceState(stateObject, title, URL)
    当用户做出浏览器动作时，比如点击后退按钮时会触发 popState 事件
    
    window.addEventListener('popstate', e => {
      // e.state 就是 pushState(stateObject) 中的 stateObject
      console.log(e.state)
    })

###两种模式对比
Hash 模式只可以更改 # 后面的内容，History 模式可以通过 API 设置任意的同源 URL
History 模式可以通过 API 添加任意类型的数据到历史记录中，Hash 模式只能更改哈希值，也就是字符串
Hash 模式无需后端配置，并且兼容性好。History 模式在用户手动输入地址或者刷新页面的时候会发起 URL 请求，后端需要配置 index.html 页面用于匹配不到静态资源的时候

##vue 双向绑定底层实现原理
vue.js 采用数据劫持的方式，结合发布者-订阅者模式，通过Object.defineProperty()来劫持各个属性的setter，getter以监听属性的变动，在数据变动时发布消息给订阅者，触发相应的监听回调：

##如何评价vue
框架能够让我们跑的更快，但只有了解原生的JS才能让我们走的更远。
 
vue专注于MVVM中的viewModel层，通过双向数据绑定，把view层和Model层连接了起来。核心是用数据来驱动DOM。这种把directive和component混在一起的设计有一个非常大的问题，它导致了很多开发者滥用Directive（指令），出现了到处都是指令的情况。
 
优点： 1.不需要setState，直接修改数据就能刷新页面，而且不需要react的shouldComponentUpdate就能实现最高效的渲染路径。 2.渐进式的开发模式，模版方式->组件方式->路由整合->数据流整合->服务器渲染。上手的曲线更加平滑简单，而且不像react一上来就是组件全家桶 3.v-model给开发后台管理系统带来极大的便利，反观用react开发后台就是个杯具 4.html，css与js比react更优雅地结合在一个文件上。
 
缺点：指令太多，自带模板扩展不方便； 组件的属性传递没有react的直观和明显

##vue与redux的区别
uex是吸收了Redux的经验并且对redux的进行了调整,从而对仓库的管理更加明确,vuex还放弃了一些特性做了一些优化,代价是只能和vue配合

vuex有自动渲染的功能,所以不需要更新

Redux 是一个状态管理系统

###### Redux
- 核心对象：store
- 数据存储：state
- 状态更新提交接口：==dispatch==
- 状态更新提交参数：带type和payload的==Action==
- 状态更新计算：==reducer==
- 限制：reducer必须是纯函数，不支持异步
- 特性：支持中间件

###### VUEX
- 核心对象：store
- 数据存储：state
- 状态更新提交接口：==commit==
- 状态更新提交参数：带type和payload的mutation==提交对象/参数==
- 状态更新计算：==mutation handler==
- 限制：mutation handler必须是非异步方法
- 特性：支持带缓存的getter，用于获取state经过某些计算后的值

Vuex相对于Redux的不同点有:
（1）改进了Redux中的Action和Reducer函数，以mutations变化函数取代Reducer，
无需switch,只需在对应的mutation函数里改变state值即可
（2）由于Vue自动重新渲染的特性，无需订阅重新渲染函数，只要生成新的State即可
（3）Vuex数据流的顺序是:View调用store.commit提交对应的请求到Store中对应的mutation函数->store改变(vue检测到数据变化自动渲染)


redux不会修改任何一个 state，而是用新生成的 state 去代替旧的，因为应用了不可变数据（Immutable Data）。
Redux 的工作方式遵循了严格的单向数据流原则，整个生命周期为：
View 调用 store.dispatch，并传入 action 对象。action 对象是一个描述变化的普通对象
接下来，store 会调用注册 store 时传入的 reducer 函数，并将当前的 state 和 action 作为参数传入，在 reducer 中，通过计算得到新的 state 并返回。
store 将 reducer 生成的新 state 树保存下来，然后就可以用新的 state 去生成新的视图。

Vuex 中没有 reducer 来生成全新的 state 来替换旧的 state，Vuex 中的 state 是可以被修改的。
即，以 mutations 变化函数取代 Reducer，无需 switch ，只需在对应的 mutation 函数里改变 state 值即可。
一个 mutation 是由一个 type 和与其对应的 handler 构成的，type 是一个字符串类型用以作为 key 去识别具体的某个 mutation，handler 则是对 state 实际进行变更的函数。
​ 在 Vuex 中可以记录每次 state 改变的具体内容，state 的变更可被记录与追踪。
Vuex 中的 action 也是 store 的组成部分，它可以被看成是连接视图与 state 的桥梁，它会被视图调用，并由它来调用 mutation handler，向 mutation 传入 payload。

##React 避免重新渲染 性能优化
React框架运行的原理：界面受到数据驱动，state 和 props 的改动会造成界面的改动。其中，state 是自身的属性，props 是父组件提供的参数。如果界面内容很多，很小的数据变化会造成界面的重绘，那么造成性能的浪费。下面从几个方面总结一下如何避免重新渲染。

###State
state是一个组件内部的属性。如果state变化，那么组件必然会 re-render。如果一个组件是静态单项组件（不涉及用户输入操作），避免 state 使用。如果界面中需要使用变量进行计算，可以使用属性（this.name）来代替state等。
如果不同 state 可以计算得出，直接计算推理，尽量减少 state 的数量。只有涉及用户交互的地方或者上下组件传值的地方才使用 state。
总之，state 越少越好。
###Props
props 是父组件向子组件传值的方式。如果父组件传递的 props 发生变化，那么子组件会重新渲染。所以，父组件传递的props可以优化，子组件需要什么，父组件再传递什么props。

###Component
组件化是react的重要思想。组件化不仅可以使得代码复用，同时可以优化性能。将界面上的功能区分成不同的组件。当某个数据发生变化，只更新一部分组件，其他组件不受影响，这样可以优化性能。

尽量使用无状态组件（数据由外部提供，内部没有用户数据交互行为等）。这部分组件就是单独的一部分，不受到外界的数据改变的影响。

###生命周期函数
生命周期函数需要熟记在心，使用react要时刻想到生命周期函数。

在 componentWillUpdate 和 componentDidUpdate 阶段，界面数据的处理可能会造成界面再次渲染。如果涉及递归等代码会造成很大的性能浪费。

在componentDidMount 阶段可以处理很多数据。

通过 shouldComponentUpdate 中判断，如果组件传来的props相同，那么返回 false 不需要进行界面重新渲染。前后不改变state值的setState（理论上）和无数据交换的父组件的重渲染都会导致组件的重渲染，但你可以在shouldComponentUpdate这道两者必经的关口阻止这种浪费性能的行为。

###PureComponent
 React.PureComponent 的基础类可以对比props的差异。

###immutable.js
使用immutable.js 的不可变数据。
