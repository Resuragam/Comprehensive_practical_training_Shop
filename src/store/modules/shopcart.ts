const shopCart = {
    namespace: true,
    state: {
        shopProductNum: sessionStorage.getItem('shopProductNum')||"",
    },
    mutations: {
        SET_SHOPPRODUCT_NUM: (state: any, shopProductNum: string) => {
            sessionStorage.setItem('shopProductNum', shopProductNum)
            state.shopProductNum = shopProductNum
        },
    },
}

export default shopCart