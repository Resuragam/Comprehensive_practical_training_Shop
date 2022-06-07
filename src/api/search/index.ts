import request from "@/utils/request";

// 详细描述：根据商家名分页模糊查询商家
export function searchBrand(storeName: string, current: number, limit: number) {
    return request({
        method: "get",
        url: `/infoservice/brand/queryByName/${current}/${limit}`,
        params: {
            storeName
        }
    })
}

// 详细描述：根据商家名分页模糊查询商家
export function searchProduct(productName : string, current: number, limit: number) {
    return request({
        method: "get",
        url: `/infoservice/product/queryByName/${current}/${limit}`,
        params: {
            productName 
        }
    })
}