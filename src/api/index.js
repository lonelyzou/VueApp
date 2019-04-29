// 定义请求函数模块
import ajax from './ajax'

// const BASE = 'http://localhost:5000'
const BASE = '/api'

// 1、根据经纬度获取位置详情
export const reqAddress = (longitude, latitude) => ajax(BASE + `/position/${latitude},${longitude}`)

// 2、获取食品分类列表
export const reqCategorys = () => ajax(BASE + '/index_category')

// 3. 根据经纬度获取商铺列表
export const reqShops = ({longitude, latitude}) => ajax(BASE + '/shops', {longitude, latitude})

// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (geohash, keyword) => ajax(BASE + '/search_shops', {geohash, keyword})

// 5、用户名密码登陆
export const accountLogin = (name, pwd, captcha) => ajax(BASE + '/login_pwd', {name, pwd, captcha}, 'POST')

// 6、发送短信验证码
export const mobileCode = (phone) => ajax(BASE + '/sendcode', {phone})

// 7、手机号验证码登陆
export const phoneLogin = ({phone, code}) => ajax(BASE + '/login_sms', {phone, code}, 'POST')

// 8、根据会话获取用户信息
export const reqUser = () => ajax(BASE + '/userinfo')

// 9、用户登出
export const reqUserLogout = () => ajax(BASE + '/logout')

export const reqGoods = () => ajax('/goods')
export const reqInfo = () => ajax('/info')
export const reqRatings = () => ajax('/ratings')
