<template>
<div class="app">
  <router-view/>
  <FooterGuide v-show="$route.meta.isShowFooter"/>
</div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  async mounted () {
    this.$store.dispatch('getAddress')
    this.$store.dispatch('getUserInfo')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
