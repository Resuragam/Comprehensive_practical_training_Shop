import request from '@/utils/request'

export function registerUser(username: string, phone: string, password: string) {
    return request({
        method: "post",
        url: "/infoservice/userinfo/register",
        data: {
            username,
            phone,
            password,
        }
    })
}

// 详细描述:商家申请入驻
export function registerBrand(sroteName: string, phone: string, password: string) {
    return request({
        method: "post",
        url: "/infoservice/brand/register",
        data: {
            sroteName,
            phone,
            password,
            avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
            status: 0,
            categoryId: 1,
        }
    })
}