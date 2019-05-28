/*
外卖首页模块
 */
import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS} from '../mutation-types'
import {reqAddress, reqCategorys, reqShops} from '../../api/index'
const state = {
  latitude: 25.6, // 纬度
  longitude: 115.5, // 经度
  address: {}, // 当前地址
  categorys: [], // 食品分类
  shops: [] // 商家列表
}
const mutations = {
  [RECEIVE_ADDRESS] (state, address) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, categorys) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, shops) {
    state.shops = shops
  }
}
const actions = {
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
