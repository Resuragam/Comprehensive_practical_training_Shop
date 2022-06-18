// 订单数据接口
declare namespace Order {
    // 订单数据类型
    interface OrderInfo {
        orderId: string;
        userId: string;
        brandId: string;
        orderSn: string; // 订单编号
        payType: number; // 支付方式，0为微信，1为支付宝
        totalAmount: string; // 订单金额
        status: number; // 发货状态（0为未发货，1已发货，2未支付）
        address: string; // 收货地址
        createTime?: string; // 订单创建时间
        deliveryTime?: string; // 
        receiveTime?: string;
    }

    //
    interface OrderDetailsInfo {
        id: string; // id
        pic: string; // 详情图片
        price: number; // 价格
        productId: string; // 商品id
        productName: string; // 商品名字
        quantity: string; // 商品数量
        userId?: string;
        orderId?: string; // 订单id
        orderSn?: string; // 订单编号
    }
}