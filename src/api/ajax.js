/* *
*  封装axios用来发送请求
*  需求： 1.返回值promise
*         2.请求成功，返回值为data数据
*         3.请求失败，统一处理错误
*  */
import axios from 'axios'
export default function ajax (url, data = {}, type = 'GET') {
  // 先将请求方式变成大写
  type = type.toUpperCase()
  return new Promise((resolve, reject) => {
    let promise
    if (type === 'GET') {
      // 发送get请求
      promise = axios.get(url, { params: data }) // params配置, 指定的是query参数
    } else {
      // 发送post请求
      promise = axios.post(url, data)
    }
    promise.then(response => {
      resolve(response.data)
    },
    error => {
      // 如果失败了, 不调用reject(), 而是提示错误信息
      alert('请求异常: ' + error.message)
    })
  })
}
