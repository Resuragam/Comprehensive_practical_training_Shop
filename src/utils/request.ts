import axios from 'axios'

// 创建axios实例
const service = axios.create({
    baseURL: "http://101.43.184.159:8005",
    timeout: 10000,
})

export default service