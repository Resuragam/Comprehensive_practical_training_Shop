import axios from 'axios'
import { Toast } from 'vant'

// 创建axios实例
const service = axios.create({
    // baseURL:'/api',
    baseURL:'http://101.43.184.159:8006',
    timeout: 10000,
})

// 请求拦截器
service.interceptors.request.use(
    (config: any) => {
        const token = sessionStorage.getItem('token')
        console.warn(typeof token)
        console.warn(token)
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
        console.warn(res)
        console.warn(typeof res)
        if (res.message ==='未登录！') {
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