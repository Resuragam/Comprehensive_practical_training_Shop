import request from '@/utils/request'

// 用户关注或取消关注商家，传入用户id和商品id
export function attendProduct(userId: string, productId: string) {
    return request({
        method: "post",
        url: "/infoservice/collect/attentionProduct",
        params: {
            userId,
            productId,
        }
    })
}

// 详细描述：根据用户ID查询用户收藏的所有商品
export function getUserAttendGoods(userId: string) {
    return request({
        method: "get",
        url: "/infoservice/collect/queryAll",
        params: {
            userId,
        }
    })
}

// 详细描述：根据用户id和商家id查询用户是否已收藏商品
export function getUserCheckAttend(userId: string,productId:string) {
    return request({
        method: "get",
        url: "/infoservice/collect/checkAttention",
        params: {
            userId,
            productId,
        }
    })
}

// 用户关注或取消关注商品，传入用户id和商品id
export function userAttendProduct(userId: string,productId:string) {
    return request({
        method: "post",
        url: "/infoservice/collect/collectProduct",
        params: {
            userId,
            productId,
        }
    })
}