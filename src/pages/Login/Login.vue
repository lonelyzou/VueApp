<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay = true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone"
              name="phone" v-validate="'required|mobile'">
              <button  :disabled="!isPhone || computeTime>0" class="get_verification"
                       :class="{right_phone_number:isPhone}" @click.prevent="sendCode">
               {{computeTime>0 ? `已发送(${computeTime}S)`: ' 获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code" name="code" v-validate="{required: true,regex: /^\d{6}$/}">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name"
                       name="name" v-validate="'required'">
              </section>
              <section class="login_verification">
                <input :type="isShowPwd ? 'text' : 'password'" maxlength="8" placeholder="密码" v-model="pwd"
                name="pwd" v-validate="{required: true}">
                <div class="switch_button" :class="isShowPwd ? 'on': 'off'" @click="isShowPwd = !isShowPwd">
                  <div class="switch_circle" :class="{right: isShowPwd}"></div>
                  <span class="switch_text">
                    {{isShowPwd ? 'abc ': '...'}}
                  </span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha"
                name="captcha" v-validate="{required: true, regex: /^.{4}$/}">
                <img ref="getCaptcha" class="get_verification"  src="http://localhost:5000/captcha" alt="captcha" @click="getCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
  </div>
</template>

<script>
import {mobileCode, phoneLogin, accountLogin} from '../../api/index'
import {RECEIVE_USER_INFO} from '../../store/mutation-types'
export default {
  name: 'Login',
  data () {
    return {
      loginWay: true, // true代表短信登陆, false密码登陆
      computeTime: 0, // 验证码时间
      phone: '', // 手机号
      name: '', // 用户名
      code: '', // 验证码
      pwd: '', // 密码
      captcha: '', // 一次性图片验证码
      isShowPwd: false // 是否显示密码
    }
  },
  computed: {
    isPhone () {
      // 判断phone是否是正确的手机号格式: 使用正则
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods: {
    getCaptcha () {
      this.$refs.getCaptcha.src = 'http://localhost:5000/captcha?time' + Date.now()
    },
    async sendCode () {
      this.computeTime = 30
      const timeId = setInterval(() => {
        if (this.computeTime === 0) {
          clearInterval(timeId)
        } else {
          this.computeTime--
        }
      }, 1000)
      // 发送获取手机验证码请求
      const result = await mobileCode(this.phone)
      if (result.code === 0) {
        alert('发送短信验证码成功')
      } else {
        // 停止计时
        this.computeTime = 0
        alert('发送短信验证码失败---')
      }
    },
    async login () {
      // 进行前台表单验证
      const {phone, code, pwd, captcha, name, loginWay} = this
      let result
      const validates = loginWay ? ['phone', 'code'] : ['name', 'pwd', 'captcha']
      const success = await this.$validator.validateAll(validates)
      if (success) { // 验证成功
        if (loginWay) { // 短信登录
          result = await phoneLogin({phone, code})
        } else { // 密码登录
          result = await accountLogin(name, pwd, captcha)
          // 如果失败了， 更新验证码
          if (result.code !== 0) {
            this.getCaptcha()
            this.captcha = ''
          }
        }
        if (result.code === 0) {
          // 保存个人数据
          const user = result.data
          this.$store.commit(RECEIVE_USER_INFO, user)
          // 跳转到个人中心
          this.$router.replace('/profile')
        } else {
          alert(result.msg)
        }
      } else { // 验证失败
        alert('验证失败')
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999

</style>
