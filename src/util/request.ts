import axios from 'axios'

// 创建axios实例
const service = axios.create({
    baseURL: "",
    timeout: 2000,
})
