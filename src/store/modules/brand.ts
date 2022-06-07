const brand = {
    namespace:true,
    state: {
        brandId: "",
        sroteName: "",
        phone: '',
        avatar: "",
    },
    mutations: {
        SET_BRAND_STORENAME: (state:any, sroteName:string) => {
            state.sroteName = sroteName
        },
        SET_BRAND_AVATAR: (state:any, avatar:string) => {
            state.avatar = avatar
        },
        SET_BRAND_BRANDID: (state:any, brandId:string) => {
            state.brandId = brandId
        },
        SET_BRAND_PHONE: (state:any, phone:string) => {
            state.phone = phone
        },
    },
}

export default brand