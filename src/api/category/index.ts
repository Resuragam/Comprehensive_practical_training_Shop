import request from '@/utils/request'

// 查询所有商品类别名，返回List
export function selectAll() {
    return request({
        method: 'get',
        url: '/infoservice/category/selectAll'
    })
}