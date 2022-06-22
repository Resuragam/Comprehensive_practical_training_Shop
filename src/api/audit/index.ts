import request from "@/utils/request";

// 详细描述：根据商家id查询所有已审核商品
export function getBrandHasAuditProduct(brandId: string, current: number, limit: number) {
    return request({
        method: 'get',
        url: `/infoservice/product/queryCheckedProduct/${brandId}/${current}/${limit}`
    })
}

// 详细描述：根据商家id查询所有未审核商品
export function getBrandNotAuditProduct(brandId: string, current: number, limit: number) {
    return request({
        method: 'get',
        url: `/infoservice/product/queryUncheckProduct/${brandId}/${current}/${limit}`
    })
}

//详细描述：商家根据商品id上架该商品
export function releaseProduct(productId: string) {
    return request({
        method: 'post',
        url: "/infoservice/product/releaseProduct",
        params: {
            productId
        }
    })
}

//详细描述：商家根据商品id上架该商品
export function unreleaseProduct(productId: string) {
    return request({
        method: 'post',
        url: "/infoservice/product/unreleaseProduct",
        params: {
            productId
        }
    })
}