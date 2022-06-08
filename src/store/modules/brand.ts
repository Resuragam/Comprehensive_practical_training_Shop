const brand = {
    namespace: true,
    state: {
        brandId: sessionStorage.getItem('brandId')||"",
        sroteName: sessionStorage.getItem('sroteName')||"",
        phone: sessionStorage.getItem('phone')||'',
        avatar: sessionStorage.getItem('avatar')||"",
    },
    mutations: {
        SET_BRAND_STORENAME: (state: any, sroteName: string) => {
            sessionStorage.setItem('sroteName', sroteName)
            state.sroteName = sroteName
        },
        SET_BRAND_AVATAR: (state: any, avatar: string) => {
            sessionStorage.setItem('avatar', avatar)
            state.avatar = avatar
        },
        SET_BRAND_BRANDID: (state: any, brandId: string) => {
            sessionStorage.setItem('brandId', brandId)
            state.brandId = brandId
        },
        SET_BRAND_PHONE: (state: any, phone: string) => {
            sessionStorage.setItem('phone', phone)
            state.phone = phone
        },
    },
}

export default brand