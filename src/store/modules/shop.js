/*
外卖首页模块
 */
import Vue from 'vue'
import {
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from '../mutation-types'
const state = {
  goods: [], // 商品列表
  ratings: [], // 商家评价列表
  info: {}, // 商家信息
  cartFoods: [] // 购物车列表数据
}
const mutations = {
  [RECEIVE_GOODS] (state, {goods}) {
    state.goods = goods
  },
  [RECEIVE_INFO] (state, {info}) {
    state.info = info
  },
  [RECEIVE_RATINGS] (state, {ratings}) {
    state.ratings = ratings
  },
  [INCREMENT_FOOD_COUNT] (state, food) {
    // 如果是第一次
    if (food.hasOwnProperty('count')) {
      food.count++
    } else { // 添加一个新的count属性, 值为1
      // 问题:向响应式对象添加一个新的属性, 默认是没有数据绑定, 新添加的属性就没办法自动显示到界面
      // food.count = 1
      // 解决: Vue.set( target, key, value )
      // 为响应式对象添加一个属性，确保新属性也是响应式的，并且能够触发视图更新
      Vue.set(food, 'count', 1)
      // 将food添加到购物车
      state.cartFoods.push(food)
    }
  },
  [DECREMENT_FOOD_COUNT] (state, food) {
    if (food.count) {
      food.count--
      if (food.count === 0) {
        // 购物车删除指定商品
        delete food.count
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  [CLEAR_CART] (state) {
    // 清空购物车所有food的count
    state.cartFoods.forEach((food) => food.count = 0)
    // 重置购物车
    state.cartFoods = []
  }
}
const actions = {
  // 购物车增减
  updateFoodCount ({commit}, {food, isAdd}) {
    if (isAdd) { // 增加
      commit(INCREMENT_FOOD_COUNT, food)
    } else { // 减少
      commit(DECREMENT_FOOD_COUNT, food)
    }
  },
  clearCart ({commit}) {
    commit(CLEAR_CART)
  }
}
const getters = {
  /*
初始显示第一次调用
只要任何food的count发生了变化, 重新调用
 */
  /*
  cartFoods (state) {
    let arr = []
    state.goods.forEach(good => {
      good.foods.forEach(food => {
        if (food.count > 0) {
          arr.push(food)
        }
      })
    })
  }
  */
  // 计算购物车中food的数量
  totalCount (state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
  },
  // 计算购物车中food的总价格
  totalPrice (state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count * food.price, 0)
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
