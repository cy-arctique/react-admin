import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import NProgress from 'nprogress'
import { get, clear } from './storage'
import { message, Modal } from 'antd'

// axios实例
const service = axios.create({
    baseURL: "http://172.16.4.101:8899",
    timeout: 3000
})

// 请求拦截
service.interceptors.request.use((config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    NProgress.start()
    const token = get("token")
    if (token) {
        config.headers!.Authorization = token!
    }
    return new Promise<AxiosRequestConfig>((resolve, reject) => resolve(config))
}, (err: Error) => {
    NProgress.done()
    return Promise.reject(err)
})


// 响应拦截
service.interceptors.response.use((response: AxiosResponse): any => {
    NProgress.done()
    if (response.status === 200) {
        const { code } = response.data
        if (code === 4003) {
            message.warning("请重新登录")
            return Promise.reject("请重新登录")
        } else if (code === 4000) {
            clear()
            return Promise.reject("认证失败")
        }
        return response
    } else {
        Modal.error({
            title: "网络请求错误"
        })
        return Promise.reject("网络请求错误")
    }
},
    err => {
        Modal.error({
            title: "网络请求错误"
        })
        NProgress.done()
        return Promise.reject(err)
    }
)

export default service