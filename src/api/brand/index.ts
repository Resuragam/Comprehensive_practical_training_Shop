import request from "@/utils/request";

// 根据手机号密码登录
export function loginBrandByPhone(phoneNumber: string, password: string) {
    return request({
        method: "post",
        url: '/infoservice/brand/loginByPhone',
        data: {
            phoneNumber,
            password,
        }
    })
}

// 详细描述:根据商家名密码登录
export function loginBrandByUserName(name: string, password: string) {
    return request({
        method: "post",
        url: '/infoservice/brand/login',
        data: {
            name,
            password,
        }
    })
}

// 详细描述：根据商家id查询所有已上架商品
export function getBrandAllProducts(brandId: string, current: number, limit: number) {
    return request({
        method: "get",
        url: `/infoservice/product/queryByBrandId/${brandId}/${current}/${limit}`,
    })
}