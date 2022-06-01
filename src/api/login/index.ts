import request from "@/utils/request";

export function loginByPhone(phoneNumber: string, password: string) {
    return request({
        method: "post",
        url: '/infoservice/userinfo/loginByPhone',
        data: {
            phoneNumber,
            password,
        }
    })
}

export function loginByUserName(name: string, password: string) {
    return request({
        method: "post",
        url: '/infoservice/userinfo/login',
        data: {
            name,
            password,
        }
    })
}