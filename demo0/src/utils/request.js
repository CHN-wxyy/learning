import axios from 'axios'
import { message, Modal } from 'antd';

let logoutCount = 0

const service = axios.create({
  baseURL: 'http://localhost:11111/', // url = base url + request url
  timeout: 5000,
  withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
    // config.headers['Access-Control-Allow-Origin'] = '*';
    // config.headers['Access-Control-Allow-Headers'] = 'Authorization,Origin, X-Requested-With, Content-Type, Accept';
    // config.headers['Access-Control-Allow-Methods'] = 'GET,POST';
    // Add X-Access-Token header to every request, you can add other custom headers here
    // if (UserModule.token) {
    // config.headers['X-Access-Token'] = UserModule.token
    // }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // if (res.code !== 0) {
    //   if (res.code === 1) {
    //     message.error({
    //       content: res.msg || 'Error',
    //       duration: 5
    //     })
    //     return response.data
    //   } else {
    //     message.error({
    //       content: res.msg || 'Error',
    //       duration: 5
    //     })
    //     return Promise.reject(new Error(res.msg || 'Error'))
    //   }
    // } else {
    //   return response.data
    // }
    return res
  },
  (error) => {
    console.log(error)
    let errorInfo = error.response
    let msg
    if (!errorInfo) {
      const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
      errorInfo = {
        statusText,
        status,
        request: { responseURL: config.url }
      }
      msg = status + '：' + errorInfo.statusText
    } else {
      if (error.response.data.code === -1) {
        if (logoutCount === 0) {
          Modal.confirm({
            content: '你已被登出，可以取消继续留在该页面，或者重新登录, 确定登出?',
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            onOk: () => {
              logoutCount = 0
              localStorage.clear()
              sessionStorage.clear()
              // UserModule.ResetToken()
              window.location.reload()
              msg = error.response.data.msg
            }
          })
          logoutCount++
          return
        }
      } else if (errorInfo.data.code === 1 || errorInfo.data.code === 2) {
        msg = errorInfo.data.msg
      } else {
        msg = error.response.data.status + '：' + error.response.data.message
      }
    }
    message.error({
      content: msg,
      duration: 5
    })
    return Promise.reject(msg)
  }
)

export default service
