import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import home from './modules/home'
import user from './modules/user'
import shop from './modules/shop'

Vue.use(Vuex)
export default new Vuex.Store({
  actions,
  getters,
  modules: {
    home,
    user,
    shop
  }
})
/*
总state结构:
  {
    msite: {},
    user: {},
    shop: {},
  }
  state.msite.address
  state.user.user
 */
