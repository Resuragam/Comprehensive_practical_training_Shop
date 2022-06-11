import request from "@/utils/request";

// 详细描述；用户批量创建订单，传入商品信息和用户信息以及订单信息
export function userCreateOrder(list: any) {
    return request({
        method: "post",
        url: '/infoservice/order/createOrders',
        data: list
    })
}

// 详细描述：用户批量确认订单并支付
export function userPayOrder(list: any) {
    return request({
        method: "post",
        url: '/infoservice/orderItem/payOrders',
        data: list
    })
}

//详细描述：根据用户id查询已发货订单
export function getUserOrder(userId: string) {
    return request({
        method: "get",
        url: `/infoservice/order/queryShipByUserId/${userId}`,
    })
}

// 详细描述：根据商家id查询已发货订单
export function getBrandOrder(brandId: string) {
    return request({
        method: "get",
        url: `/infoservice/order/queryShip/${brandId}`,
    })
}

//详细描述：根据用户id查询未发货订单
export function getUserNoOrder(userId: string) {
    return request({
        method: "get",
        url: `/infoservice/order/queryNoShipByUserId/${userId}`,
    })
}

//详细描述：根据商家id查询未发货订单
export function getBrandNoOrder(brandId: string) {
    return request({
        method: "get",
        url: `/infoservice/order/queryNoShip/${brandId}`,
    })
}

//详细描述：用户根据订单id确认收货
export function userConfirmProduct(orderId: string) {
    return request({
        method: "get",
        url: `/infoservice/order/confirmGoods/${orderId}`,
    })
}

// 详细描述：根据订单id，查询该订单的商品信息
export function getOrderInfo(orderId: string) {
    return request({
        method: "get",
        url: `/infoservice/orderItem/queryOrderGoods/${orderId}`,
    })
}

// 详细描述：根据订单id商家进行发货
export function brandPushOrder(orderId: string) {
    return request({
        method: "post",
        url: '/infoservice/order/ship',
        params: {
            orderId
        }
    })
}

// 详细描述：根据用户id查询已收货订单
export function recipitOrderUser(userId: string) {
    return request({
        method: "get",
        url: `/infoservice/order/queryReceipt/${userId}`,
    })
}

// 详细描述：根据用户id查询已收货订单
export function recipitOrderBrand(userId: string) {
    return request({
        method: "get",
        url: `/infoservice/order/queryReceiptBrand/${userId}`,
    })
}