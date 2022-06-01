import request from "@/utils/request";

export function loginByPhone(phoneNumber:string,password:string) {
    return request({
        method: "post",
        url: '/infoservice/userinfo/loginByPhone',
        data: {
            phoneNumber,
            password,
        }
    })
}