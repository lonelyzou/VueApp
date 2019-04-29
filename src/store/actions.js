// 间接更新state的函数：一般为异步代码
import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqUser,
  reqUserLogout
} from '../api'

import {
  RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIVE_USER_INFO, RESET_USER_INFO
} from './mutation-types'

export default {
  // 异步获取地址
  async getAddress ({commit, state}) {
    const { latitude, longitude } = state
    const result = await reqAddress(longitude, latitude)
    if (result.code === 0) {
      const address = result.data
      // 提交mutation： 执行commit() 触发对应的mutation调用
      commit(RECEIVE_ADDRESS, address)
    }
  },
  // 异步获取商品列表
  async getCategorys ({commit}) {
    const result = await reqCategorys()
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, categorys)
    }
  },
  // 异步获取商家列表
  async getShops ({commit, state}) {
    const { latitude, longitude } = state
    const result = await reqShops({latitude, longitude})
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  },
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
