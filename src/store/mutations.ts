const mutations = {
    userName : (state:any) => state.user.userName,
    userId : (state:any) => state.user.userId,
    userphone : (state:any) => state.user.phone,
    useravatar: (state: any) => state.user.avatar,
    sroteName : (state:any) => state.brand.sroteName,
    brandId : (state:any) => state.brand.userId,
    brandphone : (state:any) => state.brand.phone,
    brandavatar: (state:any) => state.brand.avatar,
}

export default mutations