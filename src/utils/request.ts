import axios from 'axios'
import { Toast } from 'vant'
import { getToken } from './cookies'

// 创建axios实例
const service = axios.create({
    baseURL: "http://101.43.184.159:8005",
    timeout: 10000,
})

// 请求拦截器
service.interceptors.request.use(
    (config: any) => {
        const token = getToken()
        if (token)
            config.headers.Authorization = token
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)
// 响应拦截器
service.interceptors.response.use(
    (response) => {
        const res = response.data
        if (res.code === 20001) {
            Toast.fail({    
                message: '登录状态错误',
                position: 'top',
                duration: 1000,
            })
            setTimeout(() => {
                location.href = '/login'
            }, 1000)
        }
        return res
    },
)
export default service