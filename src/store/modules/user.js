/*
外卖首页模块
 */
import {RECEIVE_USER_INFO, RESET_USER_INFO} from '../mutation-types'
import {reqUser, reqUserLogout} from '../../api/index'
const state = {
  userInfo: {} // 用户信息
}
const mutations = {
  [RECEIVE_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO] (state) {
    state.userInfo = { }
  }
}
const actions = {
  // 异步获取用户信息
  async getUserInfo ({commit}) {
    const result = await reqUser()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, userInfo)
    }
  },
  // 异步获取用户退出登录信息
  async getUserLogout ({commit}) {
    const result = await reqUserLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  }
}
const getters = {

}
export default {
  state,
  mutations,
  actions,
  getters
}
