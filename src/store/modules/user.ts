const user = {
    namespace: true,
    state: {
        userId: sessionStorage.getItem('userId') || "",
        phone: sessionStorage.getItem('phone') || "",
        userName: sessionStorage.getItem('userName') || '',
        avatar: sessionStorage.getItem('avatar') || '',
        identity: sessionStorage.getItem('identity') || -1,
    },
    mutations: {
        SET_USER_USERNAME: (state: any, userName: string) => {
            sessionStorage.setItem('userName', userName)
            state.userName = userName
        },
        SET_USER_AVATAR: (state: any, avatar: string) => {
            sessionStorage.setItem('avatar', avatar)
            state.avatar = avatar
        },
        SET_USER_USERID: (state: any, userId: string) => {
            sessionStorage.setItem('userId', userId)
            state.userId = userId
        },
        SET_USER_PHONE: (state: any, phone: string) => {
            sessionStorage.setItem('phone', phone)
            state.phone = phone
        },
        SET_IDENTITY: (state: any, identity: any) => {
            sessionStorage.setItem('identity', identity)
            state.identity = identity
        }
    },
}

export default user