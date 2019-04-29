/*
使用mockjs来mock数据接口
 */
import Mock from 'mockjs'
import data from './data' // data是js对象（内部已经解析了data）

// 产生mock接口
Mock.mock('/goods', {code: 0, data: data.goods})
Mock.mock('/info', {code: 0, data: data.info})
Mock.mock('/ratings', {code: 0, data: data.ratings})
// 后面发对上面3个路径的ajax请求就可以拦截并返回随机生成的json数据
