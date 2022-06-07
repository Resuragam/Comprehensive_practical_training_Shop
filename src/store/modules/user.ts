const user = {
    namespace:true,
    state: {
        userId: "",
        phone: "",
        userName: '',
        avatar: '',
    },
    mutations: {
        SET_USER_USERNAME: (state:any, userName:string) => {
            state.userName = userName
        },
        SET_USER_AVATAR: (state:any, avatar:string) => {
            state.avatar = avatar
        },
        SET_USER_USERID: (state:any, userId:string) => {
            state.userId = userId
        },
        SET_USER_PHONE: (state:any, phone:string) => {
            state.phone = phone
        },
    },
}

export default user