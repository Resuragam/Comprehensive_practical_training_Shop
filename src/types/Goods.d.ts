declare namespace Goods {
    // 定义商品信息的数据类型
    interface GoodInfo {
        productId?: string; // 商品id
        brandId: string; // 商家id
        categoryId: number|string; // 类别id example: 0,1,2,3,4,5,6分别对应鞋类、潮服、手表、箱包、配饰、数码
        productName: string; // 商品名字
        pic: string; // 商品图片
        checkStatus?: number;
        sale: number|string; // 销量
        price: number|string; // 商品价格
        detailDesc: string; // 商品详情
        stock?: number|string; // 库存数量
        description: string; // 商品描述
        status?:number,
    } 
}
