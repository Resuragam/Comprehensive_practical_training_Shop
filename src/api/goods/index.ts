import request from '@/utils/request'

// 根据商品名称分页模糊查询商品
export function getGoodsByName(current: number, limit: number, productName: string) {
    return request({
        method: "get",
        url: `infoservice/product/queryByName/${current}/${limit}`,
        params: {
            productName,
        }
    })
}

// 根据类别号分页查询商品
export function getGoodsByCategoryId(current: number, limit: number, categoryId: string) {
    return request({
        method: "get",
        url: `infoservice/product/queryByCategroy/${current}/${limit}`,
        params: {
            categoryId,
        }
    })
}

// 