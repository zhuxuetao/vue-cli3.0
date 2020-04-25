import axios from 'axios'
import qs from 'qs'
import { Dialog } from 'vant'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  retry: 1
})

// 请求前拦截
instance.interceptors.request.use(config => {
  // 省略其它代码 ······
  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const responseCode = response.data.errCode
  const responseErrorMsg = response.data.errMsg
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (responseCode === 0) {
    return Promise.resolve(response.data)
  } else if (responseCode < 0) {
    Dialog.alert({
      message: responseErrorMsg
    })
    return Promise.reject(response)
  }
}, function (error) {
  console.log(error)
  // 断网 或者 请求超时 状态
  if (!error.response) {
    // 请求超时状态
    if (error.message.includes('timeout')) {
      Dialog.alert({
        message: '请求超时，请检查网络是否连接正常'
      })
    } else {
      // 可以展示断网组件
      Dialog.alert({
        message: '请求失败，请检查网络是否已连接'
      })
    }
    return
  }
  return Promise.reject(error)
})

export const get = (url, parames, config = {}) => {
  parames = qs.stringify(parames)
  return new Promise((resolve, reject) => {
    instance.get(url, parames, config).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

export const post = (url, parames, config = {}) => {
  parames = qs.stringify(parames)
  return new Promise((resolve, reject) => {
    instance.post(url, parames, config).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

// export const uploadFile = (url, parames) => {
//   return new Promise((resolve, reject) => {
//     instance.request({
//       method: 'post',
//       url,
//       parames,
//       headers: { 'Content-Type': 'multipart/form-data' }
//     }).then((response) => {
//       resolve(response)
//     }).catch((error) => {
//       reject(error)
//     })
//   })
// }
