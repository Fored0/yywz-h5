import axios, { type Method } from "axios"
import { useUserStore } from "@/stores/user"
import { showToast } from "vant"
import router from "@/router"

type Data<T> = {
  code: number
  message: string
  data: T
}

const baseURL = "https://consult-api.itheima.net/"

const instance = axios.create({
  baseURL,
  timeout: 2000
})

instance.interceptors.request.use(
  (config) => {
    // 统一携带token
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers['Authorization'] = `Bearer ${store.user?.token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    // 后台约定，响应成功，当code不是10000时业务逻辑失败
    if (res.data?.code !== 10000) {
      showToast(res.data?.message || '响应失败')
      return Promise.reject(res.data)
    }
    return res.data
  },
  (err) => {
    if (err.response.status === 401) {
      // 删除用户信息
      const store = useUserStore()
      store.delUser()
      // 跳转登录，带上接口失效所在页面的地址，登录完成后回跳使用
      router.push({
        path: '/login',
        query: { returnUrl: router.currentRoute.value.fullPath }
      })
    }
    return Promise.reject(err)
  }
)

//使传入和返回的数据类型一致
const request = <T>(url: string, method: Method = "GET", data?: object) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data
  })
}

export default request