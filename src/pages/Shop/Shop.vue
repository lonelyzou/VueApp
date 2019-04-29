<template>
<div>
  <ShopHeader/>
  <div class="tab">
    <div class="tab-item">
      <router-link to="/shop/goods">点餐</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/shop/ratings">评价</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/shop/info">商家</router-link>
    </div>
  </div>
  <router-view/>
</div>
</template>

<script>
import ShopHeader from '../../components/ShopHeader/ShopHeader'
import {reqGoods, reqRatings, reqInfo} from '../../api/index'
import {RECEIVE_GOODS, RECEIVE_INFO, RECEIVE_RATINGS} from '../../store/mutation-types'
export default {
  name: 'Shop',
  async mounted () {
    const values = await Promise.all([reqGoods(), reqRatings(), reqInfo()])
    const goods = values[0].data
    const rating = values[1].data
    const info = values[2].data
    // 提交mutation, 将数据保存到vuex的状态中
    this.$store.commit(RECEIVE_RATINGS, {rating})
    this.$store.commit(RECEIVE_INFO, {info})
    this.$store.commit(RECEIVE_GOODS, {goods})
  },
  components: {
    ShopHeader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"
.tab
  height 40px
  line-height 40px
  background #fff
  bottom-border-1px(rgba(7, 17, 27, 0.1))
  .tab-item
    float left
    width: 33.33333%
    text-align center
    font-size 14px
    color rgb(77, 85, 93)
    a
      display block
      position relative
      &.router-link-active
        color #02a774
        &::after
          content ''
          position absolute
          left 50%
          bottom 1px
          width 35px
          height 2px
          transform translateX(-50%)
          background #02a774

</style>
