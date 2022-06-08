import request from "@/utils/request";
import { StringifyOptions } from "querystring";

// 添加商品到购物车
export function addToCart(productId: string, userId: string, pic: string, productName: string, price: string, quantity: string) {
    return request({
        method: "post",
        url: '/infoservice/cartItem/addToCart',
        data: {
            productId, userId, pic, productName, price, quantity
        }
    })
}

// 根据用户id查询购物车商品
export function getUserCartProducts(userId: string) {
    return request({
        method: "get",
        url: `/infoservice/cartItem/queryCart/${userId}`,
    })
}

// 详细描述：根据商品id删除商品 
export function deleteCartProducts(productId: string) {
    return request({
        method: "delete",
        url: 'infoservice/cartItem/deleteProduct',
        params: {
            productId
        }
    })
}