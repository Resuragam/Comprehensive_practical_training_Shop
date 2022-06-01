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