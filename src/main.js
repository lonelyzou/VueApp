import Vue from 'vue'
import App from './App'
import store from './store/index'
import router from './router/index'
import HeaderTop from './components/HeaderTop/HeaderTop'
import Star from './components/Star/Star'
import {Button} from 'mint-ui'
import './validate/index'
import './mock/mock-server'
// 注册全局组件
Vue.component('HeaderTop', HeaderTop)
Vue.component('Star', Star)
Vue.component(Button.name, Button)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // components: { App },
  // template: '<App/>',
  render: h => h(App),
  router,
  store
})
