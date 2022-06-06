import { createStore } from "vuex";
import getters from '@/store/getter'
const store = createStore({
    state: {
        userId: "",
        phone: "",
        userName: '',
        avatar: '',
    },
    mutations: {
        SET_USERNAME: (state, userName) => {
            state.userName = userName
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_USERID: (state, userId) => {
            state.userId = userId
        },
        SET_PHONE: (state, phone) => {
            state.phone = phone
        },
    },
    getters
})

export default store