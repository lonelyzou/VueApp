import Vue from 'vue'
import App from './App'
import store from './store/index'
import router from './router/index'
import HeaderTop from './components/HeaderTop/HeaderTop'
import Star from './components/Star/Star'
import CartControl from './components/CartControl/CartControl'
import Split from './components/Split/Split'
import {Button} from 'mint-ui'
import './validate/index'
import './mock/mock-server'
// 注册全局组件
Vue.component('HeaderTop', HeaderTop)
Vue.component('Star', Star)
Vue.component('CartControl', CartControl)
Vue.component('Split', Split)
Vue.component(Button.name, Button)

/*
在Vue原型对象添加一个事件总线对象(就是一个vm)

  子组件向父组件通信
      <Child @eventName='cb'>
      this.$emit('eventName', data)

  任意关系组件间通信(也可以用pubsub):
      $eventBus.$on('eventName', cb)
      $eventBus.$emit('eventName', data)
 */
Vue.prototype.$eventBus = new Vue()
// 将store保存为vue的属性
// Vue.store = store
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // components: { App },
  // template: '<App/>',
  render: h => h(App),
  router,
  store
})
