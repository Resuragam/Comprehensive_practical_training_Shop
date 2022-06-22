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
export function getGoodsByCategoryId(current: number, limit: number, categoryId: number) {
    return request({
        method: "get",
        url: `infoservice/product/queryByCategroy/${current}/${limit}`,
        params: {
            categoryId,
        }
    })
}

// 详细描述：根据商品id 查询商品信息
export function getGoodsByGoodId(productId: string) {
    return request({
        method: "get",
        url: `/infoservice/product/queryById/${productId}`,
    })

}

// 详细描述：根据商品id 查询商品信息
export function brandReleaseProduct(brandId: string, categoryId: string, productName: string, pic: string, sale: string, price: string, detailDesc: string, stock: string, description: string) {
    return request({
        method: "post",
        url: '/infoservice/brand/releaseProduct',
        data: {
            brandId,
            categoryId,
            productName,
            pic,
            sale,
            price,
            detailDesc,
            stock,
            description,
        }
    })

}